function popup(){alert("Hello World")}var width=0;$("ul.normal-menu > li").each(function(){width+=jQuery(this).outerWidth(!0)}),width+=30,"undefined"!=typeof NProgress&&(NProgress.configure({ease:"ease",speed:1500}),NProgress.start(),NProgress.done()),$.fn.center=function(){this.parent().css("top"),this.parent().css("left");return this.css("position","absolute"),this.css("top",(this.parent().height()-this.outerHeight())/2+this.parent().scrollTop()+""),this.css("left",(this.parent().width()-this.outerWidth())/2+this.parent().scrollLeft()+""),this};