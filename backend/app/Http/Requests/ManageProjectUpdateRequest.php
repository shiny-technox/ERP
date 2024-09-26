<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ManageProjectUpdateRequest extends FormRequest
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
            'projName' => 'required',
            'clientName' => 'required',
            'clientPhone' => 'required',
            'clientEmail' => 'required',
            'projDuration' => 'required|unique:users,email'
        ];
    }
    public function messages()
    {
        return [
            'projName.required' => 'The Project Name field cannot be empty.',
            'clientName.required' => 'The Client Name field cannot be empty.',
            'clientPhone.required' => 'The Employee Phone field cannot be empty.',
            'clientEmail.required' => 'The Client Mail field cannot be empty.',
            'projDuration.required' => 'The Project Duration field cannot be empty.',
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
