<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageSaleUpdateRequest extends FormRequest
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
      
            'name' => 'required|string|max:50',
            'addressLine1' => 'required|string|max:100',
            'addressLine2' => 'nullable|string|max:100',
            'city' => 'required|string|max:50',
            'state' => 'required|string|max:50',
            'pincode' => 'required|string|max:6', 
            'gstin' => 'nullable|string|max:50', 
            'cgst' => 'nullable|string|max:50',
            'sgst' => 'nullable|string|max:50',
        ];
    }
    public function messages()
    {
        return [
         
            'name.required' => 'The Name field is required.',
            'addressLine1.required' => 'The Address Line 1 field is required.',
            'addressLine2.string' => 'The Address Line 2 field must be a string.',
            'city.required' => 'The City field is required.',
            'state.required' => 'The State field is required.',
            'pincode.required' => 'The Pincode field is required.',
            'pincode.max' => 'The Pincode field must not exceed 6 characters.',
            'gstin.max' => 'The GSTIN field must not exceed 50 characters.',
            'cgst.max' => 'The CGST field must not exceed 50 characters.',
            'sgst.string' => 'The SGST field must be a string.',
           
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
