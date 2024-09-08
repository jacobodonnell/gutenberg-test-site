<?php
$current_year = date("Y");

if (isset($attributes['fallbackCurrentYear']) && $attributes['fallbackCurrentYear'] === $current_year) {
	$block_content = $content;
} else {
	if (! empty($attributes['startingYear']) && ! empty($attributes['showStartingYear'])) {
		$display_date = $attributes['startingYear'] . '—' . $current_year;
	} else {
		$display_date = $current_year;
	}

	$block_content = '<p ' . get_block_wrapper_attributes() . '>© ' . esc_html($display_date) . '</p>';
}

echo wp_kses_post($block_content);
