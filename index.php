<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
 
$c = new \Slim\Container(); //Create Your container

//Override the default Not Found Handler
$c['notFoundHandler'] = function ($c) {
	return function ($request, $response) use ($c) {
		return $c['response']
		->withStatus(404)
		->withHeader('Content-Type', 'text/html')
		->write('Page not found');
	};
};

//Create Slim
$app = new \Slim\App($c);


// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('templates/');
    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
};

class pageClass{
	public $pageName;
	public $pageUrl;
	public $pageTemplateUrl;
	
	function __construct($pageName, $pageUrl, $pageTemplateUrl){
		$this->pageName = $pageName;
		$this->pageUrl = $pageUrl;
		$this->pageTemplateUrl = $pageTemplateUrl;
	}
	
}

class pageHandleClass implements Iterator{
	private $pageObjectArray;
	
	function __construct($pageObjectArray){
		$this->pageObjectArray = $pageObjectArray;
	}
	
	protected $counter = 0;
	
	//Various methods to set data and to work with the object
	
	public function rewind()
	
	{
	
		$this->counter = 0;
	
	}
	
	public function next()
	
	{
	
		$this->counter++;
	
	}
	
	public function valid()
	
	{
	
		return array_key_exists($this->counter, $this->pageObjectArray);
	
	}
	
	public function current()
	
	{
	
		return $this->pageObjectArray[$this->counter];
	
	}
	
	public function key()
	
	{
	
		return $this->counter;
	
	}
	
}




$surprising = new pageClass("surprising", "surprising", "pages/surprising.html");
$whoswho = new pageClass("whoswho", "whoswho", "pages/whoswho.html");
$branding = new pageClass("branding", "branding", "pages/branding.html");
$engaging = new pageClass("engaging", "engaging", "pages/engaging.html");
$orienteering = new pageClass("orienteering", "orienteering", "pages/orienteering.html");
$integrating = new pageClass("integrating", "integrating", "pages/integrating.html");
$positioning = new pageClass("positioning", "positioning", "pages/positioning.html");
$humanchanneling = new pageClass("humanchanneling", "humanchanneling", "pages/humanchanneling.html");
$serving = new pageClass("serving", "serving", "pages/serving.html");
$spending = new pageClass("spending", "spending", "pages/spending.html");

$listItems = array();

array_push($listItems, $surprising, $whoswho, $branding,$engaging, $orienteering, $integrating, $positioning,$humanchanneling, $serving, $spending);


$pageList = new pageHandleClass($listItems);

//$listItems = array("surprising", "whoswho", "branding", "engaging", "orienteering", "intergrating", "positioning","humanchanneling","serving", "spending");





$app->get('/', function ($request, $response, $args) use ($pageList){
    return $this->view->render($response,'templates.html', [
    		'pageList' => $pageList
    ]);
   
})->setName('templates');


$app->get('/{name}', function ($request, $response, $args) use ($pageList) {
	
	return $this->view->render($response,'templates.html',[
			'name' => $args['name'],
			'pageList' => $pageList
	]);
	 
})->setName('subtemplates');



$app->run();
