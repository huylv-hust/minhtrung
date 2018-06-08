(function($) {
    var methods = { on: $.fn.on, bind: $.fn.bind };
    $.each(methods, function(k) {
        $.fn[k] = function() {
            var args = [].slice.call(arguments),
                delay = args.pop(),
                fn = args.pop(),
                timer;
            args.push(function() {
                var self = this,
                    arg = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(self, [].slice.call(arg));
                }, delay);
            });
            return methods[k].apply(this, isNaN(delay) ? arguments : args);
        };
    });
}(jQuery));

var timex;
var Click;
var News = 0;
var shownews;
var show;
var Menu = 0;
var SubMenu = 0;
var Details = 0;
var doWheel = true;
var doTouch = true;
var Has = true;
var Arrhash;



function NavClick() {
    $('.nav-click').bind('click', function() {
        if ($('.nav-click').hasClass('active')) {
            $('.top, .overlay-menu').removeClass('show');
            $('.nav-click').removeClass('active');
        } else {
            $('.top, .overlay-menu').addClass('show');
            $('.nav-click').addClass('active');

        }

        return false;

    });


}

function SlidePicture() {

    if ($('.slide-bg').length) {

        var allItem = $('.bg-home').length;
        if (allItem > 1) {
            $('.next-prev').css({ 'display': 'block' });
        } else {
            $('.next-prev').css({ 'display': 'none' });
        }
        var Time = $('.slider-home, .slider-villa').attr('data-time')

        if (allItem > 1) {
            $('.slide-bg').BTQSlider({
                autoPlay: Time,
                singleItem: true,
                loop: true,
                transitionStyle: "fade",
                slideSpeed: 1000,
                paginationSpeed: 1000,

            });
        } else {
            $('.slide-bg').BTQSlider({
                autoPlay: false,
                singleItem: true,
                slideSpeed: 1000,
                paginationSpeed: 1000,
                loop: false,
            });
        }

        $('.nextslide').click(function() {
            $('.slide-bg').trigger('BTQ.next');
        });
        $('.prevslide').click(function() {
            $('.slide-bg').trigger('BTQ.prev');
        });
    }

    $('.thumb-slide').BTQSlider({
        itemsCustom: [
            [0, 1],
            [300, 1],
            [600, 1],
            [700, 2],
            [1000, 2],
            [1100, 2],
            [1900, 2],
        ],
        slideSpeed: 800,
        paginationSpeed: 800,
        navigation: false,
        pagination: true,
        autoHeight: true
    });


    $('.video-slide').BTQSlider({
        singleItem: true,
        slideSpeed: 800,
        paginationSpeed: 800,
        navigation: true,
        pagination: false,
        autoHeight: true
    });

    $('.box-pic').each(function(index, element) {
        $(element).BTQSlider({
            singleItem: true,
            slideSpeed: 800,
            paginationSpeed: 800,
            mouseDrag: false,
            navigation: false,
            pagination: false,
            afterAction: function(el) {
                this.$BTQItems.removeClass('topoint');
                this.$BTQItems.eq(this.currentItem).addClass('topoint');
            }
        });
    });

    if ($('.facilities-pic').length) {

        $(".text-name > h3").lettering('words').children("span").lettering().children("span").lettering();
        $(".text-name > p").lettering('words').children("span").lettering().children("span").lettering();
        $('.details-box').each(function(index, element) {
            $(element).BTQSlider({
                singleItem: true,
                autoHeight: true,
                slideSpeed: 1000,
                paginationSpeed: 1000,
                navigation: true,
                pagination: true,
                //transitionStyle : "fade",
                afterAction: function(el) {
                    this.$BTQItems.removeClass('select');
                    this.$BTQItems.eq(this.currentItem).addClass('select');
                    StopTime();
                    addPlay();

                }
            });
        });

    }


    if ($('.slide-faci').length) {


        $('.slide-faci').BTQSlider({
            singleItem: true,
            autoHeight: true,
            slideSpeed: 1000,
            paginationSpeed: 1000,
            navigation: true,
            pagination: false,
            rewindNav: true,
            afterAction: function(el) {
                this.$BTQItems.removeClass('active');
                this.$BTQItems.eq(this.currentItem).addClass('active');
            }
        });

        $('.villa-pic').on('mousewheel', '.slide-wrapper', function(e) {
            if (e.deltaY > 0) {
                $('.slide-faci').trigger('BTQ.next');
            } else {
                $('.slide-faci').trigger('BTQ.prev');
            }
            e.preventDefault();
        });

    }
    $("#block-page").length && $(".box-content").BTQSlider({
        singleItem: !0,
        autoHeight: !0,
        slideSpeed: 1e3,
        paginationSpeed: 1e3,
        navigation: !1,
        pagination: !1,
        mouseDrag: !1,
        touchDrag: !1,
        rewindNav: !1,
        beforeMove: function() {},
        afterAction: function() {
            $(".title-block h2, .title-block h3").removeClass("show"), $(".left-plan, .compass").removeClass("show");
            var e = this.$BTQItems.parent().parent().parent().parent().find(".title-block");
            this.$BTQItems.removeClass("select"), this.$BTQItems.eq(this.currentItem).addClass("select");
            var t = this.$BTQItems.eq(this.currentItem).addClass("select").parent().parent().parent().parent().find(".sub-nav-block"),
                i = $(".slide-item.select").index(),
                a = $(t).find("li");
            $(a).removeClass("current"), $(a).find('a[data-open = "' + i + '"]').parent().addClass("current");
            var o = $(".sub-nav-block li.current h3").text();
            $(e).find("h3").text(o);
            var l = $(a).find('a[data-open = "' + i + '"]').attr("href"),
                n = $(a).find('a[data-open = "' + i + '"]').attr("data-title"),
                s = $(a).find('a[data-open = "' + i + '"]').attr("data-keyword"),
                r = $(a).find('a[data-open = "' + i + '"]').attr("data-description"),
                c = $(a).find('a[data-open = "' + i + '"]').attr("data-name");
            changeUrl(l, n, r, s, c, n, r), setTimeout(function() {
                $(".slide-item.select").find(".left-plan").addClass("show"), $(".slide-item.select").find(".compass").addClass("show"), $(e).find("h2").addClass("show"), $(e).find("h3").addClass("show")
            }, 1e3)
        }
    });
	$("#apartment-details-page").length && $(".house-pic").length && $(".slide-pic").each(function(e, t) {
        $(t).BTQSlider({
            singleItem: !0,
            navigation: !1,
            pagination: !1,
            mouseDrag: !1,
            touchDrag: !1,
            transitionStyle: "fade",
            afterAction: function() {
                this.$BTQItems.removeClass("show-item"), this.$BTQItems.eq(this.currentItem).addClass("show-item")
            }
        }), $(t).parent().find(".thumbs-slide a:first").addClass("active")
    });

}

function StopTime() {

    if (timex > 0) {
        clearTimeout(timex);
        timex = 0;
    }

}

function addPlay() {

    $('.text-name').removeClass('move');
    $('.text-name p').children().removeClass('move');
    $('.text-name h3').children().children().removeClass('move');
    $('.slide-item.select').find('.text-name').addClass('move');

    $('.move p').children().each(function(i) {
        var box = $(this);
        timex = setTimeout(function() { $(box).addClass('move') }, (i + 1) * 70);
    });
    $('.move h3').children().children().each(function(i) {
        var box = $(this);
        timex = setTimeout(function() { $(box).addClass('move') }, (i + 1) * 200);
    });

}

function ZoomMap() {
    $('.viewer').addClass('desktop');
    var $viewer = $('.viewer');
    $viewer.find('.panzoom').panzoom({
        $zoomIn: $viewer.find(".pic-zoom-in"),
        $zoomOut: $viewer.find(".pic-zoom-out"),
        $zoomRange: $viewer.find(".zoom-range"),
        $reset: $viewer.find(".pic-reset"),
        startTransform: 'scale(1)',
        //cursor: 'default',
        maxScale: 3,
        minScale: 1,
        contain: 'invert'
    }).panzoom('zoom');

    var $panzoom = $viewer.find('.panzoom').panzoom();
    $panzoom.on('mousewheel.focal', function(e) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        $panzoom.panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: false,
            focal: e
        });
    });

}

function NewsLoad(url) {
    $.ajax({
        url: url,
        cache: false,
        success: function(data) {
            $('.news-tab').append(data);

            if ($(window).width() <= 800) {
                $('.news-text img').addClass('zoom-pic');
            } else {
                $('.news-text img').removeClass('zoom-pic');
            }

            if ($('.news-tab .detail-news').length > 1) {
                $('.news-tab .detail-news').last().remove();
            }
            $('.news-text p a').attr('target', '_blank');

            $('.news-tab').animate({ 'opacity': 1 }, 600, 'linear', function() {
                //ResizeWindows();
                if ($(window).width() > 1100) {
                    if ($('.news-list li .link-page.current').length == 0) {
                        $('.news-list li .link-page').first().addClass('current');
                        $('.news-nav li:first-child a').trigger('click');
                    } else {
                        var index = $('.news-list ul li').index($('.news-list ul li div.current').parent());
                        $('.news-nav li:nth-child(' + 0 + [index + 1] + ') a').trigger('click');
                    }
                    ScrollNiceB();
                } else {
                    detectBut();

                }

                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });

            });


            Option(true);

        }
    });
}

function VideoLoad(idx) {
    $.ajax({
        url: idx,
        cache: false,
        success: function(data) {
            $('.allvideo').append(data);
            var ThisVideo = document.getElementById("view-video");

            function playVid() {
                ThisVideo.play();
            }

            function pauseVid() {
                ThisVideo.pause();
            }

            $('.allvideo').css({ 'width': '100%', 'display': 'block' });
            $('.loadicon').fadeOut(300, 'linear', function() {
                playVid();
                $('.loadicon').remove();
            });


            var length = $('#view-video').length;
            $('.close-video').click(function() {
                if (length != 0) {
                    pauseVid();
                }

                $('.video-list, .video-skin').fadeOut(500, 'linear', function() {
                    $('.close-video').fadeOut(300, 'linear');
                    $('.overlay-video').fadeOut(500, 'linear', function() {
                        $('.allvideo').css({ 'width': 0, 'display': 'none' });
                        $('.allvideo .video-list').remove();
                    });
                    $('html, body, .container').removeClass('no-scroll');
                });

            });
        }


    });
}

function AlbumLoad(url) {
    $.ajax({
        url: url,
        cache: false,
        success: function(data) {
            $('.all-album').append(data);

            $('.album-pic-center').css({ 'height': $(window).height() });
            $(".pic-name > h3").lettering('words').children("span").lettering().children("span").lettering();


            if ($(window).width() > 1100) {
                TimeSlide = 6000;
            } else {
                TimeSlide = false;
            }

            $('.album-center').BTQSlider({
                singleItem: true,
                pagination: false,
                lazyLoad: true,
                lazyEffect: "fade",
                slideSpeed: 1000,
                paginationSpeed: 1000,
                afterAction: function(el) {
                    this.$BTQItems.removeClass('show-active');
                    this.$BTQItems.eq(this.currentItem).addClass('show-active');
                    ButCheck();
                    addText();
                }
            });

            function ButCheck() {

                if ($('.show-active:first-child').hasClass('show-active')) {
                    $('.prev-pic').addClass('disable');
                } else {
                    $('.prev-pic').removeClass('disable');
                }
                if ($('.show-active:last-child').hasClass('show-active')) {
                    $('.next-pic').addClass('disable');
                } else {
                    $('.next-pic').removeClass('disable');
                }
            }

            function addText() {
                clearTimeout(timex);
                $('.pic-name').removeClass('move');
                $('.pic-name h3').children().children().removeClass('move');
                $('.slide-item.show-active').find('.pic-name').addClass('move');
                $('.move h3').children().children().each(function(i) {
                    var box = $(this);
                    var timex = setTimeout(function() { $(box).addClass('move') }, (i + 1) * 100);
                });
            }

            $('.next-pic').click(function() {
                $('.album-center').trigger('BTQ.next');
            });

            $('.prev-pic').click(function() {
                $('.album-center').trigger('BTQ.prev');
            });

            $('.all-album').stop().animate({ 'opacity': 1 }, 100, 'linear', function() {
                if ($('.album-pic-center').length > 1) {
                    $('.slide-pic-nav').css({ 'display': 'block' });
                }
            });

            $('.album-load').fadeIn(800, 'linear', function() {
                $('.loadicon').fadeOut(300, 'linear', function() {
                    $('.loadicon').remove();
                });
            });


            $('.album-pic-center img').click(function() {
                if ($(window).width() <= 620) {

                    $('html, body, .container').addClass('no-scroll');
                    $('.all-pics').css({ 'display': 'block' });
                    if ($('.pic-name h3').length) {
                        var H = $(this).parent().find('.pic-name h3').text();
                        $('.all-pics').append('<div class="text-length"><h3>' + H + '</h3></div>');
                    }
                    $('.all-pics').append('<div class="full"  style="display:block"></div>');
                    $('.overlay-dark').fadeIn(300, 'linear');
                    var newActive = $(this).parent().find('img').attr("src");

                    $('body').append('<div class="loadicon" style="display:block"></div>');
                    $('.all-pics').find('.full').append('<img src ="' + (newActive) + '" alt="pic" />');



                    $('.all-pics').append('<div class="close-pics-small"></div>');


                    $('.all-pics img').load(function() {

                        if (isDesktop) {
                            $('.full').css({ 'overflow': 'hidden' });
                            $('.full').addClass('dragscroll');
                            dragscroll.reset();
                        } else if (version > 7500 && version < 8500) {
                            detectZoom();
                            $('.full').css({ 'overflow-x': 'auto', 'overflow-y': 'auto', '-webkit-overflow-scrolling': 'touch' });
                        } else {
                            $('.full').css({ 'overflow': 'hidden' });
                            $('.full img').addClass('pinch-zoom');
                            $('.pinch-zoom').each(function() {
                                new Pic.PinchZoom($(this), {});
                            });
                        }


                        if ($('.full img').length > 1) {
                            $('.full img').last().remove()
                        }

                        $('.loadicon').fadeOut(400, 'linear', function() {
                            detectMargin();
                            $('.loadicon').remove();
                            $('.full img, .text-length').addClass('fade-in');
                            $('.all-pics').addClass('show');
                        });

                    });

                }

                $('.close-pics-small').click(function() {
                    $('.full, .close-pics-small').fadeOut(300, 'linear');
                    $('.overlay-dark').fadeOut(300, 'linear', function() {
                        $('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
                        $('.close-pics, .close-pics-small').remove();
                        $('.all-pics').css({ 'display': 'none' }).removeClass('show');
                        $('html, body, .container').removeClass('no-scroll');
                    });
                });
                return false;
            });

            $('.close-album').click(function() {
                $('.all-album').fadeOut(500, 'linear', function() {
                    $('.album-load').remove();
                });
                $('.overlay-album').animate({ 'height': '0%' }, 600, 'easeOutExpo', function() {
                    $('.overlay-album').css({ 'display': 'none' });
                });

                $('html, body, .container').removeClass('no-scroll');
                return false;
            });

        }
    });
}

function FocusText() {
    var txtholder = 'Họ và Tên (*)  Địa chỉ (*) Địa Chỉ (*) Điện Thoại (*) Điện thoại (*) Email (*) Full name (*) Full Name (*) Address (*) Phone (*) Số CMND (*) Ngày cấp (*) Nơi cấp (*) Điện thoại di động (*) Mã căn (*) Tầng (*) Tòa (*)';
    var txtRep = "";
    $('input').focus(function() {
        txtRep = $(this).val();
        if (txtholder.indexOf(txtRep) >= 0) {
            $(this).val("");
        }
    });
    $('input').focusout(function() {
        if ($(this).val() == "") $(this).val(txtRep);
    });
    var cur_text = "";
    $('textarea').focus(function() {
        cur_text = $(this).val();
        if (cur_text == 'Nội dung (*)');
        $(this).val('')
    }).focusout(function() {
        if ($(this).val() == "")
            $(this).val(cur_text)
    });


}

function ScrollHoz() {
    var Scroll = $('.scroll-list, .sub-nav-block, .sub-nav-typical, .sub-nav-villa');
    $(Scroll).addClass('dragscroll');
    dragscroll.reset();
    if ($(window).width() <= 1100) {
        $(Scroll).css({ 'overflow-x': 'scroll', 'overflow-y': 'hidden', '-ms-touch-action': 'auto', '-ms-overflow-style': 'none', 'overflow': ' -moz-scrollbars-none', '-webkit-overflow-scrolling': 'touch' });
        $(Scroll).animate({ scrollLeft: "0px" });
        if (!isTouchDevice && $(window).width() <= 1100) {
            $(Scroll).mousewheel(function(e, delta) {
                e.preventDefault();
                if ($(window).width() <= 1100) {
                    this.scrollLeft -= (delta * 40);
                }
            });
        }
    }

}

function ScrollNiceA() {
    if ($(window).width() <= 1100) {
        $('.scrollA').getNiceScroll().remove();
        $('.scrollA').css({ 'overflow-x': 'visible', 'overflow-y': 'visible' });
    } else if (isTouchDevice && $(window).width() > 1100) {
        $('.scrollA').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollA').getNiceScroll().show();
        $('.scrollA').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: false, grabcursorenabled: false });
    } else {
        $('.scrollA').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollA').getNiceScroll().show();
        $('.scrollA').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: false });
        $('.scrollA').animate({ scrollTop: "0px" });
    }

}

function ScrollNiceB() {
    if ($(window).width() <= 1100) {
        ScrollHoz();
    } else if (isTouchDevice && $(window).width() > 1100) {
        $('.scrollB').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollB').getNiceScroll().show();
        $('.scrollB').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: false, grabcursorenabled: false });
    } else {
        $('.scrollB').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollB').getNiceScroll().show();
        $('.scrollB').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: false });
        $('.scrollB').animate({ scrollTop: "0px" });
    }
}

function ScrollNiceC() {
    if ($(window).width() <= 1100) {
        $('.scrollC').getNiceScroll().remove();
        $('.scrollC').css({ 'overflow-x': 'visible', 'overflow-y': 'visible' });
    } else if (isTouchDevice && $(window).width() > 1100) {
        $('.scrollC').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollC').getNiceScroll().show();
        $('.scrollC').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: false, grabcursorenabled: false, cursorcolor: '#4f4232' });
    } else {
        $('.scrollC').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.scrollC').getNiceScroll().show();
        $('.scrollC').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: false, cursorcolor: '#4f4232' });
        $('.scrollC').animate({ scrollTop: "0px" });
    }
}

function ScrollForm() {
    if ($(window).width() <= 1100) {
        $('.register-form .require-col').getNiceScroll().remove();
        $('.register-form .require-col').css({ 'overflow-x': 'hidden', 'overflow-y': 'auto', '-webkit-overflow-scrolling': 'touch' });

    } else if (isTouchDevice && $(window).width() > 1100) {
        $('.register-form .require-col').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.register-form .require-col').getNiceScroll().show();
        $('.register-form .require-col').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: false, grabcursorenabled: true, cursorcolor: '#4f4232' });
    } else {
        $('.register-form .require-col').css({ 'overflow-x': 'hidden', 'overflow-y': 'hidden' });
        $('.register-form .require-col').getNiceScroll().show();
        $('.register-form .require-col').niceScroll({ touchbehavior: true, horizrailenabled: false, cursordragontouch: true, grabcursorenabled: true, cursorcolor: '#4f4232' });
        $('.register-form .require-col').animate({ scrollTop: "0px" });
    }
}

function ScrollMenu() {
    $(window).width() <= 1100 ? ($(".scroll-menu").getNiceScroll().remove(), $(".scroll-menu").css({
        "overflow-x": "auto",
        "overflow-y": "hidden",
        "-webkit-overflow-scrolling": "touch"
    }), ScrollHoz()) : isTouchDevice && $(window).width() > 1100 ? ($(".scroll-menu").css({
        "overflow-x": "hidden",
        "overflow-y": "hidden"
    }), $(".scroll-menu").getNiceScroll().show(), $(".scroll-menu").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !1,
        grabcursorenabled: !1
    })) : ($(".scroll-menu").css({
        "overflow-x": "hidden",
        "overflow-y": "hidden"
    }), $(".scroll-menu").getNiceScroll().show(), $(".scroll-menu").niceScroll({
        touchbehavior: !0,
        horizrailenabled: !1,
        cursordragontouch: !0,
        grabcursorenabled: !1
    }))
}

function ScrollNiceHide() {
    $('.scrollA, .scrollB, .scrollC').getNiceScroll().remove();
}

function LinkPage() {
    $('a.link-load, a.link-home, a.go-page,  a.go-news, .typical-top a:not(.not-open), .typical-name a:not(.not-open),.typical-villa-top a, .villa-name a, .sub-news li a, a.go-back, .block-typical-top a, .block-name a,.apartment-poiter a, .sub-news li a, .details li a').click(function(e) {
        e.preventDefault();

        $('html, body, .container').addClass('no-scroll-nav');
        linkLocation = $(this).attr("href");
        if ($(window).width() > 1100) {
            $('.container').animate({ scale: 1.05, opacity: 0 }, 800, 'linear', function() {
                window.location = linkLocation;
            });
        } else {
            $('.container').animate({ left: '-100%', opacity: 0 }, 500, 'linear', function() {
                window.location = linkLocation;
            });
        }

        return false;
    });

    $('.nav li a').click(function() {
        $('.overlay-menu').trigger('click');
    });
}

function ContentLoad() {
    ResizeWindows();
    detectHeight();
    LinkPage();
    FocusText();
    NavClick();
    SlidePicture();
    Option();
    Touch();
    ScrollHoz();

    if (!$('#home-page').length) {
        $('.logo').css({ 'cursor': 'pointer' });
        $('.logo').click(function() {
            $('.nav li:nth-child(1) a').trigger('click');
        })
    }

    // {
    //     $('.logo').css({ 'cursor': 'pointer' });
    //     $('.logo').click(function() {
    //         $('.nav li:nth-child(1) a').trigger('click');
    //     });
    // }

    //HOME PAGE//
    if ($('#home-page').length) {
        $('.nav li:nth-child(1)').addClass('current');
        $('html, body, .container').removeClass('no-scroll-nav');

        var PageActive = window.location.hash;
        PageActive = PageActive.slice(1);
        if ($(window).width() > 1100) {
            if ($('.popup-pics img').length > 0) {
                $('.overlay-dark').fadeIn(500, 'linear', function() {
                    $('.popup-pics').fadeIn(500, 'linear');
                    $('body').removeClass('first-time');
                });

                $('.close-popup, .overlay-dark').click(function() {
                    $('.popup-pics, .overlay-dark').fadeOut(500, 'linear', function() {});
                    return false;
                });
            }
        }

    }

    //ABOUT PAGE//
    if ($('#about-page').length) {

        //$('.nav li:nth-child(2)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');

        $('.content-box').stop().animate({ 'right': 0 }, 500, 'linear', function() {
            ScrollNiceA();
        });

        $('.sub-nav li a').click(function(e) {
            e.preventDefault();
            if ($(window).width() > 1100) {
                var allItem = $('.colum-box').length;
                var widthItem = $('.colum-box').width();
                $('.box-content').width(allItem * widthItem);

                if ($('div').hasClass('fadeinup')) {
                    $('.align-center').children().removeClass('fadeinup').addClass('flipoutx');
                }
            }
            $('.sub-nav li').removeClass('current');

            $('.colum-box').removeClass('active');
            $(this).parent().addClass('current');
            var Name = $(this).attr('data-name');
            var Openpage = $(this).attr('data-open');
            $('.colum-box[id= "' + Openpage + '"]').addClass('active');

            //window.location.hash = Name;
            // -------Load page trang giới thiệu
            // var tmpurl = $(this).attr('href');
            // var tmptitle = $(this).attr('data-title');
            // var tmpkeyword = $(this).attr('data-keyword');
            // var tmpdescription = $(this).attr('data-description');
            // var tmpdataname = $(this).attr('data-name');
            // changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
            //-----------------

            if ($(window).width() > 1100) {
                var XCurrent = $('.box-content').offset().left;
                var XItem = $('.box-content .colum-box[id= "' + Openpage + '"]').offset().left;
                $('.box-content').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                    $('.active .align-center').children().removeClass('flipoutx').addClass('fadeinup');
                });

            }

            return false;
        });


        $('.close-box').click(function() {
            $('.sub-nav, .close-box').stop().fadeOut(500, 'linear', function() {
                $('.align-center').fadeOut(500, 'linear');
                $('.open-box').fadeIn(500, 'linear');
            });
        });

        $('.open-box').click(function() {
            $('.open-box').fadeOut(500, 'linear');
            $('.sub-nav').stop().fadeIn(500, 'linear', function() {
                $('.align-center').fadeIn(500, 'linear');
                $('.close-box').fadeIn(500, 'linear');
            });
        });

        if ($('.sub-nav li.current').length) {
            $('.sub-nav li.current a').trigger('click');
        } else {
            $('.sub-nav li:first-child').find('a').trigger('click');
        }

        if(window.location.hash){
			  LocationHash();
		   }else{
			  $('.sub-nav li:first-child').find('a').trigger('click');
		  }


    }

    //LOCATION PAGE//
    if ($('#location-page').length) {
        //$('.nav li:nth-child(3)').addClass('current');
        $('html, body, .container').removeClass('no-scroll-nav');

        if ($(window).width() > 1100) {
            $('.viewer').css({ 'display': 'block' });
            $('.map-mobile').css({ 'display': 'none' });
            ZoomMap();
            setTimeout(function() {
                $('.content-right').stop().animate({ 'right': 0 }, 500, 'linear', function() {
                    ScrollNiceA();
                });
            }, 1000);
        } else {
            $('.viewer').css({ 'display': 'none' });
            $('.map-mobile').css({ 'display': 'block' });
        }

    }

    //FACILITIES PAGE//

    if ($('#facilities-page').length) {
        $('.nav li:nth-child(4)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');

        if ($(window).width() > 1100) {

            // $('.view-pic').on('click', function(){
            //     // ResizeWindows();
            //     var slideHeight = $(".info-facilities").height();
            //     // alert(slideHeight);
            //     $(".slide-item").css({
            //         'width': slideHeight - 200 + 'px',
            //         'max-width': slideHeight - 200 + 'px',
            //         'height': slideHeight - 200 + 'px'

            //     });
            // });

            $('.note-facilities li').on('click mouseenter', function() {
                $('.note-facilities li').removeClass('show');
                $(this).addClass('show');
                var idx1 = $(this).attr('data-text');
                $(".dot-top a").removeClass('show');
                $(".dot-top a[data-show='" + idx1 + "']").addClass('show');

                if ($(window).width() > 1100) {
                    var idx = $(".dot-top a[data-show='" + idx1 + "']").attr('data-info');
                    var Lx = $(".dot-top a[data-show='" + idx1 + "']").offset().left;
                    var Tx = $(".dot-top a[data-show='" + idx1 + "']").offset().top;
                    var Width = $(".dot-top a[data-show='" + idx1 + "']").width();
                    var W = $(".facilities-name[data-faci='" + idx + "']").width();
                    $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 40 });
                    $(".facilities-name").removeClass('show');
                    $(".facilities-name[data-faci='" + idx1 + "']").addClass('show');
                };
            });

			$('.note-facilities li').on('mouseleave', function() {
                $(".facilities-name").removeClass('show');
                $(this).removeClass('show');
            });

            // var sumNotefaic = $('.note-facilities').length;
            // for (var i = 1; i <= sumNotefaic; i++) {
            //     $(".pagination-bullets").append("<span class=\"pagination-bullet\"><i></i><\/span\">");
            // }
            // $(".pagination-bullet:nth-child(" + 1 + ")").addClass("pagination-bullet-active")

            $('.dot-top a').on('click mouseenter', function() {
                $('.dot-top a').removeClass('current');
                $(this).addClass('current');
                $('.facilities-name').removeClass('show');
                var idx = $(this).attr('data-info');
                var show = $(this).attr('data-show');
                var Lx = $(this).offset().left;
                var Tx = $(this).offset().top;
                var Width = $(this).width();
                var W = $(".facilities-name[data-faci='" + idx + "']").width();

                if ($(window).width() > 1100) {
                    $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 40 });
                    $(".note-facilities li[data-text='" + show + "']").addClass('show');

                    // var noteFnumber = $(".note-facilities li[data-text='" + show + "']").closest('.note-facilities').index();
                    // // alert(noteFnumber);
                    // $(".pagination-bullet").removeClass('pagination-bullet-active');
                    // $(".pagination-bullet:eq(" + noteFnumber + ")").addClass('pagination-bullet-active');

                    // var noteF = $(".note-facilities li[data-text='" + show + "']").closest('.note-facilities').offset().left;
                    // var noteS = $(".note-facilities li[data-text='" + show + "']").closest('.description-slide').offset().left;
                    // var leftFaci = noteF - noteS;
                    // $(".note-facilities li[data-text='" + show + "']").closest('.description-slide').css({'display': 'flex', 'transform': 'translate3d(-' + leftFaci + 'px, 0px, 0px)', 'transition-duration': '500ms'});

                    $(".facilities-name[data-faci='" + idx + "']").addClass('show');
                } else {
                    $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx / 2 + Width / 2, 'top': Tx - 200 });
                    $('.note-facilities li').removeClass('show');
                    $(".facilities-name[data-faci='" + idx + "']").addClass('show');
                }

                return false;

            });
            $('.facilities-name a').mouseenter(function() {
                if ($(window).width() > 1100) {
                    $('.dot-top a').removeClass('current');
                    $('.facilities-name').removeClass('show');
                    $('.note-facilities li').removeClass('show');
                }
                return false;
            });
            $('.dot-top a').mouseleave(function() {

                if ($(window).width() > 1100) {
                    $('.dot-top a').removeClass('current');
                    $('.facilities-name').removeClass('show');
                    $('.note-facilities li').removeClass('show');
                }
                return false;
            });

            // $('.pagination-bullet').on('click', function() {
            //     $(".pagination-bullet").removeClass("pagination-bullet-active");
            //     $(this).addClass("pagination-bullet-active");
            //     var numPb = $(this).index() + 1;
            //     var noteF = $(".note-facilities:nth-child(" + numPb + ")").offset().left;
            //     var noteS2 = $(".note-facilities").closest('.description-slide').offset().left;
            //     var leftFaci2 = noteF - noteS2;
            //     // alert(leftFaci2);
            //     $(".note-facilities li").closest('.description-slide').css({'display': 'flex', 'transform': 'translate3d(-' + leftFaci2 + 'px, 0px, 0px)', 'transition-duration': '500ms'});
            // });
        } else {

            $('.dot-top a').on('click mouseenter', function() {
                $('.dot-top a').removeClass('current');
                $(this).addClass('current');
                $('.facilities-name').removeClass('show');
                var idx = $(this).attr('data-info');
                var show = $(this).attr('data-show');
                var Lx = $(this).offset().left;
                var Tx = $(this).offset().top;
                var Width = $(this).width();
                var W = $(".facilities-name[data-faci='" + idx + "']").width();

                if ($(window).width() > 1100) {
                    $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 40 });
                    $(".note-facilities li[data-text='" + show + "']").addClass('show');
                    $(".facilities-name[data-faci='" + idx + "']").addClass('show');
                } else {
                    var heightT = $("#facilities-page .title-page").height();
                    $(".info-facilities").css({'top': heightT + 20});
                    $(".facilities-name[data-faci='" + idx + "']").css({ 'left': $(window).width() / 2 - W / 2, 'top': 40 });
                    $('.note-facilities li').removeClass('show');
                    $(".facilities-name[data-faci='" + idx + "']").addClass('show');
                }

                return false;

            });
            $('.dot-top a').on('click mouseleave', function() {
                $('.dot-top a').removeClass('current');
                $('.facilities-name').removeClass('show');
            });

            $('.note-facilities li').on('click mouseenter', function() {
                // $('.note-facilities li').removeClass('show');
                // $(this).addClass('current');
                $('.note-facilities li').removeClass('show');
                $(this).addClass('show');
                var idx2 = $(this).attr('data-text');
                $(".dot-top a").removeClass('current');
                $(".dot-top a[data-show='" + idx2 + "']").addClass('current').trigger('click');
            });

        }

        // Add Panigation-bullet

        $('.note-facilities li').on('click mouseenter', function() {
                $('.note-facilities li').removeClass('show');
                $(this).addClass('show');
                var idx1 = $(this).attr('data-text');
                $(".dot-top a").removeClass('show');
                $(".dot-top a[data-show='" + idx1 + "']").addClass('show');

                // if ($(window).width() > 1100) {
                //     var idx = $(".dot-top a[data-show='" + idx1 + "']").attr('data-info');
                //     var Lx = $(".dot-top a[data-show='" + idx1 + "']").offset().left;
                //     var Tx = $(".dot-top a[data-show='" + idx1 + "']").offset().top;
                //     var Width = $(".dot-top a[data-show='" + idx1 + "']").width();
                //     var W = $(".facilities-name[data-faci='" + idx + "']").width();
                //     $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 40 });
                //     $(".facilities-name").removeClass('show');
                //     $(".facilities-name[data-faci='" + idx1 + "']").addClass('show');
                // };
            });

        $('.note-facilities li').on('mouseleave', function() {
            $(".facilities-name").removeClass('show');
            $(this).removeClass('show');
        });

        var sumNotefaic = $('.note-facilities').length;
        for (var i = 1; i <= sumNotefaic; i++) {
            $(".pagination-bullets").append("<span class=\"pagination-bullet\"><i></i><\/span\">");
        }
        $(".pagination-bullet:nth-child(" + 1 + ")").addClass("pagination-bullet-active")

        $('.dot-top a').on('click mouseenter', function() {
            $('.dot-top a').removeClass('current');
            $(this).addClass('current');
            $('.facilities-name').removeClass('show');
            var idx = $(this).attr('data-info');
            var show = $(this).attr('data-show');
            var Lx = $(this).offset().left;
            var Tx = $(this).offset().top;
            var Width = $(this).width();
            var W = $(".facilities-name[data-faci='" + idx + "']").width();

            if ($(window).width() > 1100) {
                $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 40 });
                $(".note-facilities li[data-text='" + show + "']").addClass('show');

                var noteFnumber = $(".note-facilities li[data-text='" + show + "']").closest('.note-facilities').index();
                // alert(noteFnumber);
                $(".pagination-bullet").removeClass('pagination-bullet-active');
                $(".pagination-bullet:eq(" + noteFnumber + ")").addClass('pagination-bullet-active');

                var noteF = $(".note-facilities li[data-text='" + show + "']").closest('.note-facilities').offset().left;
                var noteS = $(".note-facilities li[data-text='" + show + "']").closest('.description-slide').offset().left;
                var leftFaci = noteF - noteS;
                $(".note-facilities li[data-text='" + show + "']").closest('.description-slide').css({'display': 'flex', 'transform': 'translate3d(-' + leftFaci + 'px, 0px, 0px)', 'transition-duration': '500ms'});

                $(".facilities-name[data-faci='" + idx + "']").addClass('show');
            } else {
                // $(".facilities-name[data-faci='" + idx + "']").css({ 'left': Lx / 2 + Width / 2, 'top': Tx - 200 });
                $('.note-facilities li').removeClass('show');
                $(".facilities-name[data-faci='" + idx + "']").addClass('show');
            }

            return false;

        });
        $('.facilities-name a').mouseenter(function() {
            if ($(window).width() > 1100) {
                $('.dot-top a').removeClass('current');
                $('.facilities-name').removeClass('show');
                $('.note-facilities li').removeClass('show');
            }
            return false;
        });
        $('.dot-top a').mouseleave(function() {

            if ($(window).width() > 1100) {
                $('.dot-top a').removeClass('current');
                $('.facilities-name').removeClass('show');
                $('.note-facilities li').removeClass('show');
            }
            return false;
        });

        $('.pagination-bullet').on('click', function() {
            $(".pagination-bullet").removeClass("pagination-bullet-active");
            $(this).addClass("pagination-bullet-active");
            var numPb = $(this).index() + 1;
            var noteF = $(".note-facilities:nth-child(" + numPb + ")").offset().left;
            var noteS2 = $(".note-facilities").closest('.description-slide').offset().left;
            var leftFaci2 = noteF - noteS2;
            // alert(leftFaci2);
            $(".note-facilities li").closest('.description-slide').css({'display': 'flex', 'transform': 'translate3d(-' + leftFaci2 + 'px, 0px, 0px)', 'transition-duration': '500ms'});
        });

        ///END panigation-bullet


        $('.dot-top').not('.dot-top a').click(function() {
            $('.dot-top a').removeClass('current');
            $('.facilities-name').removeClass('show');
            $('.note-facilities li').removeClass('show');
        });
        $('.facilities-name a').click(function() {
            if ($(window).width() <= 1100) {
                $('.dot-top a').removeClass('current');
                $('.facilities-name').removeClass('show');
                $('.note-facilities li').removeClass('show');
            }
            return false;
        });


        $(".view-pic").click(function (e) {

            return e.preventDefault(), $(".facilities-pic").addClass("show"), !1;

        }),
        $(".close-content").click(function (e) {
            return e.preventDefault(), $(".facilities-pic").removeClass("show"), !1
        });
        $('.sub-nav li a').click(function(e) {
            e.preventDefault();
            if ($(window).width() > 1100) {
                var allItem = $('.colum-box').length;
                var widthItem = $('.colum-box').width();
                $('.box-content').width(allItem * widthItem);

                if ($('div').hasClass('fadeinup')) {
                    $('.align-center').children().removeClass('fadeinup').addClass('flipoutx');
                }
            }
            $('.sub-nav li').removeClass('current');

            $('.colum-box').removeClass('active');
            $(this).parent().addClass('current');
            var Name = $(this).attr('data-name');
            var Openpage = $(this).attr('data-open');
            $('.colum-box[id= "' + Openpage + '"]').addClass('active');

            //window.location.hash = Name;

            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            var tmpdataname = $(this).attr('data-name');
            changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);

            if ($(window).width() > 1100) {
                var XCurrent = $('.box-content').offset().left;
                var XItem = $('.box-content .colum-box[id= "' + Openpage + '"]').offset().left;
                $('.box-content').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                    $('.active .align-center').children().removeClass('flipoutx').addClass('fadeinup');
                });

            }

            return false;
        });


        if ($('.sub-nav li.current').length) {
            $('.sub-nav li.current a').trigger('click');
        } else {
            $('.sub-nav li:first-child').find('a').trigger('click');
        }

        /*if(window.location.hash){
			    LocationHash();
		     }else{
			  $('.sub-nav li:first-child').find('a').trigger('click');
		    }   */

    }

    //VILLA PAGE//
    if ($('#villa-page').length) {

        //$('.nav li:nth-child(5)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');


        $('.typical-villa-top a').mouseenter(function() {
            if ($(window).width() > 1100) {
                $('.villa-name').removeClass('show');

                var idx = $(this).attr('data-info');
                var Lx = $(this).offset().left;
                var Tx = $(this).offset().top;
                var Width = $(this).width();
                var W = $(".villa-name[data-villa='" + idx + "']").width();
                $(".villa-name[data-villa='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 70 });
                $(".villa-name[data-villa='" + idx + "']").addClass('show');
            }
            return false;
        });

        $('.typical-villa-top a').mouseleave(function() {
            if ($(window).width() > 1100) {
                $('.villa-name').removeClass('show');
            }
            return false;
        });




        $('.sub-nav li a').click(function(e) {
            e.preventDefault();
            if ($(window).width() > 1100) {
                var allItem = $('.colum-box').length;
                var widthItem = $('.colum-box').width();
                $('.box-content').width(allItem * widthItem);

                if ($('div').hasClass('fadeinup')) {
                    $('.align-center').children().removeClass('fadeinup').addClass('flipoutx');
                }
            }


            $('.sub-nav li').removeClass('current');

            $('.colum-box').removeClass('active');
            $(this).parent().addClass('current');
            var Name = $(this).attr('data-name');
            var Openpage = $(this).attr('data-open');
            $('.colum-box[id= "' + Openpage + '"]').addClass('active');
            console.log(Name)
            //window.location.hash = Name;

            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            var tmpdataname = $(this).attr('data-name');
            if (isFirefox) {
                changeUrl('', tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
            } else {
                changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
            }


            if ($(window).width() > 1100) {
                var XCurrent = $('.box-content').offset().left;
                var XItem = $('.box-content .colum-box[id= "' + Openpage + '"]').offset().left;
                $('.box-content').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                    $('.active .align-center').children().removeClass('flipoutx').addClass('fadeinup');
                });

            }

            return false;
        });


        if ($('.sub-nav li.current').length) {
            $('.sub-nav li.current a').trigger('click');
        } else {
            $('.sub-nav li:first-child').find('a').trigger('click');
        }

        /*if(window.location.hash){
			    LocationHash();
		     }else{
			  $('.sub-nav li:first-child').find('a').trigger('click');
		    }    */

    }

    //VILLA DETAILS PAGE//
    if ($('#villa-details-page').length) {

        //$('.nav li:nth-child(5)').addClass('current');
        $('.nav li.current, .nav li.current a').css({ 'pointer-events': 'auto' });
        $('html, body, .container').removeClass('no-scroll-nav');

        $('.sub-nav-villa li a').click(function(e) {
            e.preventDefault();

            var allItem4 = $('.villa-details').length;
            var widthItem4 = $('.villa-details').width();
            $('.box-content-villa').width(allItem4 * widthItem4);

            $('.sub-nav-villa li').removeClass('current');
            $('.villa-details').removeClass('active');


            $(this).parent().addClass('current');
            var Openpage = $(this).attr('data-open');

            var Name = $(this).attr('data-name');
            detectBut();

            //window.location.hash = Name;

            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            var tmpdataname = $(this).attr('data-name');
            changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);

            $('.google2').attr('href', "https://plus.google.com/share?url=" + tmpurl);
            $('.facebook2').attr('href', "http://www.facebook.com/sharer.php?u=" + tmpurl);


            var XCurrent = $('.box-content-villa').offset().left;
            var XItem = $('.box-content-villa .villa-details[id= "' + Openpage + '"]').offset().left;
            $('.villa-details[id= "' + Openpage + '"]').addClass('active');

            $('.box-content-villa').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                if ($(window).width() > 1100) {
                    $('.content-villa, .box-content-villa, .villa-details.active').css({ 'height': $(window).height() });
                    $('.villa-details.active .villa-details-pic img').addClass('show');
                    $('.villa-details.active .villa-details-model').addClass('fadein');
                } else {
                    var Height = $('.box-content-villa .villa-details[id= "' + Openpage + '"]').innerHeight();
                    $('.content-villa, .box-content-villa').css({ 'height': Height });
                    $('.villa-details-pic img').load(function() {
                        $('.content-villa, .box-content-villa').css({ 'height': Height });
                    });

                }


            });

            return false;
        });

        $('.prev').click(function() {
            if ($('.sub-nav-villa li:first-child').hasClass('current')) {
                $('.sub-nav-villa li:last-child').find('a').trigger('click');
            } else {
                $('.sub-nav-villa li.current').prev().find('a').trigger('click');
            }
            return false;
        });

        $('.next').click(function() {
            if ($('.sub-nav-villa li:last-child').hasClass('current')) {
                $('.sub-nav-villa li:first-child').find('a').trigger('click');
            } else {
                $('.sub-nav-villa li.current').next().find('a').trigger('click');
            }
            return false;
        });



        $('.container').bind("mousewheel", function(event, delta) {
            if (!doWheel) {
                return;
            }
            doWheel = false;
            if ($(window).width() > 1100) {
                if (delta > 0) {
                    if ($('.sub-nav-villa li:first-child').hasClass('current')) {
                        $('.sub-nav-villa li:last-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav-villa li.current').prev().find('a').trigger('click');
                    }

                    setTimeout(turnWheelTouch, 1200);
                    return false;
                } else {
                    if ($('.sub-nav-villa li:last-child').hasClass('current')) {
                        $('.sub-nav-villa li:first-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav-villa li.current').next().find('a').trigger('click');
                    }

                    setTimeout(turnWheelTouch, 1200);
                    return false;
                }
            }
        });




        $('.hover-model a').click(function() {
            var Open = $(this).attr('data-open');
            $(".sub-nav-villa li a[data-open='" + Open + "']").trigger('click');
        });

        $('.hover-model area').mouseenter(function() {
            var Open = $(this).attr('data-show');
            $(".hover-model img[data-image='" + Open + "']").addClass('show');
        });

        $('.hover-model area').mouseleave(function() {
            $(".hover-model img").removeClass('show');
        });


        if ($('.sub-nav-villa li.current').length) {
            setTimeout(function() { $('.sub-nav-villa li.current a').trigger('click'); }, 1000);
        } else {
            $('.sub-nav-villa li:first-child a').trigger('click');
        }


        /*if(window.location.hash){

				  LocationHash();
				}else{
				  $('.sub-nav-villa li:first-child a').trigger('click');
			 }*/

    }

    //APARTMENT PAGE//
    if ($('#apartment-page').length) {

        //$('.nav li:nth-child(6)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');

        $('.typical-top a').mouseenter(function() {
            if ($(window).width() > 1100) {
                $('.typical-name').removeClass('show');

                var idx = $(this).attr('data-info');
                var Lx = $(this).offset().left;
                var Tx = $(this).offset().top;
                var Width = $(this).width();
                var W = $(".typical-name[data-block='" + idx + "']").width();
                $(".typical-name[data-block='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2 - 100, 'top': Tx - 30 });
                $(".typical-name[data-block='" + idx + "']").addClass('show');
            }
            return false;
        });

        $('.typical-top a').mouseleave(function() {
            if ($(window).width() > 1100) {
                $('.typical-name').removeClass('show');
            }
            return false;
        });

    }

    //BLOCK PAGE//

    if ($('#block-page').length) {
    //     //$('.nav li:nth-child(6)').addClass('current');
    //     //$('.nav li:nth-child(6), .nav li:nth-child(5) a').css({'pointer-events':'auto'});
    //     $('.nav li.current, .nav li.current a').css({ 'pointer-events': 'auto' });
    //     $('html, body, .container').removeClass('no-scroll-nav');

        $('.block-typical-top a').mouseenter(function() {
            if ($(window).width() > 1100) {
                $('.block-name').removeClass('show');
                var idx = $(this).attr('data-info');
                var Lx = $(this).offset().left;
                var Tx = $(this).offset().top;
                var Width = $(this).width();
                var W = $(".block-name[data-block='" + idx + "']").width();
                $(".block-name[data-block='" + idx + "']").css({ 'left': Lx - (W / 2) + Width / 2, 'top': Tx - 50 });
                $(".block-name[data-block='" + idx + "']").addClass('show');
            }
            return false;
        });

        $('.block-typical-top a').mouseleave(function() {
            if ($(window).width() > 1100) {
                $('.block-name').removeClass('show');
            }
            return false;
        });


        $('.sub-nav-block li a').click(function(e) {
            e.preventDefault();
            var allItem = $('.colum-box').length;
            var widthItem = $('.colum-box').width();
            $('.box-content').width(allItem * widthItem);
            $('.sub-nav-block li').removeClass('current');

            $('.colum-box').removeClass('active');
            $(this).parent().addClass('current');
            var Name = $(this).attr('data-name');
            var Openpage = $(this).attr('data-open');
            $('.colum-box[id= "' + Openpage + '"]').addClass('active');
            detectBut();

            //window.location.hash = Name;

            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            var tmpdataname = $(this).attr('data-name');
            changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);

            var XCurrent = $('.box-content').offset().left;
            var XItem = $('.box-content .colum-box[id= "' + Openpage + '"]').offset().left;
            $('.box-content').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                if ($(window).width() > 1100) {
                    $('.content-page, .box-content, .colum-box.active').css({ 'height': $(window).height() });
                } else {
                    var Tilte = $('.title-block').innerHeight();
                    var Sub = $('.sub-nav-block').innerHeight();
                    var Height = $('.box-content .colum-box[id= "' + Openpage + '"]').innerHeight();
                    $('.box-content').css({ 'height': Height });
                    $('.colum-box.active').css({ 'height': Height });
                    $('.content-page').css({ 'height': Height + Tilte + Sub + 100 });
                }
            });
            return false;
        });
        $(".sub-nav-block li").click(function (e) {
            e.preventDefault(),
            $(".sub-nav-block li").removeClass("current"), $(".title-block h2, .title-block h3").removeClass("show"),
            $(this).addClass("current");
            var t = ($(this).find("a").attr("data-name"), $(this).find("a").attr("data-open")),
                i = $(this).find("h3").text();
            $(".box-content").trigger("BTQ.goTo", t), $(".title-block h3").text(i), $(".title-block h2").addClass("show"), $(".title-block h3").text(i).addClass("show");
            var a = $(this).find("a").attr("href"),
                o = $(this).find("a").attr("data-title"),
                l = $(this).find("a").attr("data-keyword"),
                n = $(this).find("a").attr("data-description"),
                s = $(this).find("a").attr("data-name");
            return changeUrl(a, o, n, l, s, o, n), detectBut(), !1
        })


        if ($('.sub-nav-block li.current').length) {
            setTimeout(function() { $('.sub-nav-block li.current a').trigger('click'); }, 1000);
        } else {
            $('.sub-nav-block li:first-child').find('a').trigger('click');
        }

        /*if(window.location.hash){
			  LocationHash();
		   }else{
			 $('.sub-nav-block li:first-child').find('a').trigger('click');
		  }*/

    }
    $("#block-page").length && $(".box-content").BTQSlider({
        singleItem: !0,
        autoHeight: !0,
        slideSpeed: 1e3,
        paginationSpeed: 1e3,
        navigation: !1,
        pagination: !1,
        mouseDrag: !1,
        touchDrag: !1,
        rewindNav: !1,
        beforeMove: function () { },
        afterAction: function () {
            $(".title-block h2, .title-block h3").removeClass("show"), $(".left-plan, .compass").removeClass("show");
            var e = this.$BTQItems.parent().parent().parent().parent().find(".title-block");
            this.$BTQItems.removeClass("select"), this.$BTQItems.eq(this.currentItem).addClass("select");
            var t = this.$BTQItems.eq(this.currentItem).addClass("select").parent().parent().parent().parent().find(".sub-nav-block"),
                i = $(".slide-item.select").index(),
                a = $(t).find("li");
            $(a).removeClass("current"), $(a).find('a[data-open = "' + i + '"]').parent().addClass("current");
            var o = $(".sub-nav-block li.current h3").text();
            $(e).find("h3").text(o);
            var l = $(a).find('a[data-open = "' + i + '"]').attr("href"),
                n = $(a).find('a[data-open = "' + i + '"]').attr("data-title"),
                s = $(a).find('a[data-open = "' + i + '"]').attr("data-keyword"),
                r = $(a).find('a[data-open = "' + i + '"]').attr("data-description"),
                c = $(a).find('a[data-open = "' + i + '"]').attr("data-name");
            changeUrl(l, n, r, s, c, n, r), setTimeout(function () {
                $(".slide-item.select").find(".left-plan").addClass("show"), $(".slide-item.select").find(".compass").addClass("show"), $(e).find("h2").addClass("show"), $(e).find("h3").addClass("show")
            }, 1e3)
        }
    })


    //APARTMENT DETAILS PAGE//
    if ($('#apartment-details-page').length) {

        //$('.nav li:nth-child(6)').addClass('current');
        $('.nav li.current, .nav li.current a').css({ 'pointer-events': 'auto' });
        $('html, body, .container').removeClass('no-scroll-nav');

        $('.box').stop().animate({ 'right': 0 }, 500, 'linear', function() {
            ScrollNiceA();
        });

        var idCFloor = $(".sub-nav-typical li.current a").attr('data-open');
        
        $('.box-content-house .house-details').removeClass('active');
        
        
        $('.box-content-house .house-details[id="' + idCFloor + '"]').addClass('active');
        $('.box-content-house .house-details.active .house-pic').addClass('show');
        $('.box-content-house .house-details.active .description').addClass('show');
        
        $(".loadicon").fadeOut(500, function() {
            $(".loadicon").remove()
        });
        
        //Select next room Slide_content-house
        $(".content-house .thumbs-slide").each(function (e, t) {
            var i = $(t).find("a");
            $(i).click(function (e) {
                e.preventDefault(), $(i).removeClass("active"), $(this).addClass("active");
                var t = $(this).attr("data-click");
                $(".thumbs-slide").stop().animate({
                    opacity: 1
                }, 200, function () {
                    $(".active .slide-pic").trigger("BTQ.goTo", t)
                })
            })
        });

        //END:Select next room Slide_content-house

        $('.sub-nav-typical li a').click(function(e) {
            e.preventDefault();

            var allItem3 = $('.house-details').length;
            var widthItem3 = $('.house-details').width();
            $('.box-content-house').width(allItem3 * widthItem3);

            $('.sub-nav-typical li').removeClass('current');
            $('.house-details').removeClass('active');
            $('.house-pic .zoom').removeClass('show');

            $(this).parent().addClass('current');
            var Openpage = $(this).attr('data-open');

            var Name = $(this).attr('data-name');
            detectBut();

            $(this).closest('.current').addClass('current');
            var idCFloor = $(this).attr('data-open');

            $('.box-content-house .house-details').removeClass('active');

            $('.box-content-house .house-details[id="' + idCFloor + '"]').addClass('active');
            $('.box-content-house .house-details.active .house-pic').addClass('show');
            $('.box-content-house .house-details.active .description').addClass('show');
            //window.location.hash = Name;

            var tmpurl = $(this).attr('href');
            var tmptitle = $(this).attr('data-title');
            var tmpkeyword = $(this).attr('data-keyword');
            var tmpdescription = $(this).attr('data-description');
            var tmpdataname = $(this).attr('data-name');
            changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);


            var XCurrent = $('.box-content-house').offset().left;
            var XItem = $('.box-content-house .house-details[id= "' + Openpage + '"]').offset().left;
            $('.house-details[id= "' + Openpage + '"]').addClass('active');

            $('.box-content-house').stop().animate({ 'left': XCurrent - XItem }, 800, 'easeInOutExpo', function() {
                if ($(window).width() > 1100) {
                    $('.content-house, .box-content-house, .house-details.active').css({ 'height': $(window).height() });
                    $('.house-details.active .house-pic img').addClass('show');
                } else {
                    var Height = $('.box-content-house .house-details[id= "' + Openpage + '"]').innerHeight();
                    $('.content-house').css({ 'height': Height });
                    $('.house-pic img').load(function() {
                        $('.content-house').css({ 'height': Height });
                    });

                }
                $('.house-details.active .house-pic .zoom').addClass('show');

            });

            return false;
        });

		//add from My dinh pearl 14-11

		$("#apartment-details-page").length && (ScrollMenu(), ZoomPic(), $(".sub-nav-typical li").click(function(e) {
            if (e.preventDefault(), $(window).width() > 1100) {
                var t = $(".house-details").length,
                    i = $(".house-details").width();
                $(".box-content-house").width(t * i)
            } else $(".box-content-house").css({
                width: "100%"
            });

            $(".sub-nav-typical li").removeClass("current"), $(".house-details").removeClass("active"), $(".house-pic, .description").removeClass("show"), $(this).addClass("current");
            var a = $(this).find("a").attr("data-open"),
                o = ($(this).find("a").attr("data-name"), $(this).find("a").attr("href")),
                l = $(this).find("a").attr("data-title"),
                n = $(this).find("a").attr("data-keyword"),
                s = $(this).find("a").attr("data-description"),
                r = $(this).find("a").attr("data-name");
            if (changeUrl(o, l, s, n, r, l, s), $(window).width() > 1100) {
                var c = $(".box-content-house").offset().left,
                    d = $('.box-content-house .house-details[id= "' + a + '"]').offset().left;
                $('.house-details[id= "' + a + '"]').addClass("active"), $(".box-content-house").stop().animate({
                    left: c - d
                }, 800, "easeInOutExpo", function() {
                    ScrollDes(), $(".content-house, .box-content-house").css({
                        height: $(window).height()
                    }), $(".house-details.active .house-pic").addClass("show"), $(".house-details.active .description").addClass("show"), $(".sub-nav-typical li:nth-child(7), .sub-nav-typical li:nth-child(8), .sub-nav-typical li:nth-child(9)").hasClass("current") ? $(".scroll-menu").animate({
                        scrollTop: "150px"
                    }) : $(".sub-nav-typical li:nth-child(10),.sub-nav-typical li:nth-child(11), .sub-nav-typical li:nth-child(12)").hasClass("current") ? $(".scroll-menu").animate({
                        scrollTop: "300px"
                    }) : $(".sub-nav-typical li:nth-child(13),  .sub-nav-typical li:nth-child(14)").hasClass("current") ? $(".scroll-menu").animate({
                        scrollTop: "400px"
                    }) : $(".sub-nav-typical li:nth-child(1),.sub-nav-typical li:nth-child(2),.sub-nav-typical li:nth-child(5), .sub-nav-typical li:nth-child(6)").hasClass("current") && $(".scroll-menu").animate({
                        scrollTop: "0px"
                    })
                })
            } else {
                $('.house-details[id= "' + a + '"]').addClass("active");
                var h = $('.box-content-house .house-details[id= "' + a + '"]').innerHeight();
                $(".content-house").css({
                    height: h + 70
                }), setTimeout(function() {
                    $(".content-house").css({
                        height: h + 70
                    })
                }, 300), detectBut()
            }
            return !1
        }));
		//My dinh pearl 14-11
        $('.prev').click(function() {
            if ($('.sub-nav-typical li:first-child').hasClass('current')) {
                $('.sub-nav-typical li:last-child').find('a').trigger('click');
            } else {
                $('.sub-nav-typical li.current').prev().find('a').trigger('click');
            }
            return false;
        });

        $('.next').click(function() {
            if ($('.sub-nav-typical li:last-child').hasClass('current')) {
                $('.sub-nav-typical li:first-child').find('a').trigger('click');
            } else {
                $('.sub-nav-typical li.current').next().find('a').trigger('click');
            }
            return false;
        });



        $('.container').bind("mousewheel", function(event, delta) {
            if (!doWheel) {
                return;
            }
            doWheel = false;
            if ($(window).width() > 1100) {
                if (delta > 0) {
                    if ($('.sub-nav-typical li:first-child').hasClass('current')) {
                        $('.sub-nav-typical li:last-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav-typical li.current').prev().find('a').trigger('click');
                    }

                    setTimeout(turnWheelTouch, 1200);
                    return false;
                } else {
                    if ($('.sub-nav-typical li:last-child').hasClass('current')) {
                        $('.sub-nav-typical li:first-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav-typical li.current').next().find('a').trigger('click');
                    }

                    setTimeout(turnWheelTouch, 1200);
                    return false;
                }
            }
        });

        if ($('.sub-nav-typical li.current').length) {
            setTimeout(function() { $('.sub-nav-typical li.current a').trigger('click'); }, 1000);
        } else {
            $('.sub-nav-typical li:first-child a').trigger('click');
        }


        /*
        if(window.location.hash){
		    LocationHash();
		} else {
			$('.sub-nav-typical li:first-child a').trigger('click');
		}
		 */

    }

    //LIBRARY PAGE//
    if ($('#library-page').length) {
        //$('.nav li:nth-child(7)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');
        if ($(window).width() > 1100) {
            $('.column').children().each(function(i) {
                var box = $(this);
                setTimeout(function() { $(box).addClass('fadeinup') }, (i + 1) * 500);
            });
        }
    }

    //NEWS PAGE//
    if ($('#news-page').length) {
        //$('.nav li:nth-child(8)').addClass('current');

        $('.news-icon').addClass('current');
        $('html, body, .container').removeClass('no-scroll-nav');
        if ($(window).width() > 1100) {
            setTimeout(function() { $('.news-right, .colum-details').addClass('fadeinup') }, 1000);
            ScrollNiceB();
        }

        $('.news-list li .link-page a').click(function(e) {
            //e.preventDefault();

            $('.news-list li .link-page').removeClass('current');
            $(this).parent().addClass('current');
            //var Detail = $(this).attr("data-details");
            //var url = $(this).attr('href')

            //window.location.hash = Detail;
            // -------- Load page trang tin tức
            // var tmpurl = $(this).attr('href');
            // var tmptitle = $(this).attr('data-title');
            // var tmpkeyword = $(this).attr('data-keyword');
            // var tmpdescription = $(this).attr('data-description');
            // var tmpdataname = $(this).attr('data-name');
            // changeUrl(tmpurl, tmptitle, tmpdescription, tmpkeyword, tmpdataname, tmptitle, tmpdescription);
            // ----------

            // $(".news-tab").stop().animate({ 'opacity': 0 }, 600, 'linear', function() {
                // ScrollNiceHide();
                // $('.news-tab  .detail-news').remove();
                // $('body').append('<div class="loadicon" style="display:block"></div>');
                // NewsLoad(url);
            // });

            //return false;
        });

        if ($('.news-list li .link-page.current').length) {
            $('.news-list li .link-page.current a').trigger('click');
        } else {
            $('.news-list li:first-child').find('.link-page:first a').trigger('click');
        }

        /*if(window.location.hash){
        	LocationHash();
         }else{
        	$('.news-list li:first-child').find('.link-page:first a').trigger('click');
        }*/


    }

    //CONTACT PAGE//
    if ($('#contact-page').length) {
        //$('.nav li:nth-child(9)').addClass('current');

        $('html, body, .container').removeClass('no-scroll-nav');

        if ($(window).width() > 1100) {
            $('.contact-box').children().each(function(i) {
                var box = $(this);
                setTimeout(function() { $(box).addClass('fadeinup') }, (i + 1) * 500);
            });
        }

    }


}


function RenderImage() {
    var image = $('.popup-pics-mobile img');
    $(image).on('load', function() {
        $(image).parent().css({ 'height': 150 });
        $(image).parent().addClass('loading');

    });

    if (image[0].complete) {
        $(image).load();
        var Height = $(image).height();
        $(image).parent().removeClass('loading');
        $('.popup-pics-mobile').css({ 'height': Height + 20, 'padding': 10 });
        $(image).addClass('fadein');
    }

}

function ZoomPic() {
    $("img").click(function() {
        if ($(window).width() <= 740 && $(this).hasClass("zoom-pic")) {
            $("html, body").addClass("no-scroll"), $(this).parent().addClass("to-scrollZ"), $("body").append('<div class="loadicon" style="display:block"></div>'), $(".all-pics").css({
                display: "block"
            }), $(".all-pics").append('<div class="full"  style="display:block"></div>'), $(".overlay-dark").fadeIn(300, "linear");
            var e = $(this).attr("src");
            $(".all-pics").find(".full").append('<img src ="' + e + '" alt="pic" />'), $(".all-pics").append('<div class="close-pics-small"></div>'), $(".all-pics img").load(function() {
                $(".all-pics").addClass("show"), 0 != TouchLenght && isTouchDevice ? ($(".full").addClass("pinch-zoom"), $(".pinch-zoom").each(function() {
                    new Pic.PinchZoom($(this), {})
                })) : ($(".full").addClass("dragscroll"), $(".dragscroll").draptouch()), $(".full img").length > 1 && $(".full img").last().remove(), $(".loadicon").fadeOut(400, "linear", function() {
                    0 != TouchLenght && isTouchDevice || detectMargin(), $(".full img").addClass("fadein"), $(".loadicon").remove()
                })
            }), $(".close-pics-small, .overlay-dark").click(function() {
                $(".loadicon").remove(), $(".full, .close-pics-small, .overlay-dark").fadeOut(300, "linear", function() {
                    if ($(".all-pics .full,  .all-pics .pinch-zoom-container").remove(), $(".close-pics-small").remove(), $(".all-pics").css({
                            display: "none"
                        }).removeClass("show"), $(".album-pic-center").length || $("html, body").removeClass("no-scroll"), $(".to-scrollZ").length) {
                        var e = $(".to-scrollZ").offset().top;
                        $(".to-scrollZ").removeClass("to-scrollZ"), $(window).width() < 1100 && $("html, body").scrollTop(e - 60)
                    }
                })
            })
        }
        return !1
    })
}

function Option(checkNews) {

    $('a.html').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        window.open(url, '_blank');
        return false;
    });

    $('.library-download').click(function(e) {
        e.preventDefault();
        var url = $(this).find('a').attr('href');
        window.open(url, '_blank');
        return false;
    });


    $('.subscribe-icon').click(function() {
        $('.overlay-dark').fadeIn(500, 'linear', function() {
            document.getElementById("frm_register").reset();
            $('.register-form').fadeIn(500, 'linear');

            ScrollForm();
        });

        $('.close-form, .overlay-dark').click(function() {
            $('.overlay-dark').fadeOut(500, 'linear');
            $('.register-form').fadeOut(300, 'linear');
            $('.register-form .require-col').getNiceScroll().remove();
        });

    });



    $('a.view-album,  .library-pic a').click(function(e) {
        e.preventDefault();
        //var url = $(this).attr('href');
        var url = $(this).attr('data-href');
        $('body').append('<div class="loadicon" style="display:block"></div>');
        $('html, body, .container').addClass('no-scroll');
        $('.all-album').fadeIn(100, 'linear');
        $('.overlay-album').css({ 'display': 'block' });
        $('.overlay-album').animate({ 'height': '100%' }, 800, 'easeOutExpo', function() {
            AlbumLoad(url);
        });
        return false;
    });


    $('a.player, a.play-video, .home-video').click(function(e) {
        e.preventDefault();
        //var idx = $(this).attr('href');
        var idx = $(this).attr('data-href');
        $('body').append('<div class="loadicon" style="display:block"></div>');
        $('html, body, .container').addClass('no-scroll');
        $('.overlay-video').fadeIn(500, 'linear', function() {
            VideoLoad(idx);
        });
        return false;
    });


    $('.zoom, .zoom-pic, .zoom-mobile, .location-mobile img, .item-box .show-large').click(function() {
        $('html, body, .container').addClass('no-scroll');
        $('.all-pics').css({ 'display': 'block' });
        if ($('.pic-name h3, .text-name h3').length) {
            var H = $(this).parent().find('.pic-name h3, .text-name h3').text();
            $('.all-pics').append('<div class="text-length"><h3>' + H + '</h3></div>');
        }

        $('.all-pics').append('<div class="full"  style="display:block"></div>');
        $('.overlay-dark').fadeIn(300, 'linear');


        if ($('#news-page').length) {
            var newActive = $(this).attr("src");
        } else {
            var newActive = $(this).attr("data-src");
        }


        if ($('#facilities-page').length) {
            var activePicLarge = $(this).parent().find('img').attr("src");
            var newActive = activePicLarge;
        }

        if ($('#apartment-details-page').length) {
            var activePicLarge = $(this).parent().find('img').attr("src") || $(this).attr("data-src");
            //var newActive = activePicLarge.replace("_s", "_l");
            if ($(this).attr("data-src")) {
                var newActive = $(this).attr("data-src");
            } else {
                var newActive = activePicLarge;
            }
        }


        $('body').append('<div class="loadicon" style="display:block"></div>');
        $('.all-pics').find('.full').append('<img src ="' + (newActive) + '" alt="pic" />');


        $('body').append('<div class="close-pics"></div>');
        $('.all-pics').append('<div class="close-pics-small"></div>');

        $('.all-pics img').load(function() {

            if ($(window).width() > 1100) {
                if (isTouchDevice && isChrome) {
                    $('.all-pics').getNiceScroll().show();
                    $('.all-pics').niceScroll({ touchbehavior: false, grabcursorenabled: true, horizrailenabled: false, cursordragontouch: true });
                    $('.all-pics').animate({ scrollTop: "0px" });
                } else {
                    $('.all-pics').getNiceScroll().show();
                    $('.all-pics').niceScroll({ touchbehavior: true, grabcursorenabled: true, horizrailenabled: false, cursordragontouch: true });
                    $('.all-pics').animate({ scrollTop: "0px" });
                }

            } else {

                if (isDesktop) {
                    $('.full').css({ 'overflow': 'hidden' });
                    $('.full').addClass('dragscroll');
                    dragscroll.reset();
                } else if (version > 7500 && version < 8500) {
                    detectZoom();
                    $('.full').css({ 'overflow-x': 'auto', 'overflow-y': 'auto', '-webkit-overflow-scrolling': 'touch' });
                } else {
                    $('.full').css({ 'overflow': 'hidden' });
                    $('.full img').addClass('pinch-zoom');
                    $('.pinch-zoom').each(function() {
                        new Pic.PinchZoom($(this), {});
                    });
                }



            }


            if ($('.full img').length > 1) {
                $('.full img').last().remove()
            }

            $('.loadicon').fadeOut(400, 'linear', function() {
                detectMargin();
                // detectZoom();
                $('.loadicon').remove();
                $('.full img, .text-length').addClass('fade-in');
                $('.all-pics').addClass('show');
            });



        });


        $('.show-zoom').bind('click', function() {
            if (!$('.full img').hasClass('fullsize')) {
                $('.all-pics .text-length').css({ 'z-index': 'auto' });

                if ($(window).width() <= 420) {
                    $('.full img').css({ 'max-width': '400%' }).addClass('fullsize');
                } else if ($(window).width() > 420 && $(window).width() <= 620) {
                    $('.full img').css({ 'max-width': '300%' }).addClass('fullsize');
                } else {
                    $('.full img').css({ 'max-width': 'inherit' }).addClass('fullsize');
                }
                $('.full').scrollLeft(0);
                $('.full').scrollTop(0);
                $('.full').removeClass('lock');
                detectMargin();
            } else {
                $('.all-pics .text-length').css({ 'z-index': 9998 });
                $('.full img').css({ 'max-width': '100%' }).removeClass('fullsize');
                $('.full').scrollLeft(0);
                $('.full').scrollTop(0);
                $('.full').addClass('lock');
                detectMargin();
            }
            $('.loadicon').remove();
            return false;
        });

        $('.close-pics, .close-pics-small').click(function() {
            $('.all-pics').scrollTop(0);
            $('.loadicon').remove();
            $('.all-pics').getNiceScroll().remove();
            $('.full, .close-pics, .close-pics-small').fadeOut(300, 'linear');
            $('.overlay-dark').fadeOut(300, 'linear', function() {
                $('.all-pics .full, .all-pics .show-zoom, .all-pics .text-length').remove();
                $('.close-pics, .close-pics-small').remove();
                $('.all-pics').css({ 'display': 'none' }).removeClass('show');
                $('html, body, .container').removeClass('no-scroll');
            });
        });
        return false;
    });


    if (checkNews !== true) {
        $('.news-nav li a').click(function() {
            var allIX = $('.news-list li').length;
            var widthItemX = $('.news-list li').width() + 5;
            $('.news-list ul').width(allIX * widthItemX);
            $('span.start').css({ 'opacity': 0 });
            $('.news-nav li').removeClass('current');
            $('.news-list li').removeClass('active');
            $(this).parent().addClass('current');
            var Num = $(this).attr('data-list');
            $('.news-list li[data-number= "' + Num + '"]').addClass('active');
            var Current = Num;
            var XCurrent = $('.news-list ul').offset().left;
            var XItem = $('.news-list li[data-number= "' + Num + '"]').offset().left;
            $('.news-nav').css({ 'top': $('.news-list li.active').height() + 5, 'opacity': 1 });
            detectBut();

            $('span.start').text(Current);
            if (allIX < 10) {
                $('span.end').text("0" + allIX);
            } else {
                $('span.end').text(allIX);
            }

            $('.news-list ul').stop().animate({ 'left': XCurrent - XItem }, 300, 'linear');
            //return false;
        });

        $('.prev-slide').click(function() {
            $('.news-nav li.current').prev().find('a').trigger('click');
        });

        $('.next-slide').click(function() {
            $('.news-nav li.current').next().find('a').trigger('click');
        });

    }




    $(document).bind('scroll', function() {
        var windscroll = $(document).scrollTop();
        var Banner = $('.mobile-bg img').height();

        if ($(window).width() <= 1100) {
            if (windscroll > 50) {
                $('.scroll-down').fadeOut(500, 'linear');
            } else {
                $('.scroll-down').fadeIn(500, 'linear');
            }

            if (windscroll > $(window).height() / 2) {
                $('.go-top').css({ 'display': 'block', 'opacity': 1 });
            } else {
                $('.go-top').css({ 'display': 'none', 'opacity': 0 });
            }

            if ($('.popup-pics-mobile img').length > 0) {
                var Top = $('.popup-pics-mobile').offset().top;

                if (windscroll > Banner / 2) {
                    RenderImage();
                } else {
                    $('.popup-pics-mobile img').removeClass('fadein');
                    $('.popup-pics-mobile').css({ 'height': 0, 'padding': 0 });
                }


            }

        }
    });


}

function Touch() {

    if ($(window).width() > 1100) {

        var touch = $('.align-center');
        $(touch).on('click', function() {
            if (!$('.align-center').hasClass("grabbing")) {
                $('.align-center').addClass("grabbing");
            } else {
                $('.align-center').removeClass("grabbing");
            }
        });


        $(touch).swipe({
            swipeLeft: function(event, direction, distance, duration, fingerCount) {
                if (!doTouch) {
                    return;
                }

                doTouch = false;
                if ($(window).width() > 1100) {
                    if ($('.sub-nav li:last-child').hasClass('current')) {
                        $('.sub-nav li:first-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav li.current').next().find('a').trigger('click');
                    }
                    setTimeout(turnWheelTouch, 800);
                }
            },
            swipeRight: function(event, direction, distance, duration, fingerCount) {


                if (!doTouch) {
                    return;
                }

                doTouch = false;
                if ($(window).width() > 1100) {
                    if ($('.sub-nav li:first-child').hasClass('current')) {
                        $('.sub-nav li:last-child').find('a').trigger('click');
                    } else {
                        $('.sub-nav li.current').prev().find('a').trigger('click');
                    }
                    setTimeout(turnWheelTouch, 800);
                }

            },
            threshold: 0,
            fingers: 'all'
        });


        if ($('#about-page').length) {
            $('.container').bind("mousewheel", function(event, delta) {
                if (!doWheel) {
                    return;
                }
                doWheel = false;
                if ($(window).width() > 1100) {
                    if (delta > 0) {
                        $('.sub-nav li.current').prev().find('a').trigger('click');
                        setTimeout(turnWheelTouch, 800);
                        return false;
                    } else {
                        $('.sub-nav li.current').next().find('a').trigger('click');
                        setTimeout(turnWheelTouch, 800);
                        return false;
                    }
                }
            });
        }



    }
}

function turnWheelTouch() {
    doWheel = true;
    doTouch = true;
    $('.align-center').removeClass("grabbing");

}

function detectBut() {
    if ($(window).width() > 1100) {
        $('.sub-nav-block').scrollLeft(0);
        $('.scroll-list').css({ 'overflow-x': 'visible', 'overflow-y': 'visible', 'overflow': 'visible' });
        $('span.start').css({ 'opacity': 1 });
        if ($('.news-nav li:first-child').hasClass('current')) {
            $('.prev-slide').addClass('disable');
        } else {
            $('.prev-slide').removeClass('disable');
        }
        if ($('.news-nav li:last-child').hasClass('current')) {
            $('.next-slide').addClass('disable');
        } else {
            $('.next-slide').removeClass('disable');
        }
    } else {

        var Left = $('.news-list ul, .sub-nav-block ul, .sub-nav-typical ul, .sub-nav-villa ul').offset().left;
        var XLeft = $('.news-list li .link-page.current, .sub-nav-block li.current, .sub-nav-typical li.current, .sub-nav-villa li.current').offset().left;
        var Percent = $(window).width() / 100 * 10;
        var Center = ($(window).width() - Percent) / 2 - $('.news-list li .link-page.current').width() / 2;
        var Middle = $(window).width() / 2 - $('.sub-nav-block li.current, .sub-nav-typical li.current, .sub-nav-villa li.current').width() / 2;
        $('.scroll-list').stop().animate({ scrollLeft: (XLeft - Center) - Left }, 'slow');
        $('.sub-nav-block').stop().animate({ scrollLeft: (XLeft - Middle) - Left }, 'slow');
        $('.sub-nav-typical').stop().animate({ scrollLeft: (XLeft - Middle) - Left }, 'slow');
        $('.sub-nav-villa').stop().animate({ scrollLeft: (XLeft - Middle) - Left }, 'slow');


    }


}

function detectHeight() {
    if ($(window).width() <= 1100) {
        var DH = $(document).innerHeight();
        if (DH > $(window).height() + 100) {
            $('.scroll-down').css({ 'display': 'block', 'opacity': 1 });
        } else {
            $('.scroll-down').css({ 'display': 'none', 'opacity': 0 });
        }
    }
}

function detectZoom() {
    var ImgW = $('.full img').width();
    var ImgH = $('.full img').height();
    var Yheight = $(window).height();
    var Xwidth = $(window).width();
    if (ImgW > Xwidth) {
        $('.show-zoom').addClass('show');
        $('.full img').addClass('fullsize');
    } else {
        $('.full img').removeClass('fullsize');
    }
}

function detectMargin() {
    var ImgW = $('.full').children().width();
    var ImgH = $('.full').children().height();
    var Yheight = $(window).height();
    var Xwidth = $(window).width();

    if (Xwidth > ImgW) {
        $('.full').children().css({ 'margin-left': Xwidth / 2 - ImgW / 2 });
    } else {
        $('.full').children().css({ 'margin-left': 0 });
    }
    if (Yheight > ImgH) {
        $('.full').children().css({ 'margin-top': Yheight / 2 - ImgH / 2 });
    } else {
        $('.full').children().css({ 'margin-top': 0 });
    }
}

$(document).ready(function() {

    $('.go-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('.container').click(function() {
        $('.top, .overlay-menu').removeClass('show');
        $('.nav-click').removeClass('active');
    });

    $('.overlay-menu').click(function() {
        if ($(window).width() <= 1100) {
            $('.top, .overlay-menu').removeClass('show');
            $('.nav-click').removeClass('active');
        }

    });

    var index = $('.news-list ul li').index($('.news-list ul li div.current').parent());
    $('.news-nav li:nth-child(' + 0 + [index + 1] + ') a').trigger('click');
});

window.onorientationchange = ResizeWindows;
$(window).resize(function() {
    ScrollNiceHide();
    ResizeWindows();

});

$(window).on('resize', function() {
    ResizeWindows();
    //-----------------------------
    //  DESKTOP
    if ($(window).width() > 1100) {


        if ($('.nav-click').hasClass('active')) {
            $('.container').trigger('click');
        }



        if ($('.active .scrollA, .scrollB, .scrollC').length) {
            ScrollNiceA();
            ScrollNiceB();
            ScrollNiceC();
        }



        if ($('.sub-nav:not(.details) li').hasClass('current')) {
            $('.sub-nav:not(.details) li.current a').trigger('click');
        } else {
            $('.sub-nav:not(.details) li:first-child a').trigger('click');
        }



        if ($('.full img, .full2 img').length) {
            if (isTouchDevice && isChrome) {
                $('.all-pics').getNiceScroll().show();
                $('.all-pics').niceScroll({ touchbehavior: false, grabcursorenabled: true, horizrailenabled: false, cursordragontouch: true });
                $('.all-pics').animate({ scrollTop: "0px" });
            } else {
                $('.all-pics').getNiceScroll().show();
                $('.all-pics').niceScroll({ touchbehavior: true, grabcursorenabled: true, horizrailenabled: false, cursordragontouch: true });
                $('.all-pics').animate({ scrollTop: "0px" });
            }
            detectMargin();
            // detectZoom();
        }


        if (!$('.viewer').hasClass('desktop')) {
            ZoomMap()
        }

        if (!$('.column').children().hasClass('fadeinup')) {
            $('.column').children().each(function(i) {
                var box = $(this);
                setTimeout(function() { $(box).addClass('fadeinup') }, (i + 1) * 500);
            });
        }

        if (!$('.contact-box .column').hasClass('fadeinup')) {
            $('.contact-box').children().each(function(i) {
                var box = $(this);
                setTimeout(function() { $(box).addClass('fadeinup') }, (i + 1) * 500);
            });
        }

        if (!$('.news-right, .colum-details').hasClass('fadeinup')) {
            setTimeout(function() { $('.news-right, .colum-details').addClass('fadeinup') }, 500);
        }

        if ($('#news-page').length) {
            if ($('.news-list li .link-page.current').length == 0) {
                $('.news-list li .link-page').first().addClass('current');
                $('.news-nav li:first-child a').trigger('click');
            } else {
                var index = $('.news-list ul li').index($('.news-list ul li div.current').parent());
                $('.news-nav li:nth-child(' + 0 + [index + 1] + ') a').trigger('click');
            }

        }

        if ($('#location-page').length) {
            $('.viewer').css({ 'display': 'block' });
            $('.map-mobile').css({ 'display': 'none' });
            $('.content-right').stop().animate({ 'right': 0 }, 500, 'linear', function() {
                ScrollNiceA();
            });
        }




        //  DESKTOP

        //-----------------------------

        //  MOBILE
    } else {

        detectHeight();
        ScrollHoz();

        if ($('.full img, .full2 img').length) {
            $('.all-pics').getNiceScroll().remove();
            detectMargin();
            //detectZoom();
        }

        if ($('#news-page').length) {
            $('.news-list ul').css({ 'left': 0 });
            detectBut();
        }

        if ($('#block-page').length) {
            detectBut();
            AniText();
        }

        if ($('#location-page').length) {
            $('.viewer').css({ 'display': 'none' });
            $('.map-mobile').css({ 'display': 'block' });

        }




    }



    //  MOBILE
    //-----------------------------
    if ($('.sub-nav-block li').hasClass('current')) {
        $('.sub-nav-block li.current a').trigger('click');
    } else {
        $('.sub-nav-block li:first-child a').trigger('click');
    }

    if ($('.sub-nav-typical li').hasClass('current')) {
        $('.sub-nav-typical li.current a').trigger('click');
    } else {
        $('.sub-nav-typical li:first-child a').trigger('click');
    }

    if ($('.sub-nav-villa li').hasClass('current')) {
        $('.sub-nav-villa li.current a').trigger('click');
    } else {
        $('.sub-nav-villa li:first-child a').trigger('click');
    }



}, 250);

function LocationHash() {
    var PageActive = window.location.hash;
    PageActive = PageActive.slice(1);
    Arrhash = PageActive.split('index.html');
    $(".link-page a[data-details='" + PageActive + "']").trigger('click');
    $(".sub-nav li a[data-name='" + PageActive + "']").trigger('click');
    $(".sub-nav-block a[data-name='" + PageActive + "']").trigger('click');
    $(".sub-nav-typical li a[data-name='" + PageActive + "']").trigger('click');
    $(".sub-nav-villa li a[data-name='" + PageActive + "']").trigger('click');
}

function AniText() {
    $(".title-page h1").children().children().each(function (e) {
        var t = $(this);
        setTimeout(function () {
            $(t).addClass("move")
        }, 100 * (e + 1))
    })
}

/*$(window).bind("popstate", function(e) {
	e.preventDefault();
	  LinkPage();
	  LocationHash();
});*/


$(window).bind("popstate", function(e) {
    e.preventDefault();
    LinkPage();
    var httpserver = $('.httpserver').text();

    if ($(window).width() > 1100) {


        if (e.originalEvent.state !== null) {
            var tmp_url = e.originalEvent.state.path;
            var tmp_dataName = e.originalEvent.state.dataName;
            var tmptitle = e.originalEvent.state.title;
            var tmpurl = document.URL;

            changeUrl(tmp_url, tmptitle, '', '', tmp_dataName, '', '');

            var temp_url_1 = tmp_url.replace(httpserver, "");
            var tmp_1 = temp_url_1.split('index.html');

            $(".nav li a").each(function(index, element) {
                if ($(element).attr('href') == tmp_url) {
                    window.history.back();
                }
            });

            if ($('#about-page').length) {
                $(".sub-nav li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#facilities-page').length) {
                $(".sub-nav li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#block-page').length) {
                $(".sub-nav-block li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#apartment-details-page').length) {
                $(".sub-nav-typical li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#villa-page').length) {
                $(".sub-nav li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#villa-details-page').length) {
                $(".sub-nav-villa li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#news-page').length) {
                $(".sub-news li a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        window.history.back();
                    }
                });
                $(".link-page a").each(function(index, element) {
                    if ($(element).attr('href') == tmp_url) {
                        $(element).trigger('click');
                    }
                });
            }

        } else {
            var tmpurl = document.URL;

            var temp_url_1 = tmpurl.replace(httpserver, "");
            var tmp_1 = temp_url_1.split('index.html');

            $(".nav li a").each(function(index, element) {
                if ($(element).attr('href') == tmpurl) {
                    window.history.back();
                }
            });

            if ($('#about-page').length) {
                $(".sub-nav li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#block-page').length) {
                $(".sub-nav-block li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#apartment-details-page').length) {
                $(".sub-nav-typical li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#villa-page').length) {
                $(".sub-nav li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#villa-details-page').length) {
                $(".sub-nav-villa li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }

            if ($('#news-page').length) {
                $(".sub-news li a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        window.history.back();
                    }
                });
                $(".link-page a").each(function(index, element) {
                    if ($(element).attr('href') == tmpurl) {
                        $(element).trigger('click');
                    }
                });
            }



        }
    } else {

        if (e.originalEvent.state !== null) {
            var tmp_url = e.originalEvent.state.path;
        } else {
            var tmp_url = document.URL;
        }

        var temp_url_1 = tmp_url.replace(httpserver, "");
        var tmp_1 = temp_url_1.split('index.html');

        $(".sub-news li a").each(function(index, element) {
            if ($(element).attr('href') == tmp_url) {
                window.history.back();
            }
        });

        $(".nav li a").each(function(index, element) {
            if (tmp_url == $(element).attr('href')) {
                window.history.back();
            }
        });

        if ($('#block-page').length) {
            if (tmp_1.length != 2) {
                location.reload();
            } else {
                window.history.back();
            }
        } else {
            location.reload();
        }
    }

});