import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{n as t}from"./iframe-DrEM_uKj.js";import{$t as n,D as r,E as i,Ft as a,Ht as o,It as s,Mt as c,O as l,T as u,Ut as d,Wt as ee,X as te,Y as f,Z as ne,Zt as re,_ as ie,_t as p,bt as m,d as h,en as g,f as ae,g as _,gn as v,gt as y,h as b,ht as x,k as oe,lt as se,mn as ce,nt as le,p as ue,rt as de,tt as S,w as C,xn as w,y as T}from"./decorators-D9h4pU0o.js";import{a as E,i as D,n as O,o as k,r as A,s as j}from"./MediaPlayer-DKj5glfX.js";import{t as M}from"./useMediaPlayerStyles-0ZGmaXG1.js";import{n as N}from"./BottomControls-FxkCKDLt.js";import{i as P,n as F,r as I}from"./CenteredPlayButton-vMLkR0KC.js";var L,R;function z(){return(z=e((()=>{c(),f(),te(),P(),L=w(),R=({classNames:e,iconButtonProps:t})=>{let n=se(),{onPlay:r,isFinished:i}=ne();return!i||n?null:(0,L.jsx)(I,{Icon:m,onClick:r,classNames:e,iconButtonProps:t})},R.__docgenInfo={description:`@category React Component
@category UI Controls`,methods:[],displayName:`CenteredReplayButton`,props:{classNames:{required:!1,tsType:{name:`string`},description:``},iconButtonProps:{required:!1,tsType:{name:`IconButtonProps`},description:``}}}})))()}function B(){return(B=e((()=>{ce(),w(),v()(e=>({playerFrame:{position:`absolute`,top:0,right:0,bottom:0,left:0,borderWidth:1,borderStyle:`solid`,borderColor:e.palette.divider,boxSizing:`border-box`,pointerEvents:`none`,zIndex:2}}))})))()}function V(){return(V=e((()=>{B()})))()}function H(){return(H=e((()=>{_(),ie()})))()}var U,W,G;function K(){return(K=e((()=>{le(),ee(),r(),C(),U=w(),W={intensifyAll:!0},G=()=>{let{duration:e,getHighlightColorBlended:t,highlights:n}=de(),{sliderRail:r}=u().classes;return(0,U.jsx)(`div`,{className:r,children:n?.map(({id:n,colors:r,start:a,end:o})=>{let s=t?.(r,W);return(0,U.jsx)(i,{startPoint:d(a,e),width:d(o-a,e),color:t?.(r),startColorSegment:s,endColorSegment:s},n)})})},G.__docgenInfo={description:``,methods:[],displayName:`EventRail`}})))()}var q,J,Y;function X(){return(X=e((()=>{q=t(),p(),f(),s(),re(),K(),oe(),J=w(),Y=({mediaListener:e,highlights:t=[],getHighlightColorBlended:n=g,setCurrentTime:r,...i})=>{let[a,s]=(0,q.useState)(0),[c,u]=(0,q.useState)(0);return S(`durationchange`,e=>u(e.duration),e),S(`timeupdate`,({duration:e,seconds:t})=>s(e&&t?o(t/e*100):0),e),(0,J.jsx)(y,{highlights:t,duration:c,getHighlightColorBlended:n,children:(0,J.jsx)(l,{min:0,max:100,onChange:(e,t,n)=>{if(e.preventDefault(),Array.isArray(t))return;let i=t/100*c;r?.(i)},value:a,slots:{rail:G},...i})})},Y.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:`EventBasedProgressBar`,props:{mediaListener:{required:!1,tsType:{name:`EmitterListeners`},description:``},setCurrentTime:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(relativeSeconds: number) => void`,signature:{arguments:[{type:{name:`number`},name:`relativeSeconds`}],return:{name:`void`}}},description:``},highlights:{required:!1,tsType:{name:`Array`,elements:[{name:`Highlight`}],raw:`Highlight[]`},description:``,defaultValue:{value:`[]`,computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
	colors: string[],
	params?: BlendConfig,
) => string | undefined`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},name:`colors`},{type:{name:`BlendConfig`},name:`params`}],return:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}]}}},description:``,defaultValue:{value:`(
	colors,
	{ intensifyIndex, intensifyAll, discountFactor = 1 } = {},
) => {
	if (colors.length === 0) {
		return undefined;
	}

	const [initial, ...rest] = colors.map(hexToRGB).map((rgb, index) => {
		// Make the intensified color more prevalent that the other colors.
		const alpha =
			intensifyAll || intensifyIndex === index
				? INTENSIFIED_ALPHA
				: BLEND_ALPHA;
		return rgbToRgba(rgb, alpha * discountFactor);
	});

	const mixed = rest.reduce((background, foreground) => {
		return multiply(background, foreground);
	}, initial);

	return rgbaToHexA(mixed);
}`,computed:!1}}},composes:[`SliderProps`]}})))()}function Z(){return(Z=e((()=>{O(),M()})))()}function Q(){return(Q=e((()=>{E(),P(),j(),N(),F(),z(),k(),h(),n(),ue(),V(),H(),D(),A(),T(),X(),ae(),Z(),b()})))()}function $(){return($=e((()=>{Q(),x(),f(),a(),s()})))()}export{X as i,Q as n,Y as r,$ as t};