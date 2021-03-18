const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({video:true, audio:false})//gives a promise
		.then(localMediaStream =>{
			// this was deprecated
			// video.src=window.URL.createObjectURL(localMediaStream);
			video.srcObject=localMediaStream;
			video.play();
		})
		.catch(err =>{console.error(err.message)});
}

function paintToCanvas(){
	const width=video.videoWidth;
	const height=video.videoHeight;
	canvas.width=width;
	canvas.height=height;

	return setInterval(()=>{
		ctx.drawImage(video,0,0,width,height);
	},16);
}

function takePhoto(){
	snap.currentTime=0;
	snap.play();

		const data=canvas.toDataURL('image/jpeg');
		const link=document.createElement('a');
		link.href=data;
		link.setAttribute('download','you');
		//link.textContent="Download Image";
		link.innerHTML=`<img src="${data}" alt="YOU"/>`;
		strip.insertBefore(link,strip.firstChild);
}

//paintToCanvas();
getVideo();
video.addEventListener('canplay',paintToCanvas);