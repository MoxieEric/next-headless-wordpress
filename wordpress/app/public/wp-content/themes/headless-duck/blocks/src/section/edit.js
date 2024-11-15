/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components'
import { Section } from '../../../../../../../../../src/components/sections/Section'
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'
import '../../../editor.css'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, reverseAlignment } = attributes
	const blockProps = useBlockProps()

	return (
		<>
			<InspectorControls>
				<PanelBody title='Content'>
					<TextControl
						label={__('Title', 'section')}
						value={title || ''}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextControl
						label={__('Subtitle', 'section')}
						value={subtitle || ''}
						onChange={(value) => setAttributes({ subtitle: value })}
					/>
					<ToggleControl
						label={__('Reverse Layout', 'section')}
						value={reverseAlignment}
						onChange={(value) =>
							setAttributes({ reverseAlignment: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Section
				blockProps={blockProps}
				title={title}
				subtitle={subtitle}
				reverseAlignment={reverseAlignment}
			/>
		</>
	)
}
