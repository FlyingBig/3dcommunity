import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'stats-js';
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import { getTransparent } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
import myGround from './utils/myGround';
import grassarea from './utils/grassArea';
import line from './utils/addline';
import monitor from './utils/monitorObj';
import {pointerLock} from './node_modules/three/examples/js/controls/PointerLockControls'
// obj文件导出
import { objModel } from './utils/modelOut';

import { Water } from './node_modules/three/examples/jsm/objects/Water2';
import jQuery from './node_modules/jquery/dist/jquery'
const $ = jQuery;
// 渲染房屋
class RenderCanvas {
	constructor(){
		//创建场景.
		this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#BCC1BB', 300, 1000);
		//相机
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		// 渲染器
		this.renderer = new THREE.WebGLRenderer({alpha: false,antialias:true});
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		// 房屋建筑信息
		this.positions = {
			mybuild: { position:[[-360, 82 , -225]], rotation: [Math.PI*1.4] }, // 明宇
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
					[330, 3 , -130],
					[320, 3 , -70],
					[295, 3 , -50],
					[235, 3 , -50],
					[225, 3 , -100],
					[215, 3 , -160],
					[275, 3 , -170],
					[-45, 3 , -100],
					[-35, 3 , -170],
					[-15, 3 , -190],
					[20, 3 , -200],
					[65, 3 , -180],
					[-240, 3 , -125],
					[-230, 3 , -185],
				],
				rotation: [-Math.PI/3, -Math.PI/2, -Math.PI*0.6, -Math.PI*1.2, -Math.PI*1.2, -Math.PI*1.5, -Math.PI*1.8, -Math.PI*1.8, -Math.PI*1.5, -Math.PI*1.7, -Math.PI*1.8, -Math.PI/6, -Math.PI/3, Math.PI/2, Math.PI*0.2]
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
    this.positionLight = [[-500, 400, -1200], [200, 400, 1200 ], [500, 400, 1200]];
    // 场景贴图控制
		let cubeTextureLoader = new THREE.CubeTextureLoader();
		cubeTextureLoader.setPath( './assets/image/' );
		//六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
		let nightCubeTexture = cubeTextureLoader.load( [
			'night1.jpg', 'night_left.jpg',
			'night_top.jpg', 'night_bottom.jpg',
			'night_front.jpg', 'night_back.jpg'
		] );


    this.sceneTexture = {
      day: new THREE.TextureLoader().load( '/assets/image/sky.jpg'),
      night: new THREE.TextureLoader().load( '/assets/image/night_bottom.jpg'),
			sceneNight:nightCubeTexture,
			out: new THREE.TextureLoader().load( '/assets/image/earth_atmos_2048.jpg')
    };
    this.sceneBox = null;
    this.earthBox = null;
		// 车辆模型集合
		this.cars = {};
		// 性能指标
		this.stats = {};
		// 道路偏转系数
    this.roadDeflection = 0;
    // 所有建筑类型
    this.builds = {};
    // 透明模式
    this.opacity = false;
    this.eventBtn();
	}
	init() {
		// 设置画布大小/颜色
		const contrain = document.getElementById('app');
		this.renderer.setSize(contrain.clientWidth, contrain.clientHeight);
		// this.renderer.setClearColor("red");
		contrain.appendChild(this.renderer.domElement);
		// 添加灯光
    let lights = [];
		lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 50000, 2 );
		lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
		lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
		lights[ 0 ].position.set( ...this.positionLight[0] );
		lights[ 1 ].position.set( ...this.positionLight[1] );
		lights[ 2 ].position.set( ...this.positionLight[2] );

		this.scene.add( ...lights );
    // 添加性能指标
		this.stats = new Stats();
		this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild( this.stats.dom );
		this.stats.dom.style.left = '20%';
		// 添加整体风格
    let skyBoxMaterial = new THREE.MeshBasicMaterial({map: this.sceneTexture.day, side: THREE.DoubleSide, fog: false});
    this.sceneBox = new THREE.Mesh(
      new THREE.SphereGeometry( 5000, 10,10 ),  //盒子物体
				skyBoxMaterial
    );
    this.earthBox = new THREE.Mesh(new THREE.SphereGeometry(5110,30,30),new THREE.MeshBasicMaterial({map: this.sceneTexture.out, side: THREE.DoubleSide, fog: false}))
    this.earthBox.rotation.y = -Math.PI*5/6
		this.scene.background = this.sceneTexture.sceneNight
		this.scene.add(this.earthBox)
		this.scene.add(this.sceneBox );
		// 设置相机位置
		this.camera.position.set(7500, 7500, 7500);
		this.camera.lookAt(0, 0, 0);
		this.roadGrass();
		// 草地区域
    this.scene.add(grassarea.getArea());
		this.positionBuild();
		this.getOpacity();
		this.foot();
		this.axesHelper();
		this.initControl();
		this.loadWater();
		this.addRain();
		this.animate();
		this.redCar();
		this.loadGarbages();
		this.loadLamps();
		this.mouseEvent();
		this.randomBuild( 150 );
		this.setView();
		let walls = myGround.addOutWall()
		this.scene.add(...walls)
		monitor.init(this.scene,this.camera,this.controls)
		//myGround.addFire(this.scene)


		//myGround.addTree(this.scene)
		//myGround.floorShapeMesh(this.scene)
	}
	// 添加缩放拖拽控制器
	initControl() {
		this.controls.enableDamping = true
		this.controls.dampingFactor = 0.25
		this.controls.rotateSpeed = 0.35
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
		this.scene.add(mesh);
	}
	// 加载草坪，道路
	roadGrass() {
	  // 加载小区的道路
		let roadObjs = myGround.loadRoad();
		this.scene.add(roadObjs);
    // 加载公路
    let driveRoad = myGround.loadDriveWay();
    this.scene.add(driveRoad);
    // 加载河流
		let riverObjs = myGround.loadRiver();
		this.scene.add(...riverObjs);
    // 加载草坪
		let grassObjs = myGround.loadGrass();
		this.scene.add(grassObjs);
		// 加载树木
		myGround.loadTree().then(re => {
			this.scene.add(re);
		})
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
				x = 800+(Math.random()-.5)*300
				z = 1800*(Math.random()-.5)
			}else if(i<length/2){
				x = -800+(Math.random()-.5)*300
				z = 1800*(Math.random()-.5)
			}else if(i<length*3/4){
				z = -800+(Math.random()-.5)*300
				x = 1800*(Math.random()-.5)
			}else{
				z = 800+(Math.random()-.5)*300
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
    this.scene.add(mesh);
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
		TWEEN.update()
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
			mtlUrl: '/models/redCar/file.mtl',
			objUrl: '/models/redCar/file.obj',
			deg: -Math.PI/2,
			scale: 0.001,
			position: this.computedRoal([-550, 2, -280])
		},{
			mtlUrl: '/models/scar/file.mtl',
			objUrl: '/models/scar/file.obj',
			deg: 0,
			scale: 0.003,
			position: this.computedRoal([-100, 2, -315])
		}]
		let car = await Promise.all(objModel(param));
		this.cars.smallCar = car[0];
		this.cars.truck = car[1];
		this.scene.add(...car);
	}
	// 加载水波动画
	loadWater() {
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
		water.rotation.x = Math.PI*-0.5
		this.scene.add(water);
	}
  // 计算道路的偏移量
  computedRoal( tanslate ) {
    let [x, y, z] = tanslate;
    let z1 = z + this.roadDeflection * Math.abs(-550 - x) / 2;
    return [x, y, z1]
  }
  // 透明建筑物
  getOpacity() {
	  let builds = {}, that = this;
    for( let key in this.builds ) {
      let opc = getTransparent(this.builds[key]);
      builds[key] = opc;
    }
    let positions = this.positions;
    let opacityBox = new THREE.Object3D();
    opacityBox.name = 'opacityBox';
    opacityBox.visible = this.opacity;
    for(let key in positions) {
      if( positions[key].position.length ) {
        let { position, rotation } = positions[key];
        position.map((re, index)=>{
          let build = builds[key].clone();
          build.position.set(...re);
          key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          build.name = 'opacityBuild';
          opacityBox.add(build);
        })
      }
    }
    this.scene.add(opacityBox);
  }
  // 过度动画
  transfrom(prop, sourceProp, time, show ) {
    let tween = new TWEEN.Tween(prop.scale)
      .to(sourceProp, time)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function( p ) {
        prop.scale.set(p.x, p.y, p.z);
      })
      .onComplete(function () {
        prop.visible = show;
        tween = null;
      })
      .start();
  }
  // node事件
  eventBtn() {
		let that = this;
		window.addEventListener('resize',function(){
			that.camera.aspect = window.innerWidth/window.innerHeight;
			that.camera.updateProjectionMatrix();
			that.renderer.setSize(window.innerWidth,window.innerHeight)
		})

		let btn = document.getElementById('opc');
    btn.addEventListener('click', function () {
      that.opacity = !that.opacity;
      let childrens = that.scene.children;
      // 显示
      if(!that.opacity) {
        that.scene.children[0].position.set( ...that.positionLight[0] );
        that.scene.children[1].position.set( ...that.positionLight[1] );
        that.scene.children[2].position.set( ...that.positionLight[2] );
        that.sceneBox.material.map = that.sceneTexture.day;
        myGround.closeLampLight()
      } else {
				myGround.openLampLight()
        that.scene.children[0].position.set( that.positionLight[0][0]*10, that.positionLight[0][1]*10, that.positionLight[0][2]*10 );
        that.scene.children[1].position.set( that.positionLight[1][0]*10, that.positionLight[1][1]*10, that.positionLight[2][2]*10 );
        that.scene.children[2].position.set( that.positionLight[2][0]*10, that.positionLight[2][1]*10, that.positionLight[2][2]*10 );
        that.sceneBox.material.map = that.sceneTexture.night;
      }
      for(let i=0, j=childrens.length; i<j; i++) {
        if( childrens[i].name === 'entitiesBox' ) {
          let tprop = that.opacity ? {y: 1} : {y: 0};
          let sprop = that.opacity ? {y: 0} : {y: 1};
          let m = new TWEEN.Tween(tprop)
            .to(sprop, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function( p ) {
              childrens[i].scale.y = p.y;
            })
            .onComplete(function () {
              childrens[i].visible = !that.opacity;
              m = null;
            }).start();
        }
        if( childrens[i].name === 'opacityBox' ){
          //[i].visible = that.opacity;
          let tprop = !that.opacity ? {y: 1} : {y: 0};
          let sprop = !that.opacity ? {y: 0} : {y: 1};
          let m = new TWEEN.Tween(tprop)
            .to(sprop, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function( p ) {
              childrens[i].scale.y = p.y;
            })
            .onComplete(function () {
              childrens[i].visible = that.opacity;
              m = null;
            }).start();
        }
      }

    }, false)
	  //
		$(".closeVideo").bind('click',function(){
			$(this).parent.find("video").setAttribute('src','')
			//$(this).parent().css("display","none")
		},false)

		let rainBtn = document.getElementById('rain');
		rainBtn.addEventListener('click',function(){
    	if (myGround.cloud){
				if(myGround.cloud.visible){
					myGround.cloud.visible = false
				}else {
					myGround.cloud.visible = true
				}
			}
		})

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
	mouseEvent(){
		let that = this;
		//鼠标双击进入观察状态
		document.addEventListener("dblclick",function(event){
			let mouse = {x:'',y:''}
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			let raycaster = new THREE.Raycaster();
			// 通过鼠标点的位置和当前相机的矩阵计算出raycaster
			raycaster.setFromCamera( mouse, that.camera );
			// 获取raycaster直线和所有模型相交的数组集合
			var intersects = raycaster.intersectObjects(that.scene.children,true);
			if(intersects.length>0){
				let position = intersects[0].point;
				let cameraPosition = that.camera.position;
				that.camera.lookAt(position.x,position.y,position.z)
				that.controls.target = new THREE.Vector3(position.x,position.y,position.z);
				let tween = new TWEEN.Tween(cameraPosition).to(
						{
							x:position.x+10,
							y:position.y+10,
							z:position.z+10
						},4000
				).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
					that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
					that.camera.lookAt(position.x,position.y,position.z)
					if(intersects[0].object.name=='camera'){
						document.getElementsByTagName("video")[0].style.display = "block"
						document.getElementsByTagName("video")[0].setAttribute("src","./assets/image/test.mp4");
						that.renderer.render(that.camera,that.scene)
					}
				}).start()


			}
		})
		document.addEventListener("contextmenu",function(event){
			that.outlook()
		})
	}
	outlook(time){
		let that = this;
		that.camera.lookAt(0,0,0)
		that.controls.target = new THREE.Vector3(0,0,0);
		let cameraPosition = that.camera.position
		let tween = new TWEEN.Tween(cameraPosition).to(
				{
					x:100,
					y:100,
					z:100
				},time||2000
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
}
new RenderCanvas().init();
