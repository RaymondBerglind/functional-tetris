!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";function n(){return function(e){if("T"===e)return[[0,0,0],[1,1,1],[0,1,0]];if("O"===e)return[[2,2],[2,2]];if("L"===e)return[[0,3,0],[0,3,0],[0,3,3]];if("J"===e)return[[0,4,0],[0,4,0],[4,4,0]];if("I"===e)return[[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];if("S"===e)return[[0,6,6],[6,6,0],[0,0,0]];if("Z"===e)return[[7,7,0],[0,7,7],[0,0,0]]}("ILJOTSZ"["ILJOTSZ".length*Math.random()|0])}function o(e,r){const[t,n]=[r.matrix,r.position];for(let r=0;r<t.length;++r)for(let o=0;o<t[r].length;++o)if(0!==t[r][o]&&0!==(e[r+n.y]&&e[r+n.y][o+n.x]))return!0;return!1}function i(e,r){return e.player.position.x+=r,o(e.arena,e.player)&&(e.player.position.x-=r),e}function a(e){return e.player.position.y++,o(e.arena,e.player)&&(e.player.position.y--,e=function(e){let r=1;e:for(let t=e.arena.length-1;t>0;--t){for(let r=0;r<e.arena[t].length;++r)if(0===e.arena[t][r])continue e;const n=e.arena.splice(t,1)[0].fill(0);e.arena.unshift(n),++t,e.player.score+=10*r,r*=2}return e}(function(e){return e.player.matrix=n(),e.player.position={y:0,x:(e.arena[0].length/2|0)-(e.player.matrix[0].length/2|0)},o(e.arena,e.player)&&(e.arena.forEach(e=>e.fill(0)),e.player.score=0),e}(function(e){return e.player.matrix.forEach((r,t)=>{r.forEach((r,n)=>{0!==r&&(e.arena[t+e.player.position.y][n+e.player.position.x]=r)})}),e}(e)))),e}function l(e,r=1){var t=e.map((t,n)=>t.map((t,o)=>{var i=r<0?o:e.length-1-o;return e[i][n]}));return r<0?t.reverse():t}t.r(r);const u=document.getElementById("tetris"),f=u.getContext("2d");var c={arena:function(e,r){const t=[];for(;r--;)t.push(new Array(e).fill(0));return t}(12,20),player:{matrix:n(),position:{x:0,y:0},score:0}};f.scale(20,20);const p=[null,"#FF0D72","#0DC2FF","#0DFF72","#F538FF","#FF8E0D","#FFE138","#3877FF"];function y(e,r){e.forEach((e,t)=>{e.forEach((e,n)=>{0!==e&&(f.fillStyle=p[e],f.fillRect(n+r.x,t+r.y,1,1))})})}let s=0,d=1e3,x=0;document.addEventListener("keydown",e=>{37===e.keyCode?c=i(c,-1):38===e.keyCode?c=function(e){const r=e.player.position.x;let t=1;for(e.player.matrix=l(e.player.matrix);o(e.arena,e.player);)if(e.player.position.x+=t,t=-(t+(t>0?1:-1)),Math.abs(t)>e.player.matrix[0].length+1)return e.player.matrix=l(e.player.matrix,-1),e.player.position.x=r,e;return e}(c):39===e.keyCode?c=i(c,1):40===e.keyCode&&(c=a(c))}),function e(r,t=0){const n=t-x;x=t,(s+=n)>d&&(r=a(r),s=0),function(e){document.getElementById("score").innerText=e.player.score}(r),function(e){f.fillStyle="#000",f.fillRect(0,0,u.width,u.height),y(e.arena,{x:0,y:0}),y(e.player.matrix,e.player.position)}(r),requestAnimationFrame(function(t){e(r,t)})}(c)}]);