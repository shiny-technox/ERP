<?php

namespace App\Http\Requests;

use App\Models\ApplyLeave;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use App\Models\YourModel;

class AssignLeaveRequest extends FormRequest
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
            'fromDate' => 'required|date|after_or_equal:today',
            'toDate' => 'required|date|after_or_equal:fromDate|after_or_equal:today',
            'duration' => 'required',
            'leaveType' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'fromDate.required' => 'The From Date field cannot be empty.',
            'fromDate.date' => 'The From Date must be a valid date.',
            'toDate.required' => 'The To Date field cannot be empty.',
            'toDate.date' => 'The To Date must be a valid date.',
            'toDate.after_or_equal' => 'The To Date must be a date after or equal to From Date.',
            'duration.required' => 'The Duration field cannot be empty.',
            'leaveType.required' => 'The Leave Type field cannot be empty.'
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

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            $this->checkDateOverlap($validator);
        });
    }

    protected function checkDateOverlap($validator)
    {
        
        $fromDate = $this->input('fromDate');
        $toDate = $this->input('toDate');

        $overlappingDates = ApplyLeave::where(function ($query) use ($fromDate, $toDate) {
            $query->where(function ($query) use ($fromDate, $toDate) {
                $query->where('from_date', '<=', $toDate)
                    ->where('to_date', '>=', $fromDate);
            });
        })->orWhere(function ($query) use ($fromDate, $toDate) {
            $query->where('from_date', $fromDate)
                ->where('to_date', $toDate);
        })->exists();

        if ($overlappingDates) {
            $validator->errors()->add('fromDate', 'The selected date range overlaps with an existing record.');
            $validator->errors()->add('toDate', 'The selected date range overlaps with an existing record.');
        }
    }
}
