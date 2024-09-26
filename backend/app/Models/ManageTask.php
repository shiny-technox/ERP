<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageTask extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];


    public function arrProject()
    {
        return $this->belongsTo(ManageProject::class, 'projectId');
    }
}
