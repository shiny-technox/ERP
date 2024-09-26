<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageHosting extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];
}
