<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UpdateUserProfileRequest extends FormRequest
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
            'name' => ['string', 'min:3', 'max:255'],
            'surname' => ['string', 'min:3', 'max:255'],
            'email' => ['email', 'unique:App\Models\User,email', 'max:255'],
            'password' => ['string', 'min:8', 'max:255']
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
