<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ctvs extends Model
{
    const FEMALE = 0;
    const MALE = 1;

    protected $fillable = [
        'user_id', 'address', 'gender', 'trademark', 'banking_account_name', 'banking_account_number', 'banking_name', 'is_delete'
    ];
}
