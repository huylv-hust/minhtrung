//SLIDE//
if (typeof Object.create !== "function") {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function($, window, document) {

    var Slider = {
        init: function(options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.BTQSlider.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent: function() {
            var base = this,
                url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.BTQ) {
                        if (data.BTQ.hasOwnProperty(i)) {
                            content += data.BTQ[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn: function() {
            var base = this;

            base.$elem.data({
                "slide-originalStyles": base.$elem.attr("style"),
                "slide-originalClasses": base.$elem.attr("class")
            });

            base.$elem.css({
                opacity: 0
            });
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars: function() {
            var base = this;
            if (base.$elem.children().length === 0) {
                return false;
            }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$BTQItems = base.$elem.find(".slide-item");
            base.$BTQWrapper = base.$elem.find(".slide-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup: function() {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.BTQStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {

                base.options.autoPlay = 5000;

            }

            base.play();


            base.$elem.find(".slide-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate: function() {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars: function() {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload: function() {
            var base = this;
            window.setTimeout(function() {
                base.updateVars();
            }, 0);
        },

        watchVisibility: function() {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({
                    opacity: 0
                });
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function() {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({
                        opacity: 1
                    }, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems: function() {
            var base = this;
            base.$userItems.wrapAll("<div class=\"slide-wrapper\">").wrap("<div class=\"slide-item\"></div>");
            base.$elem.find(".slide-wrapper").wrap("<div class=\"slide-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".slide-wrapper-outer");
            base.$elem.css("display", "inline-block");
        },

        baseClass: function() {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems: function() {
            var base = this,
                width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function(a, b) {
                    return a[0] - b[0];
                });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response: function() {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function() {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function() {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);

                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition: function() {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes: function() {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$BTQItems.each(function(index) {
                var $this = $(this);
                $this
                    .css({
                        "width": base.itemWidth
                    })
                    .data("slide-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("slide-roundPages", roundPages);
            });
        },

        appendWrapperSizes: function() {
            var base = this,
                width = base.$BTQItems.length * base.itemWidth;

            base.$BTQWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll: function() {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth: function() {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max: function() {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min: function() {
            return 0;
        },

        loops: function() {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$BTQItems[i]);
                    roundPageNum = item.data("slide-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls: function() {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.BTQControls = $("<div class=\"slide-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons: function() {
            var base = this,
                buttonsWrapper = $("<div class=\"slide-buttons\"/>");
            base.BTQControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class": "slide-prev",
                "html": base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class": "slide-next",
                "html": base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.BTQControls mousedown.BTQControls", "div[class^=\"slide\"]", function(event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.BTQControls mouseup.BTQControls", "div[class^=\"slide\"]", function(event) {
                event.preventDefault();
                if ($(this).hasClass("slide-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination: function() {
            var base = this;

            base.paginationWrapper = $("<div class=\"slide-pagination\"/>");
            base.BTQControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.BTQControls mouseup.BTQControls", ".slide-page", function(event) {
                event.preventDefault();
                if (Number($(this).data("slide-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("slide-page")), true);
                }
            });
        },

        updatePagination: function() {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class": "slide-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "slide-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("slide-page", lastPage === i ? lastItem : i);
                    paginationButton.data("slide-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination: function() {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".slide-page").each(function() {
                if ($(this).data("slide-roundPages") === $(base.$BTQItems[base.currentItem]).data("slide-roundPages")) {
                    base.paginationWrapper
                        .find(".slide-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation: function() {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls: function() {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.BTQControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.BTQControls.hide();
                } else {
                    base.BTQControls.show();
                }
            }
        },

        destroyControls: function() {
            var base = this;
            if (base.BTQControls) {
                base.BTQControls.remove();
            }
        },

        next: function(speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev: function(speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo: function(position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.BTQ.currentItem = position;

            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1) {
                base.swapSpeed(0);
                if (base.browser.support3d === true || (base.browser == "msie" && version >= 10)) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }



            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function() {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo: function(position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.BTQ.currentItem = position;
            base.afterGo();
        },

        afterGo: function() {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.BTQ.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop: function() {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp: function() {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play: function() {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function() {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed: function(action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$BTQWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$BTQWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$BTQWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed: function(speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate: function(pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d: function(value) {
            var base = this;
            base.$BTQWrapper.css(base.doTranslate(value));
        },

        css2move: function(value) {
            var base = this;
            base.$BTQWrapper.css({
                "left": value
            });
        },

        css2slide: function(value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$BTQWrapper.stop(true, true).animate({
                "left": value
            }, {
                duration: speed || base.options.slideSpeed,
                complete: function() {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser: function() {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                "; -ms-transform:" + translate3D +
                "; -o-transform:" + translate3D +
                "; -webkit-transform:" + translate3D +
                "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            // support3d = (asSupport !== null && asSupport.length === 1);
            support3d = (asSupport !== null && asSupport.length >= 1 && asSupport.length <= 2);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d": support3d,
                "isTouch": isTouch
            };
        },

        moveEvents: function() {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes: function() {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.BTQ mousedown.BTQ",
                    "touchmove.BTQ mousemove.BTQ",
                    "touchend.BTQ touchcancel.BTQ mouseup.BTQ"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.BTQ",
                    "touchmove.BTQ",
                    "touchend.BTQ touchcancel.BTQ"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.BTQ",
                    "mousemove.BTQ",
                    "mouseup.BTQ"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents: function() {
            var base = this;
            base.$elem.on("dragstart.BTQ", function(event) {
                event.preventDefault();
            });
            base.$elem.on("mousedown.disableTextSelect", function(e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures: function() {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x: event.touches[0].pageX,
                        y: event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x: event.pageX,
                            y: event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x: event.clientX,
                            y: event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$BTQWrapper.hasClass("grabbing")) {
                    base.$BTQWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.BTQ");
                }

                minSwipe = function() {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function() {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    BTQStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$BTQWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.BTQ.dragDirection = "left";
                } else {
                    base.dragDirection = base.BTQ.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function(ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        BTQStopEvent = handlers.pop();
                        handlers.splice(0, 0, BTQStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".slide-wrapper", dragStart);
        },

        getNewPosition: function() {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem: function() {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function(i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection: function() {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents: function() {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("BTQ.next", function() {
                base.next();
            });
            base.$elem.on("BTQ.prev", function() {
                base.prev();
            });
            base.$elem.on("BTQ.play", function(event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("BTQ.stop", function() {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("BTQ.goTo", function(event, item) {
                base.goTo(item);
            });
            base.$elem.on("BTQ.jumpTo", function(event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover: function() {
            var base = this;
            var Hover = $('.box-news, .project-item, .zoom, .item-pic');

            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                Hover.on("mouseover", function() {
                    base.stop();
                });
                Hover.on("mouseout", function() {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }

        },

        lazyLoad: function() {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$BTQItems[i]);

                if ($item.data("slide-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("slide-item");
                $lazyImg = $item.find(".lazyload");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("slide-loaded", "loaded");
                    continue;
                }
                if ($item.data("slide-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("slide-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    $lazyImg.each(function() {
                        base.lazyPreload($item, $(this));
                    });
                }
            }
        },

        lazyPreload: function($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("slide-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                    $lazyImg.parent().parent().fadeIn(400);
                    $lazyImg.parent().fadeIn(400);
                } else {
                    $lazyImg.show();
                    $lazyImg.parent().parent().show();
                    $lazyImg.parent().show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight: function() {
            var base = this,
                $currentimg = $(base.$BTQItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$BTQItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoheight")) {
                    window.setTimeout(function() {
                        base.wrapperOuter.addClass("autoheight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg: function(img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems: function() {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$BTQItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$BTQItems[i]).addClass("active");
                }
            }
            base.BTQ.visibleItems = base.visibleItems;
        },

        transitionTypes: function(className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "slide-" + className + "-out";
            base.inClass = "slide-" + className + "-in";
        },

        singleItemTransition: function() {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$BTQItems.eq(base.currentItem),
                $prevItem = base.$BTQItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$BTQWrapper
                .addClass('slide-origin')
                .css({
                    "-webkit-transform-origin": origin + "px",
                    "-moz-perspective-origin": origin + "px",
                    "perspective-origin": origin + "px"
                });

            function transStyles(prevPos) {
                return {
                    "position": "relative",
                    "left": prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function() {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function() {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle: function(item, classToRemove) {
            var base = this;
            item.css({
                "position": "",
                "left": ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$BTQWrapper.removeClass('slide-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        BTQStatus: function() {
            var base = this;
            base.BTQ = {
                "userOptions": base.userOptions,
                "baseElement": base.$elem,
                "userItems": base.$userItems,
                "BTQItems": base.$BTQItems,
                "currentItem": base.currentItem,
                "prevItem": base.prevItem,
                "visibleItems": base.visibleItems,
                "isTouch": base.browser.isTouch,
                "browser": base.browser,
                "dragDirection": base.dragDirection
            };
        },

        clearEvents: function() {
            var base = this;
            base.$elem.off(".slide mousedown.disableTextSelect");
            $(document).off(".slide");
            $(window).off("resize", base.resizer);
        },

        unWrap: function() {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$BTQWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.BTQControls) {
                    base.BTQControls.remove();
                }
            }
            base.clearEvents();
            base.$elem.attr({
                style: base.$elem.data("slide-originalStyles") || "",
                class: base.$elem.data("slide-originalClasses")
            });
        },

        destroy: function() {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit: function(newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem: function(htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {
                return false;
            }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem: function(targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        },

    };



    $.fn.BTQSlider = function(options) {
        return this.each(function() {
            if ($(this).data("slide-init") === true) {
                return false;
            }
            $(this).data("slide-init", true);
            var slidebox = Object.create(Slider);
            slidebox.init(options, this);
            $.data(this, "BTQSlider", slidebox);
        });
    };

    $.fn.BTQSlider.options = {

        items: 5,
        itemsCustom: false,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,
        autoPlay: false,
        stopOnHover: false,
        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,
        pagination: true,
        paginationNumbers: false,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,
        baseClass: "slide-slidebox",
        theme: "",
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",
        autoHeight: false,
        jsonPath: false,
        jsonSuccess: false,
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,
        addClassActive: false,
        transitionStyle: false,
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false,

    };
}(jQuery, window, document));



/////////////////ZOOM////////////////

(function(global, factory) {
    // AMD
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function(jQuery) {
            return factory(global, jQuery);
        });
        // CommonJS/Browserify
    } else if (typeof exports === 'object') {
        factory(global, require('jquery'));
        // Global
    } else {
        factory(global, global.jQuery);
    }
}(typeof window !== 'undefined' ? window : this, function(window, $) {
    'use strict';

    // Common properties to lift for touch or pointer events
    var list = 'over out down up move enter leave cancel'.split(' ');
    var hook = $.extend({}, $.event.mouseHooks);
    var events = {};

    // Support pointer events in IE11+ if available
    if (window.PointerEvent) {
        $.each(list, function(i, name) {
            // Add event name to events property and add fixHook
            $.event.fixHooks[
                (events[name] = 'pointer' + name)
            ] = hook;
        });
    } else {
        var mouseProps = hook.props;
        // Add touch properties for the touch hook
        hook.props = mouseProps.concat(['touches', 'changedTouches', 'targetTouches', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']);


        hook.filter = function(event, originalEvent) {
            var touch;
            var i = mouseProps.length;
            if (!originalEvent.pageX && originalEvent.touches && (touch = originalEvent.touches[0])) {
                // Copy over all mouse properties
                while (i--) {
                    event[mouseProps[i]] = touch[mouseProps[i]];
                }
            }
            return event;
        };

        $.each(list, function(i, name) {
            // No equivalent touch events for over and out
            if (i < 2) {
                events[name] = 'mouse' + name;
            } else {
                var touch = 'touch' +
                    (name === 'down' ? 'start' : name === 'up' ? 'end' : name);
                // Add fixHook
                $.event.fixHooks[touch] = hook;
                // Add event names to events property
                events[name] = touch + ' mouse' + name;
            }
        });
    }

    $.pointertouch = events;

    var document = window.document;
    var datakey = '__pz__';
    var slice = Array.prototype.slice;
    var pointerEvents = !!window.PointerEvent;
    var supportsInputEvent = (function() {
        var input = document.createElement('input');
        input.setAttribute('oninput', 'return');
        return typeof input.oninput === 'function';
    })();

    // Regex
    var rupper = /([A-Z])/g;
    var rsvg = /^http:[\w\.\/]+svg$/;
    var rinline = /^inline/;

    var floating = '(\\-?[\\d\\.e]+)';
    var commaSpace = '\\,?\\s*';
    var rmatrix = new RegExp(
        '^matrix\\(' +
        floating + commaSpace +
        floating + commaSpace +
        floating + commaSpace +
        floating + commaSpace +
        floating + commaSpace +
        floating + '\\)$'
    );


    function matrixEquals(first, second) {
        var i = first.length;
        while (--i) {
            if (+first[i] !== +second[i]) {
                return false;
            }
        }
        return true;
    }


    function createResetOptions(opts) {
        var options = {
            range: true,
            animate: true
        };
        if (typeof opts === 'boolean') {
            options.animate = opts;
        } else {
            $.extend(options, opts);
        }
        return options;
    }


    function Matrix(a, b, c, d, e, f, g, h, i) {
        if ($.type(a) === 'array') {
            this.elements = [+a[0], +a[2], +a[4], +a[1], +a[3], +a[5],
                0, 0, 1
            ];
        } else {
            this.elements = [
                a, b, c,
                d, e, f,
                g || 0, h || 0, i || 1
            ];
        }

    }

    Matrix.prototype = {

        x: function(matrix) {
            var isVector = matrix instanceof Vector;

            var a = this.elements,
                b = matrix.elements;

            if (isVector && b.length === 3) {
                // b is actually a vector
                return new Vector(
                    a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
                    a[3] * b[0] + a[4] * b[1] + a[5] * b[2],
                    a[6] * b[0] + a[7] * b[1] + a[8] * b[2]
                );
            } else if (b.length === a.length) {
                // b is a 3x3 matrix
                return new Matrix(
                    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
                    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
                    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

                    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
                    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
                    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

                    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
                    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
                    a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
                );
            }
            return false; // fail
        },

        inverse: function() {
            var d = 1 / this.determinant(),
                a = this.elements;
            return new Matrix(
                d * (a[8] * a[4] - a[7] * a[5]),
                d * (-(a[8] * a[1] - a[7] * a[2])),
                d * (a[5] * a[1] - a[4] * a[2]),

                d * (-(a[8] * a[3] - a[6] * a[5])),
                d * (a[8] * a[0] - a[6] * a[2]),
                d * (-(a[5] * a[0] - a[3] * a[2])),

                d * (a[7] * a[3] - a[6] * a[4]),
                d * (-(a[7] * a[0] - a[6] * a[1])),
                d * (a[4] * a[0] - a[3] * a[1])
            );
        },

        determinant: function() {
            var a = this.elements;
            return a[0] * (a[8] * a[4] - a[7] * a[5]) - a[3] * (a[8] * a[1] - a[7] * a[2]) + a[6] * (a[5] * a[1] - a[4] * a[2]);
        }
    };


    function Vector(x, y, z) {
        this.elements = [x, y, z];
    }


    Vector.prototype.e = Matrix.prototype.e = function(i) {
        return this.elements[i];
    };


    function Panzoom(elem, options) {


        if (!(this instanceof Panzoom)) {
            return new Panzoom(elem, options);
        }

        // Sanity checks
        if (elem.nodeType !== 1) {
            $.error('Panzoom called on non-Element node');
        }
        if (!$.contains(document, elem)) {
            $.error('Panzoom element must be attached to the document');
        }

        // Don't remake
        var d = $.data(elem, datakey);
        if (d) {
            return d;
        }


        this.options = options = $.extend({}, Panzoom.defaults, options);
        this.elem = elem;
        var $elem = this.$elem = $(elem);
        this.$set = options.$set && options.$set.length ? options.$set : $elem;
        this.$doc = $(elem.ownerDocument || document);
        this.$parent = $elem.parent();


        this.isSVG = rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg';

        this.panning = false;


        this._buildTransform();


        this._transform = !this.isSVG && $.cssProps.transform.replace(rupper, '-$1').toLowerCase();


        this._buildTransition();


        this.resetDimensions();


        var $empty = $();
        var self = this;
        $.each(['$zoomIn', '$zoomOut', '$zoomRange', '$reset'], function(i, name) {
            self[name] = options[name] || $empty;
        });

        this.enable();

        // Save the instance
        $.data(elem, datakey, this);
    }

    // Attach regex for possible use (immutable)
    Panzoom.rmatrix = rmatrix;

    // Container for event names
    Panzoom.events = $.pointertouch;

    Panzoom.defaults = {
        eventNamespace: '.panzoom',
        transition: true,
        cursor: '',
        disablePan: false,
        disableZoom: false,
        increment: 0.3,
        minScale: 0.4,
        maxScale: 5,
        rangeStep: 0.05,
        duration: 600,
        easing: 'ease-in-out',
        contain: false
    };

    Panzoom.prototype = {
        constructor: Panzoom,


        instance: function() {
            return this;
        },


        enable: function() {
            // Unbind first
            this._initStyle();
            this._bind();
            this.disabled = false;
        },


        disable: function() {
            this.disabled = true;
            this._resetStyle();
            this._unbind();
        },


        isDisabled: function() {
            return this.disabled;
        },


        destroy: function() {
            this.disable();
            $.removeData(this.elem, datakey);
        },


        resetDimensions: function() {
            // Reset container properties
            var $parent = this.$parent;
            this.container = {
                width: $parent.innerWidth(),
                height: $parent.innerHeight()
            };
            var po = $parent.offset();
            var elem = this.elem;
            var $elem = this.$elem;
            var dims;
            if (this.isSVG) {
                dims = elem.getBoundingClientRect();
                dims = {
                    left: dims.left - po.left,
                    top: dims.top - po.top,
                    width: dims.width,
                    height: dims.height,
                    margin: {
                        left: 0,
                        top: 0
                    }
                };
            } else {
                dims = {
                    left: $.css(elem, 'left', true) || 0,
                    top: $.css(elem, 'top', true) || 0,
                    width: $elem.innerWidth(),
                    height: $elem.innerHeight(),
                    margin: {
                        top: $.css(elem, 'marginTop', true) || 0,
                        left: $.css(elem, 'marginLeft', true) || 0
                    }
                };
            }
            dims.widthBorder = ($.css(elem, 'borderLeftWidth', true) + $.css(elem, 'borderRightWidth', true)) || 0;
            dims.heightBorder = ($.css(elem, 'borderTopWidth', true) + $.css(elem, 'borderBottomWidth', true)) || 0;
            this.dimensions = dims;
        },


        reset: function(options) {
            options = createResetOptions(options);
            // Reset the transform to its original value
            var matrix = this.setMatrix(this._origTransform, options);
            if (!options.silent) {
                this._trigger('reset', matrix);
            }
        },


        resetZoom: function(options) {
            options = createResetOptions(options);
            var origMatrix = this.getMatrix(this._origTransform);
            options.dValue = origMatrix[3];
            this.zoom(origMatrix[0], options);
        },


        resetPan: function(options) {
            var origMatrix = this.getMatrix(this._origTransform);
            this.pan(origMatrix[4], origMatrix[5], createResetOptions(options));
        },


        setTransform: function(transform) {
            var method = this.isSVG ? 'attr' : 'style';
            var $set = this.$set;
            var i = $set.length;
            while (i--) {
                $[method]($set[i], 'transform', transform);
            }
        },


        getTransform: function(transform) {
            var $set = this.$set;
            var transformElem = $set[0];
            if (transform) {
                this.setTransform(transform);
            } else {

                transform = $[this.isSVG ? 'attr' : 'style'](transformElem, 'transform');
            }


            if (transform !== 'none' && !rmatrix.test(transform)) {

                this.setTransform(transform = $.css(transformElem, 'transform'));
            }

            return transform || 'none';
        },


        getMatrix: function(transform) {
            var matrix = rmatrix.exec(transform || this.getTransform());
            if (matrix) {
                matrix.shift();
            }
            return matrix || [1, 0, 0, 1, 0, 0];
        },


        setMatrix: function(matrix, options) {
            if (this.disabled) {
                return;
            }
            if (!options) {
                options = {};
            }
            // Convert to array
            if (typeof matrix === 'string') {
                matrix = this.getMatrix(matrix);
            }
            var dims, container, marginW, marginH, diffW, diffH, left, top, width, height;
            var scale = +matrix[0];
            var $parent = this.$parent;
            var contain = typeof options.contain !== 'undefined' ? options.contain : this.options.contain;

            // Apply containment
            if (contain) {
                dims = this._checkDims();
                container = this.container;
                width = dims.width + dims.widthBorder;
                height = dims.height + dims.heightBorder;
                // Use absolute value of scale here as negative scale doesn't mean even smaller
                marginW = ((width * Math.abs(scale)) - container.width) / 2;
                marginH = ((height * Math.abs(scale)) - container.height) / 2;
                left = dims.left + dims.margin.left;
                top = dims.top + dims.margin.top;
                if (contain === 'invert') {
                    diffW = width > container.width ? width - container.width : 0;
                    diffH = height > container.height ? height - container.height : 0;
                    marginW += (container.width - width) / 2;
                    marginH += (container.height - height) / 2;
                    matrix[4] = Math.max(Math.min(matrix[4], marginW - left), -marginW - left - diffW);
                    matrix[5] = Math.max(Math.min(matrix[5], marginH - top), -marginH - top - diffH + dims.heightBorder);
                } else {
                    // marginW += dims.widthBorder / 2;
                    marginH += dims.heightBorder / 2;
                    diffW = container.width > width ? container.width - width : 0;
                    diffH = container.height > height ? container.height - height : 0;
                    // If the element is not naturally centered, assume full margin right
                    if ($parent.css('textAlign') !== 'center' || !rinline.test($.css(this.elem, 'display'))) {
                        marginW = marginH = 0;
                    } else {
                        diffW = 0;
                    }
                    matrix[4] = Math.min(
                        Math.max(matrix[4], marginW - left), -marginW - left + diffW
                    );
                    matrix[5] = Math.min(
                        Math.max(matrix[5], marginH - top), -marginH - top + diffH
                    );
                }
            }
            if (options.animate !== 'skip') {
                // Set transition
                this.transition(!options.animate);
            }
            // Update range
            if (options.range) {
                this.$zoomRange.val(scale);
            }

            // Set the matrix on this.$set
            this.setTransform('matrix(' + matrix.join(',') + ')');

            if (!options.silent) {
                this._trigger('change', matrix);
            }

            return matrix;
        },


        isPanning: function() {
            return this.panning;
        },


        transition: function(off) {
            if (!this._transition) {
                return;
            }
            var transition = off || !this.options.transition ? 'none' : this._transition;
            var $set = this.$set;
            var i = $set.length;
            while (i--) {
                // Avoid reflows when zooming
                if ($.style($set[i], 'transition') !== transition) {
                    $.style($set[i], 'transition', transition);
                }
            }
        },


        pan: function(x, y, options) {
            if (this.options.disablePan) {
                return;
            }
            if (!options) {
                options = {};
            }
            var matrix = options.matrix;
            if (!matrix) {
                matrix = this.getMatrix();
            }
            // Cast existing matrix values to numbers
            if (options.relative) {
                x += +matrix[4];
                y += +matrix[5];
            }
            matrix[4] = x;
            matrix[5] = y;
            this.setMatrix(matrix, options);
            if (!options.silent) {
                this._trigger('pan', matrix[4], matrix[5]);
            }
        },


        zoom: function(scale, opts) {
            // Shuffle arguments
            if (typeof scale === 'object') {
                opts = scale;
                scale = null;
            } else if (!opts) {
                opts = {};
            }
            var options = $.extend({}, this.options, opts);
            // Check if disabled
            if (options.disableZoom) {
                return;
            }
            var animate = false;
            var matrix = options.matrix || this.getMatrix();

            // Calculate zoom based on increment
            if (typeof scale !== 'number') {
                scale = +matrix[0] + (options.increment * (scale ? -1 : 1));
                animate = true;
            }

            // Constrain scale
            if (scale > options.maxScale) {
                scale = options.maxScale;
            } else if (scale < options.minScale) {
                scale = options.minScale;
            }

            // Calculate focal point based on scale
            var focal = options.focal;
            if (focal && !options.disablePan) {
                // Adapted from code by Florian Günther
                // https://github.com/florianguenther/zui53
                var dims = this._checkDims();
                var clientX = focal.clientX;
                var clientY = focal.clientY;
                // Adjust the focal point for default transform-origin => 50% 50%
                if (!this.isSVG) {
                    clientX -= (dims.width + dims.widthBorder) / 2;
                    clientY -= (dims.height + dims.heightBorder) / 2;
                }
                var clientV = new Vector(clientX, clientY, 1);
                var surfaceM = new Matrix(matrix);
                // Supply an offset manually if necessary
                var o = this.parentOffset || this.$parent.offset();
                var offsetM = new Matrix(1, 0, o.left - this.$doc.scrollLeft(), 0, 1, o.top - this.$doc.scrollTop());
                var surfaceV = surfaceM.inverse().x(offsetM.inverse().x(clientV));
                var scaleBy = scale / matrix[0];
                surfaceM = surfaceM.x(new Matrix([scaleBy, 0, 0, scaleBy, 0, 0]));
                clientV = offsetM.x(surfaceM.x(surfaceV));
                matrix[4] = +matrix[4] + (clientX - clientV.e(0));
                matrix[5] = +matrix[5] + (clientY - clientV.e(1));
            }

            // Set the scale
            matrix[0] = scale;
            matrix[3] = typeof options.dValue === 'number' ? options.dValue : scale;

            // Calling zoom may still pan the element
            this.setMatrix(matrix, {
                animate: typeof options.animate === 'boolean' ? options.animate : animate,
                // Set the zoomRange value
                range: !options.noSetRange
            });

            // Trigger zoom event
            if (!options.silent) {
                this._trigger('zoom', matrix[0], options);
            }
        },


        option: function(key, value) {
            var options;
            if (!key) {
                // Avoids returning direct reference
                return $.extend({}, this.options);
            }

            if (typeof key === 'string') {
                if (arguments.length === 1) {
                    return this.options[key] !== undefined ?
                        this.options[key] :
                        null;
                }
                options = {};
                options[key] = value;
            } else {
                options = key;
            }

            this._setOptions(options);
        },


        _setOptions: function(options) {
            $.each(options, $.proxy(function(key, value) {
                switch (key) {
                    case 'disablePan':
                        this._resetStyle();
                        /* falls through */
                    case '$zoomIn':
                    case '$zoomOut':
                    case '$zoomRange':
                    case '$reset':
                    case 'disableZoom':
                    case 'onStart':
                    case 'onChange':
                    case 'onZoom':
                    case 'onPan':
                    case 'onEnd':
                    case 'onReset':
                    case 'eventNamespace':
                        this._unbind();
                }
                this.options[key] = value;
                switch (key) {
                    case 'disablePan':
                        this._initStyle();
                        /* falls through */
                    case '$zoomIn':
                    case '$zoomOut':
                    case '$zoomRange':
                    case '$reset':
                        // Set these on the instance
                        this[key] = value;
                        /* falls through */
                    case 'disableZoom':
                    case 'onStart':
                    case 'onChange':
                    case 'onZoom':
                    case 'onPan':
                    case 'onEnd':
                    case 'onReset':
                    case 'eventNamespace':
                        this._bind();
                        break;
                    case 'cursor':
                        $.style(this.elem, 'cursor', value);
                        break;
                    case 'minScale':
                        this.$zoomRange.attr('min', value);
                        break;
                    case 'maxScale':
                        this.$zoomRange.attr('max', value);
                        break;
                    case 'rangeStep':
                        this.$zoomRange.attr('step', value);
                        break;
                    case 'startTransform':
                        this._buildTransform();
                        break;
                    case 'duration':
                    case 'easing':
                        this._buildTransition();
                        /* falls through */
                    case 'transition':
                        this.transition();
                        break;
                    case '$set':
                        if (value instanceof $ && value.length) {
                            this.$set = value;
                            // Reset styles
                            this._initStyle();
                            this._buildTransform();
                        }
                }
            }, this));
        },


        _initStyle: function() {
            var styles = {

                'backface-visibility': 'hidden',

                'transform-origin': this.isSVG ? '0 0' : '50% 50%'
            };

            if (!this.options.disablePan) {
                styles.cursor = this.options.cursor;
            }
            this.$set.css(styles);


            var $parent = this.$parent;

            if ($parent.length && !$.nodeName($parent[0], 'body')) {
                styles = {
                    overflow: 'hidden'
                };
                if ($parent.css('position') === 'static') {
                    styles.position = 'relative';
                }
                $parent.css(styles);
            }
        },


        _resetStyle: function() {
            this.$elem.css({
                'cursor': '',
                'transition': ''
            });
            this.$parent.css({
                'overflow': '',
                'position': ''
            });
        },


        _bind: function() {
            var self = this;
            var options = this.options;
            var ns = options.eventNamespace;
            var str_start = pointerEvents ? 'pointerdown' + ns : ('touchstart' + ns + ' mousedown' + ns);
            var str_click = pointerEvents ? 'pointerup' + ns : ('touchend' + ns + ' click' + ns);
            var events = {};
            var $reset = this.$reset;
            var $zoomRange = this.$zoomRange;

            // Bind panzoom events from options
            $.each(['Start', 'Change', 'Zoom', 'Pan', 'End', 'Reset'], function() {
                var m = options['on' + this];
                if ($.isFunction(m)) {
                    events['panzoom' + this.toLowerCase() + ns] = m;
                }
            });


            if (!options.disablePan || !options.disableZoom) {
                events[str_start] = function(e) {
                    var touches;
                    if (e.type === 'touchstart' ?
                        // Touch
                        (touches = e.touches) &&
                        ((touches.length === 1 && !options.disablePan) || touches.length === 2) :
                        // Mouse/Pointer: Ignore right click
                        !options.disablePan && e.which === 1) {

                        e.preventDefault();
                        e.stopPropagation();
                        self._startMove(e, touches);
                    }
                };
            }
            this.$elem.on(events);

            // Bind reset
            if ($reset.length) {
                $reset.on(str_click, function(e) {
                    e.preventDefault();
                    self.reset();
                });
            }

            // Set default attributes for the range input
            if ($zoomRange.length) {
                $zoomRange.attr({
                    // Only set the range step if explicit or
                    // set the default if there is no attribute present
                    step: options.rangeStep === Panzoom.defaults.rangeStep &&
                        $zoomRange.attr('step') ||
                        options.rangeStep,
                    min: options.minScale,
                    max: options.maxScale
                }).prop({
                    value: this.getMatrix()[0]
                });
            }

            // No bindings if zooming is disabled
            if (options.disableZoom) {
                return;
            }

            var $zoomIn = this.$zoomIn;
            var $zoomOut = this.$zoomOut;

            // Bind zoom in/out
            // Don't bind one without the other
            if ($zoomIn.length && $zoomOut.length) {
                // preventDefault cancels future mouse events on touch events
                $zoomIn.on(str_click, function(e) {
                    e.preventDefault();
                    self.zoom();
                });
                $zoomOut.on(str_click, function(e) {
                    e.preventDefault();
                    self.zoom(true);
                });
            }

            if ($zoomRange.length) {
                events = {};

                events[(pointerEvents ? 'pointerdown' : 'mousedown') + ns] = function() {
                    self.transition(true);
                };

                events[(supportsInputEvent ? 'input' : 'change') + ns] = function() {
                    self.zoom(+this.value, {
                        noSetRange: true
                    });
                };
                $zoomRange.on(events);
            }
        },


        _unbind: function() {
            this.$elem
                .add(this.$zoomIn)
                .add(this.$zoomOut)
                .add(this.$reset)
                .off(this.options.eventNamespace);
        },


        _buildTransform: function() {

            return this._origTransform = this.getTransform(this.options.startTransform);
        },


        _buildTransition: function() {
            if (this._transform) {
                var options = this.options;
                this._transition = this._transform + ' ' + options.duration + 'ms ' + options.easing;
            }
        },


        _checkDims: function() {
            var dims = this.dimensions;
            // Rebuild if width or height is still 0
            if (!dims.width || !dims.height) {
                this.resetDimensions();
            }
            return this.dimensions;
        },


        _getDistance: function(touches) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
        },


        _getMiddle: function(touches) {
            var touch1 = touches[0];
            var touch2 = touches[1];
            return {
                clientX: ((touch2.clientX - touch1.clientX) / 2) + touch1.clientX,
                clientY: ((touch2.clientY - touch1.clientY) / 2) + touch1.clientY
            };
        },


        _trigger: function(event) {
            if (typeof event === 'string') {
                event = 'panzoom' + event;
            }
            this.$elem.triggerHandler(event, [this].concat(slice.call(arguments, 1)));
        },


        _startMove: function(event, touches) {
            var move, moveEvent, endEvent,
                startDistance, startScale, startMiddle,
                startPageX, startPageY;
            var self = this;
            var options = this.options;
            var ns = options.eventNamespace;
            var matrix = this.getMatrix();
            var original = matrix.slice(0);
            var origPageX = +original[4];
            var origPageY = +original[5];
            var panOptions = {
                matrix: matrix,
                animate: 'skip'
            };

            // Use proper events
            if (pointerEvents) {
                moveEvent = 'pointermove';
                endEvent = 'pointerup';
            } else if (event.type === 'touchstart') {
                moveEvent = 'touchmove';
                endEvent = 'touchend';
            } else {
                moveEvent = 'mousemove';
                endEvent = 'mouseup';
            }

            // Add namespace
            moveEvent += ns;
            endEvent += ns;

            // Remove any transitions happening
            this.transition(true);

            // Indicate that we are currently panning
            this.panning = true;

            // Trigger start event
            this._trigger('start', event, touches);

            if (touches && touches.length === 2) {
                startDistance = this._getDistance(touches);
                startScale = +matrix[0];
                startMiddle = this._getMiddle(touches);
                move = function(e) {
                    e.preventDefault();

                    // Calculate move on middle point
                    var middle = self._getMiddle(touches = e.touches);
                    var diff = self._getDistance(touches) - startDistance;

                    // Set zoom
                    self.zoom(diff * (options.increment / 100) + startScale, {
                        focal: middle,
                        matrix: matrix,
                        animate: false
                    });

                    // Set pan
                    self.pan(+matrix[4] + middle.clientX - startMiddle.clientX, +matrix[5] + middle.clientY - startMiddle.clientY,
                        panOptions
                    );
                    startMiddle = middle;
                };
            } else {
                startPageX = event.pageX;
                startPageY = event.pageY;

                /**
                 * Mousemove/touchmove function to pan the element
                 * @param {Object} e Event object
                 */
                move = function(e) {
                    e.preventDefault();
                    self.pan(
                        origPageX + e.pageX - startPageX,
                        origPageY + e.pageY - startPageY,
                        panOptions
                    );
                };
            }

            // Bind the handlers
            $(document)
                .off(ns)
                .on(moveEvent, move)
                .on(endEvent, function(e) {
                    e.preventDefault();
                    // Unbind all document events
                    $(this).off(ns);
                    self.panning = false;

                    e.type = 'panzoomend';
                    self._trigger(e, matrix, !matrixEquals(matrix, original));
                });
        }
    };

    // Add Panzoom as a static property
    $.Panzoom = Panzoom;

    $.fn.panzoom = function(options) {
        var instance, args, m, ret;

        // Call methods widget-style
        if (typeof options === 'string') {
            ret = [];
            args = slice.call(arguments, 1);
            this.each(function() {
                instance = $.data(this, datakey);

                if (!instance) {
                    ret.push(undefined);

                    // Ignore methods beginning with `_`
                } else if (options.charAt(0) !== '_' &&
                    typeof(m = instance[options]) === 'function' &&
                    // If nothing is returned, do not add to return values
                    (m = m.apply(instance, args)) !== undefined) {

                    ret.push(m);
                }
            });


            return ret.length ?
                (ret.length === 1 ? ret[0] : ret) :
                this;
        }

        return this.each(function() {
            new Panzoom(this, options);
        });
    };

    return Panzoom;
}));

