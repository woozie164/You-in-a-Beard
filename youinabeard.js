$(document).ready(function(){
	var canvas = document.getElementById('beardapp');		
	canvas.width = 760;
	canvas.height = 760;
	
	var ctx;

	if (canvas.getContext){
		ctx = canvas.getContext('2d');
	}
		
	function renderCanvas() {
		// clear screen
		ctx.fillStyle = "lightgray"
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		var person = new Image();
		person.addEventListener("load", function() {
	  		ctx.drawImage(this, 0, 0, 760 , 760);		
		}, false);
		person.src = 'me.jpg';	
	}
	renderCanvas();
/*
	// Doesn't interect very well with the JQuyer UI resizable module :/
	$('#beard').mousedown(function(e){		
		$(document).mousemove(function(e){
			$('#beard').css({position: "absolute", left: e.pageX, top: e.pageY});
		});		
		var offset = $(this).offset();
		console.log(offset);
		console.log("page x: " + e.pageX);
		console.log("page y: " + e.pageY);
	})
	$('#beard').mouseup(function(){
		$(document).off("mousemove");
	});
	*/
	/*
	function moveelement(e) {
		$('.ui-wrapper').css({position: "absolute", left: e.pageX, top: e.pageY});
	}

	function startmovingelement(e) {
		$(document).mousemove(moveelement);	
		/*	
		var offset = $(this).offset();
		console.log(offset);
		console.log("page x: " + e.pageX);
		console.log("page y: " + e.pageY);
		
	}

	function stopmovingelement(e) {
		$(document).off(moveelement);
	}

	$('#beard').resizable({
		// Prevent the element from being moved during resizing		
		start: function( event, ui ) {
			$('.ui-wrapper').off(startmovingelement).off(stopmovingelement);
			$(document).off(moveelement);
		},
		stop: function( event, ui ){
			$('.ui-wrapper').mousedown(startmovingelement).mouseup(stopmovingelement);
		}
	});

	$('.ui-wrapper').mousedown(startmovingelement);
	$('.ui-wrapper').mouseup(stopmovingelement);
	*/
	$('#beardcontainer').resizable({
	  autoHide: true,	  
	  handles: {
        'nw': '#nwgrip',
        'ne': '#negrip',
        'sw': '#swgrip',
        'se': '#segrip',
        'n': '#ngrip',
        'e': '#egrip',
        's': '#sgrip',
        'w': '#wgrip'
    	}
	});
	
	$('#beardcontainer').draggable().css({
		position: "absolute"
	});
});