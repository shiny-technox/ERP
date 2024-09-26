<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class ScheduleInterviewStoreRequest extends FormRequest
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
            'interviewScheduleDate' => 'required|date',
            'interviewScheduleTime' => 'required|date_format:H:i',
            'interviewerEmail' => 'required|email',
            'interviewerName' => 'required',
            'interviewerPhone' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'interviewScheduleDate.required' => 'The Interview date field cannot be empty.',
            'interviewScheduleTime.required' => 'The Interview Time field cannot be empty.',
            'interviewerEmail.required' => 'The Interview Email field cannot be empty.',
            'interviewerName.required' => 'The Interview Name field cannot be empty.',
            'interviewerPhone.required' => 'The Interview Phone field cannot be empty.',
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
