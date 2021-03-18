const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const effect1=document.querySelector('.but1');
const effect2=document.querySelector('.but2');
const effect3=document.querySelector('.but3');

let choice=0;


function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  let alp=false;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    //effect1.addEventListener('click',undead);
   // mess with them
   if(choice===1){
    pixels = undead(pixels);
    alp=true;
    }
    else
      if(choice===2){
        pixels=acid(pixels);
        alp=true;
      }
    else
      if(choice===3){
        pixels=aquamarine(pixels);
        alp=false;
      }

    if(alp){
      ctx.globalAlpha = 0.8;
    }

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function undead(pixels) {
  //let pixels = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i -10] = pixels.data[i +0] *(205/255); // RED
    pixels.data[i + 10] = pixels.data[i + 1]*(170/255); // GREEN
    pixels.data[i + 2] = pixels.data[i +2] *(25/255); // Blue
  }
  // ctx.putImageData(pixels, 0, 0);
  return pixels;
}

function aquamarine(pixels) {
  //let pixels = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0]*(230/255); // RED
    pixels.data[i - 10] = pixels.data[i + 1]*(175/255); // GREEN
    pixels.data[i - 20] = pixels.data[i + 2]*(35/255); // Blue
  }
  // ctx.putImageData(pixels, 0, 0);
  return pixels;
}

function acid(pixels) {

  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 300] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 450] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}



getVideo();

video.addEventListener('canplay', paintToCanvas);
effect1.addEventListener('click',
  ()=> {choice=(choice!=1?1:0);});
effect2.addEventListener('click',
  ()=> {choice=(choice!=2?2:0);});
effect3.addEventListener('click',
  ()=> {choice=(choice!=3?3:0);});