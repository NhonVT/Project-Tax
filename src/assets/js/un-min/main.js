var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
);
var CriOS = isMobile;

if (CriOS) {
    $('body').addClass('is-CriOS');
}

var activeScroll = false;
var controls = [
    'mute'
];
var isActivePage = false;
var bannerPlayer = null,
    plyrMuted = true,
    plyrVolume = 0;

function bannerVideo(vidId, type, source, timer, poster) {
    controls = ['mute'];
    //New Video Banner
    if (!bannerPlayer) {

        window.localStorage.removeItem('plyr');

        bannerPlayer = new Plyr('#playerBanner', { controls });

        bannerPlayer.muted = !isActivePage;
        bannerPlayer.currentTime = parseFloat(timer) || 0;

        bannerPlayer.on("ready", function () {
            $(".banner-video-control").addClass('show');

            var promiseBanner = bannerPlayer.play();
            if (promiseBanner !== undefined) {
                promiseBanner.then(function () {
                    $('.fs_loading_overlay').remove();
                    bannerPlayer.play();
                    activeScroll = true;
                }).catch(function (err) {
                    $('.fs_loading_overlay').remove();
                    activeScroll = true;
                });
            } else {
                $('.fs_loading_overlay').remove();
            }

        });

        bannerPlayer.on("timeupdate", function () {
            $(".fs_player_banner[data-id=" + vidId + "]").attr("data-timer", bannerPlayer.currentTime);
        });

        bannerPlayer.on('ended', function () {
            if ($(window).width() <= 1100) {
                bannerPlayer.muted = true;
            }
            if (bannerPlayer.ended) {
                setTimeout(function () {
                    if ($('.banner .pagination-bullet-active').next().length) {
                        $('.banner .pagination-bullet-active').next().trigger('click');
                    } else {
                        $('.banner .pagination-bullet:first').trigger('click');
                    }
                }, 150);
            }

        });

    } else {

        //window.localStorage.removeItem('plyr');
        bannerPlayer.currentTime = parseFloat(timer) || 0;
        bannerPlayer.source = {
            type: 'video',
            sources: [{
                src: source,
                type: 'video/mp4',
            }],
            poster: poster
        };

    }
}

var bannerSlider,
    madeforSlider,
    watchingSlider,
    trendingSlider,
    seriesSlider,
    recentlySlider,
    poppularSlider,
    suggestedSlider,
    commingSlider,
    relationSlider,
    mylistSlider,
    watchnexSlider;

function CreateBannerSlider() {
    if ($(".banner-slider").length) {
        var numberItems = $(".banner-slider").attr("data-items");

        if (numberItems <= 1) {
            $(".banner .slide-pic-nav, .banner .pagination").css({ display: "none" });
        } else {
            $(".banner .slide-pic-nav, .banner .pagination").css({ display: "block" });
        }

        bannerSlider = new Swiper(".banner-slider", {
            simulateTouch: false,
            threshold: 0,
            speed: 800,
            effect: "fade",
            paginationClickable: true,
            pagination: ".banner .pagination",
            slidesPerView: 1,
            onInit: function (swiper) {
                $(".banner-video-control").removeClass('show');
                $(".banner-video-control").append('<div class="fs_loading_overlay"><span></span></div>');
                $(".banner-item").eq(swiper.activeIndex).addClass("show");
                //Call video
                var vidInfo = $(".banner-item.item-active .fs_player_banner");
                var vidId = vidInfo.attr("data-id"),
                    type = vidInfo.attr("data-type"),
                    source = vidInfo.attr("data-video"),
                    timer = vidInfo.attr("data-timer"),
                    poster = vidInfo.attr("data-poster");
                $(".banner .area-txt[data-target=" + vidId + "]").addClass("show");
                bannerVideo(vidId, type, source, timer, poster);
            },
            onTransitionStart: function (swiper) {
                $(".banner-video-control").append('<div class="fs_loading_overlay"><span></span></div>');
                $(".banner-item, .banner .area-txt, .banner-video-control").removeClass("show");
                $(".banner-item").eq(swiper.activeIndex).addClass("show");
                //Call video
                var vidInfo = $(".banner-item.item-active .fs_player_banner");
                var vidId = vidInfo.attr("data-id"),
                    type = vidInfo.attr("data-type"),
                    source = vidInfo.attr("data-video"),
                    timer = vidInfo.attr("data-timer"),
                    poster = vidInfo.attr("data-poster");
                $(".banner .area-txt[data-target=" + vidId + "]").addClass("show");
                bannerVideo(vidId, type, source, timer, poster);
            },
            onTransitionEnd: function (swiper) { }
        });

        $('.banner .next-pic').click(function () {
            if ($('.banner .pagination-bullet-active').next().length) {
                $('.banner .pagination-bullet-active').next().trigger('click');
            } else {
                $('.banner .pagination-bullet:first').trigger('click');
            }
        });

        $('.banner .prev-pic').click(function () {
            if ($('.banner .pagination-bullet-active').prev().length) {
                $('.banner .pagination-bullet-active').prev().trigger('click');
            } else {
                $('.banner .pagination-bullet:last').trigger('click');
            }
        });

    }
}

function CreateMadeForSlider() {
    if ($("#fs_made_for .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_made_for .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_made_for .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_made_for .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            madeforSlider = new Swiper("#fs_made_for .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_made_for .next-pic",
                prevButton: "#fs_made_for .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_made_for").removeClass("no-slider");
            $("#fs_made_for").addClass("has-slider");
        } else {
            $("#fs_made_for .slide-pic-nav").css({ display: "none" });
            $("#fs_made_for").removeClass("has-slider");
            $("#fs_made_for").addClass("no-slider");
        }
    }
}

function CreateWatchingSlider() {
    if ($("#fs_watching .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_watching .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_watching .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_watching .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            watchingSlider = new Swiper("#fs_watching .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_watching .next-pic",
                prevButton: "#fs_watching .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_watching").removeClass("no-slider");
            $("#fs_watching").addClass("has-slider");
        } else {
            $("#fs_watching .slide-pic-nav").css({ display: "none" });
            $("#fs_watching").removeClass("has-slider");
            $("#fs_watching").addClass("no-slider");
        }
    }
}

function CreateTrendingSlider() {
    if ($("#fs_trending .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_trending .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_trending .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_trending .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            trendingSlider = new Swiper("#fs_trending .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_trending .next-pic",
                prevButton: "#fs_trending .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_trending").removeClass("no-slider");
            $("#fs_trending").addClass("has-slider");
        } else {
            $("#fs_trending .slide-pic-nav").css({ display: "none" });
            $("#fs_trending").removeClass("has-slider");
            $("#fs_trending").addClass("no-slider");
        }
    }
}

function CreateSeriesSlider() {
    if ($("#fs_decouverte .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_decouverte .video-slider").attr("data-items");

        if (seriesSlider) {
            seriesSlider.destroy();
            seriesSlider = undefined;
            $(
                "#fs_decouverte .item-wrapper, #fs_decouverte .video-slider"
            ).removeAttr("style");
            $("#fs_decouverte .video-slider").removeClass(
                "slide-container-horizontal"
            );
        }

        if (numberItems > 3) {
            loop = true;
            $("#fs_decouverte .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_decouverte .slide-pic-nav").css({ display: "none" });
        }

        seriesSlider = new Swiper("#fs_decouverte .video-slider", {
            loop: loop,
            simulateTouch: false,
            speed: 300,
            grabCursor: true,
            nextButton: "#fs_decouverte .next-pic",
            prevButton: "#fs_decouverte .prev-pic",
            slidesPerGroup: 1,
            slidesPerView: 3,
            breakpoints: {
                840: {
                    slidesPerGroup: 1,
                    slidesPerView: 1
                }
            },
            onInit: function (swiper) { },
            onTransitionStart: function (swiper) { },
            onTransitionEnd: function (swiper) { }
        });

        $("#fs_decouverte").addClass("has-slider");

        setTimeout(function () {
            $(".series-content, .series-paging")
                .stop()
                .animate({ opacity: 1 }, 100, "linear", function () {
                    $("#fs_decouverte").css({ height: "auto" });
                    loading = true;
                    $(".fs_loading_overlay").remove();
                });
            $("#fs_decouverte").css({ height: "auto" });
        }, 500);
    }
}

function CreateRecentlySlider() {
    if ($("#fs_recently .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_recently .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_recently .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_recently .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            recentlySlider = new Swiper("#fs_recently .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_recently .next-pic",
                prevButton: "#fs_recently .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_recently").removeClass("no-slider");
            $("#fs_recently").addClass("has-slider");
        } else {
            $("#fs_recently .slide-pic-nav").css({ display: "none" });
            $("#fs_recently").removeClass("has-slider");
            $("#fs_recently").addClass("no-slider");
        }
    }
}

function CreatePoppularSlider() {
    if ($("#fs_popular .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_popular .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_recently .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_popular .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            poppularSlider = new Swiper("#fs_popular .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_popular .next-pic",
                prevButton: "#fs_popular .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_popular").removeClass("no-slider");
            $("#fs_popular").addClass("has-slider");
        } else {
            $("#fs_popular .slide-pic-nav").css({ display: "none" });
            $("#fs_popular").removeClass("has-slider");
            $("#fs_popular").addClass("no-slider");
        }
    }
}

function CreateSuggestedSlider() {
    if ($("#fs_suggested .video-slider").length) {
        var loop = false;
        var numberItems = $("#fs_suggested .video-slider").attr("data-items");

        if ($(window).width() > 1100) {
            if (numberItems > 3) {
                loop = true;
                $("#fs_suggested .slide-pic-nav").css({ display: "block" });
            } else {
                $("#fs_suggested .slide-pic-nav").css({ display: "none" });
            }

            $("#fs_suggested").removeClass("has-sp");
            $("#fs_suggested").addClass("has-pc");
        } else if ($(window).width() > 840 && $(window).width() <= 1100) {
            if (numberItems > 2) {
                loop = true;
            }

            $("#fs_suggested .slide-pic-nav").css({ display: "none" });
            $("#fs_suggested").removeClass("has-pc");
            $("#fs_suggested").addClass("has-sp");
        } else if ($(window).width() <= 840) {
            if (numberItems > 1) {
                loop = true;
            }

            $("#fs_suggested .slide-pic-nav").css({ display: "none" });
            $("#fs_suggested").removeClass("has-pc");
            $("#fs_suggested").addClass("has-sp");
        }

        suggestedSlider = new Swiper("#fs_suggested .video-slider", {
            loop: loop,
            simulateTouch: true,
            speed: 300,
            grabCursor: true,
            nextButton: "#fs_suggested .next-pic",
            prevButton: "#fs_suggested .prev-pic",
            slidesPerGroup: 3,
            slidesPerView: 3,
            breakpoints: {
                1100: {
                    slidesPerGroup: 2,
                    slidesPerView: 2
                },
                840: {
                    slidesPerGroup: 1,
                    slidesPerView: 1
                }
            },
            onInit: function (swiper) { },
            onTransitionStart: function (swiper) { },
            onTransitionEnd: function (swiper) { }
        });

        $("#fs_suggested").addClass("has-slider");
    }
}

function CreateCommingSlider() {
    if ($("#fs_coming_soon .video-slider").length) {
        var loop = false;
        var numberItems = $("#fs_coming_soon .video-slider").attr("data-items");

        if ($(window).width() > 1100) {
            if (numberItems > 7) {
                loop = true;
                $("#fs_coming_soon .slide-pic-nav").css({ display: "block" });
            } else {
                $("#fs_coming_soon .slide-pic-nav").css({ display: "none" });
            }

            $("#fs_coming_soon").removeClass("has-sp");
            $("#fs_coming_soon").addClass("has-pc");
        } else if ($(window).width() <= 1100 && $(window).width() > 600) {
            if (numberItems > 4) {
                loop = true;
            }

            $("#fs_coming_soon .slide-pic-nav").css({ display: "none" });
            $("#fs_coming_soon").removeClass("has-pc");
            $("#fs_coming_soon").addClass("has-sp");
        } else if ($(window).width() <= 600 && $(window).width() > 520) {
            if (numberItems > 3) {
                loop = true;
            }

            $("#fs_coming_soon .slide-pic-nav").css({ display: "none" });
            $("#fs_coming_soon").removeClass("has-pc");
            $("#fs_coming_soon").addClass("has-sp");
        } else if ($(window).width() <= 520) {
            if (numberItems > 2) {
                loop = true;
            }

            $("#fs_coming_soon .slide-pic-nav").css({ display: "none" });
            $("#fs_coming_soon").removeClass("has-pc");
            $("#fs_coming_soon").addClass("has-sp");
        }

        commingSlider = new Swiper("#fs_coming_soon .video-slider", {
            loop: loop,
            simulateTouch: true,
            speed: 300,
            grabCursor: true,
            nextButton: "#fs_coming_soon .next-pic",
            prevButton: "#fs_coming_soon .prev-pic",
            slidesPerGroup: 7,
            slidesPerView: 7,
            breakpoints: {
                1100: {
                    slidesPerGroup: 4,
                    slidesPerView: 4
                },
                600: {
                    slidesPerGroup: 3,
                    slidesPerView: 3
                },
                520: {
                    slidesPerGroup: 2,
                    slidesPerView: 2
                }
            },
            onInit: function (swiper) { },
            onTransitionStart: function (swiper) { },
            onTransitionEnd: function (swiper) { }
        });
    }
}

function CreateRelationSlider() {
    if ($("#fs_relation .video-slider").length) {
        if (relationSlider) {
            relationSlider.destroy();
            relationSlider = undefined;
            $("#fs_relation .item-wrapper, #fs_relation .video-slider").removeAttr(
                "style"
            );
            $("#fs_relation .video-slider").removeClass("slide-container-horizontal");
        }

        var loop = false,
            numberItems = $("#fs_relation .video-slider").attr("data-items");

        if (numberItems > 4) {
            //loop = true;
            $("#fs_relation .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_relation .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            relationSlider = new Swiper("#fs_relation .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_relation .next-pic",
                prevButton: "#fs_relation .prev-pic",
                slidesPerGroup: 4,
                slidesPerView: 4,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_relation").removeClass("no-slider");
            $("#fs_relation").addClass("has-slider");
        } else {
            $("#fs_relation .slide-pic-nav").css({ display: "none" });
            $("#fs_relation").removeClass("has-slider");
            $("#fs_relation").addClass("no-slider");
        }
    }
}

function AddActiveButtonMylist() {
    $(".btn-mylist").addClass("active");
}

function RemoveActiveButtonMylist() {
    $(".btn-mylist").removeClass("active");
}

function CreateMyListSlider() {
    if ($("#fs_mylist .video-slider").length) {
        var loop = false,
            numberItems = $("#fs_mylist .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_mylist .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_mylist .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            mylistSlider = new Swiper("#fs_mylist .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_mylist .next-pic",
                prevButton: "#fs_mylist .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_mylist").removeClass("no-slider");
            $("#fs_mylist").addClass("has-slider");
        } else {
            $("#fs_mylist .slide-pic-nav").css({ display: "none" });
            $("#fs_mylist").removeClass("has-slider");
            $("#fs_mylist").addClass("no-slider");
        }
    }
}

function CreateWatchNextSlider() {
    if ($("#fs_watch_next .video-slider").length) {
        if (watchnexSlider) {
            watchnexSlider.destroy();
            watchnexSlider = undefined;
            $(
                "#fs_watch_next .item-wrapper, #fs_watch_next .video-slider"
            ).removeAttr("style");
            $("#fs_watch_next .video-slider").removeClass(
                "slide-container-horizontal"
            );
        }

        var loop = false,
            numberItems = $("#fs_watch_next .video-slider").attr("data-items");

        if (numberItems > 5) {
            loop = true;
            $("#fs_watch_next .slide-pic-nav").css({ display: "block" });
        } else {
            $("#fs_watch_next .slide-pic-nav").css({ display: "none" });
        }

        if ($(window).width() > 1100) {
            watchnexSlider = new Swiper("#fs_watch_next .video-slider", {
                loop: loop,
                simulateTouch: false,
                speed: 300,
                grabCursor: true,
                nextButton: "#fs_watch_next .next-pic",
                prevButton: "#fs_watch_next .prev-pic",
                slidesPerGroup: 5,
                slidesPerView: 5,
                onInit: function (swiper) { },
                onTransitionStart: function (swiper) { },
                onTransitionEnd: function (swiper) { }
            });

            $("#fs_watch_next").removeClass("no-slider");
            $("#fs_watch_next").addClass("has-slider");
        } else {
            $("#fs_watch_next .slide-pic-nav").css({ display: "none" });
            $("#fs_watch_next").removeClass("has-slider");
            $("#fs_watch_next").addClass("no-slider");
        }
    }
}

function fadeOutBox(classElement) {
    $("#fs_decouverte").css({ height: $(".series-content").outerHeight() });
    $(classElement).animate({ opacity: 0 }, 100, "linear", function () { });
}

function destroySlider() {
    if ($("#fs_made_for").length && $("#fs_made_for").hasClass("has-slider")) {
        $("#fs_made_for").removeClass("has-slider");
        $("#fs_made_for").addClass("no-slider");
        madeforSlider.destroy();
        madeforSlider = undefined;
        $("#fs_made_for .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_made_for .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_watching").length && $("#fs_watching").hasClass("has-slider")) {
        $("#fs_watching").removeClass("has-slider");
        $("#fs_watching").addClass("no-slider");
        watchingSlider.destroy();
        watchingSlider = undefined;
        $("#fs_watching .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_watching .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_trending").length && $("#fs_trending").hasClass("has-slider")) {
        $("#fs_trending").removeClass("has-slider");
        $("#fs_trending").addClass("no-slider");
        trendingSlider.destroy();
        trendingSlider = undefined;
        $("#fs_trending .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_trending .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_recently").length && $("#fs_recently").hasClass("has-slider")) {
        $("#fs_recently").removeClass("has-slider");
        $("#fs_recently").addClass("no-slider");
        recentlySlider.destroy();
        recentlySlider = undefined;
        $("#fs_recently .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_recently .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_popular").length && $("#fs_popular").hasClass("has-slider")) {
        $("#fs_popular").removeClass("has-slider");
        $("#fs_popular").addClass("no-slider");
        poppularSlider.destroy();
        poppularSlider = undefined;
        $("#fs_popular .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_popular .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_relation").length && $("#fs_relation").hasClass("has-slider")) {
        $("#fs_relation").removeClass("has-slider");
        $("#fs_relation").addClass("no-slider");
        relationSlider.destroy();
        relationSlider = undefined;
        $("#fs_relation .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_relation .video-slider").removeClass("slide-container-horizontal");
    }
    if ($("#fs_mylist").length && $("#fs_mylist").hasClass("has-slider")) {
        $("#fs_mylist").removeClass("has-slider");
        $("#fs_mylist").addClass("no-slider");
        mylistSlider.destroy();
        mylistSlider = undefined;
        $("#fs_mylist .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_mylist .video-slider").removeClass("slide-container-horizontal");
    }
    if (
        $("#fs_watch_next").length &&
        $("#fs_watch_next").hasClass("has-slider")
    ) {
        $("#fs_watch_next").removeClass("has-slider");
        $("#fs_watch_next").addClass("no-slider");
        watchnexSlider.destroy();
        watchnexSlider = undefined;
        $("#fs_watch_next .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_watch_next .video-slider").removeClass("slide-container-horizontal");
    }
}

function recreateSlider() {
    if ($("#fs_made_for").length && $("#fs_made_for").hasClass("no-slider")) {
        CreateMadeForSlider();
    }
    if ($("#fs_watching").length && $("#fs_watching").hasClass("no-slider")) {
        CreateWatchingSlider();
    }
    if ($("#fs_trending").length && $("#fs_trending").hasClass("no-slider")) {
        CreateTrendingSlider();
    }
    if ($("#fs_recently").length && $("#fs_recently").hasClass("no-slider")) {
        CreateRecentlySlider();
    }
    if ($("#fs_popular").length && $("#fs_popular").hasClass("no-slider")) {
        CreatePoppularSlider();
    }
    if ($("#fs_relation").length && $("#fs_relation").hasClass("no-slider")) {
        CreateRelationSlider();
    }
    if ($("#fs_mylist").length && $("#fs_mylist").hasClass("no-slider")) {
        CreateMyListSlider();
    }
    if ($("#fs_watch_next").length && $("#fs_watch_next").hasClass("no-slider")) {
        CreateWatchNextSlider();
    }
}

function CommonSliderPC() {
    // The sliders use for destop + mobile
    if ($("#fs_coming_soon").length && $("#fs_coming_soon").hasClass("has-sp")) {
        $("#fs_coming_soon").removeClass("has-sp");
        $("#fs_coming_soon").addClass("has-pc");
        commingSlider.destroy();
        commingSlider = undefined;
        $("#fs_coming_soon .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_coming_soon .video-slider").removeClass(
            "slide-container-horizontal"
        );
        setTimeout(function () {
            CreateCommingSlider();
        }, 10);
    }
    if ($("#fs_suggested").length && $("#fs_suggested").hasClass("has-sp")) {
        $("#fs_suggested").removeClass("has-sp");
        $("#fs_suggested").addClass("has-pc");
        suggestedSlider.destroy();
        suggestedSlider = undefined;
        $("#fs_suggested .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_suggested .video-slider").removeClass("slide-container-horizontal");
        setTimeout(function () {
            CreateSuggestedSlider();
        }, 10);
    }
}

function CommonSliderSP() {
    // The sliders use for destop + mobile
    if ($("#fs_coming_soon").length && $("#fs_coming_soon").hasClass("has-pc")) {
        $("#fs_coming_soon").removeClass("has-pc");
        $("#fs_coming_soon").addClass("has-sp");
        commingSlider.destroy();
        commingSlider = undefined;
        $("#fs_coming_soon .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_coming_soon .video-slider").removeClass(
            "slide-container-horizontal"
        );
        setTimeout(function () {
            CreateCommingSlider();
        }, 10);
    }
    if ($("#fs_suggested").length && $("#fs_suggested").hasClass("has-pc")) {
        $("#fs_suggested").removeClass("has-pc");
        $("#fs_suggested").addClass("has-sp");
        suggestedSlider.destroy();
        suggestedSlider = undefined;
        $("#fs_suggested .item-wrapper, #fs_decouverte .video-slider").removeAttr(
            "style"
        );
        $("#fs_suggested .video-slider").removeClass("slide-container-horizontal");
        setTimeout(function () {
            CreateSuggestedSlider();
        }, 10);
    }
}

function centerNav() {
    if ($(".navbar-inr li.current").length) {
        var Left = $(".navbar-inr ul").offset().left;
        var XLeft = $(".navbar-inr li.current").offset().left;
        var Middle = $(window).width() / 2 - $(".navbar-inr li.current").width() / 2;
        $(".navbar-inr").stop().animate({ scrollLeft: XLeft - Middle - Left }, "slow");
        ImgLazyLoad();
    }
}

function addFullScreen() {
    $("body").addClass("show-fullscreen");
}

function removeFullScreen() {
    $("body").removeClass("show-fullscreen");
}

var loading = true,
    videoTimer = 0,
    player;

var closeNav = false;
function fsEvent() {

    //First video-item hover
    $(document).on("mouseenter", ".sprTwo .video-item:nth-child(2n + 1), .sprThree .video-item:nth-child(3n + 1), .sprFour .video-item:nth-child(4n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSix .video-item:nth-child(6n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
        $(this).parent().parent().addClass('fs_move_next');
    }).on("mouseleave", ".sprTwo .video-item:nth-child(2n + 1), .sprThree .video-item:nth-child(3n + 1), .sprFour .video-item:nth-child(4n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSix .video-item:nth-child(6n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
        $(this).parent().parent().removeClass('fs_move_next');
    });

    //Last video-item hover
    $(document).on("mouseenter", ".sprTwo .video-item:nth-child(2n + 2), .sprThree .video-item:nth-child(3n + 3), .sprFour .video-item:nth-child(4n + 4), .sprFive .video-item:nth-child(5n + 5), .sprSix .video-item:nth-child(6n + 6), .sprSeven .video-item:nth-child(7n + 7)", function () {
        $(this).parent().parent().addClass('fs_move_prev');
    }).on("mouseleave", ".sprTwo .video-item:nth-child(2n + 2), .sprThree .video-item:nth-child(3n + 3), .sprFour .video-item:nth-child(4n + 4), .sprFive .video-item:nth-child(5n + 5), .sprSix .video-item:nth-child(6n + 6), .sprSeven .video-item:nth-child(7n + 7)", function () {
        $(this).parent().parent().removeClass('fs_move_prev');
    });

    $(document).on("mouseenter", ".video-item:not(.byClick)", function () {
        if (!$(this).hasClass('byMylist')) {
            controls = [];
            var that = $(this);
            var vidId = that.find('.fs_player').attr('data-id');
            var curTimer = parseFloat(that.find('.fs_player').attr('data-timer')) || 0;

            if (player) {
                player.destroy();
                player = null;
            }

            window.localStorage.removeItem('plyr');
            var curVid = that.find('.player');
            player = new Plyr(curVid, { controls });
            player.on('ready', function () {
                if (player && player !== null && player.ready && !player.loading) {
                    var promiseplayer = player.play();
                    if (promiseplayer !== undefined) {
                        promiseplayer.then(function () {
                            player.muted = true;
                            player.currentTime = curTimer;
                            player.play();
                        }).catch(function (err) {
                        });
                    }
                }
            });
            player.on('timeupdate', function () {
                $('.fs_player[data-id=' + vidId + ']').attr('data-timer', player.currentTime);
            });
        }

    }).on("mouseleave", ".video-item:not(.byClick)", function () {
        if (!$(this).hasClass('byMylist')) {
            if (player) {
                player.destroy();
                player = null;
            }
            var videoMode = $(this).find('.fs_player');
            var html = '<div class="player" data-target="' + videoMode.attr('data-id') + '" data-plyr-provider="' + videoMode.attr('data-type') + '" data-plyr-embed-id="' + videoMode.attr('data-video') + '" poster="' + videoMode.attr('data-poster') + '"></div>';
            videoMode.html(html);
        }
    });

    //Close nav by scoll
    $(document).on("mouseenter", ".side", function () {
        closeNav = false;
    }).on("mouseleave", ".side", function () {
        closeNav = true;
    });

    //Show playlist video
    $(document).on('click', '.byClick', function () {
        var id = $(this).attr('rel');
        $("#idSelectedVideoFromPlaylist").val(id);
        $("#btnPlayVideo").click();

    });

    //Search event
    $(document).on('click', '.search-clean', function () {
        $('#txt_search').val('');
    });

    $(document).on('click', '.search-but', function () { //Open search input
        if ($(window).width() <= 1100) {
            scrollPos = curPos;
            $('body').addClass('no-scroll');
            $('.search-block').addClass('active');
        }
    });

    $(document).on('click', '.search-cancel', function () { //Close search input
        $('.search-block').removeClass('active');
        if ($(window).width() <= 1100) {
            $('body').removeClass('no-scroll');
            $('html,body').scrollTop(scrollPos);
        }
    });

    //Navbut event
    $(document).on('click', '.nav-but', function () {
        if ($(this).hasClass('show')) {
            $('body').removeClass('no-scrollX');
            $('.nav-but, .main').removeClass('show');
            $('html,body').scrollTop(scrollPos);
        } else {
            scrollPos = curPos;
            $('body').addClass('no-scrollX');
            $('.nav-but, .main').addClass('show');
        }
    });
    //Navbut event
    $(document).on('click', function (e) {
        if (!($(e.target).parents('#language-select').length > 0 || $(e.target).hasClass('select-language'))) {
            $('.user-area,.main').removeClass('open');
        }
    });

    $(document).on('click', '.login-inner', function () {
        if ($('#language-select').parent().hasClass('cnt-wrap')) {
            $('.cnt-wrap').removeClass('open');
        }
    });

    //Toggle nav has-child
    $(document).on('click', '.has-child > a', function () {
        if ($(this).hasClass('hide-items')) {
            $(this).removeClass('hide-items');
            $(this).next().slideDown(250);
        } else {
            $(this).addClass('hide-items');
            $(this).next().slideUp(250);
        }
    });

    //User event
    $(document).on('click', '.user-drop', function () {
        if ($(this).hasClass('show')) {
            $('.user-control, .user-drop').removeClass('show');
        } else {
            $('.user-control, .user-drop').addClass('show');
        }
    });

    //Go top event
    $(document).on('click', '.goTop', function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow');
    });

    //Check maxlength textarea
    $(document).on('keyup', 'textarea[maxlength]', function () {
        var len = $(this).val().length;
        $('.limit-input .limit').html(0 + len);
    });

    //CLick out the box want to close
    $(document).on('click touchstart', function (event) {
        //Close  all dropdown when click out
        if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)) {
            $(".select-list").removeClass("open");
        }

        //Close size nav when click out
        if ($(".side").has(event.target).length == 0 && !$(".side").is(event.target) &&
            $(".nav-but").has(event.target).length == 0 && !$(".nav-but").is(event.target)) {

            if ($('.nav-but').hasClass('show')) {
                $('body').removeClass('no-scrollX');
                $(".main, .nav-but").removeClass("show");
                if ($(window).width() <= 1100) {
                    $('html,body').scrollTop(scrollPos);
                }
            }

        }

        //Close  all dropdown when click out
        if ($(".user-drop").has(event.target).length == 0 && !$(".user-drop").is(event.target)) {
            $(".user-control").removeClass("show");
        }

        activePage();

    });

    //Explore event
    $(document).on('click', '.explore-but', function (event) {
        $('html, body').stop().animate({ scrollTop: 0 }, 'slow');
    });

    $(document).on('click', '.btn-mylist', function () {
        $(".custom-large-checkbox.scroll-panel ul").animate({ "scrollTop": 0 });
    });

}

function searchClick() {
    $(".search-block").removeClass("active");
    $("body").removeClass("no-scroll");
}

function dropdownTitleClick(id) {
    if ($("#" + id).hasClass("active")) {
        $("#" + id).removeClass("active");
        $("#" + id)
            .next()
            .slideUp(250);
    } else {
        $(".dropdown-title.active")
            .next()
            .slideUp(250);
        $(".dropdown-title.active").removeClass("active");

        $("#" + id).addClass("active");
        $("#" + id)
            .next()
            .slideDown(250);
    }
}

function clickOnSelectHeader(id) {
    $(".user-drop, .user-control").removeClass("show");
    var box = $("#" + id).parent();
    if (box.hasClass("open")) {
        box.removeClass("open");
    } else {
        $(".select-list").removeClass("open");
        box.addClass("open");
    }
}

function closeSelectList(id) {
    $("#" + id)
        .parent()
        .removeClass("open");
}

function setCurrentMenuActive(idMenu, idNavbar) {
    $(".navbar-inr li, .section-box").removeClass("current");
    $("#" + idNavbar).addClass("current");
    $("#" + idMenu).addClass("current");
    centerNav();
}

function closeNavBut() {
    $('body').removeClass('no-scrollX');
    $('.nav-but, .main').removeClass('show');
    $('html,body').scrollTop(scrollPos);
}

function showSignInPopup() {
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".signin-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
    $('.wrap-popup-content').removeClass('show-message');
}

function closePopupClick() {
    $(".cnt-wrap").removeClass("blur");
    $(".overlay-inr").addClass("hide");
    $("body").removeClass("no-scroll");
    $(".overlay-popup").removeClass("active");
    $('.wrap-popup-content').removeClass('show-message');
    $(".overlay-message").addClass("hide");
}

function addMyListOverlay() {
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".create-mylist-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
    if ($(".custom-large-checkbox.scroll-panel ul").getNiceScroll()) {
        $(".custom-large-checkbox.scroll-panel ul")
            .getNiceScroll()
            .remove();
    }
}

function showPopupMyList() {
    $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, "slow");
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".add-mylist-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
    ScrollCheckBox();
}

function showPopupShare() {
    $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, "slow");
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".share-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
    // ScrollCheckBox();
}

function showForgotPasswordPage() {
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".forgot-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
}

function showSignupPopup() {
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".signup-overlay").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
}


function showSetNewPassPopup() {
    $(".cnt-wrap").addClass("blur");
    $(".overlay-inr").addClass("hide");
    $(".set-new-password").removeClass("hide");
    $("body").addClass("no-scroll");
    $(".overlay-popup").addClass("active");
}


//Pause Video
function openVideo() {
    if ($(".banner-video-control").length) {
        if (bannerPlayer && bannerPlayer.ready && !bannerPlayer.loading) {
            bannerPlayer.play();
        }
    }
}

function pauseVideo() {
    if ($(".banner-video-control").length) {
        if (bannerPlayer && bannerPlayer.ready && !bannerPlayer.loading) {
            bannerPlayer.pause();
        }
    }
}


function destroyFullPlayer() {
    if (!$(".banner-video-control").length) {
        if (bannerPlayer) {
            bannerPlayer.destroy();
            bannerPlayer = null;
        }
    }

    if (!$(".overlay-login").length && !$(".overlay-categories").length) {
        if (fullPlayer) {
            fullPlayer.destroy();
            fullPlayer = null;
        }
    }
}

function showLoading(id) {
    $("#" + id).append('<div class="fs_loading_overlay"><span></span></div>');
}

function hideLoading() {
    $(".fs_loading_overlay").remove();
}

function showMessage() {
    $('.wrap-popup-content').addClass('show-message');
}

//Scroll for categories
function ScrollBox() {
    if ($(".panel-inr .scroll-panel").length) {
        if ($(window).width() <= 1100) {
            $(".panel-inr .scroll-panel ul")
                .getNiceScroll()
                .remove();
        } else {
            $(".panel-inr .scroll-panel ul").css({ overflow: "hidden" });
            $(".panel-inr .scroll-panel ul")
                .getNiceScroll()
                .show();
            $(".panel-inr .scroll-panel ul").niceScroll({
                touchbehavior: false,
                horizrailenabled: false,
                cursordragontouch: true,
                grabcursorenabled: true
            });
        }
    }
}
function ScrollCheckBox() {
    if ($(".custom-large-checkbox.scroll-panel").length) {
        if ($(window).width() <= 1100) {
            $(".custom-large-checkbox.scroll-panel ul")
                .getNiceScroll()
                .remove();
        } else {
            $(".custom-large-checkbox.scroll-panel ul").css({ overflow: "hidden" });
            $(".custom-large-checkbox.scroll-panel ul")
                .getNiceScroll()
                .show();
            $(".custom-large-checkbox.scroll-panel ul").niceScroll({
                touchbehavior: false,
                horizrailenabled: false,
                cursordragontouch: true,
                grabcursorenabled: true
            });
        }
    }
}

//Comment
var myComment;
function getComment(obj, url, name, dataComment, sortKey, translate, isNext) {
    myComment = $(obj).comments({
        profilePictureURL: url,
        roundProfilePictures: true,
        youText: name,
        textareaRows: 3,
        textareaRowsOnFocus: 3,
        maxRepliesVisible: 1,
        enableAttachments: false,
        enableHashtags: true,
        defaultNavigationSortKey: sortKey,
        textareaPlaceholderText: translate.placeholder,
        newestText: translate.sortNewest,
        oldestText: translate.sortOldest,
        replyText: translate.reply,
        viewAllRepliesText: translate.replyView,
        hideRepliesText: translate.repylHide,
        loadMoreText: translate.buttonLoadMore,
        enableEditing: false,
        isNext: isNext,

        getComments: function (success, error) {
            setTimeout(function () {
                success(dataComment);
            }, 250);
        },
        postComment: function (data, success, error) {
            localStorage.setItem("comment", JSON.stringify(data));
            $("#post-comment").trigger("click");
            setTimeout(function () {
                var dataSave = JSON.parse(localStorage.getItem("commentSave"));
                if (dataSave != null && dataSave != "" && dataSave != undefined) {
                    success(dataSave);
                    localStorage.removeItem("commentSave");
                    localStorage.removeItem("comment");
                }
            }, 350);
        },
        putComment: function (data, success, error) { },
        deleteComment: function (data, success, error) { },
        upvoteComment: function (data, success, error) {
            localStorage.setItem("comment", JSON.stringify(data));
            $("#like").trigger("click");
            setTimeout(function () {
                var dataSave = JSON.parse(localStorage.getItem("commentSave"));
                if (dataSave != null && dataSave != "" && dataSave != undefined) {
                    success(dataSave);
                    localStorage.removeItem("commentSave");
                    localStorage.removeItem("comment");
                }
            }, 350);
        },
        downvoteComment: function (data, success, error) {
            localStorage.setItem("comment", JSON.stringify(data));
            $("#like").trigger("click");
            setTimeout(function () {
                var dataSave = JSON.parse(localStorage.getItem("commentSave"));
                if (dataSave != null && dataSave != "" && dataSave != undefined) {
                    success(dataSave);
                    localStorage.removeItem("commentSave");
                    localStorage.removeItem("comment");
                }
            }, 350);
        },
        loadMoreComment: function (callback) {
            $("#loadmore").trigger("click");
            setTimeout(function () {
                var dataLoadmore = JSON.parse(localStorage.getItem("commentLoadMore"));
                var isNextLoadMore = localStorage.getItem("isNextLoadMore");
                if (isNextLoadMore != null) {
                    callback(dataLoadmore, isNextLoadMore);
                    localStorage.removeItem("commentLoadMore");
                    localStorage.removeItem("isNextLoadMore");
                }
            }, 350);
        },
        toggleReplies: function (callback) {
            setTimeout(function () {
                var childComment = JSON.parse(localStorage.getItem("loadChildComment"));
                if (childComment != null) {
                    callback(childComment);
                    localStorage.removeItem("loadChildComment");
                }
            }, 350);
        },
        loadMoreReply: function (callback) {
            setTimeout(function () {
                var childComment = JSON.parse(localStorage.getItem("loadChildComment"));
                if (childComment != null) {
                    callback(childComment);
                    localStorage.removeItem("loadChildComment");
                }
            }, 350);
        },
        uploadAttachments: function (dataArray, success, error) { },
        refresh: function (data, success, error) { }
    });
}

var fullPlayer = null,
    checkVideoFullPromise = false;

function videoFull() {

    window.localStorage.removeItem('plyr');
    controls = [];
    fullPlayer = new Plyr(document.querySelector(".full-player"), { controls });
    fullPlayer.muted = !isActivePage;

    fullPlayer.on("ready", function () {
        var promiseFull = fullPlayer.play();
        if (promiseFull !== undefined) {
            promiseFull.then(function () {
                var currentTimeVideoFull = parseInt(window.localStorage.getItem("curentTimeVideoFull"), 10) | 0;
                fullPlayer.currentTime = currentTimeVideoFull;
                fullPlayer.play();
            }).catch(function (err) {
            });
        }
    });
    fullPlayer.on("timeupdate", function () {
        window.localStorage.setItem("curentTimeVideoFull", fullPlayer.currentTime);
    });
    fullPlayer.on("ended", function (event) {
        fullPlayer.play();
    });

}

function ImgLazyLoad() {
    var winH = $(window).height();
    lazyImages = [];

    if ($('.section-content').length) {
        lazyImages = window.innerWidth > 1100 ? document.querySelectorAll('.cmPic.lazy') : document.querySelectorAll('.current .cmPic.lazy');
        lazyBgs = window.innerWidth > 1100 ? document.querySelectorAll('.cmBg.lazy') : document.querySelectorAll('.current .cmBg.lazy');
    } else {
        lazyImages = document.querySelectorAll('.cmPic.lazy');
        lazyBgs = document.querySelectorAll('.cmBg.lazy');
    }

    [].slice.call(lazyImages).forEach(function (elm) {
        if (elm.getBoundingClientRect().top <= winH + 150) {
            var src = elm.getAttribute('data-src');
            elm.setAttribute('src', src);
            elm.classList.remove('lazy');
        }
    });

    [].slice.call(lazyBgs).forEach(function (elm) {
        if (elm.getBoundingClientRect().top <= winH + 150) {
            var src = elm.getAttribute('data-src');
            elm.style.backgroundImage = 'url(' + src + ')';
            elm.classList.remove('lazy');
        }
    });
}

var curPos,
    scrollPos,
    delTop = 100,
    limitPos = 250;

function onScroll() {

    curPos = $(window).scrollTop();

    var Banner = $('.navbar-box').prev().find('>div').height();

    if ($(window).width() <= 1100) {
        limitPos = 70;
    } else {
        limitPos = 250;
        if (closeNav) {
            $('.nav-but, .main').removeClass('show');
            $('body').removeClass('no-scrollX');
        }
    }

    if (curPos >= $(window).height() / 2) {
        $('.goTop').addClass('show');
    } else {
        $('.goTop').removeClass('show');
    }

    [].slice.call(document.querySelectorAll('.section-box')).forEach(function (elm) {
        if (elm.getBoundingClientRect().top <= $(window).height() - delTop) {
            elm.classList.add('ani');
        }
    });

    if ($('.navbar-inr').length) {

        if (curPos >= Banner + 50) {
            $('.navbar-inr').addClass('fixed');
        } else {
            $('.navbar-inr').removeClass('fixed');
        }

    }

    if (activeScroll) {

        if (curPos > limitPos) {
            pauseAboutPlayer();
            pauseVideo();
        } else {
            openAboutPlayer();
            openVideo();
        }

        [].slice.call(document.querySelectorAll('.explore')).forEach(function (elm) {
            if (elm.getBoundingClientRect().top > 0 && (elm.getBoundingClientRect().top <= $(window).height() - delTop)) {
                openVideoAdv();
            } else {
                pauseVideoAdv();
            }
        });

        [].slice.call(document.querySelectorAll('.about-business')).forEach(function (elm) {
            if (elm.getBoundingClientRect().top > 0 && (elm.getBoundingClientRect().top <= $(window).height() - delTop)) {
                openBusinessPlayer();
            } else {
                pauseBusinessPlayer();
            }
        });

        [].slice.call(document.querySelectorAll('.about-heart')).forEach(function (elm) {
            if (elm.getBoundingClientRect().top > 0 && (elm.getBoundingClientRect().top <= $(window).height() - delTop)) {
                openHeartPlayer();
            } else {
                pauseHeartPlayer();
            }
        });

    }

    ImgLazyLoad();

}

function Rotate() {
    ImgLazyLoad();
    setTimeout(function () {
        CommonSliderSP();
        centerNav();
    }, 50);
}

function Resize() {
    if (!isMobile) {
        setTimeout(function () {
            ScrollBox();
            ScrollCheckBox();
            ImgLazyLoad();
        }, 50);

        if ($(window).width() <= 1100) {
            setTimeout(function () {
                destroySlider();
                CommonSliderSP();
                centerNav();
            }, 50);
        } else {
            setTimeout(function () {
                recreateSlider();
                CommonSliderPC();
            }, 50);

            if ($(".search-block").hasClass("active")) {
                $("body").removeClass("no-scroll");
                $(".search-block").removeClass("active");
            }
        }
    }
}
function uploadAvatarProfile() {
    if (document.getElementById("fileImage")) {
        document.getElementById("fileImage").onchange = function (ev) {
            if (ev) {
                uploadFile(ev.target.files[0]);
            }
        };
    }
}
//Upload profile image
function uploadFile(file) {
    var type = file.type.split("/")[1];
    var reader = new FileReader();

    reader.onload = function (e) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        var maxW = 200,
            fileName = file.name;

        var img = document.createElement("img");
        img.src = e.target.result;

        img.onload = function () {
            var imgW = img.width;
            var imgH = img.height;

            canvas.width = maxW;
            canvas.height = (maxW * imgH) / imgW;

            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                0,
                0,
                canvas.width,
                canvas.height
            );

            //Can change quality
            //dataurl = canvas.toDataURL();
            dataurl = canvas.toDataURL(file.type, 0.5);

            $("#imgAvatar").attr("src", dataurl);
            $("#avatarProfileImage").val(dataurl);
        };
    };

    reader.readAsDataURL(file);
}

function hideSection() {
    activeScroll = false;
    checkLanguage();
    $(".main-inr").addClass("hide-section");
}

function showSection() {
    $(".main-inr").removeClass("hide-section");
    AboutSettup();
    setTimeout(function () {
        activeScroll = true;
        onScroll();
    }, 50);

}

function checkLanguage() {
    var CurrentLanguage = window.localStorage.getItem("CurrentLanguage");
    if (CurrentLanguage && CurrentLanguage == "2") {
        $("body").addClass("vi");
        $("body").removeClass("en");
        document.title = 'Trang chủ | OMPALO';
    } else {
        $("body").addClass("en");
        $("body").removeClass("vi");
        document.title = 'Home | OMPALO';
    }
}

function fsGoTop() {
    $("html, body")
        .stop()
        .animate({ scrollTop: 0 }, 300);
}

function removeNavBarFixClass() {
    $(".navbar-inr").removeClass("fixed");
}

var bannerAdv;
function advBannerSetUp() {
    if ($('.explore').length) {
        controls = [];
        window.localStorage.removeItem('plyr');
        bannerAdv = new Plyr($('#playerMp4'), { controls });
        bannerAdv.on("ready", function () {
            bannerAdv.muted = true;
            bannerAdv.loop = true;
        });
    }

}

var advPromise = false;
function pauseVideoAdv() {
    if ($(".explore").length) {
        if (bannerAdv && bannerAdv.ready && !bannerAdv.loading) {
            bannerAdv.pause();
        }
    }
}

function openVideoAdv() {
    if ($(".explore").length) {
        if (bannerAdv && bannerAdv.ready && !bannerAdv.loading) {
            if (window.innerWidth > 1100) {
                var promiseAdv = bannerAdv.play();
                if (promiseAdv !== undefined) {
                    promiseAdv.then(function () {
                        bannerAdv.play();
                        advPromise = true;
                    }).catch(function (err) {
                    });
                }

            } else {
                if (advPromise) {
                    bannerAdv.pause();
                }
            }
        }
    }
}

var aboutPlayerTop,
    businessPlayer,
    heartPlayer;
function BannerAboutSetUp() {

    controls = [];
    window.localStorage.removeItem('plyr');

    if ($('#aboutPlayerTop').length) {
        aboutPlayerTop = new Plyr($('#aboutPlayerTop'), { controls });
        aboutPlayerTop.muted = !isActivePage;

        aboutPlayerTop.on("ready", function () {
            $('.about-banner').addClass('show');
            var promiseAboutTop = aboutPlayerTop.play();
            if (promiseAboutTop !== undefined) {
                promiseAboutTop.then(function () {
                    aboutPlayerTop.play();
                    activeScroll = true;
                    aboutPlayerTop.loop = true;
                }).catch(function (err) {
                    activeScroll = true;
                });
            }
        });
    }

    if ($('#businessPlayer').length) {
        businessPlayer = new Plyr($('#businessPlayer'), { controls });
        businessPlayer.muted = !isActivePage;
        var promiseBusinessPlay = businessPlayer.play();
        businessPlayer.on("ready", function () {
            if (promiseBusinessPlay !== undefined) {
                promiseBusinessPlay.then(function () {
                    businessPlayer.loop = true;
                }).catch(function (err) {
                });
            }
        });
    }

    if ($('#heartPlayer').length) {
        heartPlayer = new Plyr($('#heartPlayer'), { controls });
        heartPlayer.muted = !isActivePage;
        var promiseHeartPlayer = heartPlayer.play();
        heartPlayer.on("ready", function () {
            if (promiseHeartPlayer !== undefined) {
                promiseHeartPlayer.then(function () {
                    heartPlayer.loop = true;
                }).catch(function (err) {
                });
            }
        });
    }

}

function pauseAboutPlayer() {
    if ($("#aboutPlayerTop").length) {
        if (aboutPlayerTop && aboutPlayerTop.ready && !aboutPlayerTop.loading) {
            aboutPlayerTop.pause();
        }
    }
}

function openAboutPlayer() {
    if ($("#aboutPlayerTop").length) {
        if (aboutPlayerTop && aboutPlayerTop.ready && !aboutPlayerTop.loading) {
            aboutPlayerTop.play();
        }
    }
}

function pauseBusinessPlayer() {
    if ($("#businessPlayer").length) {
        if (businessPlayer && businessPlayer.ready && !businessPlayer.loading) {
            businessPlayer.pause();
        }
    }
}

function openBusinessPlayer() {
    if ($("#businessPlayer").length) {
        if (businessPlayer && businessPlayer.ready && !businessPlayer.loading) {
            businessPlayer.play();
        }
    }
}

function pauseHeartPlayer() {
    if ($("#heartPlayer").length) {
        if (heartPlayer && heartPlayer.ready && !heartPlayer.loading) {
            heartPlayer.pause();
        }
    }
}

function openHeartPlayer() {
    if ($("#heartPlayer").length) {
        if (heartPlayer && heartPlayer.ready && !heartPlayer.loading) {
            heartPlayer.play();
        }
    }
}

function marquee(id, vector, speed) {
    $(id).grouploop({
        velocity: speed,
        forward: vector,
        pauseOnHover: false,
        childNode: ".item",
        childWrapper: ".item-wrap",
        complete: function () {
        },
        stickFirstItem: true
    });
}

function AboutSettup() {
    //About
    BannerAboutSetUp();

    setTimeout(function () {
        if ($('.promo-carousel').length) {
            var direction = true;
            $('.promo-carousel').each(function (index, elm) {
                var id = $(elm).attr('id');
                if (id) {
                    direction = !direction;
                    marquee('#' + id, direction, 1);
                }
            });
        }
    }, 50);
}

function destroyAllVideo() {
    if (bannerPlayer != null && bannerPlayer != undefined && bannerPlayer != "") {
        bannerPlayer.destroy();
        bannerPlayer = null;
    }
    if (player != null && player != undefined && player != "") {
        player.destroy();
        player = null;
    }
    if (fullPlayer != null && fullPlayer != undefined && fullPlayer != "") {
        fullPlayer.destroy();
        fullPlayer = null;
    }
    if (bannerAdv != null && bannerAdv != undefined && bannerAdv != "") {
        bannerAdv.destroy();
        bannerAdv = null;
    }
    if (aboutPlayerTop != null && aboutPlayerTop != undefined && aboutPlayerTop != "") {
        aboutPlayerTop.destroy();
        aboutPlayerTop = null;
    }
    if (businessPlayer != null && businessPlayer != undefined && businessPlayer != "") {
        businessPlayer.destroy();
        businessPlayer = null;
    }
    if (heartPlayer != null && heartPlayer != undefined && heartPlayer != "") {
        heartPlayer.destroy();
        heartPlayer = null;
    }
}


$(window).on("scroll", onScroll);

$(window).on("resize", Resize);

window.onbeforeunload = function () {
    //localStorage saving here
    $('html,body').scrollTop(0);
    return null; //Will not halt the unload from happening
};

$(window).on("load", function () {
    $("body").addClass("ready");
    onScroll();

    //Events
    fsEvent();
});

function activePage() {
    if ($(window).width() <= 1100) {
        isActivePage = false;
    } else {
        isActivePage = true;
    }
}

function setTitleMain(title, image) {
}

function getActivePageFlag() {
    return isActivePage;
}

function getCriOS() {
    return CriOS;
}

$(window).on("orientationchange", Rotate);

(function () {
    ImgLazyLoad();
    checkLanguage();
    ScrollBox();
    var interval;

    if ($(window).width() > 1100) {
        interval = setInterval(function () {
            if (isActivePage) {
                if (bannerPlayer && bannerPlayer.ready) {
                    bannerPlayer.muted = false;
                }
                if (fullPlayer && fullPlayer.ready) {
                    fullPlayer.muted = false;
                }
                if (aboutPlayerTop && aboutPlayerTop.ready) {
                    aboutPlayerTop.muted = false;
                }
                if (businessPlayer && businessPlayer.ready) {
                    businessPlayer.muted = false;
                }
                if (heartPlayer && heartPlayer.ready) {
                    heartPlayer.muted = false;
                }
                clearInterval(interval);
                interval = null;
            }
        }, 100);
    } else {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

})();

