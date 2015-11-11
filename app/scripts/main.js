console.log('\'Allo \'Allo!'); // eslint-disable-line no-console

var playerInstance = jwplayer('myElement');
jwplayer.key='lsfO6/r5BC4Z30Es59sAfZlxnSU7UMGljvBWzQ==';
playerInstance.setup({
  file: 'http://sarriola.dyndns.tv/cam/today.mp4',
  width: '75%',
  controls: 'false',
//  autostart: 'true',
  aspectratio: '4:3',
  repeat: 'true'
});
playerInstance.play();

$.getJSON('http://sarriola.dyndns.tv/cam/movies/mp4files.json', function(data) {
  var output='<div class="list-group">';
  var convdate = new Date();
  for (var i in data) {
    convdate = new Date(data[i].datenum);
    if (i == 0) {
      output+='<button type="button" class="list-group-item active btn btn-default" data-filename="'+ data[i].filename + 
         '">'+ convdate.toDateString() +  '   <span class="glyphicon glyphicon-play"></span></button>'; 
    } else {
      output+='<button type="button" class="list-group-item btn btn-default" data-filename="'+ data[i].filename + '">'+ convdate.toDateString() +  '<//button>';
    }
  }
  output+='</div>';
  document.getElementById('movielist').innerHTML=output;
});

$(document).on('click', '.list-group-item', function(){
  var moviefname  = 'http://sarriola.dyndns.tv/cam/movies/' + $(this)[0].dataset.filename;
  if ($(this)[0].className === 'list-group-item btn btn-default') {
    playerInstance.load({file: moviefname});
    $(this).addClass('active').siblings().removeClass('active');
    $(this).siblings().find('span').remove();
    $(this).append('   <span class="glyphicon glyphicon-pause"></span>');
    playerInstance.play();
  } else {
    playerInstance.pause();
    if ($(this).find('span')[0].className === 'glyphicon glyphicon-pause' ) {
      $(this).find('span').removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');
    } else {
      $(this).find('span').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');
    }
  }
});



