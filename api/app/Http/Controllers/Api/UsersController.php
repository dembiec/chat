<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all()->except(Auth::id());

        if ($users->isEmpty()) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'user' => ['Users not found.']
                    ]
                ])->respond(404);
        }

        return responder()->success($users)->respond();
    }

    public function show($user = null)
    {
        $search = User::where('id', '<>', Auth::id())
            ->whereRaw("CONCAT(name, ' ', surname) LIKE '%".htmlspecialchars($user)."%'")
            ->get();

        if ($search->isEmpty()) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'user' => ['Users not found.']
                    ]
                ])->respond(404);
        }

        return responder()->success($search)->respond();
    }
}
