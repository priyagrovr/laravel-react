<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\CandidateService;

class CandidateServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // Bind the concrete class into the container
        $this->app->singleton(CandidateService::class, function ($app) {
            return new CandidateService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
