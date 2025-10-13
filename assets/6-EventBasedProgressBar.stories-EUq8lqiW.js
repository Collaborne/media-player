import{w as y,a as R,j as r}from"./with-player-theme-ulL8b6Vb.js";import{R as x}from"./test-utils-CM-kBDfr.js";import{M as B}from"./MediaPlayer-C9osFftJ.js";import"./CenteredPlayButton-CVuQl_BT.js";import"./useMediaPlayerStyles-gXGsFrVH.js";import"./BottomControls-Ca7DUT9Y.js";import{u as P}from"./use-player-context-V0Yx91bV.js";import"./Controls-CRSmehvV.js";import{E as f}from"./EventBasedProgressBar-CoNxsDdy.js";import{R as v,c as M,p as o,h as a}from"./highlights-C9kGwQ24.js";import"./client-DFmknlot.js";import"./iframe-CjMey2r5.js";import"./Grid-D8PGgL2T.js";const e=m=>{const{mediaContext:t,setMediaContext:g}=P(),[s,l]=x.useState([]),p=t==null?void 0:t.duration,i=Math.random()*(p||0),c=Math.random()*i,u=()=>{l(C=>[...C,{start:c,end:i,colors:[o(a),o(a),o(a)],id:M()}])};return r.jsxs(r.Fragment,{children:[r.jsx(B,{url:m.url,onStoreUpdate:g,highlights:s}),r.jsx(f,{mediaListener:t==null?void 0:t.getListener(),setCurrentTime:t==null?void 0:t.setCurrentTime,highlights:s}),r.jsx(v,{addHighlightToStart:u,highlights:s})]})},O={title:"Media Player Controls",component:e,decorators:[y,R],args:{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},argTypes:{url:{name:"url",description:"A media URL. Only file type supported",table:{type:{summary:"string"},defaultValue:{summary:void 0}}}}};e.__docgenInfo={description:"",methods:[],displayName:"EventBasedProgressBar",props:{url:{required:!0,tsType:{name:"string"},description:""}}};var n,d,h;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  const {
    mediaContext,
    setMediaContext
  } = usePlayerContext();
  const [highlights, setHighlights] = React.useState<Highlight[]>([]);
  const duration = mediaContext?.duration;
  const end = Math.random() * (duration || 0);
  const start = Math.random() * end;
  const addHighlightToStart = () => {
    setHighlights(prev => [...prev, {
      start,
      end,
      colors: [pickRandomItem(highlightColors), pickRandomItem(highlightColors), pickRandomItem(highlightColors)],
      id: createRandomId()
    }]);
  };
  return <>
            <MediaPlayer url={args.url} onStoreUpdate={setMediaContext} highlights={highlights} />
            <EventBasedProgressBarComponent mediaListener={mediaContext?.getListener()} setCurrentTime={mediaContext?.setCurrentTime} highlights={highlights} />
            <RandomHighlight addHighlightToStart={addHighlightToStart} highlights={highlights} />
        </>;
}`,...(h=(d=e.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const q=["EventBasedProgressBar"];export{e as EventBasedProgressBar,q as __namedExportsOrder,O as default};
