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
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/axis');

 class HouseManagement {
  constructor() {
    this.pieData = {
      title: '2018小区收入情况',
      xdata: ['18-23周岁', '23-30周岁', '30-45周岁', '45-60周岁'],
      ydata: [3500, 5800, 7503, 4102]
    };
    this.advise = {
      xdata: ['名称', '关系人', '时间'],
      ydata: [
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'},
        {event:'垃圾未处理', name: '张三', time: '2014/3/3'}
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
    this.createPie(this.pieData, "pay");
    this.createTable(this.advise, 'log-list');
    this.createTable(this.house, 'house-message-chart');
    this.createTable(this.equipment, 'house-equipment-chart');
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
        if(k === 'event' || k ==='do' ) {
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
    let option = {
      color: ['#00A5FF','#F0BD00', '#174076', '#E18001'],
      title : {
        text: data.title,
        x:'center',
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        top: 80,
        left: '20%'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)",
        position: 'right'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 50,
        data: data.xdata,
        textStyle: {
          color: '#fff'
        }
      },
      series : [
        {
          name: '每月收入总数',
          type: 'pie',
          radius : '55%',
          center: ['30%', '50%'],
          label: {
            normal: {
              show: false,
              position: 'center'
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
              n.push({value: v, name: data.xdata[i]})
            })
            return n;
          })(),
        }
      ]
    };
    chart.setOption(option);
  }
  /**
   * 生成折现样式
   * @param data 图标数据
   * @param el 节点元素
   */
  createLine( data, el ) {

  }
}
export default new HouseManagement();
