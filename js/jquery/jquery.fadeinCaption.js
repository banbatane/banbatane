/*
 * 画像にスライダー式のキャプションを表示させる。
 * 必要なファイル
 * /css/images.css jquery.js jquery.fadeinCaption.js
 *
 * キャプションの要素はイベント発生要素の子要素にしてください。
 *
 * （例）
 * <a href="/" class="slide-caption">
 *   <img src="/img/test.gif">
 *   <div class="slide-caption-overlay">
 *     キャプションです。
 *   </div>
 * </a>
 */

(function($){
	$.fn.fadeinCaption = function(options) {
		var defaults = {
			target:      '.slide-caption',         // イベント発生要素
			caption:     '.slide-caption-overlay', // キャプションの要素
			stop_height: null,
			speed:       250                       // キャプション表示させるスピード
		}

		options = $.extend(defaults, options);

		var caption = null;
		$(options.target).hover(function(e) {
			caption = get_caption(e);

			if (!jQuery.support.noCloneChecked) {
				// for less ie9...
				caption.stop().fadeTo(options.speed, 0.6, function() {
					$(caption).css('filter', 'progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#7f000000, endColorstr=#00000000)');
				});
			} else {
				caption.stop().fadeTo(options.speed, 1);
			}
		}, function(e) {
			caption = get_caption(e);
			caption.stop().fadeTo(options.speed, 0);
		});

		function get_caption(e){
			var target = null;

			if (this == $(options.target)) {
				target = $(e.target);
			} else {
				target = $(e.target).parents(options.target);
			}

			return target.find(options.caption);
		}
	};
})($gbQuery);
