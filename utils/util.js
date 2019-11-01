/**
 * @name:
 * @description: 项目中的一些非关于three方法
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/10/16
 */
const basePath = require('./basePath');
export const basePth = basePath.basePath;

// rem转换
export const computRem = (doc, win) => {
    let docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      let clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 32 * (clientWidth / 3200) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
}

// 时间格式
export const formatTime = (time, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const t = {
    'y+': time.getFullYear(), // 年份
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分钟
    's+': time.getSeconds(), // 秒
  };
  let rFmt = ''; // 返回的格式值
  for (const key in t) {
      const reg = new RegExp(`(${key})`);
    if (reg.test(fmt)) {
      rFmt = fmt.replace(reg, f => (f.length === 4 ? t[key] : ((`00${t[key]}`).substr((`${t[key]}`).length))));
    }
  }
  return rFmt;
};