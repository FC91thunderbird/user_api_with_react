<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:users,name,'. $this->route('user'),
            'email' => 'required|email|unique:users,email,'. $this->route('user'),
            'password' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|numeric|min:10',
            'gender' => 'required|string',
            'city' => 'required|string',
        ];
    }
}
