import roomThing from "./roomThings"
class outWall {
	constructor() {
		//-692.52,0,449.7
		this.outColor = 0x99999;
		this.innerColor = 0xffffff;
		this.unitWallType1 = null;
		this.unitWallType2 = null;
		this.unitWallType3 = null;
		this.unitWallType4 = null;
		this.buildingPoint = [[51.10000000000002, 0, -41.19999999999999],
		[-33.389999999999986, 0, -22.139999999999986],
		[-49.200000000000045, 0, 29.99000000000001],
		[34.39999999999998, 0, 12.360000000000014],
		[51.10000000000002, 0, -41.19999999999999]];
		this.unitX = 3;
		this.unitY = 0.5;
		this.unitZ = 4;
		this.scene = null;
		this.innerWall = [
			/*{
				type:"hasDoor",
				point: [[39.299999999999955, 0, -4.5],
		[-43.51999999999998, 0, 12.939999999999998]]
			},*/
			{
				type:"hasDoor",
				point: [[39.069999999999936, 0, -4.019999999999982]
		,[-43.639999999999986, 0, 12.939999999999998]]
			},
			{
				type:"hasDoor",
				point: [[-38.289999999999964, 0, -4.699999999999989]
		,[43.860000000000014, 0, -20.599999999999966]]
			},
			{
				point: [[27.5, 0, -35.44999999999999]
		,[31.059999999999945, 0, -18.49000000000001]]
			},
			{
				point: [[15.029999999999973, 0, -32.579999999999984]
				,[18.590000000000032, 0, -15.620000000000005]]
			},
			{
				point: [[-4.009999999999991, 0, -11.20999999999998]
				,[-7.57000000000005, 0, -27.689999999999998]]
			},
			{
				point: [[4.230000000000018, 0, -30.279999999999973]
				,[7.789999999999964, 0, -13.319999999999993]]
			},
			{
				point: [[-16.590000000000032, 0, -8.339999999999975]
				,[-19.700000000000045, 0, -24.819999999999993]]
			},
			{
				point: [[-32.84000000000003, 0, -22.039999999999964]
				,[-30.279999999999973, 0, -5.560000000000002]]
			},
			{
				point: [[31.949999999999932, 0, -2.1999999999999886]
				,[34.069999999999936, 0, 11.590000000000032]]
			},
			{
				point: [[24.269999999999982, 0, 13.990000000000009]
				,[21.710000000000036, 0, 0.10000000000002274]]
			},
			{
				point:[[12.470000000000027, 0, 1.7200000000000273]
				,[15.029999999999973, 0, 15.620000000000005]]
			},
			{
				point:[[4.67999999999995, 0, 18.110000000000014]
				,[1.669999999999959, 0, 4.220000000000027]]
			},
			{
				point:[[-6.1200000000000045, 0, 20.120000000000005]
				,[-9.129999999999995, 0, 6.230000000000018]]
			},
			{
				point:[[-17.920000000000073, 0, 22.710000000000036]
				,[-21.039999999999964, 0, 8.819999999999993]]
			},
			{
				point:[[-29.720000000000027, 0, 25.30000000000001]
				,[-32.84000000000003, 0, 11.400000000000034]]
			},
			{
				point:[[-41.08000000000004, 0, 27.310000000000002]
				,[-43.639999999999986, 0, 13.420000000000016]]
			}
		];
		this.plants=[
			{
				point:[
				[49.19999999999993, 0, -39.579999999999984],
				[39.51999999999998, 0, -37.46999999999997],
				[25.600000000000023, 0, -34.39999999999998],
				[13.25, 0, -31.810000000000002],
				[2.009999999999991, 0, -28.75],
				[-8.789999999999964, 0, -26.639999999999986],
				[-20.149999999999977, 0, -24.149999999999977],
				[-36.07000000000005, 0, -6.1299999999999955],
				[-38.180000000000064, 0, -0.47999999999996135],
				[-40.74000000000001, 0, 9.770000000000039]
		   ,[-42.75, 0, 26.730000000000018]
		   ,[-30.950000000000045, 0, 24.720000000000027]
		   ,[-19.590000000000032, 0, 21.660000000000025]
		   ,[-7.350000000000023, 0, 19.55000000000001]
		   ,[3.009999999999991, 0, 16.960000000000036]
		   ,[13.25, 0, 14.949999999999989]
		   ,[23.039999999999964, 0, 13.420000000000016]
		   ,[32.84000000000003, 0, 10.350000000000023]
		   ,[37.39999999999998, 0, -2.490000000000009]
		   ,[38.960000000000036, 0, -7.189999999999998]
		   ,[42.52999999999997, 0, -18.49000000000001]]

			}
		]
	}

	/**
	 * 添加一建筑物
	 */
	addTestBuild(scene){
		this.scene = scene
		let building = new THREE.Object3D();
		let oneFloor = new THREE.Object3D();
		this.createUnitWall()
		let outwall = this.createAllWall()
		let ceil = this.addCeil()
		let floor = this.addBackground()
		let innerwall = this.createInnerWall();

		let plant  = roomThing.addPlants()
		let plantsPoint = this.plants[0].point;
		let plants = new THREE.Object3D()
		for(let i=0;i<plantsPoint.length;i++){
			let plantClone = plant.clone();
			plantClone.scale.set(.05,.03,.05)
			plantClone.position.set(plantsPoint[i][0],plantsPoint[i][1]+10,plantsPoint[i][2])
			plants.add(plantClone)
		}
		//oneFloor.add(plants)

		/*roomThing.addPerson().then(re => {
			oneFloor.add(re)
		})*/

		oneFloor.add(outwall,ceil,floor,innerwall)
		for(let i=0;i<20;i++){
			let floorClone = oneFloor.clone();
			floorClone.position.y = i*this.unitX;
			floorClone.name = "floor_"+i;
			building.add(floorClone)
		}
		building.position.y=-10
		/*let textName = this.addText()
		textName.rotation.y = .2
		textName.position.set(-21.480000000000018,45,-25.7)
		building.add(textName)*/
		building.name = "building"
		building.position.set(-600,-10,400)
		this.scene.add(building)
	}
	/**
	 * 创建一个单位墙面
	 * @param scene
	 */
	createUnitWall(){
		let geometry = new THREE.BoxGeometry(this.unitX,this.unitZ,this.unitY);
		/*for(let i=0;i<geometry.faces.length;i++){
			if(i==10||i==11){
				geometry.faces[i].color.setHex(0xff666666);
			}else {
				geometry.faces[i].color.setHex(0xffffff);
			}
		}
		let material = new THREE.MeshPhongMaterial({vertexColors:THREE.FaceColors});*/
		let texture1 = new THREE.TextureLoader().load("./assets/image/window4.jpg");
		texture1.wrapS = THREE.RepeatWrapping;
		texture1.wrapT = THREE.RepeatWrapping;
		texture1.repeat.set(.2,.3);

		let texture2 = new THREE.TextureLoader().load("./assets/image/door2.jpg");
		texture2.wrapS = THREE.RepeatWrapping;
		texture2.wrapT = THREE.RepeatWrapping;
		texture2.repeat.set(1,1);

		let texture3 = new THREE.TextureLoader().load("./assets/image/innerwall3.jpg");
		texture3.wrapS = THREE.RepeatWrapping;
		texture3.wrapT = THREE.RepeatWrapping;
		texture3.repeat.set(1,1);

		let material1 = new THREE.MeshBasicMaterial({map:texture1,transparent:true,opacity:1})
		let material2 = new THREE.MeshBasicMaterial({map:texture2,transparent:true,opacity:1,side:THREE.DoubleSide})
		let material3 = new THREE.MeshBasicMaterial({color:0x333333,transparent:true,opacity:1})
		let material4 = new THREE.MeshBasicMaterial({map:texture3,transparent:true,opacity:1,side:THREE.DoubleSide})

		let mesh1 = new THREE.Mesh(geometry,material1)
		this.unitWallType1 = mesh1;

		let mesh2 = new THREE.Mesh(geometry,material2)
		this.unitWallType2 = mesh2;

		let mesh3 = new THREE.Mesh(geometry,material3)
		this.unitWallType3 = mesh3;

		let mesh4 = new THREE.Mesh(geometry,material4)
		this.unitWallType4 = mesh4;

		this.scene.add(mesh1,mesh2,mesh3,mesh4)


	}

	/**
	 * 创建一个连续的墙面
	 */
	createAllWall(){
		let object = new THREE.Object3D();

		//给出一个初始点位  跟终止点位
		let points = this.buildingPoint;
		if(points.length<2){
			return;
		}
		for(let i=0;i<points.length;i++){
			if(i == points.length-1){

			}else {
				let width =Math.sqrt( Math.pow(points[i+1][0]-points[i][0],2)+Math.pow(points[i+1][2]-points[i][2],2));
				let moduleNum = Math.floor(width/this.unitX);
				let minDis = width/this.unitX - moduleNum;
				let minLength = minDis*this.unitX
				let xLength = (points[i+1][0]-points[i][0])/(width/this.unitX)
				let zLength = (points[i+1][2]-points[i][2])/(width/this.unitX)


				let firstX = points[i][0]+(points[i+1][0]-points[i][0])/width*this.unitX/2
				let firstZ = points[i][2]+(points[i+1][2]-points[i][2])/width*this.unitX/2

				let rotateY = -Math.atan((points[i+1][2]-points[i][2])/(points[i+1][0]-points[i][0]));
				for(let k=0;k<moduleNum;k++){
					let wallClone=null;
					if(k===0||k===1||k===3||k===5||k===moduleNum-1||k===moduleNum-3){
						wallClone = this.unitWallType3.clone()
					}else {
						wallClone = this.unitWallType1.clone()
					}
					
					wallClone.rotation.y = rotateY;
					wallClone.position.set(firstX+k*xLength,10,firstZ+k*zLength)
					object.add(wallClone)
				}
				let lastWall = this.unitWallType3.clone();
				let lastX = xLength*minDis/2
				let lastZ = zLength*minDis/2
				lastWall.scale.set(minDis+.01,1,1);
				lastWall.position.set(points[i][0]+(moduleNum)*xLength+lastX,10,points[i][2]+(moduleNum)*zLength+lastZ)
				lastWall.rotation.y = rotateY
				object.add(lastWall)
			}
		}
		object.name = "outwall"
		object.position.set(0,0,0)
		return object;
	}

	/**
	 * 创建内部房间
	 */
	createInnerWall(){
		let object = new THREE.Object3D();

		//给出一个初始点位  跟终止点位
		let walls = this.innerWall;

		for(let j=0;j<walls.length;j++){
			let points = walls[j].point;
			if(points.length<2){
				return;
			}
			for(let i=0;i<points.length;i++){
				if(i == points.length-1){

				}else {
					let width =Math.sqrt( Math.pow(points[i+1][0]-points[i][0],2)+Math.pow(points[i+1][2]-points[i][2],2));
					let moduleNum = Math.floor(width/this.unitX);
					let minDis = width/this.unitX - moduleNum;
					let minLength = minDis*this.unitX
					let xLength = (points[i+1][0]-points[i][0])/(width/this.unitX)
					let zLength = (points[i+1][2]-points[i][2])/(width/this.unitX)


					let firstX = points[i][0]+(points[i+1][0]-points[i][0])/width*this.unitX/2
					let firstZ = points[i][2]+(points[i+1][2]-points[i][2])/width*this.unitX/2

					let rotateY = -Math.atan((points[i+1][2]-points[i][2])/(points[i+1][0]-points[i][0]));
					for(let k=0;k<moduleNum;k++){
						let wallClone=null;

						wallClone = this.unitWallType4.clone()
						if((walls[j].type=="hasDoor")&&(k==1||k==4||k==8||k==10||k==14||k==17||k==22||k==26)){
						  wallClone = this.unitWallType2.clone()
							wallClone.scale.z = 1.1
						}

						wallClone.rotation.y = rotateY;
						wallClone.position.set(firstX+k*xLength,10,firstZ+k*zLength)
						object.add(wallClone)
					}
					let lastWall = this.unitWallType4.clone();
					let lastX = xLength*minDis/2
					let lastZ = zLength*minDis/2
					lastWall.scale.set(minDis+.01,1,1);
					lastWall.position.set(points[i][0]+(moduleNum)*xLength+lastX,10,points[i][2]+(moduleNum)*zLength+lastZ)
					lastWall.rotation.y = rotateY
					object.add(lastWall)
				}
			}
		}
		object.name = "innerwall"
		object.position.set(0,0,0)
		return object;
	}

	/**
	 * 创建一个天花板
	 */
	addCeil(){
		let object = new THREE.Object3D();
		let point = this.buildingPoint;
		let shape = new THREE.Shape();
		shape.moveTo(point[0][0], -point[0][2]);
		for(let j=1; j<point.length; j++) {
			shape.lineTo(point[j][0], -point[j][2]);
		};
		var extrudeSettings = { amount: .2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
		let geo = new THREE.ExtrudeBufferGeometry( shape,  extrudeSettings );
		let texture = new THREE.TextureLoader().load("./assets/image/11.jpg")
		let mesh = new THREE.Mesh( geo, new THREE.MeshPhongMaterial({map:texture,transparent:true,opacity:1.0}));
		mesh.rotateX(-Math.PI/2)
		object.add(mesh)
		object.name = "ceil"
		object.position.set(0,11.9,0)
		return object
	}

	/**
	 * 创建一个地板
	 */
	addBackground(){
		let object = new THREE.Object3D();
		let point = this.buildingPoint;
		let shape = new THREE.Shape();
		shape.moveTo(point[0][0], -point[0][2]);
		for(let j=1; j<point.length; j++) {
			shape.lineTo(point[j][0], -point[j][2]);
		};
		var extrudeSettings = { amount: .2, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
		let geo = new THREE.ExtrudeBufferGeometry( shape,  extrudeSettings );
		let texture = new THREE.TextureLoader().load("./assets/image/innerground2.jpg");
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(.3,.3);
		let mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity:1,side:THREE.DoubleSide}));
		mesh.rotateX(-Math.PI/2)
		object.add(mesh)
		object.name = "ground_1"
		object.position.set(0,8.1,0)
		return object
	}

	/**
	 * 添加标题
	 */
	addText(){
		let canvas = document.createElement("canvas");
		canvas.width = 812;
		canvas.height = 812;

		let context = canvas.getContext("2d");
		let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		for(let i = 0; i < imageData.data.length; i ++) {
// 当该像素是透明的,则设置成白色
			if(imageData.data[i + 3] <  51) {
				imageData.data[i] = 51;
				imageData.data[i + 1] = 51;
				imageData.data[i + 2] = 51;
				imageData.data[i + 3] = 51;
			}
		}
		context.putImageData(imageData, 0, 0);
		//context.fillStyle="rgb(255,255,255)";
		context.font="85px bold 黑体";
		context.textAlign = "center";
		context.textBaseline = "middle";

		context.fillText("博",80,100);
		context.fillText("瑞",80,220);
		context.fillText(".",80,340);
		context.fillText("创",80,430);
		context.fillText("意",80,550);
		context.fillText("之",80,660);
		context.fillText("都",80,780);
		let texture = new THREE.CanvasTexture(canvas);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(.2,1);
		//let spritMaterial = new THREE.SpriteMaterial({map:spritMap});
		//let sprite = new THREE.Sprite(spritMaterial);
		//sprite.position.set(info.location.x,4,info.location.z);
		let textBox = new THREE.BoxGeometry(4,30,.2);
		let textMaterial = new THREE.MeshBasicMaterial({map:texture})
		let textMesh = new THREE.Mesh(textBox,textMaterial)
		textMesh.position.y = 10;
		return textMesh
	}
}
export default new outWall();