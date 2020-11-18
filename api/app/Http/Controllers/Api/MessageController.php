<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest AS SMRequest;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\QueryException;

class MessageController extends Controller
{
    public function store(SMRequest $request)
    {
        if (Auth::id() == $request->recipientId) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'authorization' => ['You cannot send a message to yourself.']
                    ]
                ])->respond(400);
        }

        try {
            Message::create([
                'sender_id' => Auth::id(),
                'recipient_id' => htmlspecialchars($request->recipientId),
                'message' => Crypt::encrypt(htmlspecialchars($request->message))
            ]);

            return responder()->success()->respond();
        } catch (QueryException $e) {
            return responder()
                ->error()
                ->data([
                    'message' => [
                        'unexpectedError' => ['Internal server error.']
                    ]
                ])->respond();
        }
    }

    public function show($id)
    {
        try {
            $messages = Message::whereIn('sender_id', [Auth::id(), $id])
                ->whereIn('recipient_id', [$id, Auth::id()])
                ->whereColumn('sender_id', '<>', 'recipient_id')
                ->orderBy('sent_at', 'asc')
                ->paginate(50)
                ->setPageName('more');

            $msg = $messages->map(function ($message) {
                return [
                    'senderId' => $message->sender_id,
                    'recipientId' => $message->recipient_id,
                    'message' => Crypt::decrypt($message->message),
                    'date' => $message->sent_at
                ];
            });

            return responder()
                ->success($msg)
                ->meta([
                    'loadMore' => $messages->nextPageUrl()
                ])->respond();
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
