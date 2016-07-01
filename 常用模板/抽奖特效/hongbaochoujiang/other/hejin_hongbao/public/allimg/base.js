/**
 * $.base.js
 * version: 0.8
 * @requires jQuery or zepto
 */
		//table行变色
		 $(function(){
			var tr = $(".mwm-frame-content").find("tr");
			tr.each(function(index,item){
				$(item).bind("mouseover",function(){
					$(this).addClass("hover");
				}).bind("mouseleave",function(){
					$(this).removeClass("hover");
				});
			});
			//按钮变色
			var li = $(".mwm-frame-content").find("li");
			li.each(function(index,item){
				$(item).bind("mouseover",function(){
					$(this).addClass("hover");
				}).bind("mouseleave",function(){
					$(this).removeClass("hover");
				}).bind("click",function(){
					$(this).parent().find("li").removeClass("on");
					$(this).addClass("on");
				});
			});
		});


