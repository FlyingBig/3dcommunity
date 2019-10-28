import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');
let demoData = require('./json/build.json');

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'stats-js';
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import { getTransparent, clearMemoty } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
import myGround from './utils/myGround';
import grassarea from './utils/grassArea';
import parking from './utils/parking';
import elevator from './utils/elevator';
import doorModel from './utils/door';
import line from './utils/addline';
import monitor from './utils/monitorObj';
import  houseManege from './utils/houseManagement';
import  parterre from './utils/parteree';
import { logChange, equipmentRunning, houseMessage, changeModel, changeScene, closeBigScene, removeLoading } from './utils/event';
import { computRem } from './utils/util';
// obj文件导出
import { objModel } from './utils/modelOut';
import { Water } from './node_modules/three/examples/jsm/objects/Water2';

import outWall from './utils/floor/outwall';
import buildingEvent from "./utils/floor/buildingEvent";
// 渲染房屋
class RenderCanvas {
  constructor(){
    //创建场景.
    this.scene = new THREE.Scene();
    //this.scene.fog = new THREE.Fog('#BCC1BB', 900, 1000);
    //相机
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 10000);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.maxPolarAngle = Math.PI * 0.45;
		this.controls.minDistance = 20;
		this.controls.maxDistance = 800;

    // 房屋建筑信息
    this.positions = {
      mybuild: { position:[[-355, 82 , -205]], rotation: [Math.PI*1.5] }, // 明宇
      cylinder: { position:[
          [40, 4 , -55],
          [-10, 4 , -30],
          [-70, 4 , -30],
          [-190, 4 , -30],
          [-250, 4 , -75],
        ],
        rotation: [0,0,0,0,0]
      }, // 圆形建筑物
      polygon: { position:[
          [40, 2 , 25]
        ], rotation: [2*Math.PI]
      }, // 厂房
      main: { position:[
          [120, 2 , -110],
          [-165, 2 , -175],
          [-165, 2 , -145],
        ], rotation: [-Math.PI*0.7, -Math.PI*0.5, -Math.PI*0.5]
      }, // 住宅1
      nums: {
        position:[
          [310, 3 , -180],
          [325, 3 , -130],
          [320, 3 , -70],
          [295, 3 , -50],
          [235, 3 , -50],
          [225, 3 , -100],
          [215, 3 , -160],
          [265, 3 , -183],
          [-45, 3 , -100],
          [-35, 3 , -170],
          [-15, 3 , -190],
          [20, 3 , -200],
          [65, 3 , -180],
          [-240, 3 , -125],
          [-230, 3 , -185],
        ],
        rotation: [-Math.PI/3, -Math.PI/2, -Math.PI*0.6, -Math.PI*1.2, -Math.PI*1.2, -Math.PI*1.5, -Math.PI*1.8, -Math.PI*2, -Math.PI*1.5, -Math.PI*1.7, -Math.PI*1.8, -Math.PI/6, -Math.PI/3, Math.PI/2, Math.PI*0.2]
      }, // 住宅2
    };
    // 草坪位置
    this.grass = [
      [-30, 0, 30],
      [-60, 0, 60],
      [-90, 0, 100],
      [-90, 0, 140],
      [0, 0, 30],
      [30, 0, 30]
    ]
    // 车辆运动的速度
    this.speed = 2;
    // 灯光位置i
    this.positionLight = [
      [-500, 400, -1200], [200, 400, 1200 ], [500, 400, 1200],
      [-5000, 4000, -12000], [2000, 4000, 12000 ], [5000, 4000, 12000],
    ];
		// 场景贴图控制
		let cubeTextureLoader = new THREE.CubeTextureLoader();
		cubeTextureLoader.setPath( './assets/image/' );
		//六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
		let nightCubeTexture = cubeTextureLoader.load( [
			'd1.jpg', 'd2.jpg',
			'd3.jpg', 'd4.jpg',
			'd1.jpg', 'd1.jpg'
		] );
		//六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
		let dayCubeTexture = cubeTextureLoader.load( [
			'posz.jpg', 'negz.jpg',
			'posy.jpg', 'negy.jpg',
			'negx.jpg', 'posx.jpg'
		] );
		this.sceneTexture = {
			sceneNight: nightCubeTexture,
			sceneDay: dayCubeTexture,
		};
    // 车辆模型集合
    this.cars = {};
    // 性能指标
    this.stats = {};
    // 道路偏转系数
    this.roadDeflection = 0;
    // 所有建筑类型
    this.builds = {};
    this.diffModel = {};
    // 透明模式
    this.opacity = false;
    // 模式状态（1->收缩 2->展开）
    this.modelType = 1;
    // 已选择模式
    this.activeModel = 1;
    // 右键状态
    this.contextmenuStatus = ''; // detail -> 组成模型  transparent -> 透明模式
  }
  // 启动函数
  init() {
    // 设置画布大小/颜色
    const contrain = document.getElementById('app');
    this.renderer.setSize(contrain.clientWidth, contrain.clientHeight);
    // this.renderer.setClearColor("red");
    contrain.appendChild(this.renderer.domElement);
    // 添加灯光
    let lightsDay = [];
    lightsDay[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 50000, 2 );
    lightsDay[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
    lightsDay[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
    lightsDay[ 0 ].position.set( ...this.positionLight[0] );
    lightsDay[ 1 ].position.set( ...this.positionLight[1] );
    lightsDay[ 2 ].position.set( ...this.positionLight[2] );
    // 夜晚的灯光位置，层级信息
    let lightsNight = [];
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight[0].layers.mask = 2;
    lightsNight[0].position.set(...this.positionLight[3]);
    lightsNight[1].layers.mask = 2;
    lightsNight[1].position.set(...this.positionLight[4]);
    lightsNight[2].layers.mask = 2;
    lightsNight[2].position.set(...this.positionLight[5]);
    this.scene.add( ...lightsDay, ...lightsNight);
    // 添加性能指标
    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
		this.stats.dom.style.left = '21.4rem';
		this.stats.dom.style.top = '10px';
		this.scene.background = this.sceneTexture.sceneDay
    // 设置相机位置
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);
    // this.eventBtn();
    this.roadGrass();
    this.diffModel.grass = grassarea.getArea();
    this.scene.add(this.diffModel.grass);
    this.positionBuild();
    this.foot();
    // this.axesHelper();
    this.initControl();
    // this.loadWater();
    this.redCar();
    this.loadGarbages();
    this.loadLamps();
    this.randomBuild( 150 );
    this.loadParking();
    this.mouseEvent();
    this.addRain();
    this.loadHydrant();
    this.loadWall();
    this.loadDoor();
    houseManege.init(); // 物业管理模块
    this.eventClick();
    this.loadParterre();
    this.animate();

		monitor.init(this.scene,this.camera,this.controls,this.renderer);
		//myGround.addFire(this.scene)
		outWall.addTestBuild(this.scene)
		buildingEvent.init(this.scene,this.camera,this.controls,this.opacity);
		removeLoading()//去除加载loading

  }
  // 添加缩放拖拽控制器
  initControl() {
    this.controls.enableDamping = true
    this.controls.zoomSpeed = .5;
    this.controls.panSpeed = .5;
    this.controls.dampingFactor = 0.25
    this.controls.rotateSpeed = 0.35
    // this.controls.maxPolarAngle = Math.PI * 0.45;
    // this.controls.minDistance = 20;
    // this.controls.maxDistance = 800;
  }
  // 房屋数量，位置，旋转角度信息
  positionBuild() {
    let that = this;
    let positions = this.positions;
    // 建筑集合
    let builds = {};
    // 圆形建筑
    const cylinder = new CylinderBuild().init();
    // 多边形
    const polygon = new PolygonBuild().init();
    // 主要建筑
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
    this.builds = builds;
    let entitiesBox = new THREE.Object3D();
    entitiesBox.name = 'entitiesBox';
    for(let key in positions) {
      if( positions[key].position.length ) {
        let { position, rotation } = positions[key];
        position.map((re, index)=>{
          let build = builds[key].clone();
          build.position.set(...re);
          key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          build.name = 'entitiesBuild';
          build.userData.type = key;
          build.matrixAutoUpdate = false;
          build.updateMatrix();
          entitiesBox.add(build);
        })
      }
    }
    this.scene.add(entitiesBox);
  }
  // 底面地面
  foot() {
    let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );
    let geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, - 1, 0 );
    mesh.rotation.x = - Math.PI * 0.5;
    mesh.receiveShadow = true;
    // 相机第二视角的底图
    let meshIndex = mesh.clone();
    meshIndex.layers.mask = 2;
    this.scene.add(mesh, meshIndex);
  }
  // 加载草坪，道路
  roadGrass() {
    // 加载小区的道路
    let roadObjs = myGround.loadRoad();
    this.scene.add(roadObjs);
    // // 加载公路
    let driveRoad = myGround.loadDriveWay();
    this.scene.add(driveRoad);
    // 加载河流
    let riverObjs = myGround.loadRiver();
    this.scene.add(...riverObjs);
    // 加载草坪
    this.diffModel.grass = myGround.loadGrass();
    this.scene.add(this.diffModel.grass);
		// 加载树木
		myGround.loadTree().then(re => {
			this.scene.add(re);
		})

		let myGardens = myGround.addGarden();
		this.scene.add(myGardens);
  }
  // 添加辅助线工具
  axesHelper() {
    let axesHelper = new THREE.AxesHelper( 1000 );
    axesHelper.position.set(0,10,0);
    this.scene.add( axesHelper );
  }
  // 车辆运动轨迹
  carRunning( car, angle ) {
    let direction = Math.cos(angle);
    if(car.position.x == -550) {
      car.rotateY(Math.PI);
      direction = Math.cos(0)
    } else if(car.position.x == 500) {
      car.rotateY(Math.PI);
      direction = Math.cos(Math.PI)
    }
    car.position.x += this.speed*direction;
    car.position.z += this.roadDeflection*direction;
  }
  // 随机生成简单模型
  randomBuild( num ) {
		let demoBuild = new THREE.BoxBufferGeometry(20, 45, 20);
		let geometers = [];
		let length = 350;
		// 合并为一个geometry对象
		for( let i=0; i<length; i++ ) {
			let x,z;
			if(i<length/4){
				x = 750+(Math.random()-.5)*350
				z = 1800*(Math.random()-.5)
			}else if(i<length/2){
				x = -760+(Math.random()-.5)*340
				z = 1800*(Math.random()-.5)
			}else if(i<length*3/4){
				z = -600+(Math.random()-.5)*500
				x = 1800*(Math.random()-.5)
			}else{
				z = 600+(Math.random()-.5)*500
				x = 1800*(Math.random()-.5)
			}

			let s = THREE.Math.randFloat(0.6, 1.4);
			let cloneDemo = demoBuild.clone();
			cloneDemo.scale( 1, s, 1 );
			cloneDemo.translate(x, 45*s/2, z);
			geometers.push(cloneDemo);
		}
		let geometry = BufferGeometryUtils.mergeBufferGeometries( geometers );
		let mesh = new THREE.Mesh(geometry, new THREE.MeshToonMaterial({color: '#525352',transparent:true,opacity:.8}));
    this.diffModel.random = mesh;
		this.scene.add(this.diffModel.random);
  }
  // 动画
  animate(time) {
    TWEEN.update(time);
    let ks = Object.keys(this.cars);
    if( ks.length ) {
      for(let i=0; i<ks.length; i++) {
        let car = this.cars[ks[i]];
        let angle = car.rotation.x;
        this.carRunning(car, angle);
      }
    }
    let aim = this.animate.bind(this);
    requestAnimationFrame(aim);
    this.stats.update();
    if(myGround.cloud&&myGround.cloud.visible){
      this.renderRain();
    }
    if(line.lineArr[0].curveLine&&line.lineArr[0].curveLine.visible){
      line.lineAnimate(this.scene)
    }
    this.renderer.render(this.scene, this.camera);
  }
  // 添加obj模型
  async redCar() {
    let param = [{
      mtlUrl: `${BASEPATH.basePth}/models/redCar/file.mtl`,
      objUrl: `${BASEPATH.basePth}/models/redCar/file.obj`,
      deg: 0,
      scale: 3,
      position: this.computedRoal([-550, 2, -280])
    },{
      mtlUrl: `${BASEPATH.basePth}/models/scar/file.mtl`,
      objUrl: `${BASEPATH.basePth}/models/scar/file.obj`,
      deg: 0,
      scale: 0.003,
      position: this.computedRoal([-100, 2, -315])
    }]
    let car = await Promise.all(objModel(param));
    this.cars.smallCar = car[0];
    this.cars.truck = car[1];
    this.scene.add(...car);
    // 停车长汽车位置摆放
    let car1 = car[0].children[2].clone();
    car1.children.map((v)=>{
      v.matrixAutoUpdate = false;
    });
    car1.position.set(-167,2,67);
    car1.rotateY(Math.PI/2);
    car1.matrixAutoUpdate = false;
    car1.updateMatrix();
    let car3 = car1.clone();
    car3.position.x = -150;
    car3.updateMatrix();
    let car4 = car1.clone();
    car4.position.x = -154;
    car4.position.z = 38;
    car4.rotateY(Math.PI);
    car4.updateMatrix();
    let car2 = car[1].children[2].clone();
    car2.position.set(-185.5,2,65);
    car2.rotateY(Math.PI/2);
    car2.matrixAutoUpdate = false;
    car2.updateMatrix();
    this.scene.add(car1, car2, car3, car4);
  }
  // 添加消防栓模型
  async loadHydrant() {
    let position = [[20, 1, -3], [-20, 1, 7], [-70, 1, 7],  [-220, 1, 20], [-16, 1, -100], [100, 1, -70]];
    let param = [{
      mtlUrl: `${BASEPATH.basePth}/models/hydrant/file.mtl`,
      objUrl: `${BASEPATH.basePth}/models/hydrant/file.obj`,
      //deg: -Math.PI/2,
      //scale: 0.001,
      noLight: true,
    }];
    let model = await Promise.all(objModel(param)); // 获取模型
    let obj = new THREE.Object3D();
    position.map((v)=>{
      let c = model[0].clone();
      c.position.set(...v);
      obj.add(c);
    })
    this.scene.add(obj);
  }
  // 加载水波动画
  loadWater() {
    // 河流水波
    let watergeometry = myGround.loadRiverWater();
    let textureLoader = new TextureLoader();
    let water = new Water(watergeometry,{
      color:'#a1d3ee',
      scale:.02,
      alpha: 1.0,
      normalMap0:textureLoader.load('./assets/image/Water_1_M_Normal.jpg'),
      normalMap1:textureLoader.load('./assets/image/Water_2_M_Normal.jpg'),
      flowDirection: new THREE.Vector2(-1,-1),
      textureWidth: 512,
      textureHeight: 512,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined
    });
    water.position.y = 5
    water.rotation.x = Math.PI*-0.5;

    let fountrinWater = new THREE.CircleBufferGeometry(8, 32);
    let water1 = new THREE.Mesh(fountrinWater, new THREE.MeshPhongMaterial({color: '#a1d3ee'}))
    water1.position.set(-138, 0, -120);
    water1.rotation.x = Math.PI*-0.5;
    water1.position.y = 2
    this.scene.add( water, water1);
  }
  // 计算道路的偏移量
  computedRoal( tanslate ) {
    let [x, y, z] = tanslate;
    let z1 = z + this.roadDeflection * Math.abs(-550 - x) / 2;
    return [x, y, z1]
  }
  // 透明建筑物
  getOpacity(mesh, data) {
    let builds = getTransparent( mesh );
    let obj = new THREE.Object3D();
    obj.name = 'opacityBuild';
    //opacityBox.visible = this.opacity;
    // 图层显示
    builds.layers.mask = 2;
    builds.position.set(0,0,0);
    // 电梯详情
    let elevators = new elevator(48, data);
    let ele = elevators.createModel();
    ele.position.y = 23;
    builds.position.y = 2;

    // let detail = new CylinderBuild().getFloor();
    obj.add(builds, ele);
    obj.position.set(0,0,0);
    this.scene.add(obj);
    elevators.runningElevator(ele); // 为电梯添加运动状态
  }
  // node事件
  eventBtn() {
		let that = this;
		window.addEventListener('resize',function(){
			that.camera.aspect = window.innerWidth/window.innerHeight;
			that.camera.updateProjectionMatrix();
			that.renderer.setSize(window.innerWidth,window.innerHeight);
			if(monitor.echarts){
				monitor.echarts.resize();
			}
		});
    // 车流量
    let carFlow = document.getElementById("carFlow");
    carFlow.addEventListener('click',function(){
      if(!line.lineArr[0].curveLine){
        let carFlow = line.addLine();
        that.scene.add(carFlow)
      }else {
        if(line.lineArr[0].curveLine.visible){
          for(let i=0;i<line.lineArr.length;i++){
            line.lineArr[i].curveLine.visible = false;
            line.lineArr[i].backLine.visible = false;
          }
        }else {
          for(let i=0;i<line.lineArr.length;i++){
            line.lineArr[i].curveLine.visible = true;
            line.lineArr[i].backLine.visible = true;
          }
        }
      }

    })
  }
  //添加垃圾桶
  loadGarbages (){
    let garbages = myGround.loadGarbageBin();
    this.scene.add(...garbages)
  }
  //添加路灯
  loadLamps (){
    let lamps = myGround.loadLamp();
    this.scene.add(...lamps)
  }
  // 停车场
  loadParking() {
    let groundPark = parking.init();
    groundPark.position.set(-170,2,52);
    this.scene.add(groundPark);
  }
  // 花坛
  loadParterre() {
    let n = parterre.init();
    n.position.set(-134, 1, -120);
    n.scale.set(2,2,2);
    this.scene.add(n);
  }
  //鼠标双击单击
  mouseEvent(){
		let that = this;
		//鼠标双击进入观察状态
		document.addEventListener("click",function(event){
			let mouse = {x:'',y:''}
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			let raycaster = new THREE.Raycaster();
			// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
			raycaster.setFromCamera( mouse, that.camera );
			// 获取raycaster直线和所有模型相交的数组集合
			var intersects = raycaster.intersectObjects(that.scene.children,true);
			// 选中物体的第一个
			let obj = intersects[0].object;
			if( intersects.length ){
				// 点击摄像机移动视角并播放视
				if(obj.name === 'camera' || obj.name=="eventObj"){
					let position = intersects[0].point;
					let cameraPosition = that.camera.position;
					that.camera.lookAt(position.x,position.y,position.z)
					that.controls.target = new THREE.Vector3(position.x,position.y,position.z);
					let tween = new TWEEN.Tween(cameraPosition).to(
							{
								x:position.x+10,
								y:position.y+10,
								z:position.z+10
							},1200
					).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
						that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
						that.camera.lookAt(position.x,position.y,position.z)
					}).onComplete(function () {
						if(obj.name==="camera"){
							document.getElementById("full-scene").style.height = '100%';
							document.getElementById("big-video").setAttribute("src","./assets/image/test.mp4");
						}else{
							monitor.showEventDesc(intersects[0].object.attributes)
						}
						tween = null;

					}).start()
				}
			};
		})
    // 鼠标右键返回场景
    document.addEventListener("contextmenu",function(event){
		  if(that.contextmenuStatus === 'detail') {
        if(buildingEvent.type=="building"){
          //退出到正常模式
          buildingEvent.backModule();
          myGround.cloud.visible = false;
        }else if(buildingEvent.type=="floor1"){
          //退出到建筑物模式
          buildingEvent.backModule();
        }else if(buildingEvent.type=="floor2"){
          //退出到建筑物模式
          buildingEvent.backModule();
        }else{
          //调整视角模式
          that.outlook();
          that.contextmenuStatus = '';
        }
      } else if(that.contextmenuStatus === 'transparent') {
		    let targetBox = null; //  被删除的目标模型
        let cameraPosition = that.camera.position;
		    for(let i=that.scene.children.length-1; i>=0; i--) {
          if(that.scene.children[i].name === 'opacityBuild'){
            targetBox = that.scene.children[i];
            break;
          }
        }
		    clearMemoty(targetBox); // 从内存中删除物体缓存
		    that.scene.remove(targetBox);
        that.scene.background = that.sceneTexture.sceneDay; // 返回真是场景
        that.camera.layers.mask = 1;
        let t = new TWEEN.Tween(cameraPosition).to(
          {x: 100, y: 100, z: 100}, 1200
        ).easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(val => {
            that.camera.position.set(val.x, val.y, val.y);
            that.camera.lookAt(0,0,0);
          }).start();
      }
		})
		// 鼠标双击点击模型
    document.addEventListener("dblclick",function(event){
			let mouse = {x:'',y:''}
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      let cameraPosition = that.camera.position;
			let raycaster = new THREE.Raycaster();
			// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
			raycaster.setFromCamera( mouse, that.camera );
			// 获取raycaster直线和所有模型相交的数组集合
			let intersects = raycaster.intersectObjects(that.scene.children,true);
			// 选中物体的第一个
			let obj = intersects[0].object;
			if( intersects.length ){
				let type = ''; // 双击类型
				if( obj.parent.name == "entitiesBuild" ) {
				  type = 'entitiesBuild';
        }else if(buildingEvent.type === "floor1"){
					type = "floor"
				}else if(buildingEvent.type === "normal" || buildingEvent.type === "building"){
					type = "building";
				}
				if( type === 'floor' ||  type === "building" ) {
          that.contextmenuStatus = 'detail';  // 现在右键控制组成模型的逻辑
          while (true){
            if(obj.name.indexOf(type)>-1){
              buildingEvent.changeSceneModule(obj);
              break
            }else if(obj.type === "Scene"){
              break
            }else {
              obj = obj.parent
            }
          }
        } else if ( type === 'entitiesBuild' ) {
          that.contextmenuStatus = 'transparent';  // 现在右键控制透明模型的逻辑
          let { type, y } = obj.parent.userData;
          if(type !== 'cylinder'){
            return
          }
          let position = obj.parent.position; // 相机视角
          // 向场景二添加一个透明的建筑物
          let objectMesh = that.builds[type];
          let data = [
            {status: 0, isrun: false, height: -22, title: "一幢一单元1号电梯停止运行"},
            {status: 1, isrun: false, height: 0},
            {status: 1, isrun: true, height: 5}];
          that.getOpacity(objectMesh, data);
          let tween = new TWEEN.Tween(cameraPosition).to(
            {
              x: position.x+30,
              y: position.y,
              z: position.z+30
            },1200
          ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(val){
            that.camera.position.set(val.x, val.y, val.z)
            that.camera.lookAt(position.x,position.y,position.z);
          }).onComplete(function () {
            that.camera.position.set(100, 100, 100);
            that.camera.lookAt(0,0,0);
            that.scene.background = '#000';
            that.camera.layers.mask = 2;
            tween = null;
          }).start();
        }
			};
		})
		//鼠标悬浮状态
		document.addEventListener("mousemove",function(event){
			event.preventDefault();
			let mouse = {};
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
			let raycaster = new THREE.Raycaster();
			raycaster.setFromCamera( mouse, that.camera );
			// 获取raycaster直线和所有模型相交的数组集合
			var intersects = raycaster.intersectObjects(that.scene.children,true);
			if(intersects.length>0){
				let obj = intersects[0].object;
				while (true) {
					let floorDom = document.getElementById("floor");

					if(obj.name.indexOf("floor")>-1){
						floorDom.style.display = "block";
						floorDom.innerText  = "第"+obj.name.split("_")[1]+"层";
						floorDom.style.top = (event.clientY-100)+"px";
						floorDom.style.left = (event.clientX-30)+"px"
						break
					}else if(obj.type=="Scene"){
						floorDom.style.display = "none";
						break
					}else {
						obj = obj.parent;
					}
				}


			}
		})
  }
  outlook(){
    let that = this;
    that.camera.lookAt(0,0,0)
    that.controls.target = new THREE.Vector3(0,0,0);
    let cameraPosition = that.camera.position
    let tween = new TWEEN.Tween(cameraPosition).to(
      {
        x:100,
        y:100,
        z:100
      },2000
    ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
      that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
      that.camera.lookAt(0,0,0)
    }).start()
  }
  renderRain(){
    let vertices = myGround.cloud.geometry.vertices;
    vertices.forEach(function(v){
      v.y = v.y - (v.velocityY)*9;
      v.x = v.x - (v.velocityX)*.5;

      if (v.y <= -60) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
    })
    myGround.cloud.geometry.verticesNeedUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
  addRain(){
    let rain = myGround.createRain()
    this.scene.add(rain)
  }
  setView() {
    let that =this;
    let rotation = {rotationY:-Math.PI*5/6};
    let tween = new TWEEN.Tween(rotation)
      .to({rotationY:Math.PI*7/6}, 5000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function( p ) {
        that.earthBox.rotation.y = rotation.rotationY;
      })
      .onComplete(function () {
        that.outlook(4000)
      })
      .start();
  }
  // 添加围墙
  loadWall() {
    this.diffModel.walls = myGround.addOutWall();
    this.scene.add(this.diffModel.walls);
  }
  // 添加大门
  loadDoor() {
    this.diffModel.door = doorModel.init();
    this.scene.add(this.diffModel.door);
  }
  // 业务事件
  eventClick() {
    logChange();
    changeScene();
    closeBigScene();
    equipmentRunning.bind(this)();
    houseMessage.bind(this)();
    changeModel.bind(this)();
  }
}
computRem(document, window);
window.onload = function () {
  new RenderCanvas().init();
}