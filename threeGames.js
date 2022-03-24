console.clear();
console.log('hello')
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
//import { OrbitControlsGizmo } from  "./OrbitControlsGizmo.js";
console.log('inicializacion')

const scene = new THREE.Scene();
scene.background=new THREE.Color('#c2d1f0')
const camera = new THREE.PerspectiveCamera( 110, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,2);


//scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor('#e5e5e5')
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener('resize',() =>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
//aqui las luces
const light= new THREE.PointLight(0xFFFFFF,1,200);
light.position.set(10,0,25);
scene.add(light);
//aqui los controles
const controls = new OrbitControls(camera,renderer.domElement);
controls.minDistance=1.3;
controls.maxDistance=2.5;

//coordenadas
const axesHelper = new THREE.AxesHelper( 2 );
scene.add( axesHelper );

//cargar textura background
const texture = new THREE.TextureLoader().load('back.png')
scene.background= texture;

//cargar objeto 3d

// otro objeto pero importado de licuadora
const loader = new GLTFLoader();
loader.load( 'trylobite.glb', function ( gltf ) {
    const trylobiteMesh = gltf.scene.children.find((child) => child.name === "rock");
    trylobiteMesh.position.x = -0.2;
    trylobiteMesh.position.z = 0.1;
    trylobiteMesh.rotation.y = -Math.PI/3;
    trylobiteMesh.rotation.x = Math.PI/6;
    scene.add(trylobiteMesh)
})

//aqui se renderiza
const render=function(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

//aqui llama al render
render();

