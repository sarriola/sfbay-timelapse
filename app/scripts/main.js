console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
/*global jwplayer*/

var videoTimelapse = {

  playerInitSetup: function(baseurl,jwkey) {
    jwplayer.key = jwkey;
    videoTimelapse.baseURL = baseurl;
    videoTimelapse.player = jwplayer('myElement');
    videoTimelapse.player.setup({
      file: videoTimelapse.baseURL+'movies/today.mp4',
      width: '75%',
      aspectratio: '4:3',
      skin: {
        name: 'glow' 
      }
    });
  },

  playerEventsSetup: function() {

    var buttonChangeTo = function(glypicon) {
      var theActive = $('.list-group-item.btn.btn-default.active');
      theActive.find('span').remove();
      theActive.append('<span class="glyphicon glyphicon-' + glypicon + ' pull-right"></span>');
    };

    videoTimelapse.player.on('ready', function() { 
      $('.jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-playback').remove();
      $('.jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset').remove();
    }); 

    videoTimelapse.player.on('playlistComplete', function() {
      buttonChangeTo('repeat');
    });

    videoTimelapse.player.on('seeked', function() {
      buttonChangeTo('pause');
    });

    videoTimelapse.player.on('play', function() {
      buttonChangeTo('pause');
    }); 
    videoTimelapse.player.on('pause', function() {
      buttonChangeTo('play');
    });  
  },

  playlistLoad: function () {
    $.getJSON(videoTimelapse.baseURL + 'movies/mp4files.json', function(data) {
      var output='<div class="list-group">';
      output+='<button type="button" class="list-group-item btn btn-default active" data-filename="today.mp4">Today' +
        '<span class="glyphicon glyphicon-play pull-right"></span></button>';
      for (var i in data) {
        output+='<button type="button" class="list-group-item btn btn-default" data-filename="' + 
          data[i].filename + '">' + data[i].date + '</button>';
      }
      output+='</div>';
      document.getElementById('movielist').innerHTML=output;
    });
  },

  playlistEventSetup: function() {
    $(document).on('click', '.list-group-item', function(){
      var moviefname  = videoTimelapse.baseURL + 'movies/' + $(this)[0].dataset.filename;
      if ($(this)[0].className === 'list-group-item btn btn-default') {
        videoTimelapse.player.load({file: moviefname});
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings().find('span').remove();
        videoTimelapse.player.play();
      } else {
        videoTimelapse.player.pause();
      }
    });
  }

};

videoTimelapse.playerInitSetup('','lsfO6/r5BC4Z30Es59sAfZlxnSU7UMGljvBWzQ==');
videoTimelapse.playerEventsSetup();
videoTimelapse.playlistLoad();
videoTimelapse.playlistEventSetup();

