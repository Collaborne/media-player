import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{n as t}from"./iframe-CtdM6FDj.js";import{Bt as n,D as r,E as i,Ft as a,Ht as o,It as s,Mt as c,O as ee,Qt as l,T as u,Vt as d,X as te,Y as f,Yt as ne,Z as re,Zt as ie,_ as ae,_t as p,bt as m,d as h,f as g,fn as oe,g as _,gt as v,h as y,ht as b,k as x,lt as se,mn as ce,nt as le,p as ue,rt as de,tt as S,w as C,y as w,yn as T}from"./decorators-DTn6RTgf.js";import{a as E,i as D,n as O,o as k,r as A,s as j}from"./MediaPlayer-Dx_8Hwkp.js";import{t as M}from"./useMediaPlayerStyles-C1J6k48l.js";import{n as N}from"./BottomControls-BmLGtIdQ.js";import{i as P,n as F,r as I}from"./CenteredPlayButton-CXatDVUa.js";var L,R;function z(){return(z=e((()=>{c(),f(),te(),P(),L=T(),R=({classNames:e,iconButtonProps:t})=>{let n=se(),{onPlay:r,isFinished:i}=re();return!i||n?null:(0,L.jsx)(I,{Icon:m,onClick:r,classNames:e,iconButtonProps:t})},R.__docgenInfo={description:`@category React Component
@category UI Controls`,methods:[],displayName:`CenteredReplayButton`,props:{classNames:{required:!1,tsType:{name:`string`},description:``},iconButtonProps:{required:!1,tsType:{name:`IconButtonProps`},description:``}}}})))()}function B(){return(B=e((()=>{oe(),T(),ce()(e=>({playerFrame:{position:`absolute`,top:0,right:0,bottom:0,left:0,borderWidth:1,borderStyle:`solid`,borderColor:e.palette.divider,boxSizing:`border-box`,pointerEvents:`none`,zIndex:2}}))})))()}function V(){return(V=e((()=>{B()})))()}function H(){return(H=e((()=>{_(),ae()})))()}var U,W,G;function K(){return(K=e((()=>{le(),o(),r(),C(),U=T(),W={intensifyAll:!0},G=()=>{let{duration:e,getHighlightColorBlended:t,highlights:n}=de(),{sliderRail:r}=u().classes;return(0,U.jsx)(`div`,{className:r,children:n?.map(({id:n,colors:r,start:a,end:o})=>{let s=t?.(r,W);return(0,U.jsx)(i,{startPoint:d(a,e),width:d(o-a,e),color:t?.(r),startColorSegment:s,endColorSegment:s},n)})})},G.__docgenInfo={description:``,methods:[],displayName:`EventRail`}})))()}var q,J,Y;function X(){return(X=e((()=>{q=t(),p(),f(),ne(),s(),K(),x(),J=T(),Y=({mediaListener:e,highlights:t=[],getHighlightColorBlended:r=l,setCurrentTime:i,...a})=>{let[o,s]=(0,q.useState)(0),[c,u]=(0,q.useState)(0);return S(`durationchange`,e=>u(e.duration),e),S(`timeupdate`,({duration:e,seconds:t})=>s(e&&t?n(t/e*100):0),e),(0,J.jsx)(v,{highlights:t,duration:c,getHighlightColorBlended:r,children:(0,J.jsx)(ee,{min:0,max:100,onChange:(e,t,n)=>{if(e.preventDefault(),Array.isArray(t))return;let r=t/100*c;i?.(r)},value:o,slots:{rail:G},...a})})},Y.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:`EventBasedProgressBar`,props:{mediaListener:{required:!1,tsType:{name:`EmitterListeners`},description:``},setCurrentTime:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(relativeSeconds: number) => void`,signature:{arguments:[{type:{name:`number`},name:`relativeSeconds`}],return:{name:`void`}}},description:``},highlights:{required:!1,tsType:{name:`Array`,elements:[{name:`Highlight`}],raw:`Highlight[]`},description:``,defaultValue:{value:`[]`,computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
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
}`,computed:!1}}},composes:[`SliderProps`]}})))()}function Z(){return(Z=e((()=>{O(),M()})))()}function Q(){return(Q=e((()=>{E(),P(),j(),N(),F(),z(),k(),h(),ie(),ue(),V(),H(),D(),A(),w(),X(),g(),Z(),y()})))()}function $(){return($=e((()=>{Q(),b(),f(),a(),s()})))()}export{X as i,Q as n,Y as r,$ as t};