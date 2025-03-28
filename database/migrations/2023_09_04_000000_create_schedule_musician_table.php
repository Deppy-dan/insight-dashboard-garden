
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
        Schema::create('schedule_musician', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id')->constrained()->onDelete('cascade');
            $table->foreignId('musician_id')->constrained()->onDelete('cascade');
            $table->string('instrument');
            $table->boolean('confirmed')->default(false);
            $table->timestamps();
            
            // Ensure a musician can only be assigned once per schedule
            $table->unique(['schedule_id', 'musician_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_musician');
    }
};
