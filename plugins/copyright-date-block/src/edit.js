/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const { fallbackCurrentYear, showStartingYear, startingYear } = attributes;
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    if (currentYear !== fallbackCurrentYear) {
      setAttributes({ fallbackCurrentYear: currentYear });
    }
  }, [currentYear, fallbackCurrentYear, setAttributes]);

  let displayDate;

  if (showStartingYear && startingYear) {
    displayDate = startingYear + '—' + currentYear;
  } else {
    displayDate = currentYear;
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Settings">
          <ToggleControl
            label="Show Starting Year"
            checked={!!showStartingYear}
            onChange={() =>
              setAttributes({ showStartingYear: !showStartingYear })
            }
          />
          {showStartingYear && (
            <TextControl
              label="Starting year"
              value={startingYear || ''}
              onChange={value => setAttributes({ startingYear: value })}
            />
          )}
        </PanelBody>
      </InspectorControls>
      <p {...useBlockProps()}>© {displayDate}</p>
    </>
  );
}
