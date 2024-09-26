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
        Schema::create('apply_leaves', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_id')->nullable();
            $table->date('from_date');
            $table->date('to_date');
            $table->string('duration');
            $table->integer('leave_type')->comment('1-office leave, 2-ca');
            $table->time('from_time')->nullable();
            $table->time('to_time')->nullable();
            $table->string('attachment')->nullable();
            $table->string('comments')->nullable();
            $table->enum('approval',['yes','no'])->default('no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apply_leaves');
    }
};
