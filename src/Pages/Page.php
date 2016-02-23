<?php

namespace Tenzing\Pages;

/**
 * Created by PhpStorm.
 * User: insu
 * Date: 16-01-21
 * Time: 4:35 PM
 */
class Page
{
    public $pageName;
    public $pageUrl;
    public $pageTemplateUrl;
    public $lightboxTemplateUrl;

    function __construct($pageName, $pageUrl, $pageTemplateUrl, $lightboxTemplateUrl = '')
    {
        $this->pageName        = $pageName;
        $this->pageUrl         = $pageUrl;
        $this->pageTemplateUrl = $pageTemplateUrl;
        $this->lightboxTemplateUrl = $lightboxTemplateUrl;
    }

}