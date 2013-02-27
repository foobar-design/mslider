(function($) {
	
	var animation = true;
	
	$.fn.extend({
		bla : function() {
			return $();
		},

		minit : function(options) {
			$(".mslider-left").attr("title", options.ptext);
			$(".mslider-right").attr("title", options.ntext);

			$.each($(this).children("ul").children("li"), function(idx) {
				$(".linksul").append("<span class=\"circle\">" + (idx + 1) + "</span>");
			});

			$(this).children("li").hide();
			$(this).children("ul").hide();

			return $(this);
		},

		showImage : function(url, idx, caption, options) {
			var mslidercaption = $(".mslider-caption");
			
			$(".linksul").children("span").removeClass("active");

                        (this).animate({
				"opacity" : "0.15"
			}, 700, function() {
				$(this).css({
					"background-image" : "url(" + url + ")"
				});
				$(this).animate({
					"opacity" : "1"
				}, 1000);

				$(".linksul").children("span").eq(idx).addClass("active");
			});

			mslidercaption.css({
				"bottom" : "0",
				"height" : "0px",
				"margin-bottom" : "0px",
			});

			mslidercaption.html("<div style=\"padding: 5px;\">" + caption + "</div>");

			mslidercaption.delay(1000).animate({
                                "height" : options.cheight,
				"margin-bottom" : "20px",
			}, 1400, function() {
				animation = false;
			});
		},

		mslider : function(args) {

			$.fn.mslider.defaults = {
				"cheight" : "100px", /* height of the caption */
				"ptext" : "Vorheriges Bild",
				"ntext" : "Nächstes Bild",
			};

			var options = $.extend({}, $.fn.mslider.defaults, args);

			var counter = 0;
			
			var mslider = $(".mslider");

			var ul = mslider.children("ul");

			var numImages = $(ul).children("li").length;

			mslider.minit(options);
                        
			var url = ul.children("li").eq(counter).children("img").eq(0).attr("src");

			var caption = ul.children("li").eq(counter).children("span").eq(0).html();

			mslider.showImage(url, 0, caption, options);
                        
                      
			
			$(".mslider-right span, .mslider-left span").click(function(e) {
				
				if (animation) {
					return false;
				}
				
				animation = true;

				if ($(this).is(".mslider-right span")) {
					counter = (counter + 1 == numImages) ? 0 : counter + 1;
				} else {
					counter = (counter - 1 < 0) ? numImages - 1 : counter - 1;
				}

				var url = ul.children("li").eq(counter).children("img").eq(0).attr("src");

				var caption = ul.children("li").eq(counter).children("span").eq(0).html();

				mslider.showImage(url, counter, caption, options);
			})

			return $(this);
		}
	})
})(jQuery);

$(document).ready(function() {
	$(".mslider").mslider({
		"foo" : "bar",
		"foo2" : "bar2",
		"cheight" : "30px",
	});
});

