<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();

            $table->string('maker');
            $table->string('model');

            $table->integer('introduced')->nullable();

            $table->string('notable_user1')->nullable();
            $table->string('notable_user2')->nullable();
            $table->string('notable_user3')->nullable();

            $table->string('feature1')->nullable();
            $table->string('feature2')->nullable();
            $table->string('feature3')->nullable();
            $table->string('feature4')->nullable();
            $table->string('feature5')->nullable();

            $table->text('popularity')->nullable();

            $table->string('dates')->nullable();

            $table->string('finish1')->nullable();
            $table->string('finish2')->nullable();
            $table->string('finish3')->nullable();
            $table->string('finish4')->nullable();
            $table->string('finish5')->nullable();

            $table->string('tipo');

            $table->string('imagen');
            $table->string('review_video')->nullable();
            $table->string('imagen_producto');

            $table->decimal('precio', 12, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
