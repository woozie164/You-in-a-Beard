$(document).ready(function(){
	// canvas.toBlob polyfill
	if (!HTMLCanvasElement.prototype.toBlob) {
		Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
	  value: function (callback, type, quality) {

	    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
	        len = binStr.length,
	        arr = new Uint8Array(len);

	    for (var i=0; i<len; i++ ) {
	     arr[i] = binStr.charCodeAt(i);
	    }

	    callback( new Blob( [arr], {type: type || 'image/png'} ) );
	  	}
	 });
	}

	function renderCanvas() {
		var canvas = document.getElementById('offscreencanvas');
		var userimg = $('#userimg');
		canvas.width = userimg.width();
		canvas.height = userimg.height();

		var ctx;

		if (canvas.getContext){
			ctx = canvas.getContext('2d');
		}
		ctx.drawImage(document.getElementById("userimg"), 0, 0);
		var beard = document.getElementById("beard");				
		//ctx.drawImage(beard, $(beard).offset().left - userimg.offset().left, $(beard).offset().top - userimg.position().top, beard.width, beard.height);
		ctx.drawImage(beard, $(beard).offset().left - userimg.offset().left, $(beard).offset().top - userimg.offset().top, beard.width, beard.height);
	}

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

	$('#saveimg').click(function(e){
		renderCanvas();
		var canvas = document.getElementById('offscreencanvas');				
		//window.open(canvasd);	
		this.href = canvas.toDataURL();
    this.download = "you-in-a-beard.png";		
	});

	$('#setasprofilepic').click(function(){
		renderCanvas();
	
		var albumid;
		var canvas = document.getElementById('offscreencanvas');	        			
		var canvasblob;
		var accessToken = FB.getAuthResponse().accessToken;		

		FB.login(function(response) {
      console.log(response);
    }, {
      scope: 'publish_actions',
      return_scopes: true});		

		canvas.toBlob(function(blob){
			canvasblob = blob;
		});

		var fd = new FormData();
		fd.append("access_token", accessToken);		
		fd.append("source", canvasblob);
		fd.append("message","");
		var pid;

		// Opening a new window inside the ajax call seems
		// to cause the window to get blocked by the
		// popup blocker
		var newWindow = window.open();

		$.ajax({
      url: "https://graph.facebook.com/me/photos?access_token=" + accessToken,
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      cache: false,
      async: false,
      success: function(data){
        console.log("success " + data);
        console.log(data);
        pid = data.id;
        // This page will ask you if you want to set
		// this image as your new profile picture
	    newWindow.location = 'http://www.facebook.com/photo.php?fbid=' + pid +'&makeprofile=1';
      },
      error: function(shr,status,data){
          console.log("error " + data + " Status " + shr.status);
          console.log(data);
      },
      complete: function(){
          console.log("Ajax Complete");
      }
    });		
	});
/*
	$('#send').click(function(){
		FB.ui(
			{
		    method: 'send',
		    // TODO: Change to link to img
		    // Problem: it seems like you can't send facebook.com links ...
		    // Possible workaround: upload to somewhere else (e.g. imgur) and link to it
		    //href: 'https://developers.facebook.com/docs/', 
		    link: 'https://developers.facebook.com/docs/', 
		    //link: 'https://www.facebook.com/photo.php?fbid=10204972800099640#'
		    //link: "https://scontent-arn2-1.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/11870737_10204972800099640_3638798146854645669_n.jpg?oh=00d7e21bcbb9e1b1008bc536f5205516&oe=566F3F75"
  		},
			// callback
	  	function(response) {
		    if (response && !response.error_code) {
		    	console.log('Posting completed.');
		    } else {
		    	console.log('Error while posting.');
		    	console.log(response);
		    }
		  }
		);
	});
*/
	$(".smallbeard").click(function(){
		var src = $(this).attr('src');
		$('#beard').attr('src', src);		
	});	
});