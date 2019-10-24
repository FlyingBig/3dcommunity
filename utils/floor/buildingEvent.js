import TWEEN from '@tweenjs/tween.js';
class buildingEvent{
	constructor(){
		this.scene = null;
		this.camera = null;
		this.controls =null;
		this.type = "normal";
		this.gridGround = null;
		this.initSceneBack = null;
		this.ground = null;
		this.building = null;
		this.floor = null;
	}
	//初始化建筑物场景相关数据
	init(scene,camera,controls,opacity){
		this.scene = scene;
		this.camera = camera;
		this.controls = controls;
		this.initSceneBack = scene.background;
	}
	//建筑物展示模式
	buildingModule(){

	}
	//楼层展示模式
	floorModule(){

	}
	//创建网格地板
	createGridGround(){
    if (!this.gridGround){
    	let material = new THREE.LineBasicMaterial({color:0xff0000})
			let geom = new THREE.Geometry();
    	geom.vertices.push(
    			new THREE.Vector3( 500, 0, 0 ),
					new THREE.Vector3( -500,0, 0 ),
			)
			let line = new THREE.Line(geom,material);
			let grids = new THREE.Object3D();
    	for(let i=0;i<1000;i=i+20){
				let horizonLine = line.clone();
				horizonLine.position.z = -500+i;
				let verticleLine = line.clone();
				verticleLine.rotation.y = Math.PI/2;
				verticleLine.position.x = -500+i;
				grids.add(horizonLine,verticleLine);
			}
    	this.gridGround = grids;
    	grids.name = "buildingModule"
			this.scene.add(grids)


			let buildingGround = new THREE.BoxGeometry(500,.2,500)
			let groundMaterial = new THREE.MeshBasicMaterial({color:0x000000});
    	let ground = new THREE.Mesh(buildingGround,groundMaterial);
    	ground.position.set(0,-1,0);
    	this.ground = ground;
    	ground.name="buildingModule";
    	this.scene.add(ground)
		}

	}
	//前进建筑展示模式 使用鼠标双击建筑物触发
	changeSceneModule(obj){
		let things = this.scene.children;
		if(this.type== "normal"){
			this.type="building";
			this.scene.background = 0xffffff;
			for(let i=0;i<things.length;i++){
				if(things[i].name!="buildingModule"||things[i].type!="SpotLight"){
					things[i].visible = false;
				}else {
					things[i].visible = true;
				}
			}
			this.createGridGround();
		  this.building = obj.clone();
			this.building.visible = true;
			this.building.position.set(0,-10,0);
			this.scene.add(this.building)
			this.gridGround.visible = true
			this.outlook()
		}else if(this.type=="building"){//展开楼层 去除外墙的模式
			this.type="floor1"
			let floors = this.building.children;
			for(let i=0;i<floors.length;i++){
				if(floors[i].name.indexOf("floor")<0)continue
				floors[i].position.y = floors[i].position.y+i*1.5
				let outwalls = floors[i].children
				for(let i=0;i<outwalls.length;i++){
					if(outwalls[i].name=="ceil"){
						outwalls[i].visible = false
					}else {

					}
					//outwalls[i].visible = false;
				}
			}
		}else if(this.type=="floor1"){//展示具体某一楼层的具体状况
			this.type="floor2"
			this.floor = obj;
			let position = obj.position;
			this.controls.target = new THREE.Vector3(position.x,position.y,position.z);
			this.outlook()
			let floors = this.building.children;
			for(let i=0;i<floors.length;i++){
				if(floors[i].name!=obj.name){
					floors[i].visible = false
				}else {
					floors[i].visible = true;
				}
			}
		}else {

		}

	}
	//回退建筑展示模式 使用鼠标右键触发
	backModule(){
		if(this.type=="building"){//由楼栋展示退出为正常模式
			this.type="normal";
			this.scene.background = this.initSceneBack;
			let things = this.scene.children;
			for(let i=0;i<things.length;i++){
				things[i].visible = true;
			}
			this.gridGround.visible = false;
			this.ground.visible = false;
			this.scene.remove(this.building);
		}else if(this.type=="floor1"){//由楼栋透明伸展模式  回退成楼栋在网格展示模式
			this.type="building"
			let floors = this.building.children;
			for(let i=0;i<floors.length;i++){
				if(floors[i].name.indexOf("floor")<0)continue
				floors[i].position.y = floors[i].position.y-i
				let outwalls = floors[i].children
				for(let i=0;i<outwalls.length;i++){
					if(outwalls[i].name!="outwall"&&outwalls[i].name!="ceil")continue;
					outwalls[i].visible = true;
				}
			}
		}else if(this.type=="floor2"){//由单楼层展示模式回退成 整楼层展示模式
			this.type="floor1"
			let floors = this.building.children;
			for(let i=0;i<floors.length;i++){
					floors[i].visible = true;
			}
		}
	}
	outlook(position){
		let that = this;
		that.camera.lookAt(0,0,0)
		that.controls.target = new THREE.Vector3(0,0,0);
		let cameraPosition = that.camera.position
		let tween = new TWEEN.Tween(cameraPosition).to(
				{
					x:140,
					y:140,
					z:140
				},2000
		).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
			that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
			that.camera.lookAt(0,0,0)
		}).start()
	}
}
export default new buildingEvent();