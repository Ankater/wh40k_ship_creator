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
        Schema::create('weapons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('energy');
            $table->integer('space');
            $table->integer('price');
            $table->string('strength');
            $table->string('damage');
            $table->string('critical');
            $table->string('range');
            $table->string('source')->nullable();
            $table->boolean('is_archaotech')->default(false);
            $table->boolean('is_xenotech')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weapons');
    }
};
