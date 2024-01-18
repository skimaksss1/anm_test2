var $header = $('.double_header, .double_header .header_nav ul');
var $submenu = $('.double_header .point_menu .submenu_list');
var $headerlink = $('.double_header .submenu_list>ul>li>a, .double_header .header_nav>ul>li>a, .double_header .location_place, .double_header .lang a');
var $logo = $('.double_header .logo svg .logo_anm, .double_header .logo svg .caption_logo_anm')
var $bar = $('.double_header .header_nav .bar svg path')
$(document).scroll(function () {
  $header.css({ "background-color": $(this).scrollTop() < 10 ? "transparent" : "#fff" });
  $submenu.css({ "background-color": $(this).scrollTop() < 10 ? "#0C0E16" : "#fff" });
  $headerlink.css({ "color": $(this).scrollTop() < 10 ? "#fff" : "#000" });
  $logo.css({ "fill": $(this).scrollTop() < 10 ? "#fff" : "#000" });
  $bar.css({ "fill": $(this).scrollTop() < 10 ? "#fff" : "#000" });

});

window.ontouchstart = function(e) {
  e.preventDefault();
}
// $(window).scroll(function(){
//   var offset = $('.header').offset(),
//       offsetwb = $('.header + .s1-about_us').offset();
//   if ($(this).scrollTop() > offset.top && $(this).scrollTop() < offsetwb.top)  {
//     $('.num01').css('color','#7B7B7B');
//     $('.num02').css('color','#118BDD');
//   }
//   else {
//     $('.num01').css('color','#118BDD');
//     $('.num02').css('color','#7B7B7B');
//   }
// });

// выбираем блоки
const blocks = document.querySelectorAll('section');

// добавляем обработчик событий прокрутки
window.addEventListener('scroll', () => {
  // получаем текущую позицию скролла
  const currentPosition = window.scrollY;

  // проходимся по всем блокам
  blocks.forEach((block, index) => {
    // проверяем, если блок находится в видимой области
    const headerContent = document.querySelector('.header_content');
    const headerContentHeight = headerContent.offsetHeight;
    // console.log(`Высота элемента: ${headerContentHeight}px`);
    if (currentPosition >= block.offsetTop - headerContentHeight && currentPosition < block.offsetTop + block.offsetHeight) {
      // выводим номер блока
      ind = index + 1
      // console.log(`Текущий блок: ${ind}`);
      for (let i = 1; i <= 7; i++) { // выведет 0, затем 1, затем 2
        if (i == ind) {
          $('.num0' + ind).css('color', '#118BDD');
        }
        else {
          $('.num0' + i).css('color', '#7B7B7B');
        }
      }
    }
  });
});

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 20
  }, 500);
});

  if($(window).width() > 960){
    jQuery(".chronology").mousemove(function(){    
      var style_var = jQuery(this).find(".swiper-wrapper").attr("style").match(/translate3d\(([^,]+),/);   
      jQuery(this).find(".svg").each(function(){    
          jQuery(this).attr("style","transition-duration: 2s; transform: translate3d("+parseInt(style_var[1])*(-1)+"px, 0px, 0px);");    
      }); 
      jQuery(this).find(".car").each(function(){    
          jQuery(this).attr("style","transition-duration: 2s; transform: translate3d("+parseInt(style_var[1])/6+"px, 0px, 0px);");    
      }); 
      console.log(style_var[1])
    });
    jQuery("section").click(function(){
      if (window.location.href.endsWith("index.html"))
      {    
      var style_var = jQuery(this).find(".swiper-wrapper").attr("style").match(/translate3d\(([^,]+),/);   
      jQuery(this).find(".svg").each(function(){    
          
          jQuery(this).attr("style","transition-duration: 2s; transform: translate3d("+parseInt(style_var[1])*(-1)+"px, 0px, 0px);");    
      });
      jQuery(this).find(".car").each(function(){ 
          col =    $('.swiper-slide').length/100
          jQuery(this).attr("style","transition-duration: 2s; transform: translate3d("+parseInt(style_var[1])/6+"px, 0px, 0px);");    
      });  
      console.log($('.swiper-slide').length/10)
    }
    });
    
  }

if($(".current_page:first").hasClass("active_page")) {
  $('.prev_page').addClass('default');
}

if($(".current_page:last").hasClass("active_page")) {
  $('.next_page').addClass('default');
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 47.113489, lng: 51.970052 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: uluru,
    mapId: 'c200362333115e00'
  });
  // The marker, positioned at Uluru
  var marker_image = '../img/map_marker.svg';
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: marker_image
  });
}

window.initMap = initMap;


window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel_mask'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

});

function lngsel(lng)
{
  localStorage.setItem("glblng", lng);
  window.location.href = "index.html";
}

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));

$(function () {
  $(".ddl-select").each(function () {
    $(this).hide();
    var $select = $(this);
    var _id = $(this).attr("id");
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "ddl ddl_" + _id);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "ddl-input");
    input.setAttribute("id", "ddl_" + _id);
    input.setAttribute("readonly", "readonly");
    input.setAttribute(
      "placeholder",
      $(this)[0].options[$(this)[0].selectedIndex].innerText
    );

    $(this).before(wrapper);
    var $ddl = $(".ddl_" + _id);
    $ddl.append(input);
    $ddl.append("<div class='ddl-options ddl-options-" + _id + "'></div>");
    var $ddl_input = $("#ddl_" + _id);
    var $ops_list = $(".ddl-options-" + _id);
    var $ops = $(this)[0].options;
    for (var i = 0; i < $ops.length; i++) {
      $ops_list.append(
        "<div data-value='" +
          $ops[i].value +
          "'>" +
          $ops[i].innerText +
          "</div>"
      );
    }

    $ddl_input.click(function () {
      $ddl.toggleClass("active");
    });
    $ddl_input.blur(function () {
      $ddl.removeClass("active");
    });
    $ops_list.find("div").click(function () {
      $select.val($(this).data("value")).trigger("change");
      $ddl_input.val($(this).text());
      $ddl.removeClass("active");
    });
  });
});


$('#chooseFile').bind('change', function () {
  var filename = $("#chooseFile").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile").text("No file chosen..."); 
  }
  else {
    $(".file-upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
  }
});

$(".bar").click(function () {
  $('.sub_bar').toggleClass("none");
});
window.addEventListener('scroll', function() {
    $('.sub_bar').addClass("none");
});


$(window).on('load', function () {
  
  $preloader = $('.loader'),
    $loader = $preloader.find('.loader');
  $loader.fadeOut();
  $preloader.delay(1400).fadeOut('slow');
  $('html, body').animate({
    scrollTop: 0
}, 100);
});
