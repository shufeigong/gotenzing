import React from 'react';
import {render} from 'react-dom';
//import GalleryCarousel from './gallery/gallery-carousel.jsx';
//import GalleryThumbnail from './gallery/gallery-thumbnail.jsx';
import Accordion from './accordion/accoridon.jsx';
//import Branding from './carousels/branding.jsx';

//render(<GalleryThumbnail url='/templates/json/gallery.json' />, document.getElementById('gallery-container'));
render(<Accordion url='/templates/json/bios.json' />, document.getElementById('accordion-container'));

