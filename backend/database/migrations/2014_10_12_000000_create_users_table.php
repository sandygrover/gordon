<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('phone_number', 80)->nullable();
            $table->string('website', 80)->nullable();
            $table->string('subscription_fee', 80)->nullable();
            $table->string('location', 80)->nullable();
            $table->tinyInteger('is_block')->default(0);
            $table->string('provider', 10)->nullable();
            $table->string('facebook_id', 100)->nullable();
            $table->string('google_id', 200)->nullable();
            $table->string('api_token', 80)->nullable();
            $table->string('profile')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('role')->default('viewer');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
