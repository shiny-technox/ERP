<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageLeadsUpdateRequest extends FormRequest
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
            'date' => 'required|date',
            'name' => 'required',
            'company' => 'required',
            'leadType' => 'required',
            'contactNumber' => 'required',
            'ownerContactNumber' => 'required',
            'requirement' => 'required',
            'status' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'date.required' => 'The Date field cannot be empty.',
            'name.required' => 'The Name field cannot be empty.',
            'company.required' => 'The Company field cannot be empty.',
            'leadType.required' => 'The Leads Type field cannot be empty.',
            'contactNumber.required' => 'The Contact Number field cannot be empty.',
            'ownerContactNumber.required' => 'The Owner Contact Number field cannot be empty.',
            'requirement.required' => 'The Requirement field cannot be empty.',
            'status.required' => 'The Status field cannot be empty.',
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
