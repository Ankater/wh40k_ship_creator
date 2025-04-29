# ./Dockerfile
FROM php:8.4-fpm

RUN apt-get update \
 && apt-get install -y --no-install-recommends git zip unzip curl libzip-dev \
 && docker-php-ext-install pdo pdo_mysql \
 && pecl install xdebug \
 && docker-php-ext-enable xdebug \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www


EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
