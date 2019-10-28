/**
 * @name: 电梯
 * @description: 电梯模型类
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/24
 */
import TWEEN from '@tweenjs/tween';
import fontTexture from './fontTexture';
class Elevator {
  constructor( height = 40, data ) {
    this.height = height;
    this.data = data;
    this.animationRight = null;
    this.animationError = null;
  }
  createModel() {
    let elevators = new THREE.Object3D();
    // 电梯楼层轮廓
    let elevatorBox = new THREE.BoxBufferGeometry( 20, this.height, 10 );
    let elevatorm = new THREE.MeshBasicMaterial({transparent: true, opacity: .4, color: '#70DFE5'});
    let elevator = new THREE.Mesh(elevatorBox, elevatorm);
    elevator.layers.mask = 2;
    let content = this.addElevator(this.height);
    content.position.x = -5;
    content.layers.mask = 2;
    elevators.add(elevator, content);
    elevators.name = 'elevator';
    elevators.layers.mask = 2;
    return elevators;
  }

  /**
   * 构建电梯数量，状态, 线
   * @param height 电梯牵引线的长度
   * @param data   电梯的具体数据
   * @returns 电梯详细结构
   */
   addElevator( height ) {
    let box = new THREE.Object3D();
    this.data.map(function(v,i){
      // 不同状态的电梯对应不同颜色的标志
      let lineColor = v.status == 0 ? '#DEA2DF' : '#7BCACE';
      let boxColor = v.status == 0 ? 'red' : '#53E810';
      let line = new THREE.Mesh(new THREE.BoxBufferGeometry(.2,height,.2), new THREE.MeshBasicMaterial({color: lineColor}));
      line.position.x = i*5;
      let rac = new THREE.BoxBufferGeometry( 1.5, 3, 1.5 );
      let m = new THREE.MeshBasicMaterial( { color: boxColor} );
      let cube = new THREE.Mesh( rac, m );
      cube.userData = v;
      cube.position.x = i*5;
      cube.position.y = v.height;
      line.layers.mask = 2;
      cube.layers.mask = 2;
      if(v.status == 0) {
        // 错误信息
        let message = fontTexture.init(v.title);
        message.position.set(-20,-10,0);
        box.add(message);
      }
      box.add(line, cube);
    });
    return box;
  }
  // 为电梯添加动画效果
  runningElevator(box) {
   let p = box.children[1].children;
   let error = []; // 错误物体集
   let run = [];  // 运动物体集
    p.map(function (v) {
      if(v.userData.status == 0){
        error.push(v);
       // fontext([v.userData.title);
      } else if(v.userData.isrun == 1) {
        run.push(v);
      }
    });
    let startAttr = {scale: 1.5};
    let endAttr = {scale: 0.8};
    for(let i=0; i<run.length;i++){
      startAttr[`y${i}`] = this.height / 2 - run[i].userData.height;
      endAttr[`y${i}`] = -this.height / 2 - run[i].userData.height;
    };
     this.animationRight = new TWEEN.Tween(startAttr)
      .to(endAttr, 40000)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(prop => {
        run.map((v,i)=>{
          v.position.y = prop[`y${i}`]+7
        })
      })
      .start();
    this.animationError = new TWEEN.Tween(startAttr)
      .to(endAttr, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(prop => {
        error.map((v)=>{
          v.scale.set(prop.scale,prop.scale,prop.scale);
        })
      })
      .repeat(Infinity)
      .yoyo(true)
      .start();
  }
}
export default Elevator;
