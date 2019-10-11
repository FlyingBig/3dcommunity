/**
 * @name: 大门模型
 * @description:
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/29
 */

class Door {
  constructor() {
    this.pillerPosition = [[-14.86, -1.2, 0], [-10.36, -1.1, 0], [-5.66, 0, 0], [5.66, 0, 0], [10.56, -1.1, 0], [15.26, -1.1, 0]];
    this.doorPosition = [[-14.16, -4.3, -.2], [-9.66, -4.3, -.2], [6.56, -4.3, -.2], [11.26, -4.3, -.2]];
  }
  init() {
    let box = new THREE.Object3D();
    let piller = this.getPiller();
    let smallDoor = this.getSmallDoor();
    let bigdoor = this.getBigdoor();
    // 柱子位置
    for(let i=0; i<6; i++) {
      let c = piller.clone();
      if( i===2 || i===3 ) {
        c.scale.set(1.4, 1.4, 1.4);
      }
      c.position.set(this.pillerPosition[i][0]*1.1, this.pillerPosition[i][1]*1.1, this.pillerPosition[i][2]*1.1);
      box.add(c);
    }
    // 小门位置
    for(let i=0; i<4; i++) {
      let c = smallDoor.clone();
      c.scale.set(1, 0.7, 1);
      c.position.set(this.doorPosition[i][0]*1.1, this.doorPosition[i][1]*1.1, this.doorPosition[i][2]*1.1);
      box.add(c);
    }
    //大门位置
    bigdoor.position.set(-5.5, 4, 0);
    bigdoor.scale.set(1.3,1.3,1.3);
    box.add(bigdoor);
    box.scale.set(2,2,2);
    box.position.set( 120,10 ,-263);
    box.name = 'outdoor';
    return box;
  }
  // 门柱
  getPiller() {
    let box = new THREE.Object3D();
    // 柱子中间部分
    let pillergeo = new THREE.BoxBufferGeometry(1.2, 5 , 1.2);
    let t = this.texture('../assets/image/piller.png',{rx: 1, ry: 3});
    let pillerMesh = new THREE.MeshBasicMaterial({ map: t });
    let piller = new THREE.Mesh(pillergeo, pillerMesh);
    // 柱子底部
    let bot = new THREE.BoxBufferGeometry(1.7, 0.6, 1.7);
    let botMesh = new THREE.MeshBasicMaterial({ map: t });
    let b = new THREE.Mesh(bot, botMesh);
    b.position.set(0, -3.2, 0);
    let smalBot = b.clone();
    smalBot.scale.set(0.9, 0.9, 0.9);
    smalBot.position.set(0, -2.7, 0);
    // 柱子顶部P
    let top = smalBot.clone();
    top.position.set(0, 2.7, 0);
    let bigTop = top.clone();
    bigTop.scale.set(1.1, 1.1, 1.1);
    bigTop.position.set(0, 3.2, 0);
    // 柱子顶部装饰物
    let conegeo = new THREE.IcosahedronGeometry( .7, 2 );
    let t1 = this.texture('../assets/image/t1.jpg',{rx: 2, ry: 3});
    let conemater = new THREE.MeshBasicMaterial( {map: t1} );
    let cone = new THREE.Mesh( conegeo, conemater );
    cone.rotateX(Math.PI);
    cone.position.set( 0, 4.1, 0 );
    box.add(piller, b, smalBot, top, bigTop, cone);
    return box;
  }
  // 小门
  getSmallDoor() {
    let box = new THREE.Object3D();
    let path1 = [[0,0], [0,6.6], [3.5,6.6], [3.5,0], [3.3, 0], [3.3, 4]];
    let pathEllipse = new THREE.EllipseCurve(
      1.75, 4, // ax, aY
      1.5, 1.5,  // xRadius, yRadius
      0, Math.PI
    ).getPoints(25);
    let path2 = [[0.2, 0], [0,0]];
    // 门形状总路线
    let pathAll = [...path1, ...pathEllipse, ...path2];
    let shape = new THREE.Shape();
    shape.moveTo(pathAll[0][0], pathAll[0][1]);
    for(let i=1; i<pathAll.length; i++) {
      (i>5 && i<=31) ? shape.lineTo(pathAll[i].x, pathAll[i].y) : shape.lineTo(pathAll[i][0], pathAll[i][1]);
    }
    let geo = new	THREE.ExtrudeBufferGeometry(shape, {depth: 1.2, bevelEnabled: false});
    let t1 = this.texture('../assets/image/3.jpg',{rx: 1/6, ry: 1/6});
    let material = new THREE.MeshBasicMaterial({map: t1});
    let mesh = new THREE.Mesh(geo, material);
    // 门上装饰
    let doorTop = new THREE.BoxBufferGeometry(3.5, 1.5, 1.2);
    let t = this.texture('../assets/image/2.jpg',{rx: 2, ry: 2});
    let doormaterial = new THREE.MeshBasicMaterial({map: t});
    let door = new THREE.Mesh(doorTop, doormaterial);
    door.position.set(1.75,7.35,0.6);
    // 门纸
    let doorBuild = this.doorImg([3.1, 3.5]);
    doorBuild.rotateY(Math.PI);
    doorBuild.position.set(1.7, 1.75, 0.6);
    box.add(mesh, door, doorBuild);
    return box;
  }
  // 大门
  getBigdoor() {
    let box = new THREE.Object3D();
    let path = [[0,0], [0,2], [8.6,2], [8.6,0]];
    let pathEllipse = new THREE.EllipseCurve(
      4.3, -7.4, // ax, aY
      8.6, 8.6,  // xRadius, yRadius
      Math.PI/3*1, Math.PI/3*2
    ).getPoints(25);
    let pathAll = [...path, ...pathEllipse];
    let shape = new THREE.Shape();
    shape.moveTo(pathAll[0][0], pathAll[0][1]);
    for(let i=1; i<pathAll.length; i++) {
      i>3 ? shape.lineTo(pathAll[i].x, pathAll[i].y) : shape.lineTo(pathAll[i][0], pathAll[i][1]);
    }
    let geo = new	THREE.ExtrudeBufferGeometry(shape, {depth: 1.2, bevelEnabled: false});
    let t1 = this.texture('../assets/image/piller.png',{rx: 1/3, ry: 1});
    let material = new THREE.MeshBasicMaterial({map: t1});
    let mesh = new THREE.Mesh(geo, material);
    mesh.position.set(0, -2, -.5);
    // 上面装饰
    let top = new THREE.BoxBufferGeometry(8.6, 0.2, 1);
    let t2 = this.texture('../assets/image/3.jpg',{rx: 5, ry: 1});
    let materialTop = new THREE.MeshBasicMaterial({map: t2});
    let meshTop = new THREE.Mesh(top, materialTop);
    meshTop.position.set(4.3, 1, 0);
    // 圆柱体
    let geometry = new THREE.CylinderBufferGeometry( .2, .2, 1 );
    let materialCylinder = new THREE.MeshBasicMaterial( {map: t2} );
    let cylinder = new THREE.Mesh( geometry, materialCylinder );
    for(let i=0; i<10; i++) {
      let c = cylinder.clone();
      c.position.set((i*0.88+0.25), .5, 0);
      box.add(c);
    }
    let doorRight = this.doorImg([4, 4]);
    doorRight.position.set(6.2,-4.8,0);
    let doorLeft = this.doorImg([4, 4]);
    doorLeft.position.set(2.1,-4.8,0);
    doorLeft.rotateY(Math.PI);
    box.add(mesh, meshTop, doorLeft, doorRight);
    return box;
  }
  // 门框
  doorImg(size) {
    let door = new THREE.PlaneBufferGeometry(...size);
    let t = this.texture('../assets/image/door.png');
    let meterial = new THREE.MeshBasicMaterial({map: t, transparent: true, opacity: .8, side: THREE.DoubleSide});
    let mesh = new THREE.Mesh(door, meterial);
    return mesh;
  }
  texture(url, config={}) {
    let { rx=1, ry=1 } = config;
    let t = new THREE.TextureLoader().load(url);
    t.wrapT = THREE.RepeatWrapping;
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(rx, ry);
    return t;
  }
}
export default new Door();
