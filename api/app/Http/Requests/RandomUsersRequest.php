<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Console\Input\Input;

class RandomUsersRequest extends FormRequest
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
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge(['randomUsers' => $this->route('randomUsers')]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'randomUsers' => ['nullable', 'int', 'min:1', 'max:50']
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
