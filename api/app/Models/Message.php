<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'recipient_id',
        'message',
        'sent_at'
    ];

//    protected $hidden = [
//        'recipient_id',
//        'sender_id'
//    ];

    const CREATED_AT = 'sent_at';
    const UPDATED_AT = null;
}
