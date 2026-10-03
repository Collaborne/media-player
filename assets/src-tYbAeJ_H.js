import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{n as t}from"./iframe-DOxJSKYB.js";import{$ as n,$t as r,A as i,Cn as a,D as o,E as s,Gt as c,Kt as l,Lt as ee,O as u,Pt as te,Q as ne,Rt as d,St as re,Wt as ie,Z as f,_ as p,_t as ae,at as m,d as h,dt as g,f as _,gn as v,h as y,it as b,j as oe,k as se,nn as ce,rt as x,tn as le,v as ue,vn as S,vt as C,x as w,y as T,yt as E}from"./decorators-DCwb17eW.js";import{a as D,i as O,n as k,o as A,r as j,s as M}from"./MediaPlayer-CGM-Z7nW.js";import{t as N}from"./useMediaPlayerStyles-CdnDe46J.js";import{n as P}from"./BottomControls-CfT5UFbs.js";import{i as F,n as I,r as de}from"./CenteredPlayButton-DEIn58xI.js";var L,R;function z(){return(z=e((()=>{te(),f(),ne(),F(),L=a(),R=({classNames:e,iconButtonProps:t})=>{let r=g(),{onPlay:i,isFinished:a}=n();return!a||r?null:(0,L.jsx)(de,{Icon:re,onClick:i,classNames:e,iconButtonProps:t})},R.__docgenInfo={description:`@category React Component
@category UI Controls`,methods:[],displayName:`CenteredReplayButton`,props:{classNames:{required:!1,tsType:{name:`string`},description:``},iconButtonProps:{required:!1,tsType:{name:`IconButtonProps`},description:``}}}})))()}function B(){return(B=e((()=>{v(),a(),S()(e=>({playerFrame:{position:`absolute`,top:0,right:0,bottom:0,left:0,borderWidth:1,borderStyle:`solid`,borderColor:e.palette.divider,boxSizing:`border-box`,pointerEvents:`none`,zIndex:2}}))})))()}function V(){return(V=e((()=>{B()})))()}function H(){return(H=e((()=>{ue(),T()})))()}var U,W,G;function K(){return(K=e((()=>{b(),l(),se(),s(),U=a(),W={intensifyAll:!0},G=()=>{let{duration:e,getHighlightColorBlended:t,highlights:n}=m(),{sliderRail:r}=o().classes;return(0,U.jsx)(`div`,{className:r,children:n?.map(({id:n,colors:r,start:i,end:a})=>{let o=t?.(r,W);return(0,U.jsx)(u,{startPoint:c(i,e),width:c(a-i,e),color:t?.(r),startColorSegment:o,endColorSegment:o},n)})})},G.__docgenInfo={description:``,methods:[],displayName:`EventRail`}})))()}var q,J,Y;function X(){return(X=e((()=>{q=t(),E(),f(),d(),r(),K(),oe(),J=a(),Y=({mediaListener:e,highlights:t=[],getHighlightColorBlended:n=ce,setCurrentTime:r,...a})=>{let[o,s]=(0,q.useState)(0),[c,l]=(0,q.useState)(0);return x(`durationchange`,e=>l(e.duration),e),x(`timeupdate`,({duration:e,seconds:t})=>s(e&&t?ie(t/e*100):0),e),(0,J.jsx)(C,{highlights:t,duration:c,getHighlightColorBlended:n,children:(0,J.jsx)(i,{min:0,max:100,onChange:(e,t,n)=>{if(e.preventDefault(),Array.isArray(t))return;let i=t/100*c;r?.(i)},value:o,slots:{rail:G},...a})})},Y.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:`EventBasedProgressBar`,props:{mediaListener:{required:!1,tsType:{name:`EmitterListeners`},description:``},setCurrentTime:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(relativeSeconds: number) => void`,signature:{arguments:[{type:{name:`number`},name:`relativeSeconds`}],return:{name:`void`}}},description:``},highlights:{required:!1,tsType:{name:`Array`,elements:[{name:`Highlight`}],raw:`Highlight[]`},description:``,defaultValue:{value:`[]`,computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(
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
}`,computed:!1}}},composes:[`SliderProps`]}})))()}function Z(){return(Z=e((()=>{k(),N()})))()}function Q(){return(Q=e((()=>{D(),F(),M(),P(),I(),z(),A(),h(),le(),y(),V(),H(),O(),j(),w(),X(),_(),Z(),p()})))()}function $(){return($=e((()=>{Q(),ae(),f(),ee(),d()})))()}export{X as i,Q as n,Y as r,$ as t};