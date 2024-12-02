import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const animationContainer = document.querySelector('#animationcontainer');
const animationElement = document.querySelector('#threejsanimation');
const category = document.querySelector("#category");

// Create Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(animationContainer.clientWidth, window.innerHeight);
animationElement.appendChild(renderer.domElement);

// Add Textured Base Plate
const planeGeometry = new THREE.PlaneGeometry(10, 10);
//const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x142326 });
const textureLoader = new THREE.TextureLoader();
const planeTexture = textureLoader.load("https://raw.githubusercontent.com/Melonthedev/InformatikWebsite/main/media/plate_texture.jpg")
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

loader.load('https://raw.githubusercontent.com/Melonthedev/InformatikWebsite/main/media/3d_models/3d_printer.glb', function (gltf) {
	var model = gltf.scene;
	scene.add(model);
	model.rotation.y = 4;
}, undefined, function (error) {
	console.error(error);
});

var benchy;
loader.load('https://raw.githubusercontent.com/Melonthedev/InformatikWebsite/main/media/3d_models/3d_benchy.glb', function (gltf) {
	var model = gltf.scene;
	scene.add(model);
	model.position.x = 0.3;
	model.position.y = 0.25;
	model.position.z = -0.4;
	model.scale.set(0.003, 0.003, 0.003);
	model.rotation.y = 4;
	benchy = model;
	slideDefault();
	var keyframes = document.querySelectorAll(".keyframe");
keyframes.forEach(keyframe => keyframesObserver.observe(keyframe));
}, undefined, function (error) {
	console.error(error);
});


window.addEventListener('resize', onWindowResize);
	
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle Slide Switching & Scrolling
var slideIndex = 0;
var slideMap = [slideDefault, slidePrintMethods, slideAssembly, slideFilament, slideModels];

const containerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
		//console.log(entry.boundingClientRect.top)
        if (entry.boundingClientRect.top <= 0) {
            console.log("Animationcontainer fixed to top");
			animationElement.style.position = "fixed";
			animationContainer.style.marginBottom = (animationElement.clientHeight + 100) + "px";
			animationContainer.style.marginBottom = (animationElement.clientHeight + 100) + "px";
        } else {
			console.log("Animationcontainer ab")
			animationElement.style.position = "static";
			animationContainer.style.marginBottom = "1000px";
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
	setSlideInfo("3D-Druck in 4 Kategorien", "Die wichtigsten Aspekte des 3D-Drucks in 4 Kategorien");
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
	setSlideInfo("Druckmethoden", "Überblick über die verschiedenen Verfahren des 3D-Drucks", "./sites/print-methods");
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
	setSlideInfo("Aufbau & Hardware", "Wie funktioniert das ganze eigentlich?", "./sites/printer-assembly");
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
	setSlideInfo("Filament", "Mit welchem Material kann gedruckt werden? Was sind Vor- und Nachteile?", "./sites/materials-filament");
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
		z: 0,
		x: -0.4,
		duration: 1.5
	});
	gsap.to(benchy.position, {
		z: 0.8,
		x: 0,
		y: 1.3,
		duration: 1.5
	});
	setSlideInfo("Druckablauf", "Wie geht man vor? Von der 3D-Datei zum Gegenstand", "./sites/3d-printing");
}

function setSlideInfo(title, details, pageLink) {
	gsap.timeline().fromTo(category, 
		{ xPercent: 10, yPercent: 50, opacity: 1 }, 
		{ xPercent: -20, opacity: 0, duration: 0.5 })
	.call(() => {
		category.querySelector("#categoryTitle").innerText = title;
		category.querySelector("#categoryDetails").innerText = details;
		var categoryPageLink = category.querySelector("#categoryPageLink");
		categoryPageLink
		if (pageLink == null) {
			categoryPageLink.style.display = "none";
		} else {
			categoryPageLink.href = pageLink;
			categoryPageLink.style.display = "";
		} 
	})
	.fromTo(category, 
		{ xPercent: 80, opacity: 0 }, 
		{ xPercent: 10, yPercent: 50, opacity: 1 }); 
}


// Animation Loop
function animate() {
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);