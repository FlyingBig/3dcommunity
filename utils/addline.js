
class MyLine{
	constructor(){

		this.lineArr = [
			{
				point:[
					[ -560, 1, -280],
					[ 440, 1, -280 ],
					[ 450, 1, -280 ],
					[ 450, 1, -260 ],
					[ 430, 1, 100 ]
				],
				curveLine:null,
				backLine:null,
				curveData:null,
				position:[],
				rotation:[],
				index:0,
				sege:100,
				unit:20
			},
		/*	{
				point:[
					[ -560, 1, -290],
					[ 440, 1, -290 ],
					[ 460, 1, -290 ],
					[ 460, 1, -260 ],
					[ 440, 1, 100 ]
				],
				curveLine:null,
				backLine:null,
				curveData:null,
				position:[],
				rotation:[],
				index:0,
				sege:120,
				unit:20
			},

			{
				point:[
					[ -560, 1, -310],
					[ 440, 1, -310 ],
					[ 450, 1, -310 ],
					[ 450, 1, -360 ],
				],
				curveLine:null,
				backLine:null,
				curveData:null,
				position:[],
				rotation:[],
				index:0,
				sege:130,
				unit:20
			},*/
			{
				point:[
					[ -560, 1, -320],
					[ 440, 1, -320 ],
					[ 460, 1, -320 ],
					[ 460, 1, -360 ],
				],
				curveLine:null,
				backLine:null,
				curveData:null,
				position:[],
				rotation:[],
				index:0,
				sege:140,
				unit:20
			},
			/*{
				point:[
					[ -560, 1, -300],
					[ 440, 1, -300 ],
					[ 460, 1, -300 ],
					[ 490, 1, -300 ],
				],
				curveLine:null,
				backLine:null,
				curveData:null,
				position:[],
				rotation:[],
				index:0,
				sege:150,
				unit:20
			},
*/
		]
	}
	/**
	 * 添加发光线条
	 */
	addLine(scene){
		let group = new THREE.Group();
		for(let i=0;i<this.lineArr.length;i++){
			let curveGeometry = new THREE.Geometry()
			let points = []
			for(let j=0;j<this.lineArr[i].point.length;j++){
				points.push(new THREE.Vector3( this.lineArr[i].point[j][0], this.lineArr[i].point[j][1], this.lineArr[i].point[j][2] ))
			}
			this.lineArr[i].curveData = new THREE.CatmullRomCurve3(points);

			curveGeometry.vertices = this.lineArr[i].curveData.getPoints(10);
			
			let curveMaterial = new THREE.LineBasicMaterial({color: 0xffca3f,transparent:true,opacity:.9});
			let curveMaterialClone = new THREE.LineBasicMaterial({color: 0xff8f2f,transparent:true,opacity:.9});
			
			let tubeGeometry= new THREE.TubeGeometry(this.lineArr[i].curveData,256,1.8,10,false)
			this.lineArr[i].curveLine  = new THREE.Mesh(tubeGeometry,curveMaterial);

			this.lineArr[i].backLine = new THREE.Mesh(tubeGeometry.clone(),curveMaterialClone)
			group.add(this.lineArr[i].curveLine)
			group.add(this.lineArr[i].backLine);
		}
		return group;
		//构造光线动画
		

	}
	lineAnimate(scene) {
		
		for(let i=0;i<this.lineArr.length;i++){
			this.lineArr[i].index+=this.lineArr[i].unit;

			if(this.lineArr[i].index>this.lineArr[i].sege-this.lineArr[i].unit) {
				this.lineArr[i].index = 0;
			}

			let verArr = this.lineArr[i].curveData.getPoints(this.lineArr[i].sege)
			let offsetData = verArr.slice(this.lineArr[i].index, this.lineArr[i].unit+this.lineArr[i].index);
			if(offsetData.length > 0) {
				let curveData = new THREE.CatmullRomCurve3(offsetData);
				let tubeGeometry= new THREE.TubeGeometry(curveData,256,2,10,true)
				this.lineArr[i].curveLine.geometry = tubeGeometry;
				this.lineArr[i].curveLine.geometry.verticesNeedUpdate = true;

			}
		}

		//scene.add(this.curveLine)
	}
}
export default new MyLine();