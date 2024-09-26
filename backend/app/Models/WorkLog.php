<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkLog extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];
    public function ManageProjectArr()
    {
        return $this->hasMany(ManageProject::class, 'id','proj_id');
    }
    public function ManageUserArr()
    {
        return $this->hasMany(User::class, 'id','emp_id');
    }
}
