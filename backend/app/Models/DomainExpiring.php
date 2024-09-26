<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DomainExpiring extends Model
{
    use HasFactory;
    protected $fillable = [
        'notification_type',
        'description',
        'seen',
    ];
}
