(window["webpackJsonppathfinding-demos"]=window["webpackJsonppathfinding-demos"]||[]).push([[0],{13:function(t,e,n){t.exports=n(23)},18:function(t,e,n){},20:function(t,e,n){},21:function(t,e,n){},22:function(t,e,n){},23:function(t,e,n){"use strict";n.r(e);var a,r,i=n(0),s=n.n(i),o=n(11),u=n.n(o),c=(n(18),n(9)),h=n(8),l=n.n(h),d=n(12),p=n(6),m=n(1),g=n(2),f=n(4),v=n(3),E=n(5);n(20);!function(t){t[t.OPEN=1]="OPEN",t[t.WALL=2]="WALL",t[t.START=3]="START",t[t.END=4]="END",t[t.PATH=5]="PATH",t[t.EXPLORED=6]="EXPLORED",t[t.EXPLORING=7]="EXPLORING"}(a||(a={})),function(t){t[t.DIJKSTRA=1]="DIJKSTRA",t[t.ASTAR=2]="ASTAR",t[t.ASTAR_GREEDY=3]="ASTAR_GREEDY"}(r||(r={}));var S=function(t){var e=t.row,n=t.column,r=t.weight,i=t.index,o=t.status,u=t.displayWeight,c=t.onChange,h=t.onMouseEnterGridItem,l=t.onMouseDownGridItem,d=t.onMouseUpGridItem,p=t.onTouchMove,m=t.onTouchEnd;return s.a.createElement("div",{className:function(t,e){var n="grid__item";switch(t){case a.START:return n+" grid__item--start";case a.END:return n+" grid__item--end";case a.EXPLORED:return n+" grid__item--explored";case a.EXPLORING:return n+" grid__item--exploring";case a.PATH:return n+" grid__item--path";case a.WALL:return n+" grid__item--wall";default:return n}}(o),onMouseEnter:h(i),onMouseDown:l(i),onMouseUp:d(i),onTouchMove:p,onTouchEnd:m,"data-index":i},s.a.createElement("p",{className:"item__index"},"i:",i),u&&s.a.createElement("div",{className:"item__data"},s.a.createElement("label",{htmlFor:"weight-input"},"W:"),s.a.createElement("input",{id:"weight-input",className:"item__input",type:"number",value:r,onChange:c(i),min:0})),s.a.createElement("p",{className:"item__coords"},"(",n+","+e,")"))},w=(n(21),n(7)),A=function(){function t(e){Object(m.a)(this,t),this.nodes=void 0,this.start=void 0,this.end=void 0,this.rows=void 0,this.columns=void 0,this.path=void 0,this.pathNodeArray=void 0,this.pathStepArray=void 0,this.pathStepCurrent=void 0,this.nodes=e.nodes,this.rows=e.rows,this.columns=e.columns,this.start=e.start,this.end=e.end,this.path=[],this.pathNodeArray=[],this.pathStepArray=[[]],this.pathStepCurrent=0}return Object(g.a)(t,[{key:"createNodeArray",value:function(t){return t.map((function(t,e){return{i:e,distance:0,weight:t,prevNode:void 0}}))}},{key:"getNodeNeighbours",value:function(t){var e=this.rows,n=this.columns,a=[],r=Math.floor(t/n),i=t-r*n;return i-1>=0&&a.push(t-1),i+1<n&&a.push(t+1),r-1>=0&&a.push(t-n),r+1<e&&a.push(t+n),a}},{key:"buildPathArray",value:function(t){for(var e=[],n=t[this.end];void 0!==n.prevNode;)e.push(n.i),n=t[n.prevNode];return e.push(n.i),e.reverse(),this.path=e,this.pathStepCurrent=0,e}},{key:"getNextPathStep",value:function(){return this.pathStepArray[this.pathStepCurrent+1]?(this.pathStepCurrent+=1,this.pathStepArray[this.pathStepCurrent]):this.pathStepArray[this.pathStepCurrent]}}]),t}(),y=function(t){function e(){var t,n;Object(m.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(f.a)(this,(t=Object(v.a)(e)).call.apply(t,[this].concat(r)))).calcPath=function(){var t=Object(w.a)(n),e=t.start,a=t.end,r=t.nodes,i=n.createNodeArray(r),s=[];i.forEach((function(t,n){t.distance=e===n?0:1/0,s.push(n)}));for(var o=i[e],u=function(){var t=n.getNodeNeighbours(o.i),e=o.distance,r=o.i;if(t.forEach((function(t){if(s.includes(t)&&0!==i[t].weight){var n=i[t].weight+e;i[t].distance>n&&(i[t].distance=n,i[t].prevNode=r)}})),s.splice(s.indexOf(o.i),1),!s.includes(a))return n.pathNodeArray=i,{v:n.buildPathArray(i)};var u=a;return s.forEach((function(t){i[t].distance<i[u].distance&&(u=t)})),o=i[u],n.buildCurrentStep(i,s,o),o.distance===1/0?{v:[]}:void 0};s.length>0;){var c=u();if("object"===typeof c)return c.v}return[]},n}return Object(E.a)(e,t),Object(g.a)(e,[{key:"buildCurrentStep",value:function(t,e,n){var r=t.map((function(t,n){return 0===t.weight?a.WALL:void 0!==t.prevNode&&e.includes(n)?a.EXPLORING:void 0!==t.prevNode?a.EXPLORED:a.OPEN}));this.pathStepArray.push(r)}}]),e}(A),N=function t(){var e=this;Object(m.a)(this,t),this.heap=void 0,this.getParent=function(t){return Math.floor((t-1)/2)},this.getLeft=function(t){return 2*t+1},this.getRight=function(t){return 2*t+2},this.swap=function(t,n){var a=e.heap[t];e.heap[t]=e.heap[n],e.heap[n]=a},this.isKeyALessThanB=function(t,n){return e.heap[t].key<e.heap[n].key},this.siftDown=function(t){var n=e.heap,a=e.getLeft,r=e.getRight,i=e.isKeyALessThanB,s=e.siftDown,o=e.swap;if(t>=0){var u=a(t),c=r(t);if(n[u]&&n[c]){if(i(u,t)||i(c,t)){var h=i(u,c)?u:c;o(h,t),s(h)}}else n[u]&&i(u,t)?(o(u,t),s(u)):n[c]&&i(c,t)&&(o(c,t),s(c))}},this.insert=function(t,n){var a={key:t,value:n};e.heap.push(a);!function t(n){var a=e.getParent(n);a>=0&&e.heap[a].key>e.heap[n].key&&(e.swap(n,a),t(a))}(e.heap.length-1)},this.extractMin=function(){var t=e.heap,n=e.siftDown,a={key:t[0].key,value:t[0].value};return t[0]=t[t.length-1],t.pop(),n(0),a},this.isEmpty=function(){return!(e.heap.length>0)},this.containsValue=function(t){return e.heap.some((function(e){return e.value===t}))},this.heap=[]},b=function(t){function e(t){var n;Object(m.a)(this,e),(n=Object(f.a)(this,Object(v.a)(e).call(this,t))).endX=void 0,n.endY=void 0,n.getEndXY=function(){var t=Math.floor(n.end/n.columns);return{endX:n.end-t*n.columns,endY:t}},n.getHeuristic=function(t){var e=Math.floor(t/n.columns),a=t-e*n.columns;return Math.abs(n.endY-e)+Math.abs(n.endX-a)};var a=n.getEndXY(),r=a.endX,i=a.endY;return n.endX=r,n.endY=i,n}return Object(E.a)(e,t),Object(g.a)(e,[{key:"calcPath",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this.start,a=this.end,r=this.nodes,i=this.createNodeArray(r),s=new Set,o=new Array(i.length).fill(1/0);o[n]=0;var u=Object(p.a)(o);u[n]=this.getHeuristic(n);var c=new N;c.insert(this.getHeuristic(n),n);for(var h=function(){var n=c.extractMin().value,r=i[n];if(r.i===a)return t.pathNodeArray=i,{v:t.buildPathArray(i)};s.add(n),t.getNodeNeighbours(r.i).forEach((function(a){if(!s.has(a)&&0!==i[a].weight){var r=o[n]+i[a].weight;r<o[a]&&(i[a].prevNode=n,o[a]=r,u[a]=e?t.getHeuristic(a):r+t.getHeuristic(a),c.insert(u[a],a),t.buildCurrentStep(s,i))}}))};!c.isEmpty();){var l=h();if("object"===typeof l)return l.v}return[]}},{key:"buildCurrentStep",value:function(t,e){var n=e.map((function(e,n){return 0===e.weight?a.WALL:void 0!==e.prevNode&&t.has(n)?a.EXPLORED:void 0!==e.prevNode?a.EXPLORING:a.OPEN}));this.pathStepArray.push(n)}}]),e}(A),_=function(){function t(e,n,a,r,i){var s=this;Object(m.a)(this,t),this.nodes=void 0,this.start=void 0,this.end=void 0,this.rows=void 0,this.columns=void 0,this.path=void 0,this.pathAlgorithm=void 0,this.getDataObject=function(){return{nodes:s.nodes,rows:s.rows,columns:s.columns,start:s.start,end:s.end,path:[]}},this.nodes=e,this.rows=n,this.columns=a,this.start=r,this.end=i,this.path=[],this.pathAlgorithm=new A(this.getDataObject())}return Object(g.a)(t,[{key:"calcPath",value:function(t){var e,n=this.getDataObject();switch(t){case r.ASTAR_GREEDY:e=new b(n),this.path=e.calcPath(!0);break;case r.ASTAR:e=new b(n),this.path=e.calcPath();break;default:e=new y(n),this.path=e.calcPath()}return this.pathAlgorithm=e,this.path}},{key:"getPathNodes",value:function(){return this.pathAlgorithm.pathNodeArray}},{key:"getPathSteps",value:function(){return this.pathAlgorithm.pathStepArray}},{key:"getPathStepsLength",value:function(){return this.pathAlgorithm.pathStepArray.length}},{key:"getNextPathStep",value:function(){return this.pathAlgorithm.getNextPathStep()}}]),t}(),O=function(t){function e(t){var n;return Object(m.a)(this,e),(n=Object(f.a)(this,Object(v.a)(e).call(this,t))).resetPathState=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=new Array(n.props.rows*n.props.columns).fill(1);e[0]=-1,e[e.length-1]=-2,n.setState({nodes:t?e:n.state.nodes,path:[],pathNodes:[],pathStep:[]})},n.generateGridItems=function(t,e){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n.state.nodes,i=[],o=0;o<t;o++)for(var u=0;u<e;u++){var c=o*e+u,h=n.state.pathStep[c];n.state.path.includes(c)&&(h=a.PATH),0===r[c]&&(h=a.WALL),-1===r[c]&&(h=a.START),-2===r[c]&&(h=a.END),i.push(s.a.createElement("div",{className:"item__container--square",key:"ics"+u+"_"+o},s.a.createElement(S,{status:h,key:"gi_"+u+"_"+o,row:o,column:u,weight:r[o*e+u]?r[o*e+u]:0,index:o*e+u,displayWeight:!(e>7&&t>7),onChange:n.onChangeNodeWeight,onMouseEnterGridItem:n.onMouseEnterGridItem,onMouseDownGridItem:n.onMouseDownGridItem,onMouseUpGridItem:n.onMouseUpGridItem,onTouchMove:n.onTouchMoveGridItem,onTouchEnd:n.onTouchEndGridItem})))}return i},n.onChangeNodeWeight=function(t){return function(e){var a=Object(p.a)(n.state.nodes);a[t]=parseInt(e.target.value),n.setState({nodes:a})}},n.setWaitTime=function(t){n.setState((function(e){return{waitTime:t}}))},n.getGridStyles=function(t,e){var a=n.getGridTemplate(e);return Object.assign(a,n.calcGridHeightAndWidth(t,e)),a},n.calcGridHeightAndWidth=function(t,e){var n=100,a=100;return t>e?n=e/t*100:a=t/e*100,{width:n+"%",height:a+"%"}},n.getGridTemplate=function(t){for(var e="",n=0;n<t;n++)e+="1fr ";return{gridTemplateColumns:e}},n.onCalculatePath=function(){n.resetPathState();var t=new _(n.state.nodes,n.props.rows,n.props.columns,n.state.nodes.indexOf(-1),n.state.nodes.indexOf(-2)),e=t.calcPath(n.state.algorithm),a=t.getPathNodes();n.setState({path:e,pathNodes:a})},n.onCalculatePathSteps=function(){n.resetPathState();var t=new _(n.state.nodes,n.props.rows,n.props.columns,n.state.nodes.indexOf(-1),n.state.nodes.indexOf(-2));t.calcPath(n.state.algorithm),n.DisplayPathSteps(t)},n.wait=function(t){return new Promise((function(e){return setTimeout(e,t)}))},n.onChangeAlgorithm=function(t){n.setState({algorithm:parseInt(t.target.value)})},n.stopDragAt=function(t){if(n.state.dragStartIndex===t&&n.state.dragStartInitialWeight===n.state.nodes[t]){var e=Object(p.a)(n.state.nodes),a=e[t]-1;a<-2?(a=1,e[e.length-1]=-2):-2===a?(e[e.indexOf(-2)]=1,e[0]=-1):-1===a&&(e[e.indexOf(-1)]=1),e[t]=a,n.setState((function(n){return{isDragging:!1,dragEndIndex:t,nodes:e}}))}else n.setState((function(e){return{isDragging:!1,dragEndIndex:t}}))},n.stopDrag=function(){n.setState((function(t){return{isDragging:!1}}))},n.startDragAt=function(t){n.resetPathState(),n.setState((function(e){return{isDragging:!0,dragStartIndex:t,dragStartInitialWeight:n.state.nodes[t],isCreatingWalls:0!==n.state.nodes[t]}}))},n.continueDragAt=function(t){if(n.state.isDragging&&t!==n.state.dragStartIndex){var e=Object(p.a)(n.state.nodes);e[t]=n.state.isCreatingWalls?0:1,e[n.state.dragStartIndex]=e[t],n.setState((function(t){return{nodes:e}}))}},n.onMouseDownGridItem=function(t){return function(e){n.startDragAt(t),e.target===e.currentTarget&&e.preventDefault()}},n.onMouseUpGridItem=function(t){return function(e){n.stopDragAt(t)}},n.onMouseEnterGridItem=function(t){return function(e){n.continueDragAt(t)}},n.onMouseExitGrid=function(t){n.stopDrag()},n.onTouchMoveGridItem=function(t){var e=document.elementFromPoint(t.touches[0].clientX,t.touches[0].clientY);if(null!==e){var a=e.getAttribute("data-index");if(null!==a){var r=parseInt(a);!1===n.state.isDragging?n.startDragAt(r):n.continueDragAt(r)}}},n.onTouchEndGridItem=function(t){n.stopDrag()},n.state={nodes:new Array(t.rows*t.columns).fill(1),path:[],algorithm:r.DIJKSTRA,isDragging:!1,isCreatingWalls:!1,dragStartInitialWeight:0,dragStartIndex:0,dragEndIndex:0,pathNodes:[],pathStep:new Array(t.rows*t.columns).fill(a.OPEN),waitTime:5},n.state.pathStep[0]=a.START,n.state.pathStep[n.state.pathStep.length-1]=a.END,n.state.nodes[0]=-1,n.state.nodes[n.state.nodes.length-1]=-2,n}return Object(E.a)(e,t),Object(g.a)(e,[{key:"componentDidUpdate",value:function(t){this.props.columns===t.columns&&this.props.rows===t.rows||this.resetPathState(!0)}},{key:"DisplayPathSteps",value:function(){var t=Object(d.a)(l.a.mark((function t(e){var n,a,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.getPathStepsLength(),a=e.path,r=0;case 3:if(!(r<n)){t.next=10;break}return this.setState({pathStep:e.getNextPathStep()}),t.next=7,this.wait(this.state.waitTime);case 7:r++,t.next=3;break;case 10:this.setState({path:a});case 11:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this,e=this.props,n=e.rows,a=e.columns,i=this.state,o=i.nodes,u=i.waitTime;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"grid__container",style:this.getGridStyles(n,a),onMouseLeave:this.onMouseExitGrid},this.generateGridItems(n,a,o)),s.a.createElement("div",{className:"grid__flexContainer"},s.a.createElement("div",{className:"flex__innerContainer"},s.a.createElement("button",{id:"calc_path",className:"flex__button",onClick:this.onCalculatePath},"Calculate Path"),s.a.createElement("button",{id:"calc_path_steps",className:"flex__button",onClick:this.onCalculatePathSteps},"Show Path Steps")),s.a.createElement("div",{className:"flex__innerContainer"},s.a.createElement("div",{className:"input__container"},s.a.createElement("label",{htmlFor:"select_algorithm"},"Algorithm:"),s.a.createElement("select",{id:"select_algorithm",className:"input__item",onChange:this.onChangeAlgorithm},s.a.createElement("option",{value:r.DIJKSTRA},"Dijkstra"),s.a.createElement("option",{value:r.ASTAR},"A*"),s.a.createElement("option",{value:r.ASTAR_GREEDY},"A* Greedy"))),s.a.createElement("div",{className:"input__container"},s.a.createElement("label",{htmlFor:"waitTime"},"Step Delay Time:"),s.a.createElement("input",{id:"waitTime",className:"input__item",type:"number",min:3,value:u,onChange:function(e){return t.setWaitTime(parseInt(e.target.value))}})))))}}]),e}(s.a.Component),P=(n(22),function(){var t=Object(i.useState)(8),e=Object(c.a)(t,2),n=e[0],a=e[1],r=Object(i.useState)(8),o=Object(c.a)(r,2),u=o[0],h=o[1];return s.a.createElement("div",{className:"App"},s.a.createElement("div",{className:"app__container"},s.a.createElement("div",{className:"app__inputContainer"},s.a.createElement("div",{className:"input__container"},s.a.createElement("label",{htmlFor:"rows"},"Rows:"),s.a.createElement("input",{id:"rows",className:"input__item",type:"number",min:3,value:n,onChange:function(t){return a(parseInt(t.target.value))}})),s.a.createElement("div",{className:"input__container"},s.a.createElement("label",{htmlFor:"columns"},"Columns:"),s.a.createElement("input",{id:"rows",className:"input__item",type:"number",min:3,value:u,onChange:function(t){return h(parseInt(t.target.value))}}))),s.a.createElement(O,{rows:n,columns:u})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(s.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.bda94d32.chunk.js.map