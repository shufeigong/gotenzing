!function(e,t,o,n){function a(e,t){return e[t]===n?y[t]:e[t]}function i(){var e=t.pageYOffset;return e===n?m.scrollTop:e}function r(e,t){var o=y["on"+e];o&&(z(o)?o.call(t[0]):(o.addClass&&t.addClass(o.addClass),o.removeClass&&t.removeClass(o.removeClass))),t.trigger("lazy"+e,[t]),d()}function l(t){r(t.type,e(this).off(h,l))}function s(o){if(I.length){o=o||y.forceLoad,T=1/0;var n,a,s=i(),c=t.innerHeight||m.clientHeight,d=t.innerWidth||m.clientWidth;for(n=0,a=I.length;a>n;n++){var f,u=I[n],v=u[0],p=u[A],C=!1,w=o||b(v,g)<0;if(e.contains(m,v)){if(o||!p.visibleOnly||v.offsetWidth||v.offsetHeight){if(!w){var E=v.getBoundingClientRect(),B=p.edgeX,L=p.edgeY;f=E.top+s-L-c,w=s>=f&&E.bottom>-L&&E.left<=d+B&&E.right>-B}if(w){u.on(h,l),r("show",u);var X=p.srcAttr,k=z(X)?X(u):v.getAttribute(X);k&&(v.src=k),C=!0}else T>f&&(T=f)}}else C=!0;C&&(b(v,g,0),I.splice(n--,1),a--)}a||r("complete",e(m))}}function c(){B>1?(B=1,s(),setTimeout(c,y.throttle)):B=0}function d(e){I.length&&(e&&"scroll"===e.type&&e.currentTarget===t&&T>=i()||(B||setTimeout(c,0),B=2))}function f(){w.lazyLoadXT()}function u(){s(!0)}var A="lazyLoadXT",g="lazied",h="load error",v="lazy-hidden",m=o.documentElement||o.body,p=t.onscroll===n||!!t.operamini||!m.getBoundingClientRect,y={autoInit:!0,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:p,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"lazyloadall",oninit:{removeClass:"lazy"},onshow:{addClass:v},onload:{removeClass:v,addClass:"lazy-loaded"},onerror:{removeClass:v},checkDuplicates:!0},C={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},w=e(t),z=e.isFunction,E=e.extend,b=e.data||function(t,o){return e(t).data(o)},I=[],T=0,B=0;e[A]=E(y,C,e[A]),e.fn[A]=function(o){o=o||{};var n,i=a(o,"blankImage"),l=a(o,"checkDuplicates"),s=a(o,"scrollContainer"),c=a(o,"show"),f={};e(s).on("scroll",d);for(n in C)f[n]=a(o,n);return this.each(function(n,a){if(a===t)e(y.selector).lazyLoadXT(o);else{var s=l&&b(a,g),u=e(a).data(g,c?-1:1);if(s)return void d();i&&"IMG"===a.tagName&&!a.src&&(a.src=i),u[A]=E({},f),r("init",u),I.push(u),d()}})},e(o).ready(function(){r("start",w),w.on(y.updateEvent,d).on(y.forceEvent,u),e(o).on(y.updateEvent,d),y.autoInit&&(w.on(y.loadEvent,f),f())})}(window.jQuery||window.Zepto||window.$,window,document);