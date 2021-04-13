<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CtvsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('ctvs')->insert(
            [
                'user_id' => 4,
                'address' => 'ctv address seed data',
                'gender' => 1,
                'trademark' => 'CTV 1 trademark',
                'banking_account_number' => '1246451231565854',
                'banking_account_name' => 'CTV 1',
                'banking_name' => 'BIDV',
                'is_delete' => 0
            ]
        );
    }
}
