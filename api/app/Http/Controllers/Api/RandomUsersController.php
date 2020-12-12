<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RandomUsersRequest AS RURequest;
use App\Models\User;
use Illuminate\Database\QueryException;

class RandomUsersController extends Controller
{
    public function show(RURequest $request, $randomUsers = 1)
    {
        try {
            $randomUsers = User::all()->random(htmlspecialchars($randomUsers));
            return responder()->success($randomUsers)->respond();
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
