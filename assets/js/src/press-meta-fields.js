/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select, dispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { TextControl, PanelRow } from '@wordpress/components';
import { isURL } from '@wordpress/url';
import { useEffect, useRef, useCallback } from '@wordpress/element';

const PressMetaFields = () => {
	// Create refs to keep track of the locks and the tracking state.
	const locksTrackRef = useRef( {
		'press-invalid-outlet': false,
		'press-invalid-url': false,
	} );

	// Lock or unlock the post's saving.
	const trackLock = useCallback( ( lockIt, handle ) => {
		// Keep track of our locks.
		const lockMessages = {
			'press-invalid-outlet': __(
				'Press Release Details: The Press Outlet must be filled.',
				'cpt-press'
			),
			'press-invalid-url': __(
				'Press Release Details: The URL is invalid (All URL must start with http:// or https://)',
				'cpt-press'
			),
		};

		if ( lockIt ) {
			if ( ! locksTrackRef.current[ handle ] ) {
				locksTrackRef.current = {
					...locksTrackRef.current,
					[ handle ]: true,
				};
				dispatch( 'core/editor' ).lockPostSaving( handle );
				dispatch( 'core/notices' ).createNotice(
					'notice',
					lockMessages[ handle ],
					{ id: handle, isDismissible: false }
				);
			}
		} else if ( locksTrackRef.current[ handle ] ) {
			locksTrackRef.current = {
				...locksTrackRef.current,
				[ handle ]: false,
			};
			dispatch( 'core/editor' ).unlockPostSaving( handle );
			dispatch( 'core/notices' ).removeNotice( handle );
		}
	}, [] );

	// Get the current post-type.
	const coreEditor = select( 'core/editor' );
	const isPress = 'press' === coreEditor.getCurrentPostType();
	const isAutoDraft =
		'auto-draft' === coreEditor.getEditedPostAttribute( 'status' );

	// Check if the post is new (not published) to show the initial notice.
	useEffect( () => {
		if ( isPress && isAutoDraft ) {
			dispatch( 'core/notices' ).createNotice(
				'notice',
				__(
					'A Press item requires a title, a cover image, an outlet. Author and Press Type are optional. The content is optional if you set a permalink and viceversa.',
					'cpt-press'
				),
				{ id: 'press-initial-notice', isDismissible: true }
			);
		}
	}, [ isPress, isAutoDraft ] );

	// Get the metadata for the current press.
	const [ meta, setMeta ] = useEntityProp( 'postType', 'press', 'meta' );

	// Check if the meta-fields are valid.
	useEffect( () => {
		// Avoid this check if the post is auto-draft and it's not a press post.
		if ( isAutoDraft || ! isPress ) {
			return;
		}

		// Check if the press outlet is valid.
		trackLock( 0 === meta._press_outlet.length, 'press-invalid-outlet' );

		// Check if the press permalink is valid.
		const pressPermalink = meta._press_permalink;
		const hasError = 0 < pressPermalink.length && ! isURL( pressPermalink );
		trackLock( hasError, 'press-invalid-url' );
	}, [ isPress, isAutoDraft, meta, trackLock ] );

	return (
		<>
			{ isPress && (
				<PluginDocumentSettingPanel
					name="press-meta-fields"
					title={ __( 'Press Release Details', 'cpt-press' ) }
				>
					<PanelRow>
						<TextControl
							label={ __( 'Press outlet', 'cpt-press' ) }
							type="text"
							onChange={ ( value ) =>
								setMeta( { ...meta, _press_outlet: value } )
							}
							value={ meta._press_outlet }
							help={ __(
								'The name of the press source (web site, magazine, newspaper, etc).',
								'cpt-press'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __(
								'Press Author (Optional)',
								'cpt-press'
							) }
							type="text"
							onChange={ ( value ) =>
								setMeta( { ...meta, _press_author: value } )
							}
							value={ meta._press_author }
							help={ __(
								'The name of the person who actually wrote the press publication.',
								'cpt-press'
							) }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={ __( 'Press Link (Optional)', 'cpt-press' ) }
							type="url"
							onChange={ ( value ) =>
								setMeta( { ...meta, _press_permalink: value } )
							}
							value={ meta._press_permalink }
							help={ __(
								'The URL that links to the press release. If provided, any link to this press article will redirect to that URL.',
								'cpt-press'
							) }
						/>
					</PanelRow>
				</PluginDocumentSettingPanel>
			) }
		</>
	);
};

export default PressMetaFields;
