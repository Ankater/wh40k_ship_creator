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
        Schema::create('traitables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ship_trait_id')->constrained()->cascadeOnDelete();
            $table->morphs('traitable'); // Creates 'traitable_id' and 'traitable_type'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traitables');
    }
};
