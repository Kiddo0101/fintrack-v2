<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dv extends Model
{
    use HasFactory;

    protected $fillable = [
        'dv_number',
        'dv_date',
        'payee',
        'particulars',
        'amount',
        'status',
        'office_code',
        'created_by',
        'approved_by',
        'voucher_number',
        'account_code',
        'remarks'
    ];

    protected $casts = [
        'dv_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
