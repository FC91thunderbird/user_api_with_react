<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation()
    {
        $input = $this->all();

        if (isset($input['name'])) {
            $input['name'] = preg_replace('/[^a-zA-Z0-9\s]/', '', $input['name']);
            $input['name'] = trim($input['name']);
        }

        if (isset($input['address'])) {
            $input['address'] = preg_replace('/[^a-zA-Z0-9\s]/', '', $input['address']);
            $input['address'] = trim($input['address']);
        }

        if (isset($input['phone'])) {
            $input['phone'] = preg_replace('/[^a-zA-Z0-9\s]/', '', $input['phone']);
            $input['phone'] = trim($input['phone']);
        }

        if (isset($input['gender'])) {
            $input['gender'] = preg_replace('/[^a-zA-Z0-9\s]/', '', $input['gender']);
            $input['gender'] = trim($input['gender']);
        }

        if (isset($input['city'])) {
            $input['city'] = preg_replace('/[^a-zA-Z0-9\s]/', '', $input['city']);
            $input['city'] = trim($input['city']);
        }

        $this->replace($input);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|numeric|min:10',
            'gender' => 'required|string',
            'city' => 'required|string',
        ];
    }
}
