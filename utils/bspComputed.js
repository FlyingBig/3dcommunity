/**
 * 集合物体融合计算
 * 参考：https://blog.csdn.net/qq_30100043/article/details/78944426
 * */
class ComputedBuild {
  cylinder() {
    let config = {
      material: {
        type: 'MeshBasicMaterial',
        color: "#EAD7A7"
      },
    };
    let parent = new THREE.CylinderGeometry(15, 15, 6, 60);
    let child = new THREE.CylinderGeometry(14.5, 14.5, 6, 60);
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
export default new ComputedBuild();

/**
 * geometry  集合模型
 * color 模型颜色
 * opacity 模型透明度
 * */
export const getTransparent = ( geometry, color = '#19EAFD', opacity = 0.2) => {
  let box = new THREE.Object3D();
  box.layers.mask = 2;
  if( geometry.type === 'Group' || geometry.type === 'Object3D' ) {
    let { position, rotation } = geometry;
    for( let i=0; i< geometry.children.length; i++ ) {
      box.add( getTransparent(geometry.children[i]) );
    }
    box.position.set(position.x, position.y, position.z);
    box.rotateX(rotation.x);
    box.rotateY(rotation.y);
    box.rotateZ(rotation.z);
    return box;
  } else {
    let { position, rotation, scale } = geometry;
    geometry = geometry.geometry;
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
    // 纠正位置
    box.position.set(position.x, position.y, position.z);
    box.scale.set(scale.x, scale.y, scale.z);
    box.rotateX(rotation.x);
    box.rotateY(rotation.y);
    box.rotateZ(rotation.z);
    face.layers.mask = 2;
    line.layers.mask = 2;
    point.layers.mask = 2;
    box.add(face);
    box.add(line);
    box.add(point);
    return box;
  }
}
