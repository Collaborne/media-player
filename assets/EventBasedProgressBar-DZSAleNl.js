import{O as E,m as h,Q as b,j as u,S as R,U as g,W as f,X as S,Y as A,Z as I,_ as c,$ as P}from"./with-player-theme-CBkyMqVj.js";import{r as p}from"./test-utils-BFSCaS9q.js";const _=()=>{const e=p.useContext(E);if(!e)throw new Error("useEventRailsContext must be used in a EventRailsProvider ");return e};h()(e=>({playerFrame:{position:"absolute",top:0,right:0,bottom:0,left:0,borderWidth:1,borderStyle:"solid",borderColor:e.palette.divider,boxSizing:"border-box",pointerEvents:"none",zIndex:2}}));const C={intensifyAll:!0},y=()=>{const{duration:e,getHighlightColorBlended:n,highlights:r}=_(),{sliderRail:s}=b().classes;return u.jsx("div",{className:s,children:r==null?void 0:r.map(({id:m,colors:i,start:a,end:d})=>{const l=n==null?void 0:n(i,C);return u.jsx(R,{startPoint:g(a,e),width:g(d-a,e),color:n==null?void 0:n(i),startColorSegment:l,endColorSegment:l},m)})})};y.__docgenInfo={description:"",methods:[],displayName:"EventRail"};const T=({mediaListener:e,highlights:n=[],getHighlightColorBlended:r=A,setCurrentTime:s,...m})=>{const[i,a]=p.useState(0),[d,l]=p.useState(0),v=(t,o,B)=>{if(t.preventDefault(),Array.isArray(o))return;const x=o/c*d;s==null||s(x)};return f("durationchange",t=>l(t.duration),e),f("timeupdate",({duration:t,seconds:o})=>a(t&&o?P(o/t*c):0),e),u.jsx(S,{highlights:n,duration:d,getHighlightColorBlended:r,children:u.jsx(I,{min:0,max:c,onChange:v,value:i,components:{Rail:y},...m})})};T.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:"EventBasedProgressBar",props:{mediaListener:{required:!1,tsType:{name:"EmitterListeners"},description:""},setCurrentTime:{required:!1,tsType:{name:"signature",type:"function",raw:"(relativeSeconds: number) => void",signature:{arguments:[{type:{name:"number"},name:"relativeSeconds"}],return:{name:"void"}}},description:""},highlights:{required:!1,tsType:{name:"Array",elements:[{name:"Highlight"}],raw:"Highlight[]"},description:"",defaultValue:{value:"[]",computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:"signature",type:"function",raw:`(
	colors: string[],
	params?: BlendConfig,
) => string | undefined`,signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"colors"},{type:{name:"BlendConfig"},name:"params"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"",defaultValue:{value:`(
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
}`,computed:!1}}},composes:["SliderProps"]};export{T as E};
