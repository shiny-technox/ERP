<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageSale extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];

    protected $fillable = [
        'name', 'addressLine1', 'addressLine2', 'city', 'state', 'pincode', 'gstin', 'cgst', 'sgst'
    ];
    public function invoices()
    {
        return $this->hasMany(ManageaSaleInvoice::class, 'sale_id');
    }
   
    
}
