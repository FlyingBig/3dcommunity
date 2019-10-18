/**
 * @name:
 * @description: 项目中的一些配置/方法
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/10/16
 */
const basePath = process.env.NODE_ENV === 'development' ? './' : '/3dCommunity/dist';
export const basePth = basePath;

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
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
