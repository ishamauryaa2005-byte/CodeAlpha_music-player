const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let currentTrack = 0;

const tracks = [
  {
    name: "Song ajabsi",
    artist: "Artist srivastav",
    src: "D:\data of pen drive\My Music\01  Ajab Si.mp3"
  },
  {
    name: "Song friends",
    artist: "Artist mahi",
    src: "songs/song2.mp3"
  },
  {
    name: "Song mastmagan",
    artist: "Artist isha",
    src: "songs/song3.mp3"
  }
];

// Load playlist into UI
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = `${track.name} - ${track.artist}`;
  li.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(currentTrack);
    playAudio();
  });
  playlistEl.appendChild(li);
});

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  title.textContent = track.name;
  artist.textContent = track.artist;

  updatePlaylistUI();
}

function updatePlaylistUI() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === currentTrack);
  });
}

function playAudio() {
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseAudio() {
  audio.pause();
  playBtn.textContent = "▶️";
}

// Toggle play/pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playAudio();
});

// Next song
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playAudio();
});

// Update progress
audio.addEventListener("timeupdate", () => {
  progress.value = audio.currentTime / audio.duration || 0;
  current.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = progress.value * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

// Initialize
loadTrack(currentTrack);
