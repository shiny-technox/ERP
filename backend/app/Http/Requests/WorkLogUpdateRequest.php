<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class WorkLogUpdateRequest extends FormRequest
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
            '*.emp_id' => 'required|integer',
            '*.projId' => 'required|integer',
            '*.taskTitle' => 'required|string|max:255',
            '*.taskDescription' => 'required|string|max:1000',
            '*.taskTime' => 'required|date_format:H:i:s',
            '*.workStatusId' => 'required|string|in:Completed,Progress,Pending',
        ];
    }
    public function messages()
    {
        return [
            'projId.required' => 'The Project Id field cannot be empty.',
            'taskTitle.required' => 'The Task Title field cannot be empty.',
            'taskDescription.required' => 'The Task Description field cannot be empty.',
            'taskTime.required' => 'The Task Time field cannot be empty.',
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
