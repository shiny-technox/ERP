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
        Schema::create('manage_leads', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('name');
            $table->string('company');
            $table->enum('leads_type',['Google','Facebook','Reference','SEO','Local SEO','Cold call']);
            $table->string('contact_numer');
            $table->string('owner_contact_number')->nullable();
            $table->enum('requirement',['Website','Digital marketing','SEO','Graphic design']);
            $table->enum('status',['Onprogress','Loss','Completed']);
            $table->enum('progress',['Ended','Continue'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manage_leads');
    }
};
