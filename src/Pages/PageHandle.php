<?php

namespace Tenzing\Pages;

use Iterator;

/**
 * Created by PhpStorm.
 * User: insu
 * Date: 16-01-21
 * Time: 4:35 PM
 */
class PageHandle implements Iterator
{
    private $pageObjectArray;

    function __construct($pageObjectArray)
    {
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