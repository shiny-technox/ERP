<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManageaSaleInvoice extends Model
{
    use HasFactory;
    protected $guarded = ['$token'];
    protected $fillable = [
        'sale_id', 'particulars', 'quantity', 'price',
    ];
 
    public function arrSale()
    {
        return $this->belongsTo(ManageProject::class, 'sale_id');
    }
}
