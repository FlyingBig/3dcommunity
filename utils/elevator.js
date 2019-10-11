/**
 * @name: 电梯
 * @description: 电梯模型类
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/24
 */
import TWEEN from '@tweenjs/tween';
class Elevator {
  constructor( height = 40 ) {
    this.height = height;
  }
  init() {
    let b = this.createModel();
    return b;
  }
  createModel() {
    let box = new THREE.Object3D()
    let geo = new THREE.BoxBufferGeometry(3, 5, 3);
    let material = new THREE.MeshPhongMaterial({color: '#0E66DC'});
    let elevatorRunning = new THREE.Mesh(geo, material); // 正在运行的电梯
    elevatorRunning.position.set(-3, 0, 0);
    elevatorRunning.name = 'runElevator';
    let elevatorNormal = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color: 0xff0000}));
    elevatorNormal.material.color = new THREE.Color( 0xff0000 ); //cacheArcLengths 没工作的电梯
    elevatorNormal.position.set(3, 0, 0);
    let line = new THREE.Geometry();
    line.vertices.push(
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 0, 40, 0 )
    );
    let mater = new THREE.LineBasicMaterial( { color: '#7F8590'} );
    let mesh = new THREE.Line( line, mater );
    mesh.position.set(3, 0, 0);
    let mesh2 = mesh.clone();
    mesh2.position.set(-3, 0, 0);
    // 放入第二视角
    elevatorRunning.layers.mask = 2;
    elevatorNormal.layers.mask = 2;
    mesh.layers.mask = 2;
    mesh2.layers.mask = 2;
    box.add( elevatorRunning, elevatorNormal, mesh, mesh2);
    box.name = 'elevator';
    return box;
  }
  runningElevator(box) {
    if( box.children[0].name === 'runElevator' ) {
      let g = box.children[0];
      let h = 40;
      let t = new TWEEN.Tween({y: 0})
        .to({y: h}, 4800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(prop => {
          g.position.y = prop.y;
        })
        .repeat(1)
        .yoyo(true)
        .onComplete(()=>{
          t = null;
        }).start();
    }
  }
}
export  default new Elevator();
