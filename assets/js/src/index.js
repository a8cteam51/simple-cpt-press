/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PressMetaFields from './press-meta-fields';

registerPlugin( 'press-meta-fields', {
	render: PressMetaFields,
} );
