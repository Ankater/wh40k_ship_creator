<?php

use App\Enums\ShipComplicationTypeEnum;
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
        Schema::table('ship_complications', function (Blueprint $table) {
            $table->enum('type', array_map(fn($c) => $c->value, ShipComplicationTypeEnum::cases()))
                ->default(ShipComplicationTypeEnum::MACHINE_SPIRIT_ODDITY->value)
                ->after('source');

            $table->unsignedInteger('order')->default(0)->after('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ship_complications', function (Blueprint $table) {
            $table->dropColumn(['type', 'order']);
        });
    }
};
