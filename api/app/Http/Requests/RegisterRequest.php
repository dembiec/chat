<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:App\Models\User,email', 'max:255'],
            'password' => ['required', 'min:8', 'max:255']
        ];
    }

    /**
     * Handling failed validation.
     *
     * @param  $validator
     * @return void
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw (
            new ValidationException(
                $validator,
                responder()->error()->data([
                    'message' => $validator->errors()
                ])->respond()
            )
        );
    }
}
