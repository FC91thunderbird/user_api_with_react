<?php

if (!function_exists('filter_input_data')) {
    function filter_input_data($input)
    {
        if (is_array($input)) {
            return array_map('filter_input_data', $input);
        }

        if (is_string($input)) {
            $filtered = preg_replace('/[^a-zA-Z0-9\s]/', '', $input);

            return $filtered;
        }

        return $input;
    }
}
