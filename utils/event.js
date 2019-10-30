/**
 * @name: dom节点事件定义
 * @description:
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/10/8
 */
import house from './houseManagement';
import TWEEN from '@tweenjs/tween.js';
import myGround from './myGround';
// 小区日志切换
function logChange() {
 let logNav = document.getElementById('nav');
 logNav.onclick = function (e) {
   let flag = e.target.className;
   let data = house[flag];
   house.createTable(data,'log-list')
 }
}
// 设备运行详情
function equipmentRunning() {
  let equipmentNode = document.getElementById('house-equipment').children[1].children[0].children[1];
  let that = this;
  equipmentNode.onclick = function (e) {
    let n = e.target;
    let parent = n.parentNode;
    if( n.classList[1] =='event-node' ||  parent.classList[1] =='event-node') {
      let i = n.getAttribute('level') || parent.getAttribute('level');
      let p = house.equipment.ydata[i].eventType.position; // 摄像头位置
      let status = house.equipment.ydata[i].status; // 1: 正常 0: 异常
      let type = house.equipment.ydata[i].eventType.type;
      let cameraPosition = that.camera.position;
      that.camera.lookAt(p[0],p[1],p[2]); // 相机定点查看
      let tween = new TWEEN.Tween(cameraPosition).to(
        {
          x: p[0]+10,
          y: p[1]+10,
          z: p[2]+10
        },1200
      ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function( d ){
        that.camera.position.set(d.x,d.y,d.z);
      }).onComplete(function () {
        that.controls.target = new THREE.Vector3(p[0],p[1],p[2]);
        if(type!= 1) return
        document.getElementById("full-scene").style.zIndex = 3;
        if(status == 1) {
          document.getElementById("big-video").setAttribute("src","./assets/image/test.mp4");
        }
        tween = null;
      }).start()
    }
  }
}
// 房屋情况
function houseMessage() {
  let houseNode = document.getElementById('house-message').children[1].children[0].children[1];
  let that = this;
  houseNode.onclick = function(e) {
    that.contextmenuStatus = 'transparent';
    let cameraPosition = that.camera.position;
    let position = {x: -70, y: 4, z: -30};
    let mesh = that.builds['cylinder'];
    let data = [{position: [5,0,5], message: '804用户,家里水管破裂，积水过多。'}];
    that.getOpacity( mesh, true, data );
    let tween = new TWEEN.Tween(cameraPosition).to(
      {
        x: position.x+30,
        y: position.y,
        z: position.z+30
      },1200
    ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(val){
      that.camera.position.set(val.x, val.y, val.z);
      that.camera.lookAt(position.x,position.y,position.z);
    }).onComplete(function () {
      that.camera.position.set(100, 100, 100);
      that.camera.lookAt(0,0,0);
      that.scene.background = '#000';
      that.camera.layers.mask = 2;
      TWEEN.remove(tween);
    }).start();
  }
}

//获取位置
function getEventPosition(ev){
  let x, y;
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    x = ev.offsetX;
    y = ev.offsetY;
  }
  return {x: x, y: y};
}

// 模式切换
function changeModel() {
  let formNode = document.getElementById('circle');
  let that = this;
  let model1 = house.createModel1.bind(that); // 切换模式1
  let model2 = house.createModel2.bind(that); // 切换模式2
  // 点击切换改变场景样式方法
  function changeModels(flag) {
    if(flag === 1) {
      that.scene.children[0].position.set( ...that.positionLight[0] );
      that.scene.children[1].position.set( ...that.positionLight[1] );
      that.scene.children[2].position.set( ...that.positionLight[2] );
      that.scene.background = that.sceneTexture.sceneDay;
      myGround.closeLampLight();
      myGround.cloud.visible = false;
    } else if(flag === 2) {
      that.scene.children[0].position.set( ...that.positionLight[3] );
      that.scene.children[1].position.set( ...that.positionLight[4] );
      that.scene.children[2].position.set( ...that.positionLight[5] );
      that.scene.background = that.sceneTexture.sceneNight;
      myGround.openLampLight();
      myGround.cloud.visible = false;
    } else {
      // 是否为下雨模式
      myGround.cloud.visible = true;
    }
  }

  formNode.addEventListener('click',function(e) {
    let p = getEventPosition(e);
    if (that.modelType == 1) {
      model1(p, model2);
    } else {
      model2(p, -1, model1, changeModels);
    }}
  )}
// 选择场景
function changeScene() {
  let nav = document.getElementById('pro-nav');
  nav.onclick = function() {
    let sceneOne, sceneTwo;
    sceneOne = document.getElementById("scene-one").checked;
    sceneTwo = document.getElementById("scene-two").checked;
    let sceneOneNode1 = document.getElementById("house-left");
    let sceneOneNode2 = document.getElementById("house-right");
    let sceneTwoNode1 = document.getElementById("monitor-left-panel");
    let sceneTwoNode2 = document.getElementById("monitor-right-panel");
    if(sceneOne) {
      sceneOneNode1.className = 'show';
      sceneOneNode2.className = 'show';
      sceneTwoNode1.className = 'hide';
      sceneTwoNode2.className = 'hide';
      if(loadWeathers) {
        loadWeathers();
      }
    } else if(sceneTwo) {
      sceneOneNode1.className = 'hide';
      sceneOneNode2.className = 'hide';
      sceneTwoNode1.className = 'show';
      sceneTwoNode2.className = 'show';
    }
  }
  // 加载天气
  function loadWeathers() {
    if(document.getElementsByClassName("weather-box").length>1){
      return;
    }else {
      let weatherBox =document.getElementsByClassName("weather-box")[0]
      let myWeatherBox = weatherBox.innerHTML;//克隆节点，深度克隆，克隆节点以及节点下面的子内容。
			document.getElementById("house-weather").innerHTML = myWeatherBox;
    }

  }
}
// 关闭大屏video
function closeBigScene() {
  document.getElementsByClassName('close-video')[0].onclick = function () {
    this.nextSibling.nextSibling.setAttribute('src',null);
    document.getElementById('full-scene').style.zIndex = -1;
  }
}

//去除加载gif图标显示
function removeLoading(){
	document.getElementById("loading").style.display = "none";
}
export { logChange, equipmentRunning, houseMessage, changeModel, changeScene, closeBigScene,removeLoading};