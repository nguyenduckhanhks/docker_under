<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin', 'namespace' => 'Api'], function() {
    Route::post('/login', 'LoginController@authenticate');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::group(['prefix' => 'users'], function() {
            Route::post('/create-users-by-admin', 'UsersController@createUsersByAdmin');
            Route::get('/user-login', 'LoginController@getUserLogin');
            Route::post('/logout', 'LoginController@logout');
            Route::get('/all-users', 'UsersController@getAllUsers');
            Route::post('/get-user-by-id', 'UsersController@getUserDataById');
            Route::post('/search-user', 'UsersController@searchUserByAdmin');
            Route::post('/update-users-by-admin', 'UsersController@updateUsersByAdmin');
            Route::post('/update-status-users', 'UsersController@updateStatusUserbyAdmin');
        });
    });
});
