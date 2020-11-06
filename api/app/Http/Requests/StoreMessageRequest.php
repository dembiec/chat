<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class StoreMessageRequest extends FormRequest
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
            'recipientId' => ['required', 'int'],
            'message' => ['required', 'string']
        ];
    }

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
