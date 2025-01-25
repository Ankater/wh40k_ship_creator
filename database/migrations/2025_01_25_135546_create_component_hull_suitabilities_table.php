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
        Schema::create('component_hull_suitabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('component_id')->constrained('components')->cascadeOnDelete();
            $table->enum('hull_class', [
                'TRANSPORT', 'RAIDER', 'FRIGATE', 'LIGHT_CRUISER',
                'CRUISER', 'BATTLECRUISER', 'GRAND_CRUISER'
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('component_hull_suitabilities');
    }
};
