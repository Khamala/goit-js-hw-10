import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as h,i as y}from"./assets/vendor-77e16229.js";const p=document.querySelector("#datetime-picker"),n=document.querySelector("button[data-start]"),b=document.querySelector("#datetime-picker");let i;const l={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t[0]<=l.defaultDate?(n.setAttribute("disabled","disabled"),y.show({title:"Error",message:"Please choose a date in the future!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",titleColor:"#fff"})):(n.removeAttribute("disabled"),i=t[0])}};h(p,l);n.addEventListener("click",S);const e={day:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]")};function S(){if(!i)return;const t=setInterval(r,1e3);r();function r(){const s=i-new Date;if(s<=0){clearInterval(t);return}const{days:u,hours:c,minutes:a,seconds:d}=C(s);e.day.textContent=o(u),e.hours.textContent=o(c),e.minutes.textContent=o(a),e.seconds.textContent=o(d),n.setAttribute("disabled","disabled"),b.setAttribute("disabled","disabled")}}function C(t){const a=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),m=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:d,minutes:m,seconds:f}}function o(t){return t.toString().padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map