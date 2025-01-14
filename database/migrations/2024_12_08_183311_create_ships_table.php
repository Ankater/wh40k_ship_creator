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
        Schema::create('ships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hull_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plasma_engine_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('warp_engine_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('gellar_field_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('void_shield_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('bridge_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('life_support_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->foreignId('sensors_id')->nullable()->constrained('components')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ships');
    }
};
