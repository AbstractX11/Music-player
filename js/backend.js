const home = document.querySelector(".home");
const wrapper = document.querySelector(".wrapper");
const window3 = document.querySelector(".window3");
const playlistName = document.querySelector(".top .playlistInfo .playlistName");
const songName = document.querySelectorAll(".songinfo .songname");
const songArtist = document.querySelectorAll(".songinfo .artist");
const current_music = document.querySelector("#current_music");
const musicImage = document.querySelectorAll(".img-holder img");
const play_pause = document.querySelectorAll("#play-pause");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const shuffle = document.querySelector("#shuffle");
const repeat = document.querySelector("#repeat");
const currentTime = document.querySelector(".current-time");
const musicduration = document.querySelector(".duration");
const progress_track = document.querySelector(".progress-track");
const progressBar = document.querySelector(".progress-track .progress-bar");
const minitrack = document.querySelector(".musicplayermini .miniprogressbar");
const minimplayer = document.querySelector(".musicplayermini");
const expand = document.querySelectorAll("#expand_more");
let musicIndex = 0;

window.addEventListener("load", () => {
  loadMusic(musicIndex); //calling load music function on page load
});
function loadMusic(_index) {
  playlistName.innerText = allMusic[_index].playlist;
  for (let i = 0; i < 2; i++) {
    songName[i].innerText = allMusic[_index].songname;
    songArtist[i].innerText = allMusic[_index].artist;
    musicImage[i].src = `image/${allMusic[_index].img}.jpg`;
  }
  current_music.src = `audio/${allMusic[_index].src}.mp3`;
  return _index;
}
for (let i = 0; i < 2; i++) {
  play_pause[i].addEventListener("click", () => {
    togglePlayPause();
  });
}
function togglePlayPause() {
  const isMusicPlaying = wrapper.classList.contains("playing");
  isMusicPlaying ? pauseMusic() : playMusic(); // if music is not playing call playmusic otherwise call pausemusic function
}
function playMusic() {
  wrapper.classList.add("playing"); //add playing class
  for (let i = 0; i < 2; i++) {
    play_pause[i].innerText = "pause"; //changing play icon to pause
  }
  current_music.play();
}
function pauseMusic() {
  wrapper.classList.remove("playing"); //removing playing class
  for (let i = 0; i < 2; i++) {
    play_pause[i].innerText = "play_arrow"; //changing pause to play icon
  }
  current_music.pause();
}

prev.addEventListener("click", () => {
  musicIndex = musicIndex < 1 ? 2 : musicIndex - 1; // decreasing music index by 1 if first music is playing change to last music
  loadMusic(musicIndex);
  playMusic();
});
next.addEventListener("click", () => {
  musicIndex = musicIndex > 1 ? 0 : musicIndex + 1; // increasing music index by 1 if last music is playing change to first music
  loadMusic(musicIndex);
  playMusic();
});
current_music.addEventListener("timeupdate", (e) => {
  const currenttime = e.target.currentTime;
  const duration = e.target.duration;
  let progressBarWidth = (currenttime / duration) * 100;
  progressBar.style.width = `${progressBarWidth}%`;
  minitrack.style.width = `${progressBarWidth}%`;
  if (currenttime == duration) {
    musicIndex = musicIndex > 1 ? 0 : musicIndex + 1; // increasing music index by 1 if last music is playing change to first music
    loadMusic(musicIndex);
    playMusic();
  }
  current_music.addEventListener("loadeddata", () => {
    // update song total duration
    mainAdduration = current_music.duration;
    let totalMin = Math.floor(mainAdduration / 60);
    let totalSec = Math.floor(mainAdduration % 60);
    if (totalSec < 10) {
      //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicduration.innerText = `${totalMin}:${totalSec}`;
  });
  // update playing song current time
  let currentMin = Math.floor(currenttime / 60);
  let currentSec = Math.floor(currenttime % 60);
  if (currentSec < 10) {
    //if sec is less than 10 then add 0 before it
    currentSec = `0${currentSec}`;
  }
  currentTime.innerText = `${currentMin}:${currentSec}`;
});
const events = ["click", "dragend"];
let i = 0;
for (i of events) {
  progress_track.addEventListener(i, (e) => {
    const progresstrackwidth = progress_track.clientWidth;
    songduration = current_music.duration;
    offsetx = e.offsetX;
    current_music.currentTime = `${
      (offsetx / progresstrackwidth) * songduration
    }`;
  });
}

minimplayer.addEventListener("click", (e) => {
  let a = e.target;
  if (!$(e.target).hasClass("material-icons")) {
    songplayer();
  }
});
function songplayer() {
  setTimeout(() => {
    wrapper.style.visibility = "visible";
  }, 100);
  home.style.visibility = "hidden";
  window3.style.visibility = "hidden";
}
for (let i = 0; i < 4; i++) {
  expand[i].addEventListener("click", () => {
    setTimeout(() => {
      home.style.visibility = "visible";
    }, 100);
    wrapper.style.visibility = "hidden";
    window3.style.visibility = "hidden";
  });
}

const plist = document.querySelectorAll(".playlists ul li a");
for (let i = 0; i < 3; i++) {
  plist[i].addEventListener("click", () => {
    window3.style.visibility = "visible";
    home.style.visibility = "hidden";
  });
}
function playfrmlist(i) {
  musicIndex = i;
  loadMusic(musicIndex);
  current_music.play();
  songplayer();
  if (!$(wrapper).hasClass("playing")) {
    togglePlayPause();
  }
}
// const favourites = document.querySelector('.favourites ul')
// const love = document.querySelector('#love')

// love.addEventListener("click",()=>{
//     // toggleFav(musicIndex)

//     let favStatus = allMusic[musicIndex].favourite
//     if (!favStatus){
//         love.innerText ="favorite"
//     }else{
//         love.innerText ="favorite_border"

//     }
//     favStatus != favStatus
//     addFavourites()

// })
// // function toggleFav

// function addFavourites(){
//     for (let index=0; index < 3; index++){
//         if (allMusic[index].favourite===true){
//             const newlist= document.createElement("li")
//             const sname = document.createElement("p");
//             const stext= document. createTextNode(`${allMusic[index].songname}`)
//             const aname = document.createElement("p");
//             const atext= document. createTextNode(`${allMusic[index].artist}`)
//             sname.appendChild(stext);
//             newlist.appendChild(sname).className="sname";
//             aname.appendChild(atext);
//             newlist.appendChild(aname).className="aname";
//             favourites.appendChild(newlist)
//         }

//     }

// }
