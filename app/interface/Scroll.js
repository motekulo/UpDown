define(["domReady!", "jquery.mousewheel", "controller/Mediator"], function(ready, mousewheel, Mediator){

	/**
	 *  the current scroll position
	 *  @type {Number}
	 */
	var scrollPosition = 0.5;

	/**
	 *  if the scroll value has changed
	 *  @type {Boolean}
	 */
	var needsUpdate = false;

	/**
	 *  the amount of time it should take of constant scrolling to hit
	 *  the top or the bottom
	 *  @type {Number}
	 */
	var scrollingSeconds = 5;
	var scrollingDivisor = scrollingSeconds * 5000;


	var innerScroll = $("<div>").attr("id", "InnerScroll").appendTo("#ScrollContainer");
	var scroller = $("<div>").attr("id", "Scroller").appendTo(innerScroll);

	var scrollSize = scroller.height();

	//start it off at the right scroll position
	innerScroll.scrollTop(scrollSize * 0.5);

	var lastPosition = scrollSize * 0.5;

	Mediator.route("slowUpdate", function(updateRate){
		if (needsUpdate){
			needsUpdate = false;
			Mediator.send("scroll", scrollPosition, updateRate);
		}
	});
	Mediator.route("update", function(){
		var scrollTop = innerScroll.scrollTop();
		if (scrollTop !== lastPosition){
			lastPosition = scrollTop;
			scrollPosition = 1 - scrollTop / scrollSize;
			needsUpdate = true;
			Mediator.send("rawscroll", scrollPosition);
		}
	});


	Mediator.route("start", function(updateRate){
		Mediator.send("scroll", scrollPosition, updateRate);
	});

	return {
		/**
		 *  get the position of the scroll
		 *  @return {number} a number -1 at the bottom and 1 at the top
		 */
		getPosition : function() {
			return scrollPosition;
		}
	};
});