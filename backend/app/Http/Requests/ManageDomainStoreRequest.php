<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageDomainStoreRequest extends FormRequest
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
            'domainName' => 'required|unique:manage_domains,domain_name',
            'domainProvider' => 'required',
            'domainExpired' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'domainName.required' => 'Domain name is required.',
            'domainProvider.required' => 'Domain provider is required.',
            'domainExpired.required' => 'Domain expired date is required.',
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
