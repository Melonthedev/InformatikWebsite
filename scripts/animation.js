import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const animationContainer = document.querySelector('#animationcontainer');
const animationElement = document.querySelector('#threejsanimation');

// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(animationContainer.clientWidth, window.innerHeight);
animationElement.appendChild(renderer.domElement);

// Add Colored Base Plate
const planeGeometry = new THREE.PlaneGeometry(10, 10);
//const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x142326 });
const textureLoader = new THREE.TextureLoader();
const planeTexture = textureLoader.load("/media/plate_texture.jpg")
const planeMaterial = new THREE.MeshBasicMaterial({ map:  planeTexture});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.15;
scene.add(plane);

// Change Background
scene.background = new THREE.Color(0x141414);

// Add Light
const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Load Models
const loader = new GLTFLoader();

loader.load('/media/3d_models/3d_printer.glb', function (gltf) {
	var model = gltf.scene;
	scene.add(model);
	model.rotation.y = 4;
}, undefined, function (error) {
	console.error(error);
});


var benchy;
loader.load('/media/3d_models/3d_benchy.glb', function (gltf) {
	var model = gltf.scene;
	scene.add(model);
	model.position.x = 0.3;
	model.position.y = 0.25;
	model.position.z = -0.4;
	model.scale.set(0.003, 0.003, 0.003);
	model.rotation.y = 4;
	benchy = model;
	slideDefault();
}, undefined, function (error) {
	console.error(error);
});
// Handle Slide Switching & Scrolling

var slideIndex = 0;
var slideMap = [slideDefault, slidePrintMethods, slideAssembly, slideFilament, slideModels];


const containerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.boundingClientRect.top <= 0) {
            console.log("Animationcontainer oben dran");
			document.querySelector('#threejsanimation').style.position = "fixed";
        } else {
			console.log("Animationcontainer ab")
			document.querySelector('#threejsanimation').style.position = "static";
		}
    });
}, { 
    root: null,
    threshold: 0,
	rootMargin: '0px 0px -100% 0px'
});
containerObserver.observe(animationContainer);

var passed = false;
const keyframesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
		if (!entry.isIntersecting) {
			var index = entry.target.dataset.index;
			if (entry.boundingClientRect.top < 0 && slideIndex != index) {
				console.log("[Keyframe] Change to Slide " + index);
				slideMap[index]();
				slideIndex = index;
			} else if (passed && index > 0 && slideIndex != (index - 1)) {
				index--;
				console.log("[Keyframe] Change to Slide " + index);
				slideMap[index]();
				slideIndex = index;
			}
			passed = false;
		} else {
			passed = true;
		}
    });
}, { 
    root: null,
    threshold: 0,
	rootMargin: '0px 0px -100% 0px'
});
var keyframes = document.querySelectorAll(".keyframe");
keyframes.forEach(keyframe => keyframesObserver.observe(keyframe));



/*renderer.domElement.onwheel = handleEvent;
function handleEvent(event) {
	var distance = event.target.getBoundingClientRect();
	var scrollDistance = event.deltaY;
	//console.log("TOP: " + distance.top + " BOTTOM: " + distance.bottom)
	if (isSwitching) {
		event.preventDefault();
		return;
	}
	// Don't switch when container is not fully visible
	if (distance.top < -10 ) return;
	if (distance.top > 10 ) return;
	var backwards = false;
	if (scrollDistance < 0) {
		backwards = true;
	}
	//switchSlide(backwards);
	//event.preventDefault(); // STOP SCROLLING
}

function switchSlide(backwards) {
	if (backwards) {
		if (slideIndex <= 0) return;
		slideIndex--;
	} else {
		if (slideIndex >= slideMap.length - 1) return;
		slideIndex++;
	}

	console.log("Switching to slide " + slideIndex);
	slideMap[slideIndex]();
	isSwitching = true;
	setTimeout(() => isSwitching = false, 500);
}*/

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
	gsap.to(benchy.position, {
		z: -0.4,
		x: 0.3,
		y: 0.25,
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
	gsap.to(benchy.position, {
		z: -0.4,
		x: 0.3,
		y: 0.25,
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
		y: -0.7,
		z: -0.8,
		x: -1.3,
		duration: 1.5
	});
	gsap.to(benchy.position, {
		z: -0.4,
		x: 0.3,
		y: 0.25,
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
	gsap.to(benchy.position, {
		z: -0.4,
		x: 0.3,
		y: 0.25,
		duration: 1.5
	});
}
function slideModels() {
	gsap.to(camera.position, {
		z: 1,
		x: 0,
		y: 1.5,
		duration: 1.5
	});
	gsap.to(camera.rotation, {
		y: 0,
		z: camera.rotation.z  - 0,
		x: camera.rotation.x  - 0.4,
		duration: 1.5
	});
	gsap.to(benchy.position, {
		z: 0.8,
		x: 0,
		y: 1.3,
		duration: 1.5
	});
}

// Animation Loop
function animate() {
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);