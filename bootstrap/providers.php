<?php

use Nuwave\Lighthouse\LighthouseServiceProvider;
use Nuwave\Lighthouse\Pagination\PaginationServiceProvider;
use Nuwave\Lighthouse\Validation\ValidationServiceProvider;

return [
    App\Providers\AppServiceProvider::class,
    LighthouseServiceProvider::class,
    MLL\GraphiQL\GraphiQLServiceProvider::class,
    PaginationServiceProvider::class,
    ValidationServiceProvider::class,
];
