<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Users extends Authenticatable
{
    use HasApiTokens, Notifiable;

    const USER_ADMIN = 1;
    const USER_SYSTEM_EMPLOYEE = 2;
    const USER_SHOP = 3;
    const USER_CTV = 4;

    const STATUS_ACTIVE = 1;
    const STATUS_INACTIVE = 0;

    protected $fillable = [
        'name', 'password', 'birthday', 'tel', 'email', 'status', 'type', 'is_delete'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];
}
