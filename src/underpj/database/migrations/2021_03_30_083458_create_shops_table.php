<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id');
            $table->string('address');
            $table->tinyInteger('gender');
            $table->string('shop_alias');
            $table->string('banking_account_number');
            $table->string('banking_account_name');
            $table->string('banking_name');
            $table->float('price_service_max');  // Số tiền tối đa chi trả cho hệ thống trên 1 sản phẩm
            $table->double('price_service_percent'); // Phần trăm giá sản phẩm trả cho hệ thống
            $table->tinyInteger('is_delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
