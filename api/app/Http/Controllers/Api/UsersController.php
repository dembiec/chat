<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class UsersController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            User::create(
                $request->except(['password']) +
                ['password' => Hash::make($request->password)]
            );

            return responder()->success()->respond();
        } catch (QueryException $e) {
            return responder()
                ->error(
                    null,
                    'An unexpected server error has occurred.'
                )
                ->respond();
        }
    }
}
