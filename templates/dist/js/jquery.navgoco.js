!function(t){"use strict";var i=function(i,o,e){return this.el=i,this.$el=t(i),this.options=o,this.uuid=this.$el.attr("id")?this.$el.attr("id"):e,this.state={},this.init(),this};i.prototype={init:function(){var i=this;i._load(),i.$el.find("ul").each(function(o){var e=t(this);e.attr("data-index",o),i.options.save&&i.state.hasOwnProperty(o)?(e.parent().addClass(i.options.openClass),e.show()):e.parent().hasClass(i.options.openClass)?(e.show(),i.state[o]=1):e.hide()}),i.options.caret&&i.$el.find("li:has(ul) > a").append(i.options.caret);var o=i.$el.find("li > a");o.on("click",function(o){o.stopPropagation();var e=t(this).next();if(e=e.length>0?e:!1,i.options.onClickBefore.call(this,o,e),e)o.preventDefault(),i._toggle(e,e.is(":hidden")),i._save();else if(i.options.accordion){var a=i.state=i._parents(t(this));i.$el.find("ul").filter(":visible").each(function(){var o=t(this),e=o.attr("data-index");a.hasOwnProperty(e)||i._toggle(o,!1)}),i._save()}i.options.onClickAfter.call(this,o,e)})},_toggle:function(i,o){var e=this,a=i.attr("data-index"),n=i.parent();if(e.options.onToggleBefore.call(this,i,o),o){if(n.addClass(e.options.openClass),i.slideDown(e.options.slide),e.state[a]=1,e.options.accordion){var s=e.state=e._parents(i);s[a]=e.state[a]=1,e.$el.find("ul").filter(":visible").each(function(){var i=t(this),o=i.attr("data-index");s.hasOwnProperty(o)||e._toggle(i,!1)})}}else n.removeClass(e.options.openClass),i.slideUp(e.options.slide),e.state[a]=0;e.options.onToggleAfter.call(this,i,o)},_parents:function(i,o){var e={},a=i.parent(),n=a.parents("ul");return n.each(function(){var i=t(this),a=i.attr("data-index");return a?void(e[a]=o?i:1):!1}),e},_save:function(){if(this.options.save){var i={};for(var e in this.state)1===this.state[e]&&(i[e]=1);o[this.uuid]=this.state=i,t.cookie(this.options.cookie.name,JSON.stringify(o),this.options.cookie)}},_load:function(){if(this.options.save){if(null===o){var i=t.cookie(this.options.cookie.name);o=i?JSON.parse(i):{}}this.state=o.hasOwnProperty(this.uuid)?o[this.uuid]:{}}},toggle:function(i){var o=this,e=arguments.length;if(1>=e)o.$el.find("ul").each(function(){var e=t(this);o._toggle(e,i)});else{var a,n={},s=Array.prototype.slice.call(arguments,1);e--;for(var r=0;e>r;r++){a=s[r];var l=o.$el.find('ul[data-index="'+a+'"]').first();if(l&&(n[a]=l,i)){var c=o._parents(l,!0);for(var p in c)n.hasOwnProperty(p)||(n[p]=c[p])}}for(a in n)o._toggle(n[a],i)}o._save()},destroy:function(){t.removeData(this.$el),this.$el.find("li:has(ul) > a").unbind("click")}},t.fn.navgoco=function(o){if("string"==typeof o&&"_"!==o.charAt(0)&&"init"!==o)var e=!0,a=Array.prototype.slice.call(arguments,1);else o=t.extend({},t.fn.navgoco.defaults,o||{}),t.cookie||(o.save=!1);return this.each(function(n){var s=t(this),r=s.data("navgoco");r||(r=new i(this,e?t.fn.navgoco.defaults:o,n),s.data("navgoco",r)),e&&r[o].apply(r,a)})};var o=null;t.fn.navgoco.defaults={caret:'<span class="caret"></span>',accordion:!1,openClass:"open",save:!0,cookie:{name:"navgoco",expires:!1,path:"/"},slide:{duration:400,easing:"swing"},onClickBefore:t.noop,onClickAfter:t.noop,onToggleBefore:t.noop,onToggleAfter:t.noop}}(jQuery);