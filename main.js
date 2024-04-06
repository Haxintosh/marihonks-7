import './style.css'
import * as THREE from 'three';
// import { ParallelMeshBVHWorker } from 'three-mesh-bvh/src/workers/ParallelMeshBVHWorker.js';
import { WebGLPathTracer } from './pathTracer/core/WebGLPathTracer.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.toneMapping = THREE.ACESFilmicToneMapping;

const pathTracer = new WebGLPathTracer(renderer);
pathTracer.tiles.set(2);
pathTracer.renderScale = Math.max(1 / window.devicePixelRatio, 0.5);

pathTracer.setScene(scene, camera);
animate();
function animate() {
  requestAnimationFrame(animate);
  pathTracer.renderSample();
  
}


// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;
// camera.rotateX(-0.25);

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.toneMapping = THREE.ACESFilmicToneMapping;

// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// let pathtracer = new WebGLPathTracer(renderer);
// pathtracer.renderToCanvas = true;
// pathtracer.setScene(scene, camera);
// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.position.set(5, 5, 5);
// scene.add(dirLight);

// pathtracer.minSamples = 0;
// pathtracer.setBVHWorker(new ParallelMeshBVHWorker());

// // Add a cube to the scene
// const geometry = new THREE.PlaneGeometry(10, 10);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide});
// const plane = new THREE.Mesh(geometry, material);
// scene.add(plane);

// // Sphere
// const sphereGeo = new THREE.IcosahedronGeometry(1, 1);
// const material2 = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
// const ico = new THREE.Mesh( sphereGeo, material2 );
// scene.add(ico);

// // Animation loop
// function animate() {
//   requestAnimationFrame(animate);

//   // renderer.render(scene, camera);
//   // while (pathtracer.samples < 1)
  
//   pathtracer.renderSample();

//   console.log(pathtracer.samples);

//   // if (pathtracer.samples > 9)
//   // {
//   //   pathtracer.reset();
//   // }
  
// }
// animate();