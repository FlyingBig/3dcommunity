class roomThing {
	constructor(){

	}

	/**
	 * 添加书桌
	 */
	addTable(){

	}

	/**
	 * 添加椅子
	 */
	addChair(){

	}

	/**
	 * 添加盆栽
	 */
	addPlants(){
		let plant = new THREE.Object3D();
		let geometry = new THREE.CylinderBufferGeometry(8,7,20,30);
		let material = new THREE.MeshBasicMaterial({color:0xffffff});

		let cylinder =new THREE.Mesh(geometry,material);
		cylinder.position.x = 0;
		cylinder.position.y = 0;
		cylinder.position.z = 0;

		plant.add(cylinder);

		let leafTure = new THREE.TextureLoader().load('../../assets/image/plant.png');

		let geometry1 = new THREE.PlaneGeometry(20,60);
		let leafMaterial = new THREE.MeshBasicMaterial({map:leafTure,side:THREE.DoubleSide,transparent:true});

		for(let i=0;i<8;i++){
			let leaf = new THREE.Mesh(geometry1,leafMaterial);
			leaf.position.x=0;
			leaf.position.z=0;
			leaf.position.y=40;
			leaf.rotation.y = -Math.PI/(i+1)
			plant.add(leaf);
		}
		plant.position.x = 170;
		plant.position.y = -10;
		plant.position.z =0;
		plant.castShadow = true;
		//plant.receiveShadow = true;
		plant.scale.set(.1,.1,.1)
		return plant
	}

	/**
	 * 添加门
	 */
	addDoor(){

	}

	/**
	 * 添加玻璃
	 */
	addGlass(){

	}

	/**
	 * 添加人口
	 */
	addPerson(){

		return new Promise(function (resolve, reject) {
			let mtlLoader = new THREE.MTLLoader();
			let objLoader = new THREE.OBJLoader();
			let person = new THREE.Object3D();
			mtlLoader.load('../../models/person/worker.mtl',function(materials){
				materials.preload();
				materials.alphaTest = 0;
				materials.blendDstAlpha = 0;
				objLoader.setMaterials(materials);
				objLoader.load('../../models/person/worker.obj',function(geometry){
					let material = new THREE.MeshBasicMaterial({color: 0x5C3A21});
					geometry.traverse( function (child) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = new THREE.TextureLoader().load( '../../models/person/worker.png');
							child.material.needsUpdate = true;
						}
					});
					// geometry is a group of children. If a child has one additional child it's probably a mesh
					geometry.children.forEach(function (child) {
						if (child.children.length == 1) {
							if (child.children[0] instanceof THREE.Mesh) {
								child.children[0].material = material;
							}
						}
					});
					geometry.position.set(0,0,0)
					geometry.name = "people";
					person.add(geometry)
					resolve(person);
				},null, (e)=>{console.log(e); reject(e)})
			})
		})
	}


}
export default new roomThing();