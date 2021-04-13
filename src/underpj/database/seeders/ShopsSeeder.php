<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('shops')->insert(
            [
                'user_id' => 3,
                'address' => 'shop address seed data',
                'gender' => 1,
                'shop_alias' => 'shop_1',
                'banking_account_number' => '1225654585485854',
                'banking_account_name' => 'Shop 1',
                'banking_name' => 'BIDV',
                'price_service_percent' => 10,
                'price_service_max' => 20000,
                'is_delete' => 0
            ]
        );
    }
}
