<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!$token = JWTAuth::attempt($request->validated())) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'authorization' => ['Incorrect email or password.']
                    ]
                ])->respond(401);
        }

        $user = Auth::user();
        return responder()
            ->success([
                'token' => $token,
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'email' => $user->email
            ])->respond();
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());
            return responder()
            ->success([
                'token' => $token
            ])->respond();
        } catch (JWTException $e) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'authorization' => [$e->getMessage()]
                    ]
                ])->respond(400);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return responder()->success()->respond();
        } catch (JWTException $e) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'authorization' => [$e->getMessage()]
                    ]
                ])->respond(400);
        }
    }

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
                ->error()
                ->data([
                    'message' => [
                        'unexpectedError' => ['An unexpected server error has occurred.']
                    ]
                ])->respond();
        }
    }
}
