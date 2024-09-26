<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageProject extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];

    public function tasks()
    {
        return $this->hasMany(ManageTask::class, 'projectId');
    }
}
