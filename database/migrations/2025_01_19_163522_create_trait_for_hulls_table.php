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
        Schema::create('trait_for_hulls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hull_id')->constrained('hulls')->cascadeOnDelete();
            $table->foreignId('trait_id')->constrained('ship_traits')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trait_for_hulls');
    }
};
