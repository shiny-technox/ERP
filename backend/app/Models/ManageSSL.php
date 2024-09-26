<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageSSL extends Model
{
    use HasFactory;
    protected $table="manage_ssls";
    protected $guarded = ['$token'];
}
