!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var a=t();for(var n in a)("object"==typeof exports?exports:e)[n]=a[n]}}(self,(()=>(()=>{"use strict";var e={d:(t,a)=>{for(var n in a)e.o(a,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e,t,n){var c;return c=function(e,t){if("object"!=a(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var c=n.call(e,t||"default");if("object"!=a(c))return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"),(t="symbol"==a(c)?c:String(c))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.r(t),e.d(t,{calendarInit:()=>r});var r=function(e){var t=document.body||document.querySelector("body"),a=document.querySelector(e.target);a.setAttribute("readonly","readonly"),e=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){c(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({type:"date",maskClosable:!0,cancelText:"取消",confirmText:"确认"},e);var r=new Date(a.value||new Date),o=r.getFullYear(),d=r.getMonth()+1,i=r.getDate(),s=r.getHours(),l=r.getMinutes(),u=r.getSeconds(),m=function(e,t){var a=new Date(e,t-1,1);return a.setMonth(a.getMonth()+1),a.setDate(0),a.getDate()},p=function(n){for(var c=function(c){var r=document.createElement("div");r.classList.add("item-day");var s=document.createElement("span");s.innerText=c,n.classNames&&s.classList.add(n.classNames),i===c&&o===n.year&&d===n.month&&s.classList.add("active"),s.addEventListener("click",(function(){i=c,o=n.year,d=n.month;var r=document.querySelector(".item-day .active");r&&r.classList.remove("active"),this.classList.add("active"),e.dayChange&&e.dayChange("".concat(o,"-").concat(d<10?"0".concat(d):d,"-").concat(i<10?"0".concat(i):i)),"date"===e.type&&(a.value="".concat(o,"-").concat(d<10?"0".concat(d):d,"-").concat(i<10?"0".concat(i):i),t.removeChild(n.dCalendar))})),r.appendChild(s),n.parentElem.appendChild(r)},r=n.startDay;r<=n.endDay;r++)c(r)},v=function(e,t,a,n){e.innerHTML='<div class="d-calendar-week"><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span></div>',function(e,t,a,n){var c=new Date(a,n-1,1).getDay(),r=1===n?a-1:a,o=1===n?12:n-1,d=m(r,o);1!==c&&p({parentElem:e,dCalendar:t,startDay:d-(0===c?5:c-2),endDay:d,year:r,month:o,classNames:"prev"})}(e,t,a,n);var c=m(a,n);p({parentElem:e,dCalendar:t,startDay:1,endDay:c,year:o,month:d}),function(e,t,a,n){var c=new Date(a,n-1,1).getDay(),r=m(a,n);p({parentElem:e,dCalendar:t,startDay:1,endDay:42-r-(0===c?6:c-1),year:12===n?a+1:a,month:12===n?1:n+1,classNames:"next"})}(e,t,a,n)},y=function(n,c,r){n.innerHTML="";for(var i=function(i){var s=document.createElement("div");s.classList.add("item-month");var l=document.createElement("span");l.innerText="".concat(i,"月"),d===i&&l.classList.add("active"),l.addEventListener("click",(function(){d=i,r.innerText="".concat(d,"月");var s=document.querySelector(".item-month .active");s&&s.classList.remove("active"),this.classList.add("active"),"month"===e.type&&(a.value="".concat(o,"-").concat(d<10?"0".concat(d):d),t.removeChild(c)),e.monthChange&&e.monthChange("".concat(o,"-").concat(d<10?"0".concat(d):d)),["date","date-time"].includes(e.type)&&v(n,c,o,d)})),s.appendChild(l),n.appendChild(s)},s=1;s<=12;s++)i(s)},f=function(n,c,r,i,s,l){n.innerHTML="";for(var u=function(s){var l=document.createElement("div");l.classList.add("item-year");var u=document.createElement("span");u.innerText=s,o===s&&u.classList.add("active"),u.addEventListener("click",(function(){o=s,r.innerText="".concat(o,"年");var l=document.querySelector(".item-year .active");l&&l.classList.remove("active"),this.classList.add("active"),"year"===e.type&&(a.value="".concat(o),t.removeChild(c)),e.yearChange&&e.yearChange("".concat(o)),"month"===e.type&&y(n,c,i),["date","date-time"].includes(e.type)&&v(n,c,o,d)})),l.appendChild(u),n.appendChild(l)},m=s;m<=l;m++)u(m)},h=function(e,t,a,n){var c=document.createElement("div");c.classList.add("list");for(var r=0;r<t;r++){var o=document.createElement("div");o.classList.add("list-item"),o.innerText=r<10?"0".concat(r):r,c.appendChild(o)}c.style="transform: translateY(".concat(40*(1-a),"px);"),function(e,t,a,n,c){var r,o,d,i;e.addEventListener("touchstart",(function(e){r=e.touches[0].pageX,o=e.touches[0].pageY}),!1),e.addEventListener("touchmove",(function(c){var s=c.touches[0].pageX,l=c.touches[0].pageY;d=s-r,i=l-o,Math.abs(d)<=Math.abs(i)&&((n+=i)>a&&(n=a),n<(2-t)*a&&(n=(2-t)*a),e.style="transform: translateY(".concat(n,"px);"))}),!1),e.addEventListener("touchend",(function(t){n=Math.round(n/a)*a,e.style="transform: translateY(".concat(n,"px);"),r=o=d=i=0,c&&c(Math.abs(Math.round(n/a)-1))}),!1)}(c,t,40,40*(1-a),n),e.appendChild(c)};a.addEventListener("click",(function(){var n=document.createElement("div");n.classList.add("d-calendar");var c=document.createElement("div");c.classList.add("d-calendar-mask"),e.maskClosable&&c.addEventListener("click",(function(){t.removeChild(n)})),n.appendChild(c);var r=document.createElement("div");r.classList.add("d-calendar-container"),n.appendChild(r);var m=document.createElement("div");if(m.classList.add("d-calendar-header"),r.appendChild(m),["year","month","date"].includes(e.type)){var p=document.createElement("span");p.classList.add("d-calendar-close"),p.addEventListener("click",(function(){t.removeChild(n)})),m.appendChild(p)}if(["year","month","date","date-time"].includes(e.type)){var b=document.createElement("span");b.classList.add("d-calendar-year"),b.innerText="".concat(o,"年"),b.addEventListener("click",(function(){f(C,n,this,g,e.minYear||(new Date).getFullYear()-15,e.maxYear||(new Date).getFullYear()+4)})),m.appendChild(b);var g=document.createElement("span");"year"!==e.type&&(g.classList.add("d-calendar-month"),g.innerText="".concat(d,"月"),g.addEventListener("click",(function(){y(C,n,this)})),m.appendChild(g));var C=document.createElement("div");C.classList.add("d-calendar-content"),r.appendChild(C),"year"===e.type&&f(C,n,this,g,e.minYear||(new Date).getFullYear()-15,e.maxYear||(new Date).getFullYear()+4),"month"===e.type&&y(C,n,g),["date","date-time"].includes(e.type)&&v(C,n,o,d)}["time","date-time"].includes(e.type)&&function(n,c){var r=document.createElement("div");r.classList.add("d-calendar-time"),h(r,24,s,(function(e){s=e})),h(r,60,l,(function(e){l=e})),h(r,60,u,(function(e){u=e}));var m=document.createElement("div");m.classList.add("d-calendar-footer");var p=document.createElement("button");p.classList.add("button-close"),p.innerText=e.cancelText,p.addEventListener("click",(function(){t.removeChild(c)}));var v=document.createElement("button");v.classList.add("button-confirm"),v.innerText=e.confirmText,v.addEventListener("click",(function(){var n="".concat(o,"-").concat(d<10?"0".concat(d):d,"-").concat(i<10?"0".concat(i):i),r="".concat(s<10?"0".concat(s):s,":").concat(l<10?"0".concat(l):l,":").concat(u<10?"0".concat(u):u);"time"===e.type&&(a.value=r),"date-time"===e.type&&(a.value="".concat(n," ").concat(r)),e.dateTimeChange&&e.dateTimeChange("".concat(n," ").concat(r)),e.timeChange&&e.timeChange(r),t.removeChild(c)})),m.appendChild(p),m.appendChild(v),n.appendChild(r),n.appendChild(m)}(r,n),t.appendChild(n)}))};return t})()));