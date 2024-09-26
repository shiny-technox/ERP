<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;

class EmployeeUpdateRequest extends FormRequest
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
        $id = $this->route('id');
        return [
            //
            'empName' => 'required',
            'empId' => 'required|unique:users,emp_id,'.$id,
            'empRole' => 'required',
            'empSalary' => 'required',
            'empMail' => 'required|unique:users,email,'.$id,
        ];
    }
    public function messages()
    {
        return [
            'empName.required' => 'The Employee Name field cannot be empty.',
            'empId.required' => 'The Employee Id field cannot be empty.',
            'empRole.required' => 'The Employee Role field cannot be empty.',
            'empMail.required' => 'The Employee Mail field cannot be empty.',
            'empSalary.required' => 'The Employee Salary field cannot be empty.',
            'empId.unique' => 'The Employee Id already used.',
            'empMail.unique' => 'The Mail Id already used.',
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
