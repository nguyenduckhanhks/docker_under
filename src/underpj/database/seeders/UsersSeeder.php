<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // password: 1
        DB::table('users')->insert([
            [
                'name' => 'Admin 1',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'birthday' => '2000-12-11',
                'tel' => '096358742',
                'email' => 'admin@gmail.com',
                'status' => 1,
                'type' => 1,
                'is_delete' => 0
            ],
            [
                'name' => 'Employee 1',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'birthday' => '2000-12-11',
                'tel' => '0875225642',
                'email' => 'employess@gmail.com',
                'status' => 1,
                'type' => 2,
                'is_delete' => 0
            ],
            [
                'name' => 'shop 1',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'birthday' => '2000-12-11',
                'tel' => '0782569842',
                'email' => 'shop@gmail.com',
                'status' => 1,
                'type' => 3,
                'is_delete' => 0
            ],
            [
                'name' => 'CTV 1',
                'password' => '$2y$10$Jdp03h9niDcpDro6tE3RF.8zOwEaVR4gvcuAHuG2dzzTEXejKGmC2',
                'birthday' => '2000-12-11',
                'tel' => '0698253698',
                'email' => 'ctv@gmail.com',
                'status' => 1,
                'type' => 4,
                'is_delete' => 0
            ]
        ]);
    }
}
