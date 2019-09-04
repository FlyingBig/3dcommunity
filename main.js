require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import { getTransparent } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
import myGround from './utils/myGround';
// obj文件导出
import { objModel } from './utils/modelOut';
//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
//渲染器
let renderer = new THREE.WebGLRenderer();
//设置画布大小
const contrain = document.getElementById('app');
renderer.setSize(contrain.clientWidth, contrain.clientHeight);
renderer.setClearColor("#0E101F");
//加入到body
contrain.appendChild(renderer.domElement);
//加入灯光
let lights = []; // 灯光集合
lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 0 );
lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 0 );
lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 2000 );

lights[ 0 ].position.set( -500, 400, -1200 );
lights[ 1 ].position.set( 200, 400, 1200 );
lights[ 2 ].position.set( 500, 400, 1200 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );
// 生成建筑
let config = {
  material: {
    type: '',
  },
  map: {
    type: '',
    url: 'assets/image/circle.png'
  },
};
function positionBuild() {
  // 位置，角度信息
  const positions = {
    mybuild: { position:[[-360, 82 , -225]], rotation: [Math.PI*1.4] }, // 明宇 -- 1
    cylinder: { position:[
        [40, 0 , -55],
        [-10, 0 , -30],
        [-70, 0 , -30],
        [-190, 0 , -30],
        [-250, 0 , -75],
      ],
      rotation: [0,0,0,0,0] }, // 圆形建筑物 -- 5
    polygon: { position:[
        [40, 0 , 25]
      ], rotation: [2*Math.PI] }, // 厂房 -- 1
    main: { position:[
        [120, 0 , -110],
        [-150, 0 , -175],
        [-150, 0 , -125],
      ], rotation: [-Math.PI*0.7, -Math.PI*0.5, -Math.PI*0.5] }, // 住宅1 -- 9
    nums: {
      position:[
        [310, 0 , -180],
        [330, 0 , -130],
        [320, 0 , -70],
        [295, 0 , -50],
        [235, 0 , -50],
        [185, 0 , -110],
        [215, 0 , -160],
        [275, 0 , -170],
        [-25, 0 , -70],
        [-35, 0 , -140],
        [-15, 0 , -160],
        [20, 0 , -180],
        [65, 0 , -150],
        [-240, 0 , -125],
        [-230, 0 , -175],
      ],
      rotation: [-Math.PI/3, -Math.PI/2, -Math.PI*0.6, -Math.PI*1.2, -Math.PI*1.2, -Math.PI*1.5, -Math.PI*1.8, -Math.PI*1.8, -Math.PI*1.5, -Math.PI*1.7, -Math.PI*1.8, -Math.PI/6, -Math.PI/3, Math.PI/2, Math.PI*0.2]
    }, // 住宅2 -- 5
  };
  // 建筑集合
  let builds = {};
  const cylinder = new CylinderBuild({ config }).init();
// 多边形
  const polygon = new PolygonBuild().init();
  polygon.rotateX( Math.PI * -0.5 );
//主要建筑
  const main = mainBuild.init();
// 明宇大厦
  const mybuild = myBuild.init();
// 数窗最多的建筑
  const nums = numBuild.init();
  builds.cylinder = cylinder;
  builds.polygon = polygon;
  builds.main = main;
  builds.mybuild = mybuild;
  builds.nums = nums;
  for(let key in positions) {
    if( positions[key].position.length ) {
      let { position, rotation } = positions[key];
      position.map((re, index)=>{
        let build = builds[key].clone();
        build.position.set(...re);
        key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
        scene.add(build);
      })
    }
  }
};
positionBuild();
// 透明建筑
// console.log(mybuild);
//   if(mybuild.children) {
//     let box = new THREE.Object3D();
//     for(let i=0; i<mybuild.children.length-1;i++) {
//       let j = getTransparent(mybuild.children[i].geometry);
//       let { position, rotation } = mybuild.children[i];
//       box.add(j);
//     }
//     box.add(getTransparent(mybuild.children[2].children[0].geometry));
//     scene.add(box);
//   }
//const opc = getTransparent(mybuild.);
let CAR = null;
async function scar () {
  let car = await objModel('/models/scar/file.mtl','/models/scar/file.obj');
  car.position.set(0, 0, 0);
  scene.add(car);
};
async function redCar() {
  CAR = await objModel('/models/redCar/file.mtl','/models/redCar/file.obj',-Math.PI/2, 0.001);
  CAR.position.set(-550, 2, -350);
  CAR.rotateY(Math.PI);
  scene.add(CAR);
};
// scar(); //货车
redCar(); //小汽车
var axesHelper = new THREE.AxesHelper( 1000 );
axesHelper.position.set(0,10,0);
scene.add( axesHelper );
let PATH = []; //运动轨迹
function runPath() {
  PATH = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -550, 2, -350 ),
    new THREE.Vector3( 550, 10, -350 ),
  ], true);
  let points = PATH.getPoints( 100 );
  let geometry = new THREE.BufferGeometry().setFromPoints( points );

  let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

  let curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}
// runPath();
let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );

let geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );

let mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, - 1, 0 );
mesh.rotation.x = - Math.PI * 0.5;
mesh.receiveShadow = true;
scene.add(mesh);
//设置相机位置
camera.position.set(100, 400, 300);
function initControl() {
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35
}
//渲染循环
let progress = 0;
let avg = Math.PI/2/200;
function runCar(progress) {
  // if(progress> 525 && progress <= 725) {
  //   CAR.rotateY(avg);
  // } else if(progress> 1150 && progress <= 1350) {
  //   CAR.rotateY(avg);
  // } else if(progress> 1725 && progress <= 1925) {
  //   CAR.rotateY(avg);
  // } else if(progress>2400  || progress <= 100) {
  //   CAR.rotateY(avg);
  // }
}
let detictx = 0;
let detictz = 0
function animate() {
  // if ( progress < 2500 && CAR) {
  //   let pro = 0.0004*progress;
  //   let point = PATH.getPoint(pro);
  //   let n = CAR.rotation.y;
  //   runCar(progress, n);
  //   progress ++;
  //   CAR.position.set(point.x, point.y, point.z);
  // } else {
  //   progress = 0;
  // }
  if(CAR) {
    if(CAR.position.x <= -550) {
      CAR.rotateY(Math.PI);
      detictx = 1;
      detictz = 0.2;
    } else if(CAR.position.x >= 500) {
      CAR.rotateY(Math.PI);
      detictx = -1;
    } else if(CAR.position.x == -50){
      detictz = 0;
    } else if( CAR.position.x == -51 ) {
      detictz = -0.2;
    }
    CAR.position.x += detictx;
    CAR.position.z += detictz;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
initControl();
animate();


/****加载地面环境***/
var roadObjs = myGround.loadRoad();
scene.add(...roadObjs);

var riverObjs = myGround.loadRiver();
scene.add(...riverObjs);

var grassObjs = myGround.loadGrass();
scene.add(...grassObjs);

myGround.loadTree().then(re=>{
  scene.add(...re);
});
