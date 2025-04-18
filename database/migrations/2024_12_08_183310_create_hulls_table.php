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
        Schema::create('hulls', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('space');
            $table->integer('price');
            $table->string('source')->nullable();
            $table->foreignId('hull_class_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hulls');
    }
};
