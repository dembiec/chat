<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UpdateUserProfileRequest AS UUPRequesr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;

class UserProfileController extends Controller
{
    public function index()
    {
        return responder()->success(Auth::user())->respond();
    }

    public function update(UUPRequesr $request)
    {
        try {
            if ($request->has('password')) {
                $updatedData = $request->except(['password']) + ['password' => Hash::make(htmlspecialchars($request->password))];
            } else {
                $updatedData = $request->validated();
            }

            User::findOrFail(Auth::id())
                ->update($updatedData);

            return responder()->success()->respond();
        } catch (QueryException $e) {
            return responder()->error()->respond();
        }
    }

    public function destroy()
    {
        try {
            User::findOrFail(Auth::id())->delete();
            return responder()->success()->respond();
        } catch (QueryException $e) {
            return responder()-error()->respond();
        }
    }
}
