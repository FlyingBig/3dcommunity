/**
 * @name: 停车场
 * @description:
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/16
 */

class Parking {
  init() {
    let box = new THREE.Object3D();
    let texture = this.getTexture('/assets/image/ground.jpg',{ rx: 10, ry: 10 });
    let park = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 50), new THREE.MeshPhongMaterial({map: texture}));
    let line = this.drawParkLine(10);
    line.position.set(0, 8, 0);
    let line2 = line.clone();
    line2.rotateZ(Math.PI)
    line2.position.y = -8;
    box.add(park);
    box.add(line, line2);
    box.rotateX(-Math.PI/2);
    return box;
  }
  drawParkLine( cars ) {
    let box = new THREE.Object3D();
    let horizontalLine = new THREE.Mesh(new THREE.PlaneBufferGeometry(0.5, 17), new THREE.MeshPhongMaterial({color: '#BC9246'}));
    let verticalLine = new THREE.Mesh(new THREE.PlaneBufferGeometry(95, 1), new THREE.MeshPhongMaterial({color: '#BC9246'}));
    verticalLine.position.z = 0.4;
    verticalLine.position.y = 13.5;
    horizontalLine.position.y = 5.5;
    horizontalLine.position.z = 0.4;
    box.add(verticalLine);
    let space = 9;
    for(let i=0; i<cars; i++) {
      let c = horizontalLine.clone();
      c.position.x = 2.5+i*space - 45.5;
      box.add(c);
    }
    return box;
  }
  // 贴图方法
  getTexture( url, conf = {} ) {
    let {rx = 1, ry = 1} = conf;
    let texture = new THREE.TextureLoader().load(url);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(rx, ry);
    return texture;
  }
}
export default new Parking();
