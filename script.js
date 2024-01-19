
import * as THREE from "https://cdn.skypack.dev/three@0.136";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/GLTFLoader.js";
// import { LoadingManager } from "https://cdn.skypack.dev/three@0.136/src/loaders/LoadingManager.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/DRACOLoader.js";
import { TextureLoader } from "https://cdn.skypack.dev/three@0.136/src/loaders/TextureLoader.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.136/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
	CSS2DRenderer,
	CSS2DObject,
  } from "https://cdn.skypack.dev/three@0.136/examples/jsm/renderers/CSS2DRenderer.js";
const scene = new THREE.Scene();
scene.background = new  THREE.Color("white")
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.5, 1000 );
camera.position.set(3,4,5);
camera.lookAt(scene.position)
camera.position.set( 22.370897381269884,  29.827863175026458, 74.5696579375662)

// renderer 
const renderer = new THREE.WebGLRenderer({
	antialias : true,
    alpha : true
   });
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.shadowMap.enabled = true;
   renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
   renderer.shadowMap.autoUpdate = true; 
   renderer.setClearColor(0xffffff, 0);
   renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.toneMapping = THREE.ACESFilmicToneMapping;
   
 
   

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(labelRenderer.domElement);
document.body.appendChild( renderer.domElement );



// controls......

const controls = new OrbitControls(camera , renderer.domElement)
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.1;
controls.minDistance = 17;
controls.enablePan = false;
// controls.minAzimuthAngle = -Math.PI / 2; // radians
// controls.maxAzimuthAngle = Math.PI / 2; // radians


// model.......


	// loader.load('assets/shadow.glb', (e)=>{
	// const model =  e.scene
	// scene.add(model);
	// model.castShadow = true;
	// model.traverse( item =>{
	// 	// console.log(item)
	// 	if(item.name === 'Line013_Material #24_0'){
	// 		room1 = item
	// 	}
	// 	if(item.name === 'Rectangle007_Material #11_0'){
	// 		surface = item ;
	// 	}
	// 	item.castShadow = false
	// 	item.receiveShadow = true
	// })
	// 	room1.castShadow = true
	// 	room1.receiveShadow = false
	// 	surface.receiveShadow = false
	// 	scene.add(model)

	// })



	// loading manager terms 
	// .........................1............................ 
    // const manager = new THREE.LoadingManager();
    // manager.onStart = function (url,item,total){
	// console.log(`start loader ${url}`);}
	// .........................2............................ 
	
	const manager = new THREE.LoadingManager();
const progressbar = document.getElementById("progress-bar");

manager.onProgress = function (url, loaded, total) {
    progressbar.value = (loaded / total) * 100;
}
const progressbarcon = document.querySelector(".progress-bar-con"); 
 const btn1 = document.querySelector('.dropdown');
 const btn8 = document.querySelector('.dropdown-color');
 const btn9 = document.querySelector('.dropdown-color2')
manager.onLoad = function () {
    progressbarcon.style.display = "none";
    btn1.style.display = "inline-block";
    btn8.style.display = "inline-block";
    btn9.style.display = "inline-block";
}

	const loader = new GLTFLoader(manager);
	let stickesObject, windowsObject;
	
	loader.load("assets/final.villa4.glb", (gltf) => {
		stickesObject = gltf.scene.getObjectByName('stickes');
		console.log(stickesObject)
		scene.add(gltf.scene);
	
		let stickesBtns = document.getElementsByClassName('btn');
		for (let i = 0; i < stickesBtns.length; i++) {
			stickesBtns[i].addEventListener('click', (event) => {
				let color = event.target.dataset.color;
				if (stickesObject && stickesObject.material) {
					// stickesObject.material.color = new THREE.Color(color);
					stickesObject.material= new THREE.MeshStandardMaterial({color : new THREE.Color(color)})
					
				}
			});
		}
	
		windowsObject = gltf.scene.getObjectByName('windows');
		scene.add(gltf.scene);
	
		let windowsBtns = document.getElementsByClassName('btn0');
		for (let i = 0; i < windowsBtns.length; i++) {
			windowsBtns[i].addEventListener('click', (event) => {
				let color = event.target.dataset.color;
				if (windowsObject && windowsObject.material) {
					windowsObject.material.color = new THREE.Color(color);
				}
			});
		}
	});
	

// DirectionalLight...... 

const light = new THREE.DirectionalLight(0xFFFFFF,2)
light.position.set(10,10,0)
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 2; 
light.shadow.camera.near = 0.5; 
light.shadow.camera.far = 70;
scene.add(light)

// helper.....

// const helper = new THREE.CameraHelper(light.shadow.camera)
// scene.add(helper)

// RGBELoader...... 

const rgb = new RGBELoader(manager)
rgb.load('assets/light.hdr' , (e)=>{
e.mapping = THREE.EquirectangularReflectionMapping;
scene.environment =e
scene.castShadow = true;
})
	const rgb2 = new RGBELoader()
	rgb2.load('assets/HDR_112_River_Road_2_Env.hdr' , (e)=>{
	e.mapping = THREE.EquirectangularReflectionMapping;
	scene.environment =e
	scene.castShadow = true;
	})	
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


// gsap  
const btn = document.querySelector(".front")
btn.addEventListener("click",(e)=>{
	console.log("clicked")
	gsap.to(camera.position, {
		x: -0.17020687800353015, y: 3.7244657731357096, z: 16.58612023118791,
		duration : 1.5,
		delay : 0.01, 
		easing : "easeInOutQuad",
		onUpdate: () => {
            controls.update();
        },
		
	});
		
});
const btn5 = document.querySelector(".back");
btn5.addEventListener("click", (e) => {
    console.log("clicked");

    gsap.to(camera.position, {
        x: 0.7167326652261621,
        y: 4.861585609369121,
        z: -20.284784274012164,
        duration: 1.5, 
        delay: 0.01,
        ease: "easeInOutQuad", 
        onUpdate: () => {
            
            
            controls.update();
        },
    });
});

const btn2 = document.querySelector(".top")
btn2.addEventListener("click",(e)=>{
	console.log("clicked")
	gsap.to(camera.position, {
		x: 0.026534500001055297, y: 21.877101730550073, z: 2.018529482994305,
		duration: 1.5, 
		delay : 0.01, 
		easing : "easeInOutQuad"
		,
		onUpdate: () => {
            controls.update();
        },
	});
		
});
const btn3 = document.querySelector(".left")
btn3.addEventListener("click",(e)=>{
	console.log("clicked")
	gsap.to(camera.position, {
		x: -16.457534930962836, y: 4.157949713055251, z: -0.9278998759789724,
		duration: 1.5,  
		delay : 0.01, 
		easing : 'easeInOutQuad', 
        onUpdate: () => {
            
            
            controls.update();
        },
	});
		
});
const btn4 = document.querySelector(".right")
btn4.addEventListener("click",(e)=>{
	console.log("clicked")
	gsap.to(camera.position, {
		x: 16.1949009721682, y: 5.019722823349066, z: -1.2359490956910402,
		duration : 2,
		delay : 0.01, 
		easing : "easeInOutQuad", 
        onUpdate: () => {
            controls.update();
        },
	});
		
});
function animate() {
	requestAnimationFrame( animate );
    // console.log(camera.position)
	labelRenderer.render(scene, camera);
	renderer.render( scene, camera );
	controls.update()
}


animate();
