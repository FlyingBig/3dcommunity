/**
 * @name: 物业管理模块
 * @description: 所有物业管理的逻辑，图表，数据
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/30
 */
let echarts = require('echarts/lib/echarts');
// 引入图b表
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/axis');
require('echarts/lib/component/polar');

 class HouseManagement {
  constructor() {
    this.pieData = {
      xdata: ['76平方米', '92平方米', '107平方米', '129平方米'],
      ydata: [500, 1201, 900, 699]
    };
    this.advise = {
      xdata: ['名称', '关系人', '时间'],
      ydata: [
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {type:'垃圾未处理', name: '张三', time: '2014/3/3'}
      ]
    };
    this.active = {
      xdata: ['名称', '关系人', '时间'],
      ydata: [
        {event:'小区羽毛球比赛', name: '张三', time: '2014/3/3'},
        {event:'小区羽毛球比赛', name: '张三', time: '2014/3/3'},
        {event:'小区羽毛球比赛', name: '张三', time: '2014/3/3'},
        {event:'小区羽毛球比赛', name: '张三', time: '2014/3/3'}
      ]
    };
    this.repair = {
      xdata: ['名称', '关系人', '时间'],
      ydata: [
        {event:'1-1-1405水管检查', name: '张三', time: '2014/3/3'},
        {event:'1-1-1405水管检查', name: '张三', time: '2014/3/3'},
        {event:'1-1-1405水管检查', name: '张三', time: '2014/3/3'},
        {event:'1-1-1405水管检查', name: '张三', time: '2014/3/3'}
      ]
    };
    this.house = {
      xdata: ['单元名称', '类型', '状态'],
      ydata: [
        {name:'1幢一单元', type: '公寓', status: 1, eventType:{position: [40, 4 , -55]}},
        {name:'1幢二单元', type: '公寓', status: 1, eventType:{position: [120, 2 , -110]}},
        {name:'2幢一单元', type: '高层', status: 1, eventType:{position: [-250, 4 , -75]}},
        {name:'2幢二单元', type: '高层', status: 0, eventType:{position: [-45, 3 , -100]}},
        {name:'3幢一单元', type: '高层', status: 0, eventType:{position: [-35, 3 , -170]}}
      ]
    };
    this.equipment = {
      xdata: ['设备名称', '状态', '操作'],
      ydata: [
        {name:'北门摄像头1', status: 1, do: '查看', eventType: {type: 1, position: [-543.67,23.4,-265.02000000000004]}},
        {name:'南门摄像头1', status: 1, do: '查看', eventType: {type: 1, position: [-389.62,23.4,-264.95]}},
        {name:'东门摄像头1', status: 1, do: '查看', eventType: {type: 1, position: [-236.33,23.4,-265.31]}},
        {name:'消防栓-西区', status: 1, do: '查看', eventType: {type: 0, position: [20, 1, -3]}},
        {name:'消防栓-南区', status: 0, do: '查看', eventType: {type: 0, position: [100, 1, -70]}}
      ]
    }
  };

  init() {
    this.createTable(this.advise, 'log-list');
    this.createTable(this.house, 'house-message-chart');
    this.createTable(this.equipment, 'house-equipment-chart');
    this.createPie(this.pieData, "pay");
    this.createModel1();
  }

  /**
   * 生成表格样式
   * @param data 图标数据
   * @param el 节点元素
   */
  createTable( data, el ) {
    let table = '', thead = '<div class="t-head">', tbody = '<div class="t-body">';
    for(let i=0;i<data.xdata.length;i++) {
      thead += '<div class="t-head-tr"><span>'+data.xdata[i]+'</span></div>'
    }
    thead += '</div>';
    for(let i=0;i<data.ydata.length;i++) {
      tbody += '<div class="t-body-tr">';
      for( let k in data.ydata[i]) {
        if(k=== 'eventType') continue;
        let v = data.ydata[i][k];
        let c = '';
        if(k === 'event' || k === 'do' ) {
          c = 'event-node';
        } else if (k === 'status') {
          c = v === 1 ? 'event-right' : 'event-error';
          v = v === 1 ? '正常' : '异常';
        }
        tbody += '<div class="t-body-td '+c+'" title="'+v+'" level="'+i+'"><span>'+v+'</span></div>'
      }
      tbody += '</div>';
    }
    tbody += '</div>';
    table = '<div class="t-table">'+thead+tbody+'</div>';
    document.getElementById(el).innerHTML = table;
  }
  /**
   * 生成饼图样式
   * @param data 图标数据
   * @param el 节点元素
   */
  createPie( data, el ) {
    let node = document.getElementById(el);
    let chart = echarts.init(node);
    let color = [['#FFDF2D','#D76606'], ['#40C489','#40C489'], ['#1890ED','#47D4F6'], ['#46CF83','#CDEB2F']];
    let option = {
      title: {
        text: '总房数\n\r1000',
        x: '21%',
        y: '35%',
        textStyle: {
          color: '#fff',
          fontSize: (function () {
            let rem = document.documentElement.style.fontSize;
            return parseInt(rem)*0.94
          })()
        }
      },
      polar: {
        center: ['30%', '50%'],
        radius: '90%',
      },
      angleAxis: {
        type: 'category',
        startAngle: 0,
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      radiusAxis: {
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: 'right'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 16,
        itemGap: (function () {
          let rem = document.documentElement.style.fontSize;
          return parseInt(rem)*0.74
        })(),
        data: (function (x) {
          let y = [];
          x.map(function (v,i) {
            let obj = {name: v, icon: `image://./assets/image/housemsg/icon${i+1}.png`};
            y.push(obj);
          })
          return y;
        })(data.xdata),
        textStyle: {
          color: '#fff',
          fontSize: (function () {
            let rem = document.documentElement.style.fontSize;
            return parseInt(rem)*0.94
          })()
        }
      },
      series : [
        {
          name: '小区户型占比',
          type: 'pie',
          radius: ['50%', '80%'],
          center: ['30%', '50%'],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: (function () {
            let n = [];
            data.ydata.map((v,i)=>{
              n.push({value: v, name: data.xdata[i],itemStyle:{color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: color[i][0] // 0% 处的颜色
                }, {
                  offset: 1, color: color[i][1] // 100% 处的颜色
                }],
                global: false
              }}})
            })
            return n;
          })(),
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize',function(){
      chart.resize();
    })
  }

  // 切换模式图形
  tanslateCanvas(c){
    c.translate(-100,-100);
    this.tanslateCanvas = null;
  }
  createModel1( pos, rb ) {
    let node = document.getElementById('circle');
    let ctx = node.getContext('2d');
    ctx.beginPath();
    pos ? ctx.clearRect(0,0,400,400) : null;
    this.tanslateCanvas ? this.tanslateCanvas(ctx) : null;
    ctx.strokeStyle = '#2DFAFF';
    let gradient1 = ctx.createRadialGradient(200, 200, 1, 200, 200, 45.5);
    gradient1.addColorStop(0,'rgba(41,143,247,0.78)');
    gradient1.addColorStop(1,'rgba(41,143,247,0.28)');
    ctx.fillStyle = gradient1;
    ctx.moveTo(160, 200);
    ctx.arc(200, 200, 42, -Math.PI, 0, false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    if(pos && ctx.isPointInPath(pos.x, pos.y)) {
      this.modelType = 2;
      ctx.clearRect(0,0,400,400);
      rb(null, this.activeModel);
      node.className = 'scale-box';
      return;
    }
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.moveTo(195, 178);
    ctx.lineTo(200, 173);
    ctx.lineTo(205, 178);
    ctx.moveTo(195, 175);
    ctx.lineTo(200, 170);
    ctx.lineTo(205, 175);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.font = '11px bold';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('切换模式', 200, 190);
  }
  createModel2( pos, oldIndex, render, rb ) {
    let node = document.getElementById('circle');
    let ctx = node.getContext('2d');
    pos ? ctx.clearRect(0,0,400,400) : null;
    let gradient = ctx.createRadialGradient(200, 200, 45.5, 200, 200, 89);
    gradient.addColorStop(0,'rgba(41,143,247,0.78)');
    gradient.addColorStop(1,'rgba(41,143,247,0.28)');
    // 图片位置信息
    let imgPos = [[130,155],[190,117],[252,155]];
    // 激活样式
    let activeIndex = 1;
    let activeBack = 'rgba(41,143,247,0.28)';
    let activeFont = '#2DFAFF';
    let activeUrl = ['night', 'sunny', 'rain'];
    let eleStyle = [];  // 图片,字体颜色等属性
    ctx.translate(0,0);
    for(let i=0; i<3; i++) {
      let act = oldIndex == i ? {fontColor: activeFont, imgUrl: `./assets/image/monitor/${activeUrl[i]}1.png`} : {fontColor: '#fff', imgUrl: `./assets/image/monitor/${activeUrl[i]}.png`};
      eleStyle.push(act);
    }
    // 切换模式
    ctx.beginPath();
    ctx.fillStyle = '#fff';
    ctx.moveTo(155.5, 200);
    ctx.arc(200, 200, 42, -Math.PI, 0, false);
    ctx.stroke();
    ctx.fillText('切换模式', 200, 190);
    if(pos && ctx.isPointInPath(pos.x, pos.y)) {
      this.modelType = 1;
      ctx.clearRect(0,0,400,400);
      render();
      node.className = 'shake-box';
      return;
    }
    // 环形
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#2DFAFF';
    ctx.beginPath();
    ctx.moveTo(110, 200)
    ctx.arc(200, 200, 89, -Math.PI, -Math.PI/3*2, false);
    ctx.arc(200, 200, 43, -Math.PI/3*2, -Math.PI, true);
    ctx.closePath();
    if(pos && ctx.isPointInPath(pos.x, pos.y)) {
      ctx.fillStyle = 'rgba(41,143,247,0.58)';
      eleStyle[0].fontColor = activeFont;
      eleStyle[0].imgUrl = `./assets/image/monitor/${activeUrl[0]}1.png`;
      this.activeModel = 0;
      rb(2); // 场景变换
    }
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = eleStyle[0].fontColor;
    ctx.font = '12px normal';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('黑夜',136,185);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#2DFAFF';
    ctx.moveTo(200-Math.cos(Math.PI/3)*89, 200-Math.sin(Math.PI/3)*89);
    ctx.arc(200, 200, 89, -Math.PI/3*2, -Math.PI/3, false);
    ctx.arc(200, 200, 43, -Math.PI/3, -Math.PI/3*2, true);
    ctx.lineTo(200-Math.cos(Math.PI/3)*89, 200-Math.sin(Math.PI/3)*89);
    ctx.closePath();
    if(pos && ctx.isPointInPath(pos.x, pos.y)) {
      ctx.fillStyle = 'rgba(41,143,247,0.78)';
      eleStyle[1].fontColor = activeFont;
      eleStyle[1].imgUrl = `./assets/image/monitor/${activeUrl[1]}1.png`;
      this.activeModel = 1;
      rb(1); // 场景变换
    }
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = eleStyle[1].fontColor;
    ctx.font = '90px';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('晴天',200,145);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.strokeStyle = '#2DFAFF';
    ctx.moveTo(200+Math.cos(Math.PI/3)*89, 200-Math.sin(Math.PI/3)*89);
    ctx.arc(200, 200, 89, -Math.PI/3, 0, false);
    ctx.arc(200, 200, 43, 0, -Math.PI/3, true);
    ctx.closePath();
    if(pos && ctx.isPointInPath(pos.x, pos.y)) {
      ctx.fillStyle = 'rgba(41,143,247,0.78)';
      eleStyle[2].fontColor = activeFont;
      eleStyle[2].imgUrl = `./assets/image/monitor/${activeUrl[2]}1.png`;
      this.activeModel = 2;
      rb(3); // 场景变换
    }
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fontSize = '90px Arial';
    ctx.fillStyle = eleStyle[2].fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('雨天',264,185);
    eleStyle.map(function(v,i){
      let img = new Image();
      img.src = v.imgUrl;
      img.onload = function(){
        ctx.drawImage(img, ...imgPos[i]);
      }
    })
    return activeIndex;
   }
}
export default new HouseManagement();
