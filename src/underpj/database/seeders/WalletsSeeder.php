<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WalletsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('wallets')->insert([
            [
                'user_id' => 3,
                'amount' => 0,
                'is_delete' => 0
            ],
            [
                'user_id' => 4,
                'amount' => 0,
                'is_delete' => 0
            ]
        ]);
    }
}
