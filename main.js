let coverArt = document.querySelector(".cover-art img");
let songTitle = document.querySelector("#song-title");
let songArtiste = document.querySelector("#song-artist");
let playerProgress = document.querySelector(".player-progress");
let progress = document.querySelector(".progress");
let currentTimeElement = document.querySelector(
  ".music-duration .current-time"
);
let durationElement = document.querySelector(".music-duration .duration");
let previous = document.querySelector("#prev");
let play = document.querySelector("#play");
let pause = document.querySelector("#pause");
let next = document.querySelector("#next");

document.querySelector(".loading").style.display = "block";
document.querySelector(".content").style.display = "none";

const songs = [
  {
    path: "https://cdn.val9ja.com/wp-content/uploads/2024/07/Rema_-_HEHEHE.mp3",
    displayName: "HEHEHE",
    cover:
      "https://www.val9ja.com.ng/wp-content/uploads/2024/07/Rema-HEHEHE-1024x1024.webp",
    artist: "Rema",
  },
  {
    path: "https://cdn.val9ja.com/wp-content/uploads/2024/07/Spinall_Ft_Omah_Lay_Tyla_-_One_Call.mp3",
    displayName: "One Call",
    cover: "https://trendybeatz.com/images/Spinall-One-Call-Artwork.jpg",
    artist: "Spinall Ft. Omah Lay & Tyla",
  },
  {
    path: "https://cdn.val9ja.com/wp-content/uploads/2024/06/Burna_Boy_-_Higher.mp3",
    displayName: "Higher",
    cover: "https://trendybeatz.com/images/Burna-Boy-Higher-Video-Artwork.jpg",
    artist: "Burna Boy",
  },
  {
    path: "https://cdn.val9ja.com/wp-content/uploads/2024/06/Brown_Joel_Ft_Davido_Ft_BoyPee_Hyce_-_Ogechi_Remix_.mp3",
    displayName: "Ogechi (Remix) ",
    cover:
      "https://trendybeatz.com/images/Brown-Joel-Ft-BoyPee-and-Hyce-Davido-Ogechi-Remix-Artwork.jpg",
    artist: " Brown Joel ft Davido",
  },
  {
    path: "https://cdn.trendybeatz.com/audio/Odumeje-Ft-Flavour-Powers-(TrendyBeatz.com).mp3",
    displayName: "Powers",
    cover:
      "https://trendybeatz.com/images/Odumeje-Ft-Flavour-Powers-Artwork.jpg",
    artist: "Odumeje Ft. Flavour",
  },
  {
    path: "https://cdn.trendybeatz.com/audio/Kcee-Ft-OneRepublic-Ojapiano-Remix-(TrendyBeatz.com).mp3",
    displayName: "Ojapiano (Remix)",
    cover: "https://trendybeatz.com/images/Kcee-Ojapiano-Remix-Artwork.jpg",
    artist: "Kcee Ft. OneRepublic",
  },
  {
    path: "https://cdn.trendybeatz.com/audio/Ruger-Ft-Bnxn-Romeo-Must-Die-RMD-(TrendyBeatz.com).mp3",
    displayName: "Romeo Must Die",
    cover:
      "https://trendybeatz.com/images/Ruger-Ft-Bnxn-Romeo-Must-Die-RMD-Artwork.jpg",
    artist: "Ruger Ft. Bnxn",
  },
  {
    path: "https://cdn.trendybeatz.com/audio/Khaid-Ft-Boy-Spyce-I-Dont-Care-(TrendyBeatz.com).mp3",
    displayName: "I Dont Care",
    cover: "https://trendybeatz.com/images/Boy-Spyce-I-Dont-Care-Artwork.jpg",
    artist: "Khaid Ft. Boyspice",
  },
];

// Set the initial song index
let currentSongIndex = 0;

// create a global audio object
let audio = new Audio();

// Update the UI with the current song's information
let interface = () => {
  let currentSong = songs[currentSongIndex];
  songTitle.textContent = currentSong.displayName;
  songArtiste.textContent = currentSong.artist;
  coverArt.src = currentSong.cover;
};

let playSong = () => {
  let currentSong = songs[currentSongIndex];
  audio.src = currentSong.path;
  audio.play;
};

setTimeout(() => {
  interface();
  playSong();
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".content").style.display = "block";
}, 3000);

// playSong();

const togglePlayPause = () => {
  if (audio.paused) {
    audio.play();
    play.classList.add("d-none"); // Hide play button
    pause.classList.remove("d-none"); // Show pause button
  } else {
    audio.pause();
    play.classList.remove("d-none"); // Show play button
    pause.classList.add("d-none"); // Hide pause button
  }
};

// event listener for buttons

// previous
previous.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  interface();
  playSong();
});

// play
play.addEventListener("click", () => {
  togglePlayPause();
});

// pause
pause.addEventListener("click", () => {
  togglePlayPause();
});

// next
next.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1 + songs.length) % songs.length;
  interface();
  playSong();
});

// progress
let updateProgress = () => {
  let currentTime = audio.currentTime;
  let duration = audio.duration;

  // to update the progress bar
  if (!isNaN(currentTime) && !isNaN(duration) && duration > 0) {
    let progressPercentage = (currentTime / duration) * 100;
    progress.style.width = progressPercentage + "%";

    // update current time and date
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
  }
};

let formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${pad(minutes)}:${pad(secs)}`;
};

let pad = (number) => {
  return number < 10 ? "0" + number : number;
};

// Event listeners
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadeddata", updateProgress);

audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1 + songs.length) % songs.length;
  interface();
  playSong();

  setTimeout(() => {
    audio.play();
  }, 100);
});
