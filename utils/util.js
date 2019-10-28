/**
 * @name:
 * @description: 项目中的一些配置/方法
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/10/16
 */
const basePath = process.env.NODE_ENV === 'development' ? './' : '/3dCommunity/dist';
export const basePth = basePath;
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

// 消息提示
export const dialogue = (position, data) => {
  let dialogue = `<div class="dialogue-close">x</div><div class="dialogue-title">${data}</div>`;
  let b = document.createElement('div');
  b.className = 'dialogue';
  b.style.top = position.y+'px';
  b.style.left = position.x+'px';
  b.innerHTML = dialogue;
  document.body.appendChild(b);
  console.log(1)
}
