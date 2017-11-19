;(function (window, $, undefined) {
	/*
	* 2017/10/30
	* by sunluwei
	* 数字滚动插件
	* 
	*/
	// 私有方法
	var _methods = {
		init: function (ops) {
			var config = {
				// 默认属性
				number: 0,
				image: '',
				url: '',
				scrollHeight: 40,
				size: 'normal',
				speed: 'slow',
				isLowerCase: true,
				iconHeight: 35,
				iconWidth: 26,
				backgroundColor: 'transparent',
				minLength: '0',
				textAfter: '',
                textBefore: ''
			}
			if (ops) {
				$.extend(config, ops);
			}
			return this.each(function () {
				// 属性
				var number = config.number;
				var speed = config.speed;
				var isLowerCase = config.isLowerCase;
				var numberHeight = config.numberHeight;
				var scrollHeight = config.scrollHeight; 
				var fontSize = config.fontSize;
				var iconHeight = config.iconHeight;
				var iconWidth = config.iconWidth;
				var image = config.image;
				var size = config.size;
				var backgroundColor = config.backgroundColor;
				var minLength = config.minLength;
				var textAfter = config.textAfter;
				var textBefore = config.textBefore;

				var $this = $(this);
				var $growupBox = $("<div class='growup-box'></div>").css("display", "table-cell");
				var $growupDiv = $("<div class='growup-div'></div>").css({"height": "100%", "display":"table"});
				var $textAfter = $("<span class='growup-text-after'></span>").html(textAfter);
				var $textBefore = $("<span class='growup-text-before'></span>").html(textBefore);
                $growupDiv.html($textBefore);
				$growupDiv.append($growupBox);
				$growupDiv.append($textAfter);
				$this.html($growupDiv);
		        var it = $growupBox.find('i')//$(".growup-box i");
		        
		        var cz = 0
		        var len = String(number).length;
		        if (minLength <= len) {
		        	minLength = len;
		        } else {
		        	cz = minLength - len;
		        }
		        for (var i = 0; i < minLength; i++) {
		        	
		           
		            var $numBg = $("<div class='num-bg'></div>").css("background-color", backgroundColor);
		            $numBg.html('<i></i>');
		            $growupBox.append($numBg);
		            var obj = $growupBox.find('i').eq(i);
		            if (cz > i) {
		            	obj.css({
		                    "background-positionY": -scrollHeight * 10});
		            	
		            } else {
		            	var num = String(number).charAt(i - cz);
			            var y = -parseInt(num) * scrollHeight;
			            
			            obj.animate({
		                    "background-positionY": y}, speed, 'swing');
		            }
		        }
		        if (config.isLowerCase) {
		        	var m = len % 3 == 0 ? len / 3 - 1 : len / 3;
			        for (var j = 1; j <= m; j++) {
			            $growupBox.find('i').eq(len - 3 * j).before("<em>,</em>");
			        }
		        }
		        if (image != '') {
		        	$growupBox.addClass(image);
		        }
		        if (size != 'normal') {
		        	$growupBox.addClass(size);
		        }
		        $growupBox.find('i').css({"width": iconWidth, "height": iconHeight})
		    });
		},
		destroy: function () {

		},
		update: function () {

		}
	}
	
	$.fn.growup = function (ops) {
		if (_methods[ops]) {
			return _methods[ops].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof ops === 'object' || !ops) {
			return _methods.init.apply(this, arguments);
		} else {
			$.error('Method: ' + ops + 'not used by jQuery.growup');
		}
	}
})(window, jQuery);