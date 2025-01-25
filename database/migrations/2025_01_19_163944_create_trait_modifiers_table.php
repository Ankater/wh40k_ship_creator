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
        Schema::create('trait_modifiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trait_id')->constrained('ship_traits')->cascadeOnDelete();
            $table->enum('attribute_type', [
                'SPACE', 'COST', 'SPEED', 'DETECTION', 'ARMOR',
                'MANEUVER', 'HULL_INTEGRITY', 'TURRET_MOUNTS',
                'STRENGTH', 'DAMAGE', 'CRITICAL_DAMAGE', 'RANGE'
            ]);
            $table->integer('modifier');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trait_modifiers');
    }
};
