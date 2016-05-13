'use strict';
(function() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var container = $('#portfolio');
  var body = document.querySelector('body');

  var triangles = [];
  var dimension = 600;
  var iterate = 0;
  var tri = {};


  $(window).resize(respondCanvas);

  function respondCanvas() {
    canvas.height = container.height() - 200;
    canvas.width = container.width() / 2;

    tri = {
      color: '#DBC0FA',
      leftY: canvas.height - 200,
      leftX: 0,
      rightY: canvas.height - 200,
      rightX: dimension,
      topY: (canvas.height - 200) - Math.sqrt(3) * dimension / 2,
      topX: dimension / 2,
      dim: dimension
    };

    initialize();
  }

  respondCanvas();

  function fractalIteration(iterateMax) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < iterateMax; i++) {
      for (i in triangles) {
        if (triangles[i].color === '#DBC0FA') {
          tri = {
            color: '#D2B2F8',
            leftY: (triangles[i].leftY + triangles[i].topY) / 2,
            leftX: (triangles[i].leftX + triangles[i].topX) / 2,
            rightY: (triangles[i].rightY + triangles[i].topY) / 2,
            rightX: (triangles[i].rightX + triangles[i].topX) / 2,
            topY: triangles[i].topY + Math.sqrt(3) * triangles[i].dim / 2,
            topX: triangles[i].topX,
            dim: triangles[i].dim / 2
          };

          triangles.push(tri);

          // top
          tri = {
            color: '#DBC0FA',
            leftY: (triangles[i].leftY + triangles[i].topY) / 2,
            leftX: (triangles[i].leftX + triangles[i].topX) / 2,
            rightY: (triangles[i].rightY + triangles[i].topY) / 2,
            rightX: (triangles[i].rightX + triangles[i].topX) / 2,
            topY: triangles[i].topY,
            topX: triangles[i].topX,
            dim: triangles[i].dim / 2
          };
          triangles.push(tri);

          // left
          tri = {
            color: '#DBC0FA',
            leftY: triangles[i].leftY,
            leftX: triangles[i].leftX,
            rightY: (triangles[i].rightY + triangles[i].leftY) / 2,
            rightX: (triangles[i].rightX + triangles[i].leftX) / 2,
            topY: (triangles[i].leftY + triangles[i].topY) / 2,
            topX: (triangles[i].leftX + triangles[i].topX) / 2,
            dim: triangles[i].dim / 2
          };

          triangles.push(tri);

          // right
          tri = {
            color: '#DBC0FA',
            leftY: (triangles[i].leftY + triangles[i].rightY) / 2,
            leftX: (triangles[i].leftX + triangles[i].rightX) / 2,
            rightY: triangles[i].rightY,
            rightX: triangles[i].rightX,
            topY: (triangles[i].topY + triangles[i].rightY) / 2,
            topX: (triangles[i].topX + triangles[i].rightX) / 2,
            dim: triangles[i].dim / 2
          };

          triangles.push(tri);
        }
      }
    }

    for (var j in triangles) {
      drawTriangle(triangles[j]);
    }
  }

  function drawTriangle(triangle) {
    ctx.beginPath();

    ctx.moveTo(triangle.leftX, triangle.leftY);
    ctx.lineTo(triangle.rightX, triangle.rightY);
    ctx.lineTo(triangle.topX, triangle.topY);

    ctx.fillStyle = triangle.color;

    ctx.fill();

    ctx.closePath();
  }

  function initialize() {
    triangles.push(tri);

    drawTriangle(triangles[0]);

    var lastScroll = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', function() {
      if (body.scrollTop >= 700 && body.scrollTop <= 900) {
        if ((body.scrollTop > lastScroll) && (iterate < 8)){
          iterate++;
          fractalIteration(iterate);

          lastScroll = window.pageYOffset || document.documentElement.scrollTop;
        }
        else if((body.scrollTop < lastScroll) && (iterate > 1)) {
          triangles.splice(1, triangles.length - 1);

          iterate--;
          fractalIteration(iterate);

          lastScroll = window.pageYOffset || document.documentElement.scrollTop;
        }
      }
    });


  // click and keydown listeners for another time
  // document.addEventListener('click', function() {
  //   if (iterate === 8) {
  //     alert('exceeded iteration num');
  //   }
  //   else {
  //     iterate++;
  //     fractalIteration(iterate);
  //   }
  // });
  //
  //
  //   document.addEventListener('keydown', function(e) {
  //     if (e.keyCode === 88) {
  //       triangles.splice(1, triangles.length - 1);
  //       iterate--;
  //       fractalIteration(iterate);
  //     }
  //   });
  //
  //   document.addEventListener('keydown', function(e) {
  //     if (e.keyCode === 77) {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.translate(canvas / 2, 0);
  //       ctx.rotate(Math.PI / 180 * 30);
  //       for (var t in triangles) {
  //         drawTriangle(triangles[t]);
  //       }
  //     }
  //   });
  }
})();
