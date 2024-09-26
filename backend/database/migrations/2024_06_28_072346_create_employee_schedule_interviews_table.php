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
        Schema::create('employee_schedule_interviews', function (Blueprint $table) {
            $table->id();
            $table->string("interviewer_name");
            $table->string("interviewer_email");
            $table->string("interviewer_phone");
            $table->date("interview_schedule_date");
            $table->time("interview_schedule_time");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_schedule_interviews');
    }
};
