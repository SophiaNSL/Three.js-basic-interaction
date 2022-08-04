import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { Interaction } from 'three.interaction';


//Color palette
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const color3 = document.querySelector('.color3');

//Sizes
const small = document.querySelector('.small');
const large = document.querySelector('.large');


// Canvas
const canvas = document.querySelector('canvas.webgl');


// Scene
const scene = new THREE.Scene()
// console.log(scene)


// Objects
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({color: 'white'})
)
cube1.position.x = 1;
cube1.position.y = 0.25;

const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 16),
    new THREE.MeshBasicMaterial({color: 0xffff00})
)
sphere1.position.x = -1
sphere1.position.y = 0.3

scene.add(cube1, sphere1)

let objects = [cube1, sphere1]


// Canvas Sizes
const sizes = {
    width: 800,
    height: 600
}

//Grid
//Grid helper defines 2d grids: size, divisions, color center line, color grid
const gridHelper = new THREE.GridHelper(5, 1, 0x000000, 0xffffff);
scene.add(gridHelper);

//Ground
const groundGeo = new THREE.PlaneGeometry(5, 5);
const groundMat = new THREE.MeshPhongMaterial({color: 'aqua'});
groundGeo.rotateX( - Math.PI / 2);

const ground = new THREE.Mesh(groundGeo, groundMat );
ground.position.set(0, 0, 0);
scene.add(ground);


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const dragControls = new DragControls(objects, camera, canvas)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//Interaction
const interaction = new Interaction(renderer, scene, camera);
cube1.cursor = 'pointer';
cube1.on('click', e => {

    //make sure only one mesh is active
    e.currentTarget.active = true;
    if(window.activeMesh){
        window.activeMesh.active = false;
    }
    window.activeMesh = e.currentTarget;
    console.log('cube1')
})


sphere1.cursor = 'pointer';
sphere1.on('click', e => {
    e.currentTarget.active = true;
    if(window.activeMesh){
        window.activeMesh.active = false;
    }
    window.activeMesh = e.currentTarget;
    console.log('sphere1')
})



//Change Colors
color1.addEventListener( 'click', (e) => {
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(getComputedStyle(e.target).backgroundColor) 
})

color2.addEventListener( 'click', (e) => {
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(getComputedStyle(e.target).backgroundColor) 
})

color3.addEventListener( 'click', (e) => {
    if (!window.activeMesh) return;
    window.activeMesh.material.color = new THREE.Color(getComputedStyle(e.target).backgroundColor) 
})

//change size
small.addEventListener('click', () => {
    if (!window.activeMesh) return;
    window.activeMesh.scale.set(1,1,1);
 
});

large.addEventListener('click', () => {
    if (!window.activeMesh) return;
    window.activeMesh.scale.set(2,2,2);

});
 
//Animations
const tick = () => {

    //Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick);

}

tick();
