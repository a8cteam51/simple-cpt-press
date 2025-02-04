/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import Edit from './edit';
import metadata from './block.json';

// Register the block type.
registerBlockType( metadata.name, {
	edit: Edit,
} );
