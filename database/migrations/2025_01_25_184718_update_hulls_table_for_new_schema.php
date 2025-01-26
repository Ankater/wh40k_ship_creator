<?php

use App\Enums\HullClass;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hulls', function (Blueprint $table) {
            $table->renameColumn('price', 'cost');

            $table->dropForeign(['hull_class_id']);
            $table->dropColumn('hull_class_id');

            $table->enum('hull_class', array_column(HullClass::cases(), 'value'))
                      ->default('TRANSPORT');

            $table->integer('speed')->nullable();
            $table->integer('detection')->nullable();
            $table->integer('armor')->nullable();
            $table->integer('maneuver')->nullable();
            $table->integer('hull_integrity')->nullable();
            $table->integer('turret_mounts')->nullable();
            $table->float('length')->nullable();
            $table->float('width')->nullable();
            $table->integer('mass')->nullable();
            $table->integer('crew')->nullable();
            $table->float('acceleration')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hulls', function (Blueprint $table) {
            $table->renameColumn('cost', 'price');

            $table->dropColumn('hull_class');

            $table->foreignId('hull_class_id')->constrained()->cascadeOnDelete();

            $table->dropColumn([
                'speed',
                'detection',
                'armor',
                'maneuver',
                'hull_integrity',
                'turret_mounts',
                'length',
                'width',
                'mass',
                'crew',
                'acceleration',
            ]);
        });
    }
};
