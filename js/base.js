<!-- Scene & Camera -->

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas,true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0,0,0); // black sky

// Camera setup
const camera = new BABYLON.ArcRotateCamera("cam",-Math.PI/2,Math.PI/4,8,new BABYLON.Vector3(0,1,0),scene);
camera.attachControl(canvas,true);
camera.lowerRadiusLimit = 3;
camera.upperRadiusLimit = 15;
  
camera.angularSensibility = 70000; // higher = slower mouse drag
camera.inertia = 0.95;            // closer to 1 = smoother deceleration

//scene.registerBeforeRender(() => {
//    camera.alpha += 0.00001; // small value = slow rotation
//});
// Light
new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,0),scene);


