(function() {
  $(document).ready(function() {

    // parallax header
    $('.main-header').parallax({
      imageSrc: "images/masthead-background1.jpg",
      naturalHeight: 2848,
      naturalWidth: 4288,
      speed: 0.5
    });

    $('.unity-header').parallax({
      imageSrc: "images/unity/unity.jpg",
      naturalHeight: 422,
      naturalWidth: 750,
      speed: 0.5
    });

    // menu scroll effect
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= 600) {
        $('.navbar').addClass('solidBackground');
      }
      else {
        $('.navbar').removeClass('solidBackground');
      }
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 800);
          return false;
        }
      }
    });

    // pdf resume popup
    $('.resume-popup').click(function() {
      $('#resume').fadeIn();
    });
  });
})();
