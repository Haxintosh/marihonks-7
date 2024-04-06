import './style.css'
import * as THREE from 'three';
import { WebGLPathTracer } from './pathTracer/core/WebGLPathTracer.js';
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let pathtracer = new webGLPathTracer(renderer);
pathtracer.updateScene(scene, camera);

// Add a cube to the scene
const geometry = new THREE.PlaneGeometry(10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Sphere
const sphereGeo = new THREE.IcosahedronGeometry(1, 10);
const material2 = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const ico = new THREE.Mesh( sphereGeo, material2 );
scene.add(ico);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // renderer.render(scene, camera);
  pathtracer.renderSample();
}
animate();