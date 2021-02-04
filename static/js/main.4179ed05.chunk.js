(this.webpackJsonpconnect4=this.webpackJsonpconnect4||[]).push([[0],{30:function(e,t,a){},55:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(0),l=a.n(s),r=a(7),c=a.n(r),i=(a(30),a(24)),p=a(5),d=a(9),o=function(e){var t=e.value,a=e.onClick,s=(t.player,"squares ".concat(t.player));return Object(n.jsx)("button",{className:s,onClick:a},t.id)},u=function(e){var t=e.newValues,a=e.onClick;return Object(n.jsx)("div",{className:"board",children:t.map((function(e,t){return Object(n.jsx)(o,{value:e,onClick:function(t){return a(t,e.id)}},e.id)}))})},j=function(e){var t=e.items,a=e.imgUrl,s=e.endGame,l=e.onClick;return Object(n.jsx)("div",{className:"modalWindow",children:Object(n.jsxs)("div",{className:"Window",children:[Object(n.jsx)("img",{src:a,alt:"Connect 4"}),s?Object(n.jsx)("p",{children:"Game Over"}):"",t?Object(n.jsx)("button",{onClick:l,children:"Start new game!"}):Object(n.jsx)("p",{children:"Loading "})]})})},y=a(23),b=a.n(y);var O=Object(d.b)((function(e){return{squares:e.counter.value,lastStep:e.counter.lastStep}}),(function(e){return{changeProp:function(t,a){e({type:"CHANGE_SQUARE",id:t,turn:a})},undoMove:function(){e({type:"UNDO_MOVE"})},newGame:function(){e({type:"NEW_GAME"})}}}))((function(e){var t=Object(s.useState)(!1),a=Object(p.a)(t,2),l=a[0],r=a[1],c=Object(s.useState)([]),d=Object(p.a)(c,2),o=d[0],y=d[1],O=Object(s.useState)(null),h=Object(p.a)(O,2),m=h[0],f=h[1],v=Object(s.useState)(!1),x=Object(p.a)(v,2),N=x[0],S=x[1],g=Object(s.useState)(""),w=Object(p.a)(g,2),E=w[0],k=w[1];Object(s.useEffect)((function(){b.a.get("https://poetrydb.org/author/Shakespeare").then((function(e){f(e.data)}))}),[]),Object(s.useEffect)((function(){42===e.lastStep&&(S(N=!0),document.getElementsByClassName("modalWindow")[0].style.display="block")}));var C=function t(a,n,s,l){return l!==Math.floor((a+1)/7-.01)?0:e.squares[a].player===s?1+t(a+n,n,s,l):0},_=function t(a,n){return a<42&&e.squares[a].player===n?1+t(a+7,n):0},M=function t(a,n,s,l){var r=Math.floor((a+1)/7-.01);return 1!==Math.abs(l-r)||a<0||a>41?0:e.squares[a].player===s?1+t(a+n,n,s,r):0},q=function(e,t){var a=Math.floor((e+1)/7-.01),n=1+C(e-1,-1,t,a)+C(e+1,1,t,a);return n>3||((n=1+_(e+7,t))>3||((n=1+M(e-6,-6,t,a)+M(e+6,6,t,a))>3||(n=1+M(e-8,-8,t,a)+M(e+8,8,t,a))>3))};return Object(n.jsxs)("div",{className:"App container-fluid",children:[Object(n.jsx)("div",{className:"gamename row",children:Object(n.jsx)("h1",{children:"Poetic Connect 4"})}),Object(n.jsxs)("div",{className:"headrow row",children:[Object(n.jsx)("div",{className:"col-2",children:Object(n.jsx)("button",{className:"myButton",onClick:function(){0!==e.lastStep&&(r(!l),o.pop(),E&&k(""),e.undoMove())},children:"Undo"})}),Object(n.jsx)("div",{className:"col-3 moveTurn",children:E?Object(n.jsxs)("p",{children:[" ",E," Wins! "]}):Object(n.jsx)("p",{children:l?"Player's 2 turn":"Player's 1 turn"})}),Object(n.jsx)("div",{className:"newGameButton col-3",children:Object(n.jsx)("button",{className:"myButton",onClick:function(){document.getElementsByClassName("modalWindow")[0].style.display="block"},children:"New Game"})})]}),Object(n.jsxs)("div",{className:"row",children:[Object(n.jsx)("div",{className:"boardcol col-6",children:Object(n.jsx)(u,{newValues:e.squares,onClick:function(t,a){if(!E&&!e.squares[a].player&&(a>34||"black"===e.squares[a+7].player||"white"===e.squares[a+7].player)){if(r(!l),m){var n=Math.floor(161*Math.random());if(void 0!==m[n]){var s=m[n].lines.map((function(e){return e}));y([].concat(Object(i.a)(o),[{title:m[n].title+":",line:s}]))}}e.changeProp(a,l),q(a,e.squares[a].player)&&("black"===e.squares[a].player?k("Player 1"):k("Player 2"))}}})}),Object(n.jsx)("div",{className:"poetry col-3",children:o.length?Object(n.jsxs)("div",{children:[Object(n.jsx)("h5",{children:" -> William Shakespeare "}),Object(n.jsx)("div",{className:"title",children:Object(n.jsx)("p",{children:o[o.length-1].title})}),Object(n.jsx)("div",{className:"poetryBox",children:o[o.length-1].line.map((function(e,t){return Object(n.jsx)("div",{children:Object(n.jsx)("p",{children:e})},t)}))})]}):Object(n.jsx)("div",{children:Object(n.jsx)("h5",{children:"-> William Shakespeare"})})})]}),Object(n.jsx)(j,{items:m,imgUrl:"https://www.logolynx.com/images/logolynx/af/af99ef1a19d2f3ae098f4a25ee3a79c8.gif",endGame:N,onClick:function(){document.getElementsByClassName("modalWindow")[0].style.display="none",S(N=!1),k(""),y([]),e.newGame()}})]})})),h=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,56)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,l=t.getLCP,r=t.getTTFB;a(e),n(e),s(e),l(e),r(e)}))},m=a(4),f=a(3),v={value:[{id:0,player:0,step:0},{id:1,player:0,step:0},{id:2,player:0,step:0},{id:3,player:0,step:0},{id:4,player:0,step:0},{id:5,player:0,step:0},{id:6,player:0,step:0},{id:7,player:0,step:0},{id:8,player:0,step:0},{id:9,player:0,step:0},{id:10,player:0,step:0},{id:11,player:0,step:0},{id:12,player:0,step:0},{id:13,player:0,step:0},{id:14,player:0,step:0},{id:15,player:0,step:0},{id:16,player:0,step:0},{id:17,player:0,step:0},{id:18,player:0,step:0},{id:19,player:0,step:0},{id:20,player:0,step:0},{id:21,player:0,step:0},{id:22,player:0,step:0},{id:23,player:0,step:0},{id:24,player:0,step:0},{id:25,player:0,step:0},{id:26,player:0,step:0},{id:27,player:0,step:0},{id:28,player:0,step:0},{id:29,player:0,step:0},{id:30,player:0,step:0},{id:31,player:0,step:0},{id:32,player:0,step:0},{id:33,player:0,step:0},{id:34,player:0,step:0},{id:35,player:0,step:0},{id:36,player:0,step:0},{id:37,player:0,step:0},{id:38,player:0,step:0},{id:39,player:0,step:0},{id:40,player:0,step:0},{id:41,player:0,step:0}],lastStep:0},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;if("CHANGE_SQUARE"===t.type){var a=e.value.map((function(a,n){return t.id===n&&0===a.player&&(a.step=e.lastStep+1,!1===t.turn?a.player="black":a.player="white"),a}));return Object(f.a)(Object(f.a)({},e),{},{value:a,lastStep:e.lastStep+1})}if("UNDO_MOVE"===t.type){var n=e.lastStep,s=e.value.map((function(t){return 0!==e.lastStep&&n===t.step&&(t.step=0,t.player=0,e.lastStep=n-1),t}));return Object(f.a)(Object(f.a)({},e),{},{value:s})}if("NEW_GAME"===t.type){var l=e.value.map((function(e,t){return e.step=0,e.player=0,e}));return Object(f.a)(Object(f.a)({},e),{},{value:l,lastStep:0})}return e},N=Object(m.b)({counter:x}),S=Object(m.c)(N,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());c.a.render(Object(n.jsx)(d.a,{store:S,children:Object(n.jsx)(l.a.StrictMode,{children:Object(n.jsx)(O,{})})}),document.getElementById("root")),h()}},[[55,1,2]]]);
//# sourceMappingURL=main.4179ed05.chunk.js.map