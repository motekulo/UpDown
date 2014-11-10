define(["controller/Mediator", "TERP", "interface/Window"], function(Mediator, TERP, Window){

	var scrollChannel = $("<div>", {"id" : "ScrollChannel"}).appendTo(Window.container);
	var indicator = $("<div>", {"id" : "ScrollIndicator"}).appendTo(scrollChannel);

	var indicatorHeight = indicator.height();

	Mediator.route("scroll", function(position){
		var top = TERP.scale(position, Window.height() - indicatorHeight, 0);
		if (position >= 0.5){
			indicator.css({
				"top" : top,
				"background-color" : "#00ffff"
			});

		} else {
			indicator.css({
				"top" : top,
				"background-color" : "#ff00ff"
			});			
		}
	});
	
});