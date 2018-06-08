function changeUrl(e, t, i, o, l, c, s) {
    if (void 0 !== window.history.pushState) {
        var a = document.URL;
        a != e && "" != e && window.history.pushState({
            path: e,
            dataName: l,
            title: t,
            keyword: o,
            description: i,
            titleog: c,
            descriptionog: s
        }, "", e)
    }
    "" != t && ($("#hdtitle").html(t), $('meta[property="og:description"]').remove(), $("#hdtitle").after('<meta property="og:description" content="' + s + '">'), $('meta[property="og:title"]').remove(), $("#hdtitle").after('<meta property="og:title" content="' + c + '">'), $('meta[property="og:url"]').remove(), $("#hdtitle").after('<meta property="og:url" content="' + e + '">'), $("meta[name=keywords]").remove(), $("#hdtitle").after('<meta name="keywords" content="' + o + '">'), $("meta[name=description]").remove(), $("#hdtitle").after('<meta name="description" content="' + i + '">')), $("#changlanguage_redirect").val(e)
}

function ResizeWindows() {
    var e = ($(window).height() > $(window).width(), $(window).height() <= $(window).width()),
        t = $(".bg-home img, .mobile-bg img, .bg-picture img"),
        i = ($(".bg-picture img"), $(".bg-picture-short img"), $(window).width()),
        t1 = $(window).width(),
        o = $(window).height(),
        l = o / i,
        c = .5625,
        n1 = 787 / 1440,
        c1 = 700 / 1100,
        s = 900 / 1100,
        a = o / 800,
        n = i / 1100,
        n2 = i / 1300,
        b = o / 1400,
        h = o / 2270,
        h1 = o/1e3,
        g = i / 800,
        r = o / 1300,
        d = i / 950,
        p = o / 950,
        p1 = t1/1200,
        k = o / 1100,
        k1 = o /1200,
        k2 = o /1400,
        u = i / 1e3,
        w = o / 1400,
        f = o / 1600,
        m = o / 1800,
        m1 = t1/1e3,
        v = a;

        420 >= t1 ? $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
            height: t1 * c1
        }) : $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
            height: t1 * n1
        }),

    v = String(parseFloat(v).toFixed(1));
    var x, y, A, C;


    if (i > 1100 ? l > c ? (y = o, x = o / c) : (y = i * c, x = i) : l > s ? (C = o, A = o / s) : (C = i * s, A = i), $(".go-top").css({
            display: "none",
            opacity: 0
        }), $(".album-pic-center").css({
            height: o
        }), $(".content-page").css({
            "min-height": o / 2
        }), $(".block, .info-block, #block-page .info-block").css({
            width: i
        }), 1100 >= i) {
        if ($(".nav-click").css({
                display: "block",
                opacity: 1
            }), $(".scroll-down").css({
                top: o - 70
            }), $(".flipoutx, .flipinx, .fadeinup, .fadeindown, .heightup").length && $("div").removeClass("flipoutx").removeClass("flipinx").removeClass("fadeinup").removeClass("fadeindown").removeClass("heightup"), 420 >= i ? ($(t).css({
                width: i + 100,
                height: (i + 100) * c,
                left: -50,
                top: 0
            }), $(".bg-home").css({
                width: i,
                height: (i + 100) * c
            }), $(".slide-bg, .slider-home").css({
                width: "100%",
                height: (i + 100) * c
            }), $(".bg-page").css({
                width: i,
                height: (i + 200) * c
            })) : i > 420 && 620 >= i ? ($(t).css({
                width: i + 60,
                height: (i + 60) * c,
                left: -30,
                top: 0
            }), $(".bg-home").css({
                width: i,
                height: (i + 60) * c
            }), $(".slide-bg, .slider-home").css({
                width: "100%",
                height: (i + 60) * c
            }), $(".bg-page").css({
                width: i,
                height: (i + 150) * c
            })) : ($(t).css({
                width: i,
                height: i * c,
                left: 0,
                top: 0
            }), $(".bg-home").css({
                width: i,
                height: i * c
            }), $(".slide-bg, .slider-home").css({
                width: "100%",
                height: i * c
            }), $(".bg-page").css({
                width: i,
                height: i * c
            })), "none" == $(".language").css("display") ? $(".nav li a.link-home").css({
                margin: "5px 0 5px 0"
            }) : $(".nav li a.link-home").css({
                margin: "5px 0 5px -50%"
            }), e ? ($(".apartment-bg, .typical, .facilities-bg, .facilities-typical").scale(n), $(".apartment, .facilities-full, .info-facilities").css({
                height: $(".apartment-bg,  .facilities-bg, .facilities-typical").height() * n
            }), $(".apartment-bg, .typical, .facilities-bg, .facilities-typical").css({
                left: i / 2 - 650,
                top: $(".apartment,.facilities-full").height() / 2 - 401
            }), $(".villa-bg, .typical-villa").scale(n), $(".villa").css({
                height: $(".villa-bg").height() * n
            }), $(".villa-bg, .typical-villa").css({
                left: i / 2 - 750,
                top: $(".villa").height() / 2 - 401
            }), $(".colum-box").hasClass("large") ? ($(".block-typical").scale(d), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(d), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(g), $(".two-block-bg-c, .eight-block-bg-c").scale(d), $(".two-block-bg-d, .eight-block-bg-d").scale(d), $(".block").css({
                height: 804 * d
            })) : ($(".block-typical").scale(g), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(g), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(g), $(".two-block-bg-c, .eight-block-bg-c").scale(g), $(".two-block-bg-d, .eight-block-bg-d").scale(g), $(".block").css({
                height: 804 * g
            })), $(".colum-box").hasClass("large-ph") && ($(".colum-box.large-ph .block-typical").scale(u), $(".penhouse-block-bg-c, .penhouse-block-bg-d").scale(u)), $(".block-typical").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            })) : ($(".apartment-bg, .typical, .facilities-bg, .facilities-typical").scale(p1), $(".apartment, .facilities-full, .info-facilities").css({
                height: $(".apartment-bg,  .facilities-bg, .facilities-typical").height() * p1
            }), $(".apartment-bg, .typical, .facilities-bg, .facilities-typical").css({
                left: i / 2 - 630,
                top: $(".apartment, .facilities-full").height() / 2 - 450
            }), $(".apartment-bg, .typical").css({
                left: i / 2 - 630,
                top: $("#apartment-page .apartment, #apartment-page .facilities-full").height() / 2 - 400
            }), $(".villa-bg, .typical-villa").scale(m), $(".villa").css({
                height: $(".villa-bg").height() * m
            }), $(".villa-bg, .typical-villa").css({
                left: i / 2 - 750,
                top: $(".villa").height() / 2 - 401
            }), $(".colum-box").hasClass("large") || $(".colum-box").hasClass("large-ph") ? ($(".colum-box").hasClass("large") || $(".colum-box").hasClass("large-ph")) && (360 > i ? ($(".block-typical").scale(w), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(w), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(w), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").scale(w), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").scale(w), $(".block").css({
                height: 804 * w
            })) : i >= 360 && 460 > i ? ($(".block-typical").scale(f), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(f), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(f), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").scale(f), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").scale(f), $(".block").css({
                height: 804 * f
            })) : ($(".block-typical").scale(r), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(r), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(r), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").scale(r), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").scale(r), $(".block").css({
                height: 804 * r
            }))) : ($(".block-typical").scale(r), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(r), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(r), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").scale(r), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").scale(r), $(".block").css({
                height: 804 * r
            })), $(".block-typical").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            }), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").css({
                left: i / 2 - 500,
                top: $(".block").height() / 2 - 401
            })), $(".apartment-info").css({
                width: "100%",
                height: "auto"
            }), $(".sub-nav-block,  .sub-nav-typical,  .sub-nav-villa, #villa-details-page .description").css({
                top: "auto"
            }), $(".scrollB, .scrollA,.scrollC").getNiceScroll().remove(), $(".scrollB").css({
                height: "auto",
                width: "100%"
            }), $(".colum-details").css({
                width: "100%",
                height: "auto"
            }), $(".facilities-pic, .villa-pic").css({
                width: "100%",
                height: "auto"
            }), $(".text-name").css({
                width: "100%"
            }), $(".content-page").css({
                width: i,
                height: "auto"
            }), $(".content-house, .content-villa").css({
                width: i,
                height: "auto"
            }), $(".box-content-house, .box-content-villa").css({
                height: "auto"
            }), $(".house-details, .house-pic, .villa-details, .villa-details-pic").css({
                height: "auto",
                width: i
            }), $(".colum-box").css({
                height: "auto"
            }), $("#block-page").length) {
            $(".colum-box").css({
                width: i,
                height: "auto"
            });
            var L = $(".colum-box").length,
                T = $(".colum-box").width();
            $(".box-content").width(L * T), $(".box-content").css({
                height: "auto"
            })
        } else $(".colum-box").css({
            width: "100%",
            height: "auto"
        }), $(".box-content").css({
            width: "100%",
            height: "auto"
        }), $(".box-content").css({
            left: "auto"
        });
        var O = 0;
        $(".sub-nav-block li, .sub-nav-typical li, .sub-nav-villa li").each(function() {
            var e = $(this).outerWidth() + 10;
            O += parseInt(e), $(".sub-nav-block ul, .sub-nav-typical ul, .sub-nav-villa ul").width(O)
        }), $(".news-list li").each(function() {
            var e = $(this).children().length,
                t = $(this).children().width() + 4;
            $(this).width(e * t)
        }), $(".news-list li").css({
            height: 100
        }), $(".news-right").css({
            height: 120,
            width: "100%"
        }), $(".news-list").css({
            height: 100,
            width: "90%"
        });
        var P = $(".link-page").length,
            D = $(".link-page").width() + 4;
        $(".news-list li").length, $(".news-list li").width();
        $(".news-list ul").width(P * D)
    } else if (i > 1100) {
        $(".nav-click").css({
            display: "none"
        }), $(".scroll-down").css({
            display: "none",
            opacity: 0
        }), $(t).css({
            width: x,
            height: y,
            left: (i - x) / 2,
            top: o / 2 - y / 2
        }), 1100 >= t1 ? $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
            height: t1 * c1
        }) 
        : $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
            height: t1 * n1
        }), $(".bg-home").css({
            width: i,
            height: o
        }), $(".slide-bg, .slider-home, .bg-page").css({
            width: "100%",
            height: o
        }), $(".sub-nav-block, .sub-nav-typical, .sub-nav-villa").css({
            top: o / 2 - $(".sub-nav-block, .sub-nav-typical, .sub-nav-villa").innerHeight() / 2,
            overflow: "hidden"
        }), $("#villa-details-page .description").each(function(e, t) {
            $(t).css({
                top: o / 2 - $(this).innerHeight() / 2
            })
        }), $(".content-page").css({
            width: i,
            height: o
        }), $(".box-content").css({
            height: o
        }), $(".colum-box").css({
            width: t1,
            height: o
        }), $(".content-house, .content-villa").css({
            height: o,
            width: i
        }), $(".box-content-house, .box-content-villa").css({
            width: i
        }), $(".house-details, .house-pic, .villa-details, .villa-details-pic").css({
            height: o,
            width: i
        }), $(".facilities-pic, .villa-pic").css({
            width: i,
            height: o
        }), $(".text-name").css({
            width: $(".item-box").width()
        }), $(".colum-details").css({
            height: o,
            width: i - 452
        }), $(".scrollB").css({
            height: o - 60,
            width: $(".colum-details").width() - 20
        }), $(".map-img").scale(h), $(".apartment, .villa, .block, .facilities-full, .info-facilities").css({
            height: o
        }), $(".apartment-bg, .typical, .villa-bg, .typical-villa, .facilities-bg, .facilities-typical").scale(a), $(".apartment-bg, .typical,  .facilities-bg, .facilities-typical").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), o / i > .6 ? $(".villa-bg, .typical-villa").css({
            left: i / 2 - 870,
            top: o / 2 - 400
        }) : $(".villa-bg, .typical-villa").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".colum-box").hasClass("large") ? ($(".block-typical").scale(p), $(".block-typical").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(p), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(a), $(".two-block-bg-c, .eight-block-bg-c").scale(p), $(".two-block-bg-d, .eight-block-bg-d").scale(p)) : ($(".block-typical").scale(a), $(".block-typical").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").scale(a), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").scale(a), $(".two-block-bg-c, .eight-block-bg-c").scale(a), $(".two-block-bg-d, .eight-block-bg-d").scale(a)), $(".colum-box").hasClass("large-ph") && ($(".colum-box.large-ph .block-typical").scale(k), $(".block-typical").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".penhouse-block-bg-c, .penhouse-block-bg-d").scale(k)), $(".two-block-bg-a, .three-block-bg-a, .eight-block-bg-a, .nine-block-bg-a, .penhouse-block-bg-a").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".two-block-bg, .three-block-bg, .eight-block-bg, .nine-block-bg, .thirteen-block-bg, .penhouse-block-bg").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".two-block-bg-c, .eight-block-bg-c, .penhouse-block-bg-c").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".two-block-bg-d, .eight-block-bg-d, .penhouse-block-bg-d").css({
            left: i / 2 - 800,
            top: o / 2 - 400
        }), $(".sub-nav-block ul, .sub-nav-typical ul, .sub-nav-villa ul").css({
            width: "100%"
        }), $(".info-facilities").css({
            top: 0
        });
        var L = $(".colum-box").length,
            T = $(".colum-box").width();
        $(".box-content").width(L * T), $(".news-list li").each(function() {
            var e = $(this).children().length,
                t = $(this).children().height() + 2;
            $(this).height(e * t)
        });
        var S = $(".link-page").length,
            I = $(".link-page").height() + 2,
            M = $(".news-list li").length,
            E = $(".news-list li").width() + 5;
        $(".news-list").height(S * I), $(".news-right").height(S * I) + 80, $(".news-list ul").width(M * E), $(".news-list li").length <= 1 ? $(".news-nav").css({
            display: "none"
        }) : $(".news-nav").css({
            display: "block",
            top: $('.news-right .news-list li').height() + 5,
            opacity: 1
        }), $(".news-list").css({
            width: 250
        }), $(".news-list li").css({
            width: 248
        }), $(".news-right").css({
            width: 250
        })
        
        var strAll = $('.news-nav li.current>a').attr('data-list');
        var allIX = $('.news-list li').length;
        
        $('span.start').text(strAll);
		$(".scroll-list li").removeClass('active');
        $('.scroll-list li[data-number="' + strAll + '"]').addClass('active');
        $('span.start').css({'opacity': 1});
        if (allIX < 10) {
            $('span.end').text("0" + allIX);
        } else {
            $('span.end').text(allIX);
        }

    };
    // if(1100 < t1 && 1300 > t1) {
    //     $(".facilities-bg, .facilities-typical").scale(n2);
    // };
        

    if($("#facilities-page").length && t1 <= 480){
        var desFaci = $("#facilities-page .description-slide").width();
        $("#facilities-page .note-facilities").css({'width': desFaci + 'px'});
        $("#facilities-page .note-facilities ul, li").css({'width': '100%'});
    }

    if(t1 >= 1100) {
        $(".pic-center img").css({height: o - 220}),
        $(".box").each(function(i, e) {
            var t = $(e).find(".scroll-des").innerHeight();
            t > o - 400 && ($(e).css({
                height: o - 420
            }), $(e).find(".scroll-des").css({
                height: o - 440
            }))
        });
    };
    //Edit fill tiện ích 10-11
    var T = document.documentElement.style;
    if ("flexWrap" in T ? ($(".item-wrapper").css({
            display: "flex"
        }), $(".item-container").css({
            display: "flex"
        })) : "WebkitFlexWrap" in T ? ($(".item-wrapper").css({
            display: "-webkit-flex"
        }), $(".item-container").css({
            display: "-webkit-flex"
        })) : "msFlexWrap" in T && ($(".item-wrapper").css({
            display: "-ms-flexbox"
        }), $(".item-container").css({
            display: " -ms-flexbox"
        })), $(".note-facilities.item-container").css({
            display: "inline-block"
        }), $("#home-page").length || ($(".pagination-bullet").length > 1 ? $(".pagination-bullet").css({
            display: "inline-block"
        }) : $(".pagination-bullet").css({
            display: "none"
        })), $("#about-page").length && $(".slide-bg  .item-container, .slide-bg  .item-wrapper").css({
            display: "block"
        }), 1100 >= t) $(".nav-click").css({
        display: "block"
    }), $(".scroll-down").css({
        top: o - 70
    }), 440 >= t ? ($(".bg-home").css({
        width: t,
        height: (t + 200) * n
    }), $(".slider-home").css({
        width: "100%",
        height: (t + 200) * n
    }), $(".bg-page").css({
        width: t,
        height: (t + 200) * n
    }), $(".map-mobile").css({
        width: t,
        height: (t + 200) * s
    })) : t > 440 && 640 >= t ? ($(".bg-home").css({
        width: t,
        height: (t + 100) * n
    }), $(".slider-home").css({
        width: "100%",
        height: (t + 100) * n
    }), $(".bg-page").css({
        width: t,
        height: (t + 100) * n
    }), $(".map-mobile").css({
        width: t,
        height: (t + 100) * s
    })) : ($(".bg-home").css({
        width: t,
        height: t * n
    }), $(".slider-home").css({
        width: "100%",
        height: t * n
    }), $(".bg-page").css({
        width: t,
        height: t * n
    }), $(".map-mobile").css({
        width: t,
        height: t * s
    })), $(".library-album, .library-load").css({
        width: "100%",
        height: t * r
    }), $(".library-album").css({
        "margin-top": $(".logo").height()
    }), $(e).css({
        width: "100%",
        height: "auto",
        left: "auto"
    }), 420 >= t ? $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
        height: t * c
    }) : $("#apartment-details-page .title-page, #apartment-page .title-page, #block-page .title-page, #facilities-page .title-page").css({
        height: t * n
    }), i ? ($(".apartment-bg, .typical").scale(d), $(".facilities-bg, .facilities-typical").scale(b), $(".apartment").css({
        height: $(".apartment-bg").height() * d
    }), $(".facilities-full, .info-facilities").css({
        height: $(".facilities-bg").height() * b
    }), $(".apartment-bg, .typical, .facilities-bg, .facilities-typical").css({
        left: t / 2 - 650,
        top: $(".apartment, .facilities-full").height() / 2 - 450
    })) : ($(".apartment-bg, .typical").scale(g), $(".facilities-bg, .facilities-typical").scale(f), $(".apartment").css({
        height: $(".apartment-bg").height() * g
    }), $(".facilities-full, .info-facilities").css({
        height: $(".facilities-bg").height() * f
    }), $(".apartment-bg, .typical, .facilities-bg, .facilities-typical").css({
        left: t / 2 - 650,
        top: $(".apartment, .facilities-full").height() / 2 - 450
    })), $(".colum-box").css({
        height: "auto"
    }), e ? ($(".block-bg, .block-typical").scale(p1), $(".block").css({
        height: $(".block-bg").height() * p1
    }), $(".block-bg, .block-typical").css({
        left: t1 / 2 - 750,
        top: $(".block").height() / 2 - 450
    })) : ($(".block-bg, .block-typical").scale(m1), $(".block").css({
        height: $(".block-bg").height() * m
    }), $(".block-bg, .block-typical").css({
        left: t1 / 2 - 750,
        top: $(".block").height() / 2 - 450
    })), $(".info-facilities").css({
        top: $(".title-page").height()
    }), $(".apartment-info").css({
        width: "100%",
        height: "auto"
    }), $(".scrollB, .scrollA, .scrollC, .scroll-menu, .scroll-des, .scroll-pro").getNiceScroll().remove(), $(".colum-details").css({
        width: "100%",
        height: "auto"
    }), $(".facilities-pic").css({
        width: "100%",
        height: "auto"
    }), $(".text-name").css({
        width: "100%"
    }), $(".content-page").css({
        width: t,
        height: "auto"
    }), $(".content-house").css({
        width: t,
        height: "auto"
    }), $(".box-content-house").css({
        height: "auto"
    }), $(".house-details").css({
        width: t
    }), $(".box-content, .colum-box, .house-pic, .slide-bg").css({
        height: "auto"
    }), $(".box, .box-scroll").css({
        height: "auto"
    }), $(".scrollA, .scroll-des").css({
        height: "auto"
    }), $(".pic-center img").css({
        height: "auto"
    }), $("#office-page, #news-page").length && ($(".colum-box-news").css({
        width: t,
        height: "auto",
        "min-height": o
    }), $(".scrollC, .scroll-pro").css({
        height: "auto"
    }), $(".news-list").css({
        right: "auto",
        top: "auto"
    })), $(".box-content-house, .library-pic-center").css({
        width: "100%"
    }), 740 >= t ? $(".news-text img, .item-box img, .album-pic-center img, .pic-center img, .library-pic-center img").addClass("zoom-pic") : $(".news-text img,  .item-box img, .album-pic-center img, .pic-center img, .library-pic-center img").removeClass("zoom-pic");
    
    else if (t > 1100) {
        $(".nav-click").css({
            display: "none"
        }), $(".scroll-down").css({
            display: "none",
            opacity: 0
        }), $(".bg-home").css({
            width: t,
            height: o
        }), $(".slide-bg, .slider-home, .bg-page, .library-album, .library-load").css({
            width: "100%",
            height: o
        }), $(e).css({
            width: v,
            height: x,
            left: (t - v) / 2
        }), $(".content-page").css({
            width: t,
            height: o
        }), $(".box-content, .house-pic").css({
            height: o
        }), $(".colum-box").css({
            width: t1,
            height: o
        }), $(".content-house").css({
            height: o,
            width: t
        }), $(".box-content-house").css({
            width: t
        }), $(".house-details, .library-pic-center").css({
            width: t
        }), $(".facilities-pic").css({
            width: t,
            height: o
        }), $(".text-name").css({
            width: $(".item-box").width()
        }), $(".colum-details").css({
            height: o,
            width: t - 452
        }), $(".map-img").scale(w), $(".apartment,  .block, .facilities-full").css({
            height: o
        }), $(".info-facilities").css({
            height: o - 75,
            top: 75
        }), $(".apartment-bg, .typical, .block-typical").scale(h1), $(".apartment-bg, .typical, .block-typical").css({
            left: t1 / 2 - 1100,
            top: o / 2 - 500
        }), $(".facilities-bg, .facilities-typical").scale(u), o / t > .55 ? $(".facilities-bg, .facilities-typical").css({
            left: t / 2 - 1050,
            top: o / 2 - 550
        }) : $(".facilities-bg, .facilities-typical").css({
            left: t / 2 - 1150,
            top: o / 2 - 550
        }), $("#office-page").length ? ($(".colum-box-news").css({
            width: t - 500,
            height: o - 150,
            "min-height": "inherit"
        }), $(".scrollC").css({
            height: o - 190
        })) : $("#news-page").length && ($(".colum-box-news").css({
            width: t - 500,
            height: o - 76,
            "min-height": "inherit"
        }), $(".scrollC").css({
            height: o - 156
        }), $(".news-list").css({
            right: $(".colum-box-news").width() + 1,
            top: o - 460
        })), $(".library-album").css({
            "margin-top": 0
        }), $(".pic-center img").css({
            height: o - 220
        }), $(".box").each(function(i, e) {
            var t = $(e).find(".scroll-des").innerHeight();
            t > o - 400 && ($(e).css({
                height: o - 420
            }), $(e).find(".scroll-des").css({
                height: o - 440
            }))
        }); 
        
        var C = $(".scroll-pro").innerHeight();
        C > o - 400 && $(".scroll-pro").css({
            height: o - 300
        }), $(".box-scroll").css({
            height: o - 220
        }), $(".news-text img,  .item-box img, .album-pic-center img, .pic-center img, .library-pic-center img").removeClass("zoom-pic"), $(".sub-nav-block ul, .sub-nav-typical ul").css({
            width: "100%"
        });
        var E = $(".house-details").length,
            L = $(".house-details").width();
        $(".box-content-house").width(E * L)
    } else {
        $(".block-bg, .block-typical").scale(h1), $(".block-bg, .block-typical").css({
            left: t1 / 2 - 1100,
            top: o / 2 - 500
        })
    }

    if(t1 > 1100 && t1 < 1300 && $("#block-page").length){
        $(".block-bg, .block-typical").scale(o / 1350);
    };
    
    // if(t1 > 767 && t1 < 1100 && $("#block-page").length){
    //     $(".block-bg, .block-typical").scale(o / 1300);
    // };
    
    if(t1 > 1100 && $("#facilities-page").length){
        $("#facilities-page .facilities-bg,#facilities-page .facilities-typical").scale(k1), o / t1 > .55 ? $("#facilities-page .facilities-bg, #facilities-page .facilities-typical").css({
            left: t1 / 2 - 1050,
            top: o / 2 - 550
        }) : $("#facilities-page .facilities-bg, #facilities-page .facilities-typical").css({
            left: t1 / 2 - 1150,
            top: o / 2 - 550
        });
        if(t1 > 1100 && t1 < 1300){
            $("#facilities-page .facilities-bg,#facilities-page .facilities-typical").scale(k2);
        }
    } 
    //Edit fill Tiện ích 10-11

    var t1 = $(window).width();
    var h = $(window).height();
    var h1 = h/1e3;
    var h2 = h/1100;
    if(1100 >= t1){
        $("#block-page .block-bg, #block-page .block-typical").scale(h1),
        $("#block-page .block-bg, #block-page .block-typical").css({
            left: t1 / 2 - 750,
            top: h / 2 - 450
        });
    }
    
    
    if(620 < t1 && t1 < 1025 && h >= 1024){
        $("#block-page .block-bg, #block-page .block-typical").scale(h2),
        $("#block-page .block-bg, #block-page .block-typical").css({
            top: h / 2 - 650
        });
    }
    
    if(620 >= t1){
        // alert('ok');
        $("#block-page .block-bg, #block-page .block-typical").scale(h1 - 0.2),
        $(".block-bg, .block-typical").css({
            top: o / 2 - 580
        });
    };


    var q = $(".house-details").length,
        W = $(".house-details").width();
    $(".box-content-house").width(q * W);
    var z = $(".villa-details").length,
        F = $(".villa-details").width();
    $(".box-content-villa").width(z * F)
}

function Done() {
    $("html, body").scrollTop(0), ResizeWindows(), $(".title-page > h1").lettering("words").children("span").lettering().children("span").lettering(), $(".container").stop().animate({
        opacity: 1
    }, 800, "linear", function() {
        ContentLoad(), $(".loadicon").fadeOut(500, function() {
            $(".loadicon").remove()
        })
    })
}
var ua = navigator.userAgent,
    androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8)),
    isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
    isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints,
    isDesktop = 0 != $(window).width() && !isTouchDevice,
    isTouchIE = -1 != navigator.userAgent.toLowerCase().indexOf("msie") && navigator.msMaxTouchPoints > 0,
    isIE11 = !!window.MSStream,
    isiPad = -1 != navigator.userAgent.indexOf("iPad"),
    isiPhone = -1 != navigator.userAgent.indexOf("iPhone"),
    isiPod = -1 != navigator.userAgent.indexOf("iPod"),
    isAndroid = -1 != navigator.userAgent.indexOf("Android"),
    isIE = -1 != navigator.userAgent.toLowerCase().indexOf("msie") && 0 != $(window).width(),
    isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1,
    isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
    isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1,
    IEMobile = "-ms-user-select" in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/),
    match = navigator.userAgent.match("MSIE (.)"),
    userAgent = navigator.userAgent.toLowerCase(),
    version = 0;
userAgent = userAgent.substring(userAgent.indexOf("safari/index.html") + 7), userAgent = userAgent.substring(0, userAgent.indexOf(".")), version = userAgent;
var Loadx = 0;
! function(e) {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        var t = this.length >>> 0,
            i = Number(arguments[1]) || 0;
        for (i = 0 > i ? Math.ceil(i) : Math.floor(i), 0 > i && (i += t); t > i; i++)
            if (i in this && this[i] === e) return i;
        return -1
    });
    var t = (e(window).height(), e(window).width(), new Array),
        i = 0,
        o = !1,
        l = "",
        c = "",
        s = "",
        a = "",
        n = 0,
        b = 0,
        h = {
            onComplete: function() {
                e("#qLoverlay").remove(), e("body .item-load").remove()
            },
            backgroundColor: "#fff",
            barColor: "#fff",
            barHeight: 1,
            percentage: !0,
            deepSearch: !0,
            completeAnimation: "fade",
            minimumTime: 500,
            onLoadComplete: function() {
                if ("grow" == h.completeAnimation) {
                    var t = 100,
                        i = new Date;
                    i.getTime() - b < h.minimumTime && (t = h.minimumTime - (i.getTime() - b)), e("#qLbar").stop().animate({
                        width: "100%"
                    }, t, function() {
                        e("#qLoverlay").fadeOut(200, function() {
                            h.onComplete(), 0 == Loadx && (Loadx = 1, Done()), ResizeWindows()
                        })
                    })
                }
            }
        },
        g = function() {
            var e = new Date;
            b = e.getTime(), r(), k()
        },
        r = function() {
            l = e('<div class="item-load"></div>').appendTo("body").css({
                display: "none",
                width: 0,
                height: 0,
                overflow: "hidden"
            });
            for (var i = 0; t.length > i; i++) e.ajax({
                url: t[i],
                type: "HEAD",
                success: function() {
                    o || (n++, d(this.url))
                }
            })
        },
        d = function(t) {
            e("<img />").attr("src", t).bind("load", function() {
                p()
            }).appendTo(l)
        },
        p = function() {
            i++;
            var t = i / n * 100;
            e(s).stop().animate({
                width: t + "%",
                minWidth: t + "%"
            }, 200), 1 == h.percentage && e(a).text(Math.ceil(t) + "%"), i == n && $()
        },
        $ = function() {
            e(l).remove(), h.onLoadComplete(), o = !0
        },
        k = function() {
            c = e('<div id="qLoverlay"></div>').css({
                width: "100%",
                height: "10px",
                position: "absolute",
                zIndex: 1e3,
                top: 0,
                left: 0
            }).appendTo("body"), s = e('<div id="qLbar"></div>').css({
                height: h.barHeight + "px",
                backgroundColor: h.barColor,
                width: "0%",
                position: "absolute",
                top: "0px"
            }).appendTo(c), 1 == h.percentage && (a = e('<div id="qLpercentage"></div>').text("0%").css({
                height: "120px",
                width: "120px",
                position: "absolute",
                fontSize: "0px",
                top: "50%",
                left: "50%",
                marginTop: "60px",
                textAlign: "center",
                marginLeft: "-60px",
                color: "#fff"
            }).appendTo(c))
        },
        u = function(i) {
            var o = "";
            if ("none" != e(i).css("background-image")) var o = e(i).css("background-image");
            else if ("undefined" != typeof e(i).attr("src") && "img" == i.nodeName.toLowerCase()) var o = e(i).attr("src");
            if (-1 == o.indexOf("gradient")) {
                o = o.replace(/url\(\"/g, ""), o = o.replace(/url\(/g, ""), o = o.replace(/\"\)/g, ""), o = o.replace(/\)/g, "");
                for (var l = o.split(", "), c = 0; c < l.length; c++)
                    if (l[c].length > 0 && -1 == t.indexOf(l[c])) {
                        var s = "";
                        t.push(l[c] + s)
                    }
            }
        };
    e.fn.queryLoader = function(t) {
        return t && e.extend(h, t), this.each(function() {
            u(this), 1 == h.deepSearch && e(this).find("*:not(script)").each(function() {
                u(this)
            })
        }), g(), this
    }
}(jQuery),
function(e) {
    e.fn.clipPath = function() {
        return this.filter("[data-clipPath]").each(function(t) {
            var i = e(this).attr("data-clipPath"),
                o = e(this).attr("src"),
                l = e(this).css("width"),
                c = e(this).css("height"),
                s = parseFloat(l, 10),
                a = parseFloat(c, 10),
                n = e(this).attr("alt"),
                b = e(this).attr("title"),
                h = t,
                g = e('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="svgMask" width="' + l + '" height="' + c + '" viewBox="0 0 ' + s + " " + a + '"><defs><clipPath id="maskID' + h + '"><path d="' + i + '"/></clipPath>  </defs><title>' + b + "</title><desc>" + n + '</desc><image clip-path="url(#maskID' + h + ')" width="' + l + '" height="' + c + '" xlink:href="' + o + '" /></svg>');
            e(this).replaceWith(g), delete i, g
        }), this
    }
}(jQuery), window.addEventListener("load", function() {
    $("#villa-page").length && $(".box-img").clipPath()
}, !1), $(document).ready(function() {
    $("html, body").scrollTop(0), ResizeWindows(), $("body").append('<div class="loadicon" style="display:block"></div>'), $("body").queryLoader({
        barColor: "#6a5c4d",
        percentage: !1,
        barHeight: 1,
        completeAnimation: "grow",
        minimumTime: 100
    }), setTimeout(function() {
        0 == Loadx && (Loadx = 1, Done())
    }, 1e3)
});