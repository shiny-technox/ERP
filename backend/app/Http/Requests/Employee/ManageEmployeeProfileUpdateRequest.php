<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageEmployeeProfileUpdateRequest extends FormRequest
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

            'contactNumber' => 'nullable|string|max:10',
            'emergencyContactNumber' => 'nullable|string|max:10',
            'dob' => 'nullable|string',
            'addressLine1' => 'nullable|string|max:255',
            'addressLine2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'pincode' => 'nullable|string|max:6',
            'bankName' => ['nullable', 'string', 'max:100'],
            'accountHolderName' => ['nullable', 'string', 'max:100'],
            'accountNumber' => ['nullable', 'string', 'max:100'],
            'ifscCode' => ['nullable', 'string', 'max:11'], 
            'upiId' => ['nullable', 'string', 'max:100'],
            'panCard' => ['nullable', 'string', 'regex:/[A-Z]{5}[0-9]{4}[A-Z]{1}/', 'max:10'], 
            'aadhaarCard' => ['nullable', 'string', 'regex:/^\d{12}$/', 'max:12'], 

        ];
    }


    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [

            'contactNumber.string' => 'The contact number must be a string.',

            'emergencyContactNumber.string' => 'The emergency contact number must be a string.',

            'dob.date' => 'The date of birth is not a valid date format.',
            'addressLine1.string' => 'The address line 1 must be a string.',

            'addressLine2.string' => 'The address line 2 must be a string.',

            'city.string' => 'The city must be a string.',

            'state.string' => 'The state must be a string.',

            'pincode.string' => 'The pincode must be a string.',

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
                'code' => '422',
                'status' => 'error',
                'message' => 'Validation errors',
                'errors' => $errors,
            ], 422)
        );
    }
}
