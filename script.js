import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.querySelector("#three").appendChild(renderer.domElement);


const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const loader = new GLTFLoader();

loader.load('3d_printer.glb', function (gltf) {
	var model = gltf.scene;
	scene.add(model);
	model.rotation.y = 4;
}, undefined, function (error) {
	console.error(error);
});



var prevScrollY = 0;
window.onscroll = (event) => {
	var distance = renderer.domElement.getBoundingClientRect();
	console.log(distance.top);
	if (prevScrollY < window.scrollY) {
		// Down Scroll
		if (distance.top <= -10 && slideIndex < slideMap.length - 1) {
			console.log("STOP");
			window.scrollTo(0, prevScrollY)
			window.addEventListener('wheel', preventScroll, { passive: false });
			window.setTimeout(() => {
				window.removeEventListener('wheel', preventScroll);
			}, 1000)
		}
	} else {
		// Up Scroll
		if (distance.top >= 10 && slideIndex > 0) {
			console.log("STOP");
			window.scrollTo(0, window.scrollY + distance.top)
			window.addEventListener('wheel', preventScroll, { passive: false });
			window.setTimeout(() => {
				window.removeEventListener('wheel', preventScroll);
			}, 1000)
		}
	}
	prevScrollY = window.scrollY;
}

function preventScroll(event) {
	event.preventDefault();
	event.stopPropagation();
}

renderer.domElement.onwheel = switchSlide;

slideDefault();

var isSwitching = false;
var slideIndex = 0;
var slideMap = [slideDefault, slidePrintMethods, slideAssembly, slideFilament];

function switchSlide(event) {
	var distance = event.target.getBoundingClientRect();
	var scrollDistance = event.deltaY;
	//console.log("TOP: " + distance.top + " BOTTOM: " + distance.bottom)
	if (isSwitching) {
		event.preventDefault();
		return;
	}
	if (distance.top < -10 ) return;
	if (distance.top > 10 ) return;

	if (scrollDistance < 0) {
		if (slideIndex <= 0) return;
		slideIndex--;
	} else if (scrollDistance > 0) {
		if (slideIndex >= slideMap.length - 1) return;
		slideIndex++;
	}
	
	event.preventDefault();
	console.log("Switching to slide " + slideIndex);
	slideMap[slideIndex]();
	isSwitching = true;
	setTimeout(() => isSwitching = false, 500);
}

function slideDefault() {
	gsap.to(camera.position, {
		z: 2,
		x: -0.4,
		y: 0.5,
		duration: 1.5
	});
	gsap.to(camera.rotation, {
		y: -0.4,
		z: 0,
		x: 0,
		duration: 1.5
	}); 
}

function slidePrintMethods() {
	gsap.to(camera.position, {
		z: 0.5,
		x: -0.4,
		y: 0.5,
		duration: 1.5
	});
	gsap.to(camera.rotation, {
		y: -0.7,
		z: 0,
		x: 0,
		duration: 1.5
	});
}
function slideAssembly() {
	gsap.to(camera.position, {
		z: -0.2,
		x: 0.1,
		y: 1,
		duration: 1.5
	});
	gsap.to(camera.rotation, {
		y: camera.rotation.y,
		z: camera.rotation.z  - 0.8,
		x: camera.rotation.x  - 1.3,
		duration: 1.5
	});
}

function slideFilament() {
	gsap.to(camera.position, {
		z: 1,
		x: 0,
		y: 0.3,
		duration: 1.5
	});
	gsap.to(camera.rotation, {
		y: -1,
		z: 0,
		x: 0,
		duration: 1.5
	});
}


// Animation Loop
function animate() {
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);