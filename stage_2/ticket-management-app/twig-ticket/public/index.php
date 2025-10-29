<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

$app = AppFactory::create();

// Twig setup
$twig = Twig::create(__DIR__ . '/../templates', [
    'cache' => false, // Set to cache path in production
]);

$app->add(TwigMiddleware::create($app, $twig));

// Routes
$app->get('/', function ($request, $response) use ($twig) {
    return $twig->render($response, 'pages/landing.html.twig');
});

$app->get('/auth/login', function ($request, $response) use ($twig) {
    return $twig->render($response, 'pages/login.html.twig');
});

$app->get('/auth/signup', function ($request, $response) use ($twig) {
    return $twig->render($response, 'pages/signup.html.twig');
});

$app->get('/dashboard', function ($request, $response) use ($twig) {
    return $twig->render($response, 'pages/dashboard.html.twig');
});

$app->get('/tickets', function ($request, $response) use ($twig) {
    return $twig->render($response, 'pages/tickets.html.twig');
});

$app->run();