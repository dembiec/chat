<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest as SMRequest;
use App\Models\Message;
use App\Events\Message as WSMessage;
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
            $recipientId = htmlspecialchars($request->recipientId);
            $message = htmlspecialchars($request->message);

            Message::create([
                'sender_id' => Auth::id(),
                'recipient_id' => $recipientId,
                'message' => Crypt::encrypt($message)
            ]);

            broadcast(
                new WSMessage(
                    Auth::id(),
                    $recipientId,
                    $message
                )
            );

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
                ->orderBy('sent_at', 'desc')
                ->paginate(50);

            $msg = $messages->map(function ($message) {
                return [
                    'senderId' => $message->sender_id,
                    'recipientId' => $message->recipient_id,
                    'message' => Crypt::decrypt($message->message),
                    'date' => $message->sent_at
                ];
            })->sortBy('date');

            return responder()
                ->success($msg)
                ->meta([
                    'loadMore' => preg_match('/^.+\?page=(\d+)$/', $messages->nextPageUrl(), $pageNumber) ? $pageNumber[1] : null
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
