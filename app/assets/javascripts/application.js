//= require jquery
//= require jquery.browser
//= require jquery_ujs
//= require jquery.ui.core
//= require jquery.ui.widget
//= require jquery.ui.mouse
//= require jquery.ui.position
//= require jquery.ui.draggable
//= require jquery.ui.droppable
//= require jquery.ui.resizable
//= require jquery.ui.selectable
//= require jquery.ui.sortable
//= require jquery.ui.accordion
//= require jquery.ui.autocomplete
//= require jquery.ui.button
//= require jquery.ui.dialog
//= require jquery.ui.slider
//= require jquery.ui.tabs
//= jquery.endless-scroll
//= require facebox
//= require jquery.NobleCount.min
//= require jquery.timeago
//= require jquery.truncator
//= require autoresize.jquery.min
//= require jquery.defaultvalue
//= require jquery.hoverIntent.minified
//= require jquery.bgiframe.min
//= require jquery.corner
//= require jquery.delayedObserver
//= require jquery.sticky
//= require jquery.pop
//= require jquery.dd
//= require jquery.autoSuggest
//= require jquery.tipsy
//= require_self
//= require jquery.cookie
//= require jquery.functions
//= require jquery_nested_form
//= require jquery.prettyPhoto
//= require jquery.pageless.min
//= require jquery.tools.min

jQuery(function ($) {
  $.fn.extend({
    turnRemoteToToggle: function(target,altText){
        var $el = $(this),
            altText = altText || "Hide";

        $el.text(altText);
        $el.toggle(
          function(){
            $el.text(el.data('origText'));
            $el.data('expanded', false);
            target.slideUp(); // or target.hide() or other effect
          }, 
          function(){
            $el.text(altText);
            $el.data('expanded', true);
            target.slideDown(); // or target.show() or whatever
          }
        );
      }
  });
});

jQuery(document).ready(function() {
  jQuery('a[data-remote]').on("ajax:beforeSend", function(){
      var $clicked = $(this);
      if ($clicked.attr("data-disabled-with")) {
          $disable_with = $clicked.attr("data-disabled-with");
      } else {
          return;
      }
      if ($clicked.attr("data-loader-name")=="external_spinner") {
        $("#"+$disable_with).html('<img src=\"/assets/ajax/spinner.gif\">');
      } else if ($clicked.attr("data-loader-name")!="no_loader") {
        $loader_name = $clicked.attr("data-loader-name");
        $clicked.replaceWith($disable_with+'<img src=\"/assets/ajax/'+$loader_name+'.gif\">');
    // $clicked.href("#")
      };
    });

	var isChrome = /Chrome/.test(navigator.userAgent);
	if(!isChrome & jQuery.support.opacity) {
		//jQuery(".tab_header a, div.tab_body").corners(); 
	}
	//jQuery("#idea_column, #intro, #buzz_box, #content_text, #notification_show, .bulletin_form").corners();
	//jQuery("#top_right_column, #toolbar").corners("bottom");
	
	jQuery("abbr[class*=timeago]").timeago();	
	jQuery("#pointContent_for").NobleCount('#pointContentDown_for',{ on_negative: 'go_red', on_positive: 'go_green', max_chars: 1000 });
  jQuery("#pointContent_opp").NobleCount('#pointContentDown_opp',{ on_negative: 'go_red', on_positive: 'go_green', max_chars: 1000 });  
	jQuery("input#user_login_search").autocomplete({ source: "/users.js" });
	jQuery('#bulletin_content, #blurb_content, #message_content, #document_content, #email_template_content, #page_content').autoResize({extraSpace : 20})

	function addMega(){
	  jQuery(this).addClass("hovering"); 
	} 

	function removeMega(){ 
	  jQuery(this).removeClass("hovering"); 
	}
	var megaConfig = {
	     interval: 20,
	     sensitivity: 1,
	     over: addMega,
	     timeout: 20,
	     out: removeMega
	};
	jQuery(".mega").hoverIntent(megaConfig);


});

function toggleAll(name)
{
  boxes = document.getElementsByClassName(name);
  for (i = 0; i < boxes.length; i++)
    if (!boxes[i].disabled)
   		{	boxes[i].checked = !boxes[i].checked ; }
}

function setAll(name,state)
{
  boxes = document.getElementsByClassName(name);
  for (i = 0; i < boxes.length; i++)
    if (!boxes[i].disabled)
   		{	boxes[i].checked = state ; }
}

function showSubNavLayer(layer) {
    var myLayer = document.getElementById(layer);
    if(myLayer.style.display=="none" || myLayer.style.display==""){
      myLayer.style.display="block";
    } else {
      myLayer.style.display="none";
    }
}

if (typeof Rahvakogu == "undefined" || !Rahvakogu) {
    var Rahvakogu = {};
}

/* Mobile ID check */
(function($) {
    var checkInterval;
    
    var MobileIdCheck = function() {
        return {
            init: function($form) {
                checkInterval = setInterval(function() {
                    $.ajax({
                        url: $form.attr('action'),
                        type: $form.attr('method'),
                        data: $form.serialize(),
                        dataType: 'json',
                        success: function(data, status, request) {
                            if (data.message) {
                                $form.find('.status').html(data.message);
                            }
                            if (data.notice) {
                                $form.find('.status').html(data.notice);
                            }
                            if (data.redirect) {
                                window.location.href = data.redirect;
                            }
                        }
                    });
                }, 8000);
            }
        };
    }();
    
    Rahvakogu.MobileIdCheck = MobileIdCheck;
})(jQuery);

$(document).on("ajax:beforeSend", "form", function(ev) {
  $(ev.currentTarget).addClass("submitting")
})

$(document).on("ajax:complete", "form", function(ev) {
  $(ev.currentTarget).removeClass("submitting")
})

$(function() {
  var menu = document.getElementById("user-menu")
  var button = document.getElementById("user-menu-button")

  button.addEventListener("click", function(ev) {
    ev.preventDefault()
    if (menu.style.display == "") return

    this.className += " open"
    menu.style.display = ""

    ev.stopPropagation()
    document.body.addEventListener("click", hide, false)
  }, false)

  function hide(ev) {
    var el = ev.target; while (el && el != menu) el = el.parentNode
    if (el) return

    button.className = button.className.replace(/\s*\bopen\b/, "")
    menu.style.display = "none"
    document.body.removeEventListener("click", hide, false)
  }
})
