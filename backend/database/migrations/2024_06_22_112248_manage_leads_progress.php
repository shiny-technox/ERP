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
        Schema::create('manage_leads_progress', function (Blueprint $table) {
            $table->id();
            $table->integer('leads_id');
            $table->enum('progress',['Ended','Continue'])->nullable();
            $table->text('description')->nullable();
            $table->date('next_follow_date')->nullable();
            $table->time('next_follow_time')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('manage_leads_progress');
    }
};
