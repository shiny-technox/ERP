<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class EmployeePasswordUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Authorization logic can be implemented here if needed
    }

    public function rules()
    {
        return [
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:8',
            'newPassword_confirmation' => 'required|string'
        ];
    }

    public function messages()
    {
        return [
            'currentPassword.required' => 'Current Password is required',
            'newPassword.required' => 'New Password is required',
            'newPassword.min' => 'New Password must be at least 8 characters',
            
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json([
                'code' => 422,
                'status' => 'error',
                'message' => 'Validation errors',
                'errors' => $errors,
            ], 422)
        );
    }
}
