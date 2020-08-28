jQuery(function($) {
  "use strict";

  var _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  // parallax effect
  var parallaxEffect = function parallaxEffect(container, els) {
    var moveX, moveY;
    if (container && els) {
      container.addEventListener("mousemove", function(e) {
        moveX = (e.clientX * -1) / 20;
        moveY = (e.clientY * -1) / 20;
        els.forEach(function(el, index) {
          if (index % 2 != 0) {
            moveX = -1 * moveX;
            moveY = -1 * moveY;
          }
          el.style.transform = "translate3d(" + moveX + "px," + moveY + "px,0)";
        });
      });
    }
  };
  // isScrolledIntoView
  var isScrolledIntoView = function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect(),
      elemTop = rect.top,
      elemBottom = rect.bottom,
      isVisible;
    // Only completely visible elements return true:
    isVisible = elemTop >= -50 && elemBottom <= window.innerHeight / 2;
    return isVisible;
  };
  // active class toggle methods
  var removeClasses = function removeClasses(nodes, value) {
    if (nodes)
      return nodes.forEach(function(node) {
        return node.classList.contains(value) && node.classList.remove(value);
      });
    else return false;
  };
  var addClass = function addClass(nodes, index, value) {
    return nodes ? nodes[index].classList.add(value) : 0;
  };
  var App = {
    initHeroSlider: function initHeroSlider() {
      // hero slider
      var heroSliderOptions = {
        dots: false,
        arrows: false,
        swipe: window.innerWidth <= 576,
        responsive: [
          {
            breakpoint: 576
          }
        ]
      };
      $(".hero-right-carousel").on("breakpoint", function(
        e,
        slick,
        breakpoint
      ) {
        if (window.innerWidth <= 576)
          slick.slickSetOption("swipe", true, false);
        else slick.slickSetOption("swipe", false, false);
      });
      $(".hero-right-carousel").on("swipe", function(slick, dir) {
        setTimeout(function() {
          $(".hero-left-carousel").slick("slickGoTo", dir.currentSlide);
        }, 500);
      });
      var heroSliderPrev = $(".hero-carousel-navigation-btn.next");
      var heroSliderNext = $(".hero-carousel-navigation-btn.prev");
      if (heroSliderPrev) {
        heroSliderPrev.on("click", function() {
          $(".hero-left-carousel").slick("slickNext");
          setTimeout(function() {
            $(".hero-right-carousel").slick("slickNext");
          }, 500);
        });
      }
      if (heroSliderNext) {
        heroSliderNext.on("click", function() {
          $(".hero-left-carousel").slick("slickPrev");
          setTimeout(function() {
            $(".hero-right-carousel").slick("slickPrev");
          }, 500);
        });
      }
      $(".hero-left-carousel").slick(_extends({}, heroSliderOptions));
      $(".hero-right-carousel").slick(_extends({}, heroSliderOptions));
    },
    initServicesCircle: function initServicesCircle() {
      // services circle
      var circles = document.querySelectorAll(".inner-circle");
      var circleContents = document.querySelectorAll(".circles-content-item");
      var parent = document.querySelector(".outer-circle");
      if (parent) {
        var spreadCircles = function spreadCircles() {
          // spread the subcircles around the circle
          parent = document
            .querySelector(".outer-circle")
            .getBoundingClientRect();
          var centerX = 0;
          var centerY = 0;
          Array.from(circles)
            .reverse()
            .forEach(function(circle, index) {
              var angle = index * (360 / circles.length);
              var x =
                centerX +
                (parent.width / 2) * Math.cos((angle * Math.PI) / 180);
              var y =
                centerY +
                (parent.height / 2) * Math.sin((angle * Math.PI) / 180);
              circle.style.transform =
                "translate3d(" +
                parseFloat(x).toFixed(5) +
                "px," +
                parseFloat(y).toFixed(5) +
                "px,0)";
            });
        };
        spreadCircles();
        var resizeTimer = void 0;
        window.addEventListener("resize", function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            spreadCircles();
          }, 50);
        });
        circles.forEach(function(circle, index) {
          var circlesToggleFnc = function circlesToggleFnc() {
            var index = circle.dataset.circleIndex;
            if (!circle.classList.contains("active")) {
              removeClasses(circles, "active");
              removeClasses(circleContents, "active");
              addClass(circles, index, "active");
              addClass(circleContents, index, "active");
            }
          };
          circle.addEventListener("click", circlesToggleFnc, true);
          circle.addEventListener("mouseover", circlesToggleFnc, true);
        });
      }
    },
    initBlogCarousel: function initBlogCarousel() {
      // blog carousel
      $(".blog-carousel-wrapper").slick({
        centerMode: true,
        slidesToShow: 3,
        slideToScroll: 1,
        variableWidth: true,
        arrows: false,
        dots: true
      });
    },
    initResponsiveMenu: function initResponsiveMenu() {
      // responsive menu
      var responsiveMenu = document.querySelector(".responsive-menu");
      if (responsiveMenu) {
        document.querySelectorAll(".nav-trigger").forEach(function(el) {
          return el.addEventListener("click", function() {
            if (responsiveMenu.classList.contains("active")) {
              responsiveMenu.classList.remove("active");
              document.body.classList.remove("no-scroll");
            } else {
              responsiveMenu.classList.add("active");
              document.body.classList.add("no-scroll");
            }
          });
        });
        var subLinkToggles = document.querySelectorAll(".sublinks-toggle");
        subLinkToggles.forEach(function(el) {
          el.addEventListener("click", function() {
            var subLinks = el.nextElementSibling;
            if (subLinks.classList.contains("submenu-show")) {
              subLinks.classList.remove("submenu-show");
              el.classList.remove("menu-opened");
            } else {
              removeClasses(subLinkToggles, "menu-opened");
              subLinkToggles.forEach(function(c) {
                if (c.nextElementSibling.classList.contains("submenu-show")) {
                  c.nextElementSibling.classList.remove("submenu-show");
                }
              });
              subLinks.classList.add("submenu-show");
              el.classList.add("menu-opened");
            }
          });
        });
      }
    },
    initHomeHeroParallax: function initHomeHeroParallax() {
      // homepage hero parallax
      var homeHero = document.getElementsByClassName("hero-wrapper")[0];
      var homeHerorectangles = document.querySelectorAll(".hero-rectangle");
      parallaxEffect(homeHero, homeHerorectangles);
    },
    initMainHeroParallax: function initMainHeroParallax() {
      // main hero parallax
      var mainHero = document.getElementsByClassName("main-hero")[0];
      var mainHerorectangles = document.querySelectorAll(
        ".main-hero-rectangle"
      );
      parallaxEffect(mainHero, mainHerorectangles);
    },
    initSectionRectangles: function initSectionRectangles() {
      // section title rectangles fill effect
      var titleRectangles = document.querySelectorAll(".title-rectangle");
      if (titleRectangles) {
        window.addEventListener("scroll", function(e) {
          removeClasses(titleRectangles, "fill");
          titleRectangles.forEach(function(rect) {
            if (isScrolledIntoView(rect)) rect.classList.add("fill");
          });
        });
      }
    },
    initContactFormToggle: function initContactFormToggle() {
      // contact form toggle
      var contactFormBtn = document.getElementsByClassName(
        "contact-form-box-pulse"
      )[0];
      var contactFormWrapper = document.querySelector(".contact-form-box");
      if (contactFormBtn && contactFormWrapper) {
        contactFormBtn.addEventListener("click", function() {
          if (contactFormWrapper.classList.contains("form-active")) {
            contactFormWrapper.classList.remove("form-active");
          } else {
            contactFormWrapper.classList.add("form-active");
            window.scroll({
              top:
                window.pageYOffset +
                contactFormWrapper.getBoundingClientRect().top -
                30,
              behavior: "smooth"
            });
          }
        });
      }
    },
    initBrandVideoToggle: function initBrandVideoToggle() {
      // brand video toggle
      var brandVideoBtn = document.querySelector(".brand-video-btn");
      var brandVideoSection = document.querySelector(".brand-video");
      var brandVideoContainer = document.querySelector(".video-container");
      var brandVideoOverlay = document.querySelector(".overlay");
      var brandVideoClose = document.querySelector(".video-container-close");
      if (brandVideoBtn && brandVideoSection && brandVideoContainer) {
        brandVideoBtn.addEventListener("click", function() {
          var showBrandVideo = function showBrandVideo() {
            var video =
              brandVideoContainer.querySelector("iframe") ||
              brandVideoContainer.querySelector("video source");
            video.src = video.dataset.src;
            if (video.tagName == "SOURCE")
              brandVideoContainer.querySelector("video").load();
            document.body.classList.add("no-scroll-video");
            brandVideoSection.classList.add("video-opened");
            brandVideoOverlay.classList.add("overlay--active");
          };
          if (!brandVideoSection.classList.contains("video-opened")) {
            showBrandVideo();
          }
        });
        brandVideoClose.addEventListener("click", function() {
          var hideBrandVideo = function hideBrandVideo() {
            var video =
              brandVideoContainer.querySelector("iframe") ||
              brandVideoContainer.querySelector("video source");
            video.src = "";
            if (video.tagName == "SOURCE")
              brandVideoContainer.querySelector("video").pause();
            document.body.classList.remove("no-scroll-video");
            brandVideoSection.classList.remove("video-opened");
            brandVideoOverlay.classList.remove("overlay--active");
          };
          if (brandVideoSection.classList.contains("video-opened")) {
            hideBrandVideo();
          }
        });
      }
    },
    initAsideCarousel: function initAsideCarousel() {
      // Aside carousel
      var asideCarousel = $(".page-aside-carousel");
      if (asideCarousel) {
        var asideCarouselNavNext = $(".page-aside-carousel-nav.next");
        var asideCarouselNavPrev = $(".page-aside-carousel-nav.prev");
        $(asideCarousel).slick({
          slide: ".page-aside-carousel-item",
          slidesToShow: 1,
          slideToScroll: 1,
          dots: false,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 3000,
          zIndex: 1
        });
        asideCarouselNavNext.on("click", function() {
          return asideCarousel.slick("slickNext");
        });
        asideCarouselNavPrev.on("click", function() {
          return asideCarousel.slick("slickPrev");
        });
      }
    },
    initTabsNav: function initTabsNav() {
      // tabs nav responsive
      var tabsToggle = document.querySelectorAll(".mobile-tab-toggle-btn");
      var tabsNav = document.querySelector(".nav-tabs-wrapper");
      var tabsContent = document.querySelector(".nav.nav-tabs");
      if (tabsNav && tabsContent) {
        tabsToggle.forEach(function(tabsToggleBtn) {
          return tabsToggleBtn.addEventListener("click", function() {
            if (tabsContent.classList.contains("show-me"))
              tabsContent.classList.remove("show-me");
            else tabsContent.classList.add("show-me");
          });
        });
        var links = tabsContent.querySelectorAll(".nav-item.nav-link");
        links.forEach(function(link, i) {
          link.addEventListener("click", function() {
            window.scroll({
              top:
                window.pageYOffset +
                document
                  .querySelector(".tab-pane.active.show .grid-gallery-wrapper")
                  .getBoundingClientRect().top -
                30,
              behavior: "smooth"
            });
            tabsContent.classList.remove("show-me");
            if (i == 0) tabsContent.scrollTop = 0;
            else if (i == links.length - 1)
              tabsContent.scrollTop =
                tabsContent.scrollHeight - tabsContent.clientHeight;
            else tabsContent.scrollTop = link.offsetTop - 75;
          });
        });
      }
    },
    initReferencesCarousel: function initReferencesCarousel() {
      //references carousel
      var referencesWrapper = $(".references-wrapper");
      referencesWrapper.slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 767,
            settings: "unslick"
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
      window.addEventListener("resize", function() {
        if (window.innerWidth < 768) referencesWrapper.slick("resize");
      });
    },
    truncateBlogListItems: function truncateBlogListItems() {
      $(".blog-list-item-description").each(function() {
        var textArray = $(this)
          .text()
          .split(" ");
        while ($(this).prop("scrollHeight") > $(this).prop("offsetHeight")) {
          textArray.pop();
          $(this).text(textArray.join(" ") + "...");
        }
      });
      $(window).on("resize", function() {
        truncateBlogListItems();
      });
    },
    contactForm: function() { $('form#contact-us').submit(function() {
        $('form#contact-us .error').remove();
        var hasError = false;
        $('.requiredField').each(function() {
          if($.trim($(this).val()) == '') {
            var labelText = $(this).prev('label').text();
            $(this).parent().append('<span class="error">'+labelText+' This field is required</span>');
            $(this).addClass('inputError');
            hasError = true;
          } else if($(this).hasClass('email')) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if(!emailReg.test($.trim($(this).val()))) {
              $(this).parent().append('<span class="error"> Please enter a valid email address</span>');
              $(this).addClass('inputError');
              hasError = true;
            }
          }
        });
        if(!hasError) {
          var formInput = $(this).serialize();
          $.post('contacts.php',formInput, function(data){
            $('form#contact-us').slideUp("fast", function() {				   
              $(this).before('<p class="tick"><strong>Thank You! </strong> Your mail has arrived. The return will be made as soon as possible..</p>');
            });
          });
        }
        
        return false;	
      });
    }
  };
  App.initHeroSlider();
  App.initServicesCircle();
  App.initBlogCarousel();
  App.initResponsiveMenu();
  App.initHomeHeroParallax();
  App.initMainHeroParallax();
  App.initSectionRectangles();
  App.initContactFormToggle();
  App.initBrandVideoToggle();
  App.initAsideCarousel();
  App.initTabsNav();
  App.initReferencesCarousel();
  App.truncateBlogListItems();
  App.contactForm();
});