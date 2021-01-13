<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $senderId = null;
    private $recipientId = null;
    public $message = null;

    public function __construct(int $senderId = null, int $recipientId = null, string $data = null)
    {
        $this->senderId = $senderId;
        $this->recipientId = $recipientId;
        $this->message = $data;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.'.$this->senderId.'.'.$this->recipientId);
    }

    public function broadcastAs()
    {
        return 'new-message';
    }
}
