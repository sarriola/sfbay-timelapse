console.log('\'Allo \'Allo!'); // eslint-disable-line no-console

jwplayer.key='lsfO6/r5BC4Z30Es59sAfZlxnSU7UMGljvBWzQ==';
var playerInstance = jwplayer('myElement');
playerInstance.setup({
  file: 'http://sarriola.dyndns.tv/cam/today.mp4',
  width: '75%',
  controls: 'false',
  autostart: 'true',
  aspectratio: '4:3'
});

$.getJSON('http://sarriola.dyndns.tv/cam/movies/mp4files.json', function(data) {
  var output='<div class="list-group">';
  var convdate = new Date();
  for (var i in data) {
    convdate = new Date(data[i].datenum);
    if (i == 0) {
      output+='<button type="button" class="list-group-item active" data-filename="'+ data[i].filename + '">'+ convdate.toDateString() + 
         ' (updated every hour)</button>';
    } else {
      output+='<button type="button" class="list-group-item" data-filename="'+ data[i].filename + '">'+ convdate.toDateString() +  '<//button>';
    }
  }
  output+='</div>';
  document.getElementById('movielist').innerHTML=output;
});

$(document).on('click', '.list-group-item', function(e){
  var moviefname  = 'http://sarriola.dyndns.tv/cam/movies/' + $(this)[0].dataset.filename;
  if ($(this)[0].className === 'list-group-item') {
    playerInstance.setup({file: moviefname, width: '75%', controls: 'false', aspectratio: '4:3'}).play();
    $(this).addClass('active').siblings().removeClass('active');
  } else {
    playerInstance.pause();
  }
//  console.log($(this));
//  console.log($(this)[0].className);
});

