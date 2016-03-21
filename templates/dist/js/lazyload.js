!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.LazyLoad=e()}(this,function(){function t(){g||(h={elements_selector:"img",container:window,threshold:300,throttle:50,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,show_while_loading:!1,callback_load:null,callback_set:null,callback_processed:null,placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},_=!!window.addEventListener,p=!!window.attachEvent,f=!!document.body.classList,g=!0)}function e(t,e,n){return _?void t.addEventListener(e,n):void(p&&(t.attachEvent("on"+e,function(t){return function(){n.call(t,window.event)}}(t)),t=null))}function n(t,e,n){return _?void t.removeEventListener(e,n):void(p&&t.detachEvent("on"+e,n))}function o(t,e,n){function o(){return window.innerWidth||u.documentElement.clientWidth||document.body.clientWidth}function i(){return window.innerHeight||u.documentElement.clientHeight||document.body.clientHeight}function l(t){return t.getBoundingClientRect().top+h-u.documentElement.clientTop}function s(t){return t.getBoundingClientRect().left+_-u.documentElement.clientLeft}function r(){var o;return o=e===window?i()+h:l(e)+e.offsetHeight,o<=l(t)-n}function a(){var i;return i=e===window?o()+window.pageXOffset:s(e)+o(),i<=s(t)-n}function c(){var o;return o=e===window?h:l(e),o>=l(t)+n+t.offsetHeight}function d(){var o;return o=e===window?_:s(e),o>=s(t)+n+t.offsetWidth}var u,h,_;return u=t.ownerDocument,h=window.pageYOffset||u.body.scrollTop,_=window.pageXOffset||u.body.scrollLeft,!(r()||c()||a()||d())}function i(){var t=new Date;return t.getTime()}function l(t,e){var n,o={};for(n in t)t.hasOwnProperty(n)&&(o[n]=t[n]);for(n in e)e.hasOwnProperty(n)&&(o[n]=e[n]);return o}function s(t){try{return Array.prototype.slice.call(t)}catch(e){var n,o=[],i=t.length;for(n=0;i>n;n++)o.push(t[n]);return o}}function r(t,e){return f?void t.classList.add(e):void(t.className+=(t.className?" ":"")+e)}function a(t,e){return f?void t.classList.remove(e):void(t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,""))}function c(t,e,n,o){var i=e.getAttribute("data-"+n),l=e.getAttribute("data-"+o);i&&t.setAttribute("srcset",i),l&&t.setAttribute("src",l)}function d(t,e){return function(){return t.apply(e,arguments)}}function u(n){t(),this._settings=l(h,n),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=d(this.handleScroll,this),e(window,"resize",this._handleScrollFn),this.update()}var h,_,p,f,g=!1;return u.prototype._showOnLoad=function(t){function o(){null!==l&&(l.callback_load&&l.callback_load(t),c(t,t,l.data_srcset,l.data_src),l.callback_set&&l.callback_set(t),a(t,l.class_loading),r(t,l.class_loaded),n(i,"load",o))}var i,l=this._settings;t.getAttribute("src")||t.setAttribute("src",l.placeholder),i=document.createElement("img"),e(i,"load",o),r(t,l.class_loading),c(i,t,l.data_srcset,l.data_src)},u.prototype._showOnAppear=function(t){function o(){null!==i&&(i.callback_load&&i.callback_load(t),a(t,i.class_loading),r(t,i.class_loaded),n(t,"load",o))}var i=this._settings;e(t,"load",o),r(t,i.class_loading),c(t,t,i.data_srcset,i.data_src),i.callback_set&&i.callback_set(t)},u.prototype._loopThroughElements=function(){var t,e,n=this._settings,i=this._elements,l=i?i.length:0,s=[];for(t=0;l>t;t++)e=i[t],n.skip_invisible&&null===e.offsetParent||o(e,n.container,n.threshold)&&(n.show_while_loading?this._showOnAppear(e):this._showOnLoad(e),s.push(t),e.wasProcessed=!0);for(;s.length>0;)i.splice(s.pop(),1),n.callback_processed&&n.callback_processed(i.length);0===l&&this._stopScrollHandler()},u.prototype._purgeElements=function(){var t,e,n=this._elements,o=n.length,i=[];for(t=0;o>t;t++)e=n[t],e.wasProcessed&&i.push(t);for(;i.length>0;)n.splice(i.pop(),1)},u.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,e(this._settings.container,"scroll",this._handleScrollFn))},u.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,n(this._settings.container,"scroll",this._handleScrollFn))},u.prototype.handleScroll=function(){var t,e,n;this._settings&&(e=i(),n=this._settings.throttle,0!==n?(t=n-(e-this._previousLoopTime),0>=t||t>n?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=e,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(d(function(){this._previousLoopTime=i(),this._loopTimeout=null,this._loopThroughElements()},this),t))):this._loopThroughElements())},u.prototype.update=function(){this._elements=s(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},u.prototype.destroy=function(){n(window,"resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},u});