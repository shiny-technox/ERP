<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;


class ManageSaleStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            '0.name' => 'required|string|max:50',
            '0.addressLine1' => 'required|string|max:100',
            '0.addressLine2' => 'nullable|string|max:100',
            '0.city' => 'required|string|max:50',
            '0.state' => 'required|string|max:50',
            '0.pincode' => 'required|string|max:6',
            '0.gstin' => 'nullable|string|max:50',
            '0.cgst' => 'nullable|string|max:50',
            '0.sgst' => 'nullable|string|max:50',
            '*.particulars' => 'required|string|max:255',
            '*.quantity' => 'required|integer|min:1',
            '*.price' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            '0.name.required' => 'The Name field is required.',
            '0.addressLine1.required' => 'The Address Line 1 field is required.',
            '0.addressLine2.string' => 'The Address Line 2 field must be a string.',
            '0.city.required' => 'The City field is required.',
            '0.state.required' => 'The State field is required.',
            '0.pincode.required' => 'The Pincode field is required.',
            '0.pincode.max' => 'The Pincode field must not exceed 6 characters.',
            '0.gstin.max' => 'The GSTIN field must not exceed 50 characters.',
            '0.cgst.max' => 'The CGST field must not exceed 50 characters.',
            '0.sgst.string' => 'The SGST field must be a string.',
            '*.particulars.required' => 'The Particulars field is required.',
            '*.quantity.required' => 'The Quantity field is required.',
            '*.price.required' => 'The Price field is required.',
        ];
    }

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

