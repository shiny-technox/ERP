<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageHostingStoreRequest extends FormRequest
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
            //
            'hostingName' => 'required|unique:manage_hostings,hosting_name',
            'hostingProvider' => 'required',
            'hostingExpired' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'hostingName.required' => 'Domain name is required.',
            'hostingProvider.required' => 'Domain provider is required.',
            'hostingExpired.required' => 'Domain expired date is required.',
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
