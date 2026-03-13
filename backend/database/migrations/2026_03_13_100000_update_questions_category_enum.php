<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add missing columns if they don't exist
        Schema::table('questions', function (Blueprint $table) {
            if (!Schema::hasColumn('questions', 'title')) {
                $table->string('title')->after('id');
            }
            if (!Schema::hasColumn('questions', 'difficulty')) {
                $table->enum('difficulty', ['easy', 'medium', 'hard'])->after('title');
            }
            if (!Schema::hasColumn('questions', 'category')) {
                $table->enum('category', ['backend', 'frontend', 'database'])->after('difficulty');
            }
        });

        // If category already existed, update the enum values
        if (Schema::hasColumn('questions', 'category')) {
            DB::statement("ALTER TABLE questions MODIFY COLUMN category ENUM('backend', 'frontend', 'database') NOT NULL");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE questions MODIFY COLUMN category ENUM('backend', 'frontend', 'hardware') NOT NULL");

        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn(['title', 'difficulty', 'category']);
        });
    }
};
