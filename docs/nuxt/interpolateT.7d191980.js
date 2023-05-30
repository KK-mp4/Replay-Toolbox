import{u as C}from"./composables.fcbebf07.js";import{a as P,r as x,b as B,e as S,f as o,h as y,t as h,u as s,w as N,v as j,i as D,o as $}from"./entry.ee55f316.js";import{s as I,c as R,d as U}from"./download-copy.a1b2aa80.js";const F={class:"h-screen pt-20 flex flex-row p-10"},H={class:"w-[50vw] p-5 pt-0 min-w-[340px]"},J=o("div",{class:"box p-1 mb-3"},[o("p",{class:"text-sm font-bold"},"Time interpolation for your replay path."),o("p",{class:"text-sm"},"This is needed when you are doing time remapping on your clip in the editing software of your choice. When doing so, the time of the original clip stops being linear; this can look weird with stuff moving fast, then slow, and then again fast in your clip (like mobs walking around)."),o("p",{class:"text-sm"},'Using this tool will allow you to reverse interpolate the time of the replay file, this way, your final clip will have linear time in it. Create a path and save it under the name "interpolate" (by pressing the X button). Upload here your timelines.json.')],-1),O={class:"mt-2 text-sm font-semibold"},W=o("a",{class:"text-red-700"},"X",-1),X={class:"jitter_fix"},A=o("a",{class:"text-green-700"},"Y",-1),E={class:"text-sm font-semibold"},V=o("a",{class:"text-red-700"},"X",-1),Y={class:"jitter_fix"},q=o("a",{class:"text-green-700"},"Y",-1),L=o("label",{class:"mb-1 text-sm font-semibold"},"Number of keyframes to generate:",-1),z={class:"w-[50vw] p-5 box min-w-[340px]"},G=o("label",{for:"file",class:"text-sm font-semibold"},"Input for timelines.json:",-1),K=["innerHTML"],oe=P({__name:"interpolateT",setup(Q){C({title:"Replay Toolbox"});const m={x:0,y:300},p={x:300,y:0};let l=x({x:150,y:280}),i=x({x:150,y:20});const w=x("");let r="",v="";const g=x(10);B(async()=>{c()});function c(){const t=document.getElementById("board");t.width=300,t.height=300;const e=t.getContext("2d");e&&(e.fillStyle="rgb(27, 27, 27)",e.fillRect(0,0,t.width,t.height),e.strokeStyle="rgb(36, 36, 36)",e.lineWidth=3,e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(p.x,p.y),e.stroke(),e.strokeStyle="rgb(128, 128, 128)",e.lineWidth=2,e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(l.value.x,l.value.y),e.stroke(),e.beginPath(),e.moveTo(p.x,p.y),e.lineTo(i.value.x,i.value.y),e.stroke(),e.strokeStyle="rgb(209, 170, 88)",e.lineWidth=3,e.beginPath(),e.moveTo(m.x,m.y),e.bezierCurveTo(l.value.x,l.value.y,i.value.x,i.value.y,p.x,p.y),e.stroke(),e.fillStyle="rgb(142, 144, 98)",e.beginPath(),e.arc(l.value.x,l.value.y,5,0,2*Math.PI),e.fill(),e.fillStyle="rgb(175, 95, 97)",e.beginPath(),e.arc(i.value.x,i.value.y,5,0,2*Math.PI),e.fill())}function _(t){if(t.buttons!=1)return;const e=document.getElementById("board");if(!e)return;const n=e.getBoundingClientRect(),u=t.clientX-n.left,d=t.clientY-n.top,a=Math.sqrt(Math.pow(l.value.x-u,2)+Math.pow(l.value.y-d,2)),f=Math.sqrt(Math.pow(i.value.x-u,2)+Math.pow(i.value.y-d,2));a<30&&a<=f?(l.value.x=u,l.value.y=d):f<30&&f<=a&&(i.value.x=u,i.value.y=d),c()}function T(t){this.selectedFile=t.target.files[0];const e=new FileReader;e.readAsText(this.selectedFile,"UTF-8"),e.onload=()=>{r=JSON.parse(e.result),b()},e.onerror=n=>{console.log(n)}}function k(t,e,n,u,d){let a=t*t,f=a*t;return e+(-e*3+t*(3*e-e*t))*t+(3*n+t*(-6*n+n*3*t))*t+(u*3-u*3*t)*a+d*f}function b(){if(!r)return;const t={time:r.interpolate[0].keyframes[0].time,timestamp:r.interpolate[0].keyframes[0].properties.timestamp},e=r.interpolate[0].keyframes.length-1,n={time:r.interpolate[0].keyframes[e].time,timestamp:r.interpolate[0].keyframes[e].properties.timestamp};let u=[];for(let a=0;a<=1;a+=1/g.value){const f={x:k(a,m.x,l.value.x,i.value.x,p.x),y:k(a,m.y,l.value.y,i.value.y,p.y)};let M={time:Math.round(f.x/300*(n.time-t.time)+t.time),properties:{timestamp:Math.round((300-f.y)/300*(n.timestamp-t.timestamp)+t.timestamp)}};u.push(M)}r.interpolate[0].keyframes=u;let d=[];for(let a=0;a<u.length-1;a++)d.push(0);r.interpolate[0].segments=d,w.value=I(JSON.stringify(r.interpolate[0],null,"	")),v=JSON.stringify(r)}return(t,e)=>($(),S("div",F,[o("div",H,[J,o("canvas",{id:"board",width:"300",height:"300",onMousemove:e[0]||(e[0]=n=>_(n)),onMouseup:e[1]||(e[1]=n=>b())},null,32),o("p",O,[y("Point 1: "),W,y(" = "),o("a",X,h(Math.round(s(l).x/300*100)/100),1),y(", "),A,y(" = "+h(Math.round((300-s(l).y)/300*100)/100),1)]),o("p",E,[y("Point 2: "),V,y(" = "),o("a",Y,h(Math.round(s(i).x/300*100)/100),1),y(", "),q,y(" = "+h(Math.round((300-s(i).y)/300*100)/100),1)]),o("button",{class:"mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]",onClick:e[2]||(e[2]=n=>{s(l).x=s(i).y=50,s(l).y=s(i).x=250,c()})},"linear"),o("button",{class:"mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]",onClick:e[3]||(e[3]=n=>{s(l).x=s(i).x=150,s(l).y=300,s(i).y=0,c()})},"ease-in-out"),o("button",{class:"mt-3 mb-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]",onClick:e[4]||(e[4]=n=>{s(l).y=s(i).y=150,s(i).x=300,s(l).x=0,c()})},"reversed ease-in-out"),L,N(o("input",{"onUpdate:modelValue":e[5]||(e[5]=n=>D(g)?g.value=n:null),type:"number",min:"2",max:"128",id:"N",onChange:e[6]||(e[6]=n=>b()),class:"block h-7 w-full rounded-lg border sm:text-xs bg-[#1B1B1B] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"},null,544),[[j,s(g)]])]),o("div",z,[G,o("input",{id:"file",class:"mb-5 h-6 block w-full text-sm text-white rounded-lg cursor-pointer focus:outline-none bg-[#f44e38]",type:"file",accept:".json",onChange:e[7]||(e[7]=n=>T(n))},null,32),o("pre",{innerHTML:s(w),id:"json",class:"text-[#D4D4AA] block p-2.5 scrollbar w-full h-[81%] text-sm rounded-lg border bg-[#1B1B1B] border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 overflow-auto"},null,8,K),o("button",{class:"mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]",onClick:e[8]||(e[8]=n=>("copy"in t?t.copy:s(R))(s(v)))},"Copy to clipboard"),o("button",{class:"mt-3 bg-[#f44e38] text-gray-100 p-1 px-2 rounded-lg w-full hover:bg-gray-100 hover:text-[#f44e38] active:scale-[0.99]",onClick:e[9]||(e[9]=n=>("download"in t?t.download:s(U))(s(v)))},"Download timelines.json")])]))}});export{oe as default};
