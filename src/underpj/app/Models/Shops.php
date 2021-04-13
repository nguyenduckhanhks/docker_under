<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shops extends Model
{
    const FEMALE = 0;
    const MALE = 1;

    protected $fillable = [
        'user_id', 'address', 'gender', 'shop_alias', 'banking_account_number', 'banking_account_name', 'banking_name', 'price_service_max',
        'price_service_percent', 'is_delete'
    ];
}
