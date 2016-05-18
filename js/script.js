$(document).ready(function() {
  $('.main-header').parallax({
    imageSrc: "images/masthead-background1.jpg",
    naturalHeight: 2848,
    naturalWidth: 4288,
    speed: 0.5
    }
  );

  $('.unity-header').parallax({
    imageSrc: "images/unity.jpg",
    naturalHeight: 422,
    naturalWidth: 750,
    speed: 0.5
    }
  );

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
});
