!function(e,t,o,n){function a(e,t){return e[t]===n?p[t]:e[t]}function r(){var e=t.pageYOffset;return e===n?m.scrollTop:e}function i(e,t){var o=p["on"+e];o&&(C(o)?o.call(t[0]):(o.addClass&&t.addClass(o.addClass),o.removeClass&&t.removeClass(o.removeClass))),t.trigger("lazy"+e,[t]),c()}function l(t){i(t.type,e(this).off(A,l))}function s(o){if(b.length){o=o||p.forceLoad,L=1/0;var n,a,s=r(),d=t.innerHeight||m.clientHeight,c=t.innerWidth||m.clientWidth;for(n=0,a=b.length;a>n;n++){var u,f=b[n],g=f[0],y=f[v],w=!1,z=o||T(g,h)<0;if(e.contains(m,g)){if(o||!y.visibleOnly||g.offsetWidth||g.offsetHeight){if(!z){var E=g.getBoundingClientRect(),I=y.edgeX,X=y.edgeY;u=E.top+s-X-d,z=s>=u&&E.bottom>-X&&E.left<=c+I&&E.right>-I}if(z){f.on(A,l),i("show",f);var B=y.srcAttr,k=C(B)?B(f):g.getAttribute(B);k&&(g.src=k),w=!0}else L>u&&(L=u)}}else w=!0;w&&(T(g,h,0),b.splice(n--,1),a--)}a||i("complete",e(m))}}function d(){I>1?(I=1,s(),setTimeout(d,p.throttle)):I=0}function c(e){b.length&&(e&&"scroll"===e.type&&e.currentTarget===t&&L>=r()||(I||setTimeout(d,0),I=2))}function u(){z.lazyLoadXT()}function f(){s(!0)}var v="lazyLoadXT",h="lazied",A="load error",g="lazy-hidden",m=o.documentElement||o.body,y=t.onscroll===n||!!t.operamini||!m.getBoundingClientRect,p={autoInit:!1,selector:"img[data-src]",blankImage:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",throttle:99,forceLoad:y,loadEvent:"pageshow",updateEvent:"load orientationchange resize scroll touchmove focus",forceEvent:"lazyloadall",onstart:null,oninit:{removeClass:"lazy"},onshow:{addClass:g},onload:{removeClass:g,addClass:"lazy-loaded"},onerror:{removeClass:g},oncomplete:null,checkDuplicates:!0},w={srcAttr:"data-src",edgeX:0,edgeY:0,visibleOnly:!0},z=e(t),C=e.isFunction,E=e.extend,T=e.data||function(t,o){return e(t).data(o)},b=[],L=0,I=0;e[v]=E(p,w,e[v]),e.fn[v]=function(o){o=o||{};var n,r=a(o,"blankImage"),l=a(o,"checkDuplicates"),s=a(o,"scrollContainer"),d=a(o,"show"),u={};e(s).on("scroll",c);for(n in w)u[n]=a(o,n);return this.each(function(n,a){if(a===t)e(p.selector).lazyLoadXT(o);else{var s=l&&T(a,h),f=e(a).data(h,d?-1:1);if(s)return void c();r&&"IMG"===a.tagName&&!a.src&&(a.src=r),f[v]=E({},u),i("init",f),b.push(f),c()}})},e(o).ready(function(){i("start",z),z.on(p.updateEvent,c).on(p.forceEvent,f),e(o).on(p.updateEvent,c),p.autoInit&&(z.on(p.loadEvent,u),u())})}(window.jQuery||window.Zepto||window.$,window,document),function(e){var t=e.lazyLoadXT;t.selector+=",video,iframe[data-src]",t.videoPoster="data-poster",e(document).on("lazyshow","video",function(o,n){var a=n.lazyLoadXT.srcAttr,r=e.isFunction(a),i=!1;n.attr("poster",n.attr(t.videoPoster)),n.children("source,track").each(function(t,o){var n=e(o),l=r?a(n):n.attr(a);l&&(n.attr("src",l),i=!0)}),i&&(e(this).removeClass("lazy-hidden").addClass("lazy-loaded"),this.load(),e(this).trigger("video-lazyload"))})}(window.jQuery||window.Zepto||window.$);