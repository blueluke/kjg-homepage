---
---
// Main JS file - Include all others (except jQuery)
{% include_relative _jquery.popup.js %};
{% include_relative _jquery.event.move.js %}
{% include_relative _jquery.event.swipe.js %}
{% include_relative _jquery.unslider.js %};
{% include_relative _jquery.fitvids.js %};

// Nav-Menu Teil 1
$(window).resize(function() {
  var more = document.getElementById("js-navigation-more");
  if ($(more).length > 0) {
    var windowWidth = $(window).width();
    var moreLeftSideToPageLeftSide = $(more).offset().left;
    var moreLeftSideToPageRightSide = windowWidth - moreLeftSideToPageLeftSide;

    if (moreLeftSideToPageRightSide < 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-right");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-left");
    }

    if (moreLeftSideToPageRightSide > 330) {
      $("#js-navigation-more .submenu .submenu").removeClass("fly-out-left");
      $("#js-navigation-more .submenu .submenu").addClass("fly-out-right");
    }
  }
});

$(document).ready(function() {
  // Navigation-Menu
  var menuToggle = $("#js-mobile-menu").unbind();
  $("#js-navigation-menu").removeClass("show");

  menuToggle.on("click", function(e) {
    e.preventDefault();
    $("#js-navigation-menu").slideToggle(function(){
      if($("#js-navigation-menu").is(":hidden")) {
        $("#js-navigation-menu").removeAttr("style");
      }
    });
  });

  // Responsive YT embed mit Fitvids.js
  $(".hero-video").fitVids();
  $(".jugger-intro-video-wrapper").fitVids();

  // Anpassen der "Zurück...""-Links von posts
  $(".post-back").attr('href', function(){
    var link = "{{ site.url }}/aktuelles/" // Fallback
    if(document.referrer.includes("/aktuelles/") || document.referrer == "{{ site.url }}/") {
      link = document.referrer;
    }
    return link;
  });
});


/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });


function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
      return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube-nocookie.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    //this.parentNode.setAttribute("style", "padding-bottom: 56.23%; height: 0; overflow: hidden;");
    this.parentNode.replaceChild(iframe, this);
}
