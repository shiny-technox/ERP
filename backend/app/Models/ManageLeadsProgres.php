<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageLeadsProgres extends Model
{
    use HasFactory;
    protected $table = 'manage_leads_progress';
    protected $guarded = ['$token'];
}
