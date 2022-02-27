const client_id = '08c0088ca30a4559afa20260f0fa169d'
const client_secret = 'dc18b32991354ee09f631c7985f66187'

var token;

var req = {
  genres: ["acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music"],
  genre: null,
  year: null,
  limit: 10,
  offset: null,
  mrkt: 'ES',
  song: null
} 

getURL();

function getURL() {
  req.genre = Math.floor(Math.random() * (127 - 0)) + 0; //1 genero random entre los 127 que hay actualmente en Spotify
  req.year = Math.floor(Math.random() * ((new Date().getFullYear()+1) - 1950)) + 1950; //año random entre 1950 y hoy
  req.offset = Math.floor(Math.random() * (1000 - 1)) + 1; //nro de página de los resultados 1 a 1000
  req.song = Math.floor(Math.random() * (10 - 0)) + 0; //nro en lista de cada pags de resultados

  fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id +':'+ client_secret)
      },
      body: 'grant_type=client_credentials'
  })
  .then(response => response.json())
  .then(data => {
    token = data.access_token,

    fetch('	https://api.spotify.com/v1/search?q=genre:'+ req.genres[req.genre] +'+year:'+ req.year +'&type=track&market='+ req.mrkt +'&limit='+ req.limit +'&offset='+ req.offset, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
  }
  })
  .then(response => response.json())
  .then(data => {
    try {
      var link = "https://open.spotify.com/embed?uri=spotify:track:"
      var song={     
      Name: (data.tracks.items[req.song].name), //si da error es porque pudo hacer la apicall pero no hay resultados en los parametros rnmd indicados antes
      Artist: (data.tracks.items[req.song].artists[0].name),
      Album: (data.tracks.items[req.song].album.name),
      Cover: (data.tracks.items[req.song].album.images[0].url),
      url: (data.tracks.items[req.song].external_urls.spotify),
      Preview: (data.tracks.items[req.song].preview_url),
      id: (data.tracks.items[req.song].id)
      };
      console.log(song);

      document.querySelector("#reproductor").setAttribute("src",(link + song.id));


    } catch (error) {
      getURL() //vuelve a hacer todo de nuevo con parametros nuevos
    }
  });
  });
}

document.querySelector("#random").addEventListener("click",getURL);
