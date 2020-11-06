<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageRequest AS SMRequest;
use App\Models\Message;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class MessageController extends Controller
{
    public function store(SMRequest $request)
    {
        try {
            Message::create([
                'sender_id' => Auth::id(),
                'recipient_id' => htmlspecialchars($request->recipientId),
                'message' => Crypt::encrypt(htmlspecialchars($request->message))
            ]);

            return responder()->success()->respond();
        } catch (QueryException $e) {
            return responder()->error(null, 'Internal server error')->respond();
        }
    }

    public function show($id)
    {
        try {
            $messages = Message::where('sender_id', Auth::id())
                ->where('recipient_id', $id)
                ->Orwhere('sender_id', $id)
                ->Orwhere('recipient_id', Auth::id())
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
            return responder()->error()->respond();
        }
    }
}
