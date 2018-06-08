/** ******  left menu  *********************** **/

/* Sidebar Menu active class */
$(function () {
    var url = window.location.href;
    $('.list a').filter(function () {
        return this.href == url.split('?')[0];
    }).parent('li').addClass('active').parent('ul').parent().addClass('active');
});

/** ******  /left menu  *********************** **/