function popup(){
    alert ("Hello World")
}

//Dropdown fucntionality to calculate the full width dropdown

var width =0;

$('ul.normal-menu > li').each(function() {
    width += jQuery(this).outerWidth(true);
});
width += 30;

if (typeof NProgress != "undefined") {
    NProgress.configure({ ease: 'ease', speed: 1500 });
    NProgress.start();
    NProgress.done();
}

//Functionality to centre all content and on browser resize

$.fn.center = function() {
    var t = this.parent().css ("top");
    var l = this.parent().css("left");

    this.css("position", "absolute");
    this.css("top", ((this.parent().height() - this.outerHeight()) /2) + this.parent().scrollTop() + "")
    this.css("left", ((this.parent().width() - this.outerWidth()) /2) + this.parent().scrollLeft() + "")
    return this;
};