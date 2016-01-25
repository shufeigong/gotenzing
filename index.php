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

// Utility Menu
$personalitiesBios = new Page("personalitiesBios", "personalities-bios", "pages/personalities-bios.html");
$galleryLegacy = new Page("galleryLegacy", "gallery-legacy", "pages/gallery-legacy.html");
$servicesSkills = new Page("servicesSkills", "services-skills", "pages/services-skills.html");

$listItems = array();
array_push($listItems, $surprising, $whoswho, $branding,$engaging, $orienteering, $integrating, $positioning,$humanchanneling, $serving, $spending);
$pageList = new pageHandle($listItems);

$utilityPages = [];
array_push($utilityPages,$personalitiesBios, $galleryLegacy, $servicesSkills);
$utilityPageList = new PageHandle($utilityPages);

$app->get('/', function() use ($app, $pageList,$utilityPageList) {
    $app->render('templates.html', [
        'pageList' => $pageList,
        'utilityPageList' => $utilityPageList
    ]);
})->setName('templates');

$app->get('/:name', function ($name) use ($app, $pageList, $utilityPageList) {
            $app->render('templates.html',[
                'name' => $name,
                'pageList' => $pageList,
                'utilityPageList' => $utilityPageList
            ]);

})->setName('subtemplates');

$app->run();
