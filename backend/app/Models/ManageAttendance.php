<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageAttendance extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];
    public function arrUser()
    {
        return $this->hasMany(User::class, 'id','user_id');
    }
}
