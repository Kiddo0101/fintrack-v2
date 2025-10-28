<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('dvs', function (Blueprint $table) {
            $table->id();
            $table->string('dv_number')->unique();
            $table->date('dv_date');
            $table->string('payee');
            $table->text('particulars');
            $table->decimal('amount', 15, 2);
            $table->enum('status', ['draft', 'submitted', 'approved', 'disapproved', 'cancelled'])->default('draft');
            $table->string('office_code')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('voucher_number')->nullable();
            $table->string('account_code')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('dvs');
    }
};
