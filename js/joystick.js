
const speed = 0.1;
const bounds = {minX:-8,maxX:8,minZ:-100,maxZ:100};
let moveInput = {x:0,y:0};

const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");
let dragging=false;
const resetStick = ()=>{stick.style.left='100px'; stick.style.top='100px'; moveInput={x:0,y:0};};

joystick.addEventListener('pointerdown',(e)=>{dragging=true; e.target.setPointerCapture(e.pointerId);});
joystick.addEventListener('pointerup',(e)=>{dragging=false; resetStick();});
joystick.addEventListener('pointerout',(e)=>{dragging=false; resetStick();});
joystick.addEventListener('pointermove',(e)=>{
  if(!dragging) return;
  const rect = joystick.getBoundingClientRect();
  let dx = e.clientX - rect.left - rect.width/2;
  let dy = e.clientY - rect.top - rect.height/2;
  const maxDist = rect.width/2 - 25;
  let dist = Math.min(Math.sqrt(dx*dx+dy*dy), maxDist);
  let angle = Math.atan2(dy, dx);
  stick.style.left = `${35 + Math.cos(angle)*dist}px`;
  stick.style.top = `${35 + Math.sin(angle)*dist}px`;
  moveInput.x = Math.cos(angle)*(dist/maxDist);
  moveInput.y = -Math.sin(angle)*(dist/maxDist);
});

// Game loop
scene.onBeforeRenderObservable.add(()=>{
    let camForward = camera.getTarget().subtract(camera.position).normalize();
    camForward.y = 0;
    let camRight = new BABYLON.Vector3(camForward.z,0,-camForward.x);

    let move = new BABYLON.Vector3.Zero();
    move.addInPlace(camForward.scale(moveInput.y));
    move.addInPlace(camRight.scale(moveInput.x));

    if(move.lengthSquared()>0){
        move.normalize().scaleInPlace(speed);
        let newPos = player.position.add(move);
        newPos.x = Math.max(bounds.minX,Math.min(bounds.maxX,newPos.x));
        newPos.z = Math.max(bounds.minZ,Math.min(bounds.maxZ,newPos.z));
        player.position.copyFrom(newPos);
    }

    camera.target.copyFrom(player.position.add(new BABYLON.Vector3(0,1,0)));
});

engine.runRenderLoop(()=>scene.render());
window.addEventListener("resize",()=>engine.resize());
