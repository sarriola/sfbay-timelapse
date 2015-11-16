console.log('\'Allo \'Allo!'); // eslint-disable-line no-console
/*global jwplayer*/

var videoTimelapse = {

  setPlayerKey: function() {
    jwplayer.key='lsfO6/r5BC4Z30Es59sAfZlxnSU7UMGljvBWzQ==';
  },

  player: function() {
    return jwplayer('myElement');
  }, 

  playerSetup: function() {
    videoTimelapse.player().setup({
      file: 'http://192.168.2.92/cam/today.mp4',
      width: '75%',
      aspectratio: '4:3',
      skin: {
        name: 'glow' 
      }
    });
  },

  eventSetup: function() {
    $(document).on('click', '.list-group-item', function(){
      var moviefname  = 'movies/' + $(this)[0].dataset.filename;
//      var moviefname  = 'http://192.168.2.92/cam/movies/' + $(this)[0].dataset.filename;
      if ($(this)[0].className === 'list-group-item btn btn-default') {
        videoTimelapse.player().load({file: moviefname});
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings().find('span').remove();
        $(this).append('<span class="glyphicon glyphicon-play pull-right"></span>');
        videoTimelapse.player().play();
      } else {  
        videoTimelapse.player().pause();
      }
    });

    videoTimelapse.player().on('ready', function() {
      $('.jw-icon.jw-icon-inline.jw-button-color.jw-reset.jw-icon-playback').remove();
      $('.jw-icon.jw-icon-tooltip.jw-icon-volume.jw-button-color.jw-reset').remove();
    }); 

    videoTimelapse.player().on('playlistComplete', function() {
      var theActive = $('.list-group-item.btn.btn-default.active') 
      if (   theActive.find('span')[0].className === 'glyphicon glyphicon-pause pull-right' ) {
        theActive.find('span').removeClass('glyphicon glyphicon-pause pull-right').addClass('glyphicon glyphicon-repeat pull-right');
      } else {
        theActive.find('span').removeClass('glyphicon glyphicon-play pull-right').addClass('glyphicon glyphicon-repeat pull-right');
      }
    });
    videoTimelapse.player().on('seeked', function() {
      var theActive = $('.list-group-item.btn.btn-default.active')
      if (   theActive.find('span')[0].className === 'glyphicon glyphicon-play pull-right' ) {
        theActive.find('span').removeClass('glyphicon glyphicon-play pull-right').addClass('glyphicon glyphicon-pause pull-right');
      } else if ( theActive.find('span')[0].className === 'glyphicon glyphicon-repeat pull-right' ) {
        theActive.find('span').removeClass('glyphicon glyphicon-repeat pull-right').addClass('glyphicon glyphicon-pause pull-right');
      }
    });
    videoTimelapse.player().on('play', function() {
      var theActive = $('.list-group-item.btn.btn-default.active')
      if (   theActive.find('span')[0].className === 'glyphicon glyphicon-play pull-right' ) {
        theActive.find('span').removeClass('glyphicon glyphicon-play pull-right').addClass('glyphicon glyphicon-pause pull-right');
      } else {
        theActive.find('span').removeClass('glyphicon glyphicon-repeat pull-right').addClass('glyphicon glyphicon-pause pull-right');
      }
    });
    videoTimelapse.player().on('pause', function() {
      var theActive = $('.list-group-item.btn.btn-default.active')
      if (   theActive.find('span')[0].className === 'glyphicon glyphicon-pause pull-right' ) {
        theActive.find('span').removeClass('glyphicon glyphicon-pause pull-right').addClass('glyphicon glyphicon-play pull-right');
      } else {
        theActive.find('span').removeClass('glyphicon glyphicon-repeat pull-right').addClass('glyphicon glyphicon-play pull-right');
      }
    });  
  },

  movieListLoad: function () {
    $.getJSON('mp4files.json', function(data) {
//    $.getJSON('http://192.168.2.92/cam/movies/mp4files.json', function(data) {
      var output='<div class="list-group">';
      output+='<button type="button" class="list-group-item btn btn-default active" data-filename="today.mp4">Today' +
        ' <span class="glyphicon glyphicon-play pull-right"></span></button>';
      var convdate = new Date();
      for (var i in data) {
        convdate = new Date(data[i].datenum);
        output+='<button type="button" class="list-group-item btn btn-default" data-filename="'+ data[i].filename + '">'+ convdate.toDateString() +  '<//button>';
      }
      output+='</div>';
      document.getElementById('movielist').innerHTML=output;
    });
  }

};

videoTimelapse.setPlayerKey();
videoTimelapse.playerSetup();
videoTimelapse.eventSetup();
videoTimelapse.movieListLoad();

