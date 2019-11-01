/**
 * @name: 花园
 * @description:
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/10/15
 */
class Parteree {
  init() {
    let box = new THREE.Object3D();
    let shape = [];
    let avg = 2*Math.PI/16;
    for(let i=1; i<17; i++) {
      shape.push({x: Math.sin(avg*i)*8, y: Math.cos(avg*i)*8});
    }
    let s = new THREE.Shape();
    s.moveTo(shape[0].x, shape[0].y);
    for(let i=1; i<shape.length; i++) {
      s.lineTo(shape[i].x, shape[i].y);
    };
    let t = this.texture('./assets/image/parterre/parterre-f.jpg',{rx: 1.5, ry: 1.2});
    let parterreShape = new THREE.ExtrudeGeometry(s, {amount: .3, bevelEnabled: false, bevelThickness: 1});
    // 重新设定uv
    this.reMapUv(parterreShape);
    let mesh = new THREE.Mesh(parterreShape, new THREE.MeshBasicMaterial({map: t}));
    // 内部地板
    let parterreInside = new THREE.CylinderBufferGeometry( 7.8, 7.8, .3, 16 );
    let t1 = this.texture('./assets/image/parterre/parterre.jpg',{rx: 15, ry: 15});
    let parterreMa = new THREE.MeshBasicMaterial( {map: t1} );
    let mesh1 = new THREE.Mesh( parterreInside, parterreMa );
    mesh.rotateX(Math.PI/2);
    mesh.position.y = 0.13;
    // 花坛石盒
    let flowerBox = new THREE.Object3D();
    let flowerGeo = this.getFlowers(100, 16, 4.5);
    let t2 = this.texture('./assets/image/parterre/parterre-f.jpg',{rx: 3, ry: 3});
    let flowermesh = new THREE.Mesh(flowerGeo, new THREE.MeshBasicMaterial({map: t2}));
    flowermesh.position.y = 1;
    let flower = this.getFlowers(97, 16, 4.2, 1.2);
    let t3 = this.texture('./assets/image/parterre/flower.jpg',{rx: 1, ry: 1});
    let flowerSurfac = new THREE.Mesh(flower, new THREE.MeshBasicMaterial({map: t3}));
    flowerSurfac.position.set(0.1,1.1,.02);
    flowerSurfac.rotateZ(-Math.PI/180*1);
    flowerBox.add(flowermesh);
    flowerBox.add(flowerSurfac);
    flowerBox.rotateX(-Math.PI/2);
    flowerBox.position.set(1, .1, 0);
    let flowerBox1 = flowerBox.clone();
    flowerBox1.position.set(0, .1, 1);
    flowerBox1.rotateZ(-Math.PI/2);
    let flowerBox2 = flowerBox.clone();
    flowerBox2.rotateZ(-Math.PI);
    flowerBox2.position.set(-1, .1, 0);;
    let flowerBox3 = flowerBox.clone();
    flowerBox3.rotateZ(-Math.PI*1.5);
    flowerBox3.position.set(0, .1, -1);
    // 中心树整体模型
    let cylinder = mesh.clone();
    cylinder.scale.set(0.15,0.15,0.15);
    cylinder.position.y = 0.2;
    let kong = this.getFlowers(360,36,1.1,0.2,0.2);
    let t5 = this.texture('./assets/image/parterre/grass-f.jpg',{rx: 3, ry: 3});
    let k = new THREE.Mesh(kong, new THREE.MeshBasicMaterial({map: t5}));
    this.reMapUv(kong);
    k.rotateX(-Math.PI/2);
    k.position.y = .2;
    box.add( cylinder, k );
    box.add(flowerBox,flowerBox1,flowerBox2,flowerBox3);
    box.add(mesh,mesh1);
    return box;
  }
  /**
   * @param {num} deg  石盒角度大小
   * @param {num} splitNum  石盒切割数
   * @param {num} length  石盒长度
   * return 石盒集合体
   */
   getFlowers(deg, splitNum, length, interval=1.6, amount=.1) {
    let path = [], path1 = [], path2 = [];
    let baseDeg = Math.PI/180*deg/splitNum;
    let space = length-interval;
    for(let i=0; i<=splitNum; i++) {
      path1.push([Math.sin(baseDeg*i)*length,Math.cos(baseDeg*i)*length]);
      path2.push([Math.sin(baseDeg*i)*space,Math.cos(baseDeg*i)*space]);
    };
    path2.reverse();
    path = [...path1, ...path2];
    let shape = new THREE.Shape();
    shape.moveTo(path[0][0], path[0][1]);
    for(let i=1; i<path.length; i++) {
      shape.lineTo(path[i][0], path[i][1]);
    };
    let obj = {amount: amount, bevelEnabled: false, bevelThickness: 1};
    let geo = new THREE.ExtrudeGeometry(shape, obj);
    return geo;
  }
  texture(url, config={}) {
    let { rx=1, ry=1 } = config;
    let t = new THREE.TextureLoader().load(url);
    t.wrapT = THREE.RepeatWrapping;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    return t;
  }
  //转换uv坐标
  /**
   *
   * @param geometry THREE.geometry
   */
  reMapUv(geometry) {
    let faces = geometry.faces;
    geometry.faceVertexUvs[0] = []; // 清空几何体uv映射
    geometry.faces.forEach(function(face, index) {
      var components = ['x', 'y', 'z'];
      var v1 = geometry.vertices[face.a];
      var v2 = geometry.vertices[face.b];
      var v3 = geometry.vertices[face.c];
      let distanceZ = 0;
      // 若三个点都在xy轴上，就把这个三个点构成的图形称为二维图形，否则为三维图形
      if(v1.z == v2.z && v1.z == v3.z) {
        distanceZ = 0;
      } else {
        distanceZ = v1.z || v2.z || v3.z;
      }
      let g = [];
      // 判断是否为二维图形
      if( !distanceZ) {
        // 若为二维图形, 直接使用各个顶点的坐标
        g.push(
          new THREE.Vector2(v1.x, v1.y),
          new THREE.Vector2(v2.x, v2.y),
          new THREE.Vector2(v3.x, v3.y)
        )
      } else {
        // 若为三维图形, 则使用同一平面的点的距离作为uv的x轴,异面点的距离作为y轴;
        let distanceX = 0; // x轴
        let distanceY = 0; // y轴
        // 找出二维坐标
        if(v1.z === v2.z ) {
          distanceX = Math.sqrt(Math.pow((v1.x-v2.x),2)+Math.pow((v1.y-v2.y),2));
          distanceY = Math.abs(v3.z - v1.z);
        } else if(v1.z === v3.z) {
          distanceX = Math.sqrt(Math.pow((v1.x-v3.x),2)+Math.pow((v1.y-v3.y),2));
          distanceY = Math.abs(v2.z - v1.z);
        } else {
          distanceX = Math.sqrt(Math.pow((v3.x-v2.x),2)+Math.pow((v3.y-v2.y),2));
          distanceY = Math.abs(v1.z - v2.z);
        }

        if(index % 2 === 0){
          g.push(
            new THREE.Vector2(0, 0),
            new THREE.Vector2(distanceX, 0),
            new THREE.Vector2(0, distanceY)
          )
        } else {
          g.push(
            new THREE.Vector2(distanceX, 0),
            new THREE.Vector2(distanceX, distanceY),
            new THREE.Vector2(0, distanceY)
          )
        }
      }
      geometry.faceVertexUvs[0].push(g);
    });
  }
}
export default new Parteree();
