/**
 * 集合物体融合计算
 * 参考：https://blog.csdn.net/qq_30100043/article/details/78944426
 * */
import CylinderBuild from './cylinderBuilding';

class ComputedBuild {
  cylinder() {
    let config = {
      material: {
        type: 'MeshBasicMaterial',
        color: "#EAD7A7"
      },
    };
    let parent = new CylinderBuild({ height: 3, config }).init();
    let child = new CylinderBuild({ radiusTop:9.5, radiusBottom: 9.5, height: 3, config }).init();
    let result = new ThreeBSP(parent).subtract(new ThreeBSP(child)).toMesh();
    let texture = new THREE.TextureLoader().load( 'assets/image/cylinderTop.png' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 1 );
    let t = new THREE.MeshBasicMaterial({
      color: '#B8A382',
      map: texture,
    });
    t.transparent = true;
    t.opacity = 1;
    result.material = t;
    return result;
  }
};
/**
 * geometry  集合模型
 * color 模型颜色
 * opacity 模型透明度
 * */
export const getTransparent = ( geometry, color = 0xFF0000, opacity = 0.2) => {
  const box = new THREE.Object3D();
  // 面
  const material1 = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
  const face = new THREE.Mesh(geometry, material1);
  // 线
  const material2 = new THREE.MeshBasicMaterial({color: color, wireframe: true, transparent: true, opacity: opacity+0.2});
  const line = new THREE.Mesh(geometry, material2);
  // 点
  var material3 = new THREE.PointsMaterial({
    color: color,    //设置颜色，默认 0xFFFFFF
    size: 1
  });
  const point = new THREE.Points(geometry, material3);
  box.add(face);
  box.add(line);
  box.add(point);
  return box;
}
export default new ComputedBuild();
