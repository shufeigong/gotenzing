<?php
require 'vendor/autoload.php';

use Tenzing\Pages\PageHandle;
use Tenzing\Pages\Page;

$app = new Slim\Slim(array(
    'view' => new \Slim\Views\Twig('templates/')
));

$view = $app->view();

$view->parserExtensions = array(
    new \Slim\Views\TwigExtension()
);

$surprising = new Page("surprising", "surprising", "pages/surprising.html");
$whoswho = new Page("whoswho", "whoswho", "pages/whoswho.html");
$branding = new Page("branding", "branding", "pages/branding.html");
$engaging = new Page("engaging", "engaging", "pages/engaging.html");
$orienteering = new Page("orienteering", "orienteering", "pages/orienteering.html");
$integrating = new Page("integrating", "integrating", "pages/integrating.html");
$positioning = new Page("positioning", "positioning", "pages/positioning.html");
$humanchanneling = new Page("humanchanneling", "humanchanneling", "pages/humanchanneling.html");
$serving = new Page("serving", "serving", "pages/serving.html");
$spending = new Page("spending", "spending", "pages/spending.html");

$listItems = array();

array_push($listItems, $surprising, $whoswho, $branding,$engaging, $orienteering, $integrating, $positioning,$humanchanneling, $serving, $spending);

$pageList = new pageHandle($listItems);

$app->get('/', function() use ($app, $pageList) {
    $app->render('templates.html', [
        'pageList' => $pageList
    ]);
})->setName('templates');

$app->get('/:name', function ($name) use ($app, $pageList) {
    $app->render('templates.html',[
        'name' => $name,
        'pageList' => $pageList
    ]);

})->setName('subtemplates');

//$app->get('/', function ($request, $response, $args) use ($pageList){
//    return $this->view->render($response,'templates.html', [
//    		'pageList' => $pageList
//    ]);
//
//})->setName('templates');
//
//
//$app->get('/{name}', function ($request, $response, $args) use ($pageList) {
//
//	return $this->view->render($response,'templates.html',[
//			'name' => $args['name'],
//			'pageList' => $pageList
//	]);
//
//})->setName('subtemplates');

$app->run();
