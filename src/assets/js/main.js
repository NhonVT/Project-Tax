var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
var closeNav = false;
function centerNav() {
    if ($(".navbar-inr li.current").length) {
        var Left = $(".navbar-inr ul").offset().left;
        var XLeft = $(".navbar-inr li.current").offset().left;
        var Middle = $(window).width() / 2 - $(".navbar-inr li.current").width() / 2;
        $(".navbar-inr").stop().animate({ scrollLeft: XLeft - Middle - Left }, "slow");
    }
}

function fsEvent() {
    //Navbut event
    // $(document).on('click', '.nav-but', function () {
    //     if($('.navigation').hasClass('active')){
    //         $('.navigation').removeClass('active');
    //     }else{
    //         $('.navigation').addClass('active');
    //     }
    // });
 
    // if(isMobile){
    //     $(document).on('click', '.has-sub > a', function(){
    //         var that = $(this);
    //         if(that.next().hasClass('active')){
    //             that.next().removeClass('active');
    //         }else{
    //             that.next().addClass('active');
    //         }
    //     });
    // }

    //Close nav by scoll
    $(document).on("mouseenter", ".side", function () {
        closeNav = false;
    }).on("mouseleave", ".side", function () {
        closeNav = true;
    });

    //First video-item hover
    $(document).on("mouseenter", ".sprThree .video-item:nth-child(3n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
        $(this).parent().parent().parent().parent().addClass('fs_move_next');
        console.log($(this));
    }).on("mouseleave", ".sprThree .video-item:nth-child(3n + 1), .sprFive .video-item:nth-child(5n + 1), .sprSeven .video-item:nth-child(7n + 1)", function () {
        $(this).parent().parent().parent().parent().removeClass('fs_move_next');
    });

    //Last video-item hover
    $(document).on("mouseenter", ".sprThree .video-item:nth-child(3n + 3), .sprFive .video-item:nth-child(5n + 5), .sprSeven .video-item:nth-child(7n + 7)", function () {
        $(this).parent().parent().parent().parent().addClass('fs_move_prev');
    }).on("mouseleave", ".sprThree .video-item:nth-child(3n + 3), .sprFive .video-item:nth-child(5n + 5), .sprSeven .video-item:nth-child(7n + 7)", function () {
        $(this).parent().parent().parent().parent().removeClass('fs_move_prev');
    });

    //TabClick
    $(document).on('click', '.navbar-inr li', function () {
        centerNav();
    });

    //TabClick
    $(document).on('click', '.dropdown-title', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next().slideUp(250);
        } else {
            $('.dropdown-title.active').next().slideUp(250);
            $('.dropdown-title.active').removeClass('active');
            $(this).addClass('active');
            $(this).next().slideDown(250);
        }
    });

    //CLick out the box want to close
    $(document).on('click touchstart', function (event) {
        //Close  all dropdown when click out
        if ($(".select-list").has(event.target).length == 0 && !$(".select-list").is(event.target)) {
            $(".select-list").removeClass("open");
        }
        //Close  all dropdown when click out
        if ($(".user-drop").has(event.target).length == 0 && !$(".user-drop").is(event.target)) {
            $(".user-control").removeClass("show");
        }
        //Close size nav when click out
        if ($(".side").has(event.target).length == 0 && !$(".side").is(event.target) &&
            $(".nav-but").has(event.target).length == 0 && !$(".nav-but").is(event.target)) {

            if ($('.nav-but').hasClass('show')) {
                $('body').removeClass('no-scrollX');
                $(".main, .nav-but").removeClass("show");
            }

        }
    });
}

function onScroll() {
    if ($(window).width() > 1100) {
        if (closeNav) {
            $('.nav-but, .main').removeClass('show');
            $('body').removeClass('no-scrollX');
        }
    }
}

function Rotate() {
    setTimeout(function () {
        centerNav();
    }, 50);
}

function Resize() {
    if (!isMobile) {
        if ($(window).width() <= 1100) {
            setTimeout(function () {
                centerNav();
            }, 50);
        }
    }
}

$(window).on("resize", Resize);
$(window).on("orientationchange", Rotate);
$(window).on("scroll", onScroll);

(function () {
    fsEvent();
})();

