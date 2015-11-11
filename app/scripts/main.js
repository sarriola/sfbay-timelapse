console.log('\'Allo \'Allo!'); // eslint-disable-line no-console


var videoTimelapse = {

  player: function () {
    var playerInstance = jwplayer('myElement');
    return playerInstance;
  },


  playerSetup: function() {
    videoTimelapse.player().setup({
      file: 'http://sarriola.dyndns.tv/cam/today.mp4',
      width: '75%',
      controls: 'false',
      aspectratio: '4:3',
      repeat: 'true'
    });
    videoTimelapse.player().play(); 
  },

  eventSetup: function() {
    $(document).on('click', '.list-group-item', function(){
      var moviefname  = 'http://sarriola.dyndns.tv/cam/movies/' + $(this)[0].dataset.filename;
      if ($(this)[0].className === 'list-group-item btn btn-default') {
        videoTimelapse.player().load({file: moviefname});
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings().find('span').remove();
        $(this).append('   <span class="glyphicon glyphicon-pause"></span>');
        videoTimelapse.player().play();
      } else {
        videoTimelapse.player().pause();
        if ($(this).find('span')[0].className === 'glyphicon glyphicon-pause' ) {
          $(this).find('span').removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');
        } else {
          $(this).find('span').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');
        }
      }
    });
  },

  movieListLoad: function () {
    $.getJSON('http://sarriola.dyndns.tv/cam/movies/mp4files.json', function(data) {
      var output='<div class="list-group">';
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

videoTimelapse.playerSetup();
videoTimelapse.eventSetup();
videoTimelapse.movieListLoad();

