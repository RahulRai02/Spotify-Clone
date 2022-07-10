console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');

let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');


let songs = [
    { songName: "Night Changes", filePath: "songs/1.mp3", coverPath:"Covers/cover1.jpg" },
    {songName: "DJ Snake - Let Me Love You", filePath:"songs/2.mp3", coverPath:"Covers/cover2.jpg"},
    {songName: "Ed Sheeran - Shape of You", filePath:"songs/3.mp3", coverPath:"Covers/cover3.jpg"},
    {songName: "They don't know about us", filePath:"songs/4.mp3", coverPath:"Covers/cover1.jpg"},   
    {songName: "The way you felt", filePath:"songs/5.mp3", coverPath:"Covers/cover5.jpg"},
    {songName: "Little Things - One Direction", filePath:"songs/6.mp3", coverPath:"Covers/cover6.jpg"},
    {songName: "Counting Stars - One Republic", filePath:"songs/7.mp3", coverPath:"Covers/cover7.jpg"}
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


// Handle play/pause click
masterPlay.addEventListener('click', () =>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})



// Listen to events
audioElement.addEventListener('timeupdate', () =>{
    console.log('timeupdate');
    // Update Seekbar

    // To get the % of song completed
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);

    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})


// To make the list songs play button working START
const makeallPlays = () =>{
    // e.target.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => { 
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');

    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeallPlays();

        songIndex = parseInt(e.target.id);


        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        gif.style.opacity = 1;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

// END---------------------------------------


// Next button

document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 6) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    gif.style.opacity = 1;   
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})