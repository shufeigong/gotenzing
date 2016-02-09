<?php
require 'vendor/autoload.php';

use Tenzing\Pages\PageHandle;
use Tenzing\Pages\Page;

$app = new Slim\Slim(
    array(
        'view' => new \Slim\Views\Twig('templates/')
    )
);

$view = $app->view();

$view->parserExtensions = array(
    new \Slim\Views\TwigExtension()
);

/////Create normal version pages//////////////////////////
$surprising      = new Page("surprising", "surprising", "pages/surprising.html");
$whoswho         = new Page("whoswho", "whoswho", "pages/whoswho.html");
$branding        = new Page("branding", "branding", "pages/branding.html");
$engaging        = new Page("engaging", "engaging", "pages/engaging.html");
$orienteering    = new Page("orienteering", "orienteering", "pages/orienteering.html");
$integrating     = new Page("integrating", "integrating", "pages/integrating.html");
$positioning     = new Page("positioning", "positioning", "pages/positioning.html");
$humanchanneling = new Page("humanchanneling", "humanchanneling", "pages/humanchanneling.html");
$serving         = new Page("serving", "serving", "pages/serving.html");
$spending        = new Page("spending", "spending", "pages/spending.html");

// Utility Menu
$personalitiesBios = new Page("personalitiesBios", "personalities-bios", "pages/personalities-bios.html");
$galleryLegacy     = new Page("galleryLegacy", "gallery-legacy", "pages/gallery-legacy.html");
$servicesSkills    = new Page("servicesSkills", "services-skills", "pages/services-skills.html");

$privacy = new Page("privacy", "privacy", "pages/privacy.html");
$contact = new Page("contact", "contact", "pages/contact.html");

$listItems = array();
array_push(
    $listItems,
    $surprising,
    $whoswho,
    $branding,
    $engaging,
    $orienteering,
    $integrating,
    $positioning,
    $humanchanneling,
    $serving,
    $spending
);
$pageList = new PageHandle($listItems);

$utilityPages = [];
array_push($utilityPages, $personalitiesBios, $galleryLegacy, $servicesSkills, $privacy, $contact);
$utilityPageList = new PageHandle($utilityPages);

///////create mobile version pages/////////
$surprising_mobile      = new Page("surprising-mobile", "surprising-mobile", "mobile-pages/surprising-mobile.html");
$whoswho_mobile         = new Page("whoswho-mobile", "whoswho-mobile", "mobile-pages/whoswho-mobile.html");
$branding_mobile        = new Page("branding-mobile", "branding-mobile", "mobile-pages/branding-mobile.html");
$engaging_mobile        = new Page("engaging-mobile", "engaging-mobile", "mobile-pages/engaging-mobile.html");
$orienteering_mobile    = new Page(
    "orienteering-mobile", "orienteering-mobile", "mobile-pages/orienteering-mobile.html"
);
$integrating_mobile     = new Page("integrating-mobile", "integrating-mobile", "mobile-pages/integrating-mobile.html");
$positioning_mobile     = new Page("positioning-mobile", "positioning-mobile", "mobile-pages/positioning-mobile.html");
$humanchanneling_mobile = new Page(
    "humanchanneling-mobile",
    "humanchanneling-mobile",
    "mobile-pages/humanchanneling-mobile.html"
);
$serving_mobile         = new Page("serving-mobile", "serving-mobile", "mobile-pages/serving-mobile.html");
$spending_mobile        = new Page("spending-mobile", "spending-mobile", "mobile-pages/spending-mobile.html");

$mobilePages = array();
array_push(
    $mobilePages,
    $surprising_mobile,
    $whoswho_mobile,
    $branding_mobile,
    $engaging_mobile,
    $orienteering_mobile,
    $integrating_mobile,
    $positioning_mobile,
    $humanchanneling_mobile,
    $serving_mobile,
    $spending_mobile
);
$mobilePageList = new PageHandle($mobilePages);

//create mobile utility pages
$personalities_bios_mobile = new Page(
    "personalities-bios-mobile",
    "personalities-bios-mobile",
    "mobile-pages/personalities-bios-mobile.html"
);
$gallery_legacy_mobile     = new Page(
    "gallery-legacy-mobile",
    "gallery-legacy-mobile",
    "mobile-pages/gallery-legacy-mobile.html"
);
$services_skills_mobile    = new Page(
    "services-skills-mobile",
    "services-skills-mobile",
    "mobile-pages/services-skills-mobile.html"
);

$privacy_mobile = new Page("privacy-mobile", "privacy-mobile", "mobile-pages/privacy-mobile.html");
$contact_mobile = new Page("contact-mobile", "contact-mobile", "mobile-pages/contact-mobile.html");

$mobileUtilityPages = array();
array_push(
    $mobileUtilityPages,
    $personalities_bios_mobile,
    $gallery_legacy_mobile,
    $services_skills_mobile,
    $privacy_mobile,
    $contact_mobile
);
$mobileUtilityPageList = new PageHandle($mobileUtilityPages);

$app->get(
    '/',
    function () use ($app, $pageList, $utilityPageList, $mobilePageList, $mobileUtilityPageList) {
        $app->render(
            'templates.html',
            [
                'pageList'              => $pageList,
                'utilityPageList'       => $utilityPageList,
                'mobilePageList'        => $mobilePageList,
                'mobileUtilityPageList' => $mobileUtilityPageList
            ]
        );
    }
)->setName('templates');

$app->get(
    '/:name',
    function ($name) use ($app, $pageList, $utilityPageList, $mobilePageList, $mobileUtilityPageList) {
        $app->render(
            'templates.html',
            [
                'name'                  => $name,
                'pageList'              => $pageList,
                'utilityPageList'       => $utilityPageList,
                'mobilePageList'        => $mobilePageList,
                'mobileUtilityPageList' => $mobileUtilityPageList
            ]
        );
    }
)->setName('subtemplates');

$app->get(
    '/utility/:name',
    function ($name) use ($app, $pageList, $utilityPageList, $mobilePageList, $mobileUtilityPageList) {
        $app->render(
            'templates.html',
            [
                'name'                  => $name,
                'pageList'              => $pageList,
                'utilityPageList'       => $utilityPageList,
                'mobilePageList'        => $mobilePageList,
                'mobileUtilityPageList' => $mobileUtilityPageList
            ]
        );
    }
)->setName('subtemplates');

$app->run();
