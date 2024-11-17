import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.querySelector("#three").appendChild(renderer.domElement);


const light = new THREE.DirectionalLight(0xffffff, 3);
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


// Animation Loop
function animate() {
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);