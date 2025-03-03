import{w as y,a as x,j as r}from"./with-player-theme-CBkyMqVj.js";import{R as v}from"./test-utils-BFSCaS9q.js";import{R as B,u as P,p as o,h as a}from"./highlights-B46Du2Hl.js";import{M as R}from"./MediaPlayer-Bp9n8-0r.js";import"./CenteredPlayButton-HqI7MB1v.js";import"./useMediaPlayerStyles-Dza5xS_E.js";import"./BottomControls-DBDcaUPL.js";import{u as f}from"./use-player-context-DIsK5id9.js";import"./Controls-BhNCAOdz.js";import{E}from"./EventBasedProgressBar-DZSAleNl.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const e=g=>{const{mediaContext:t,setMediaContext:m}=f(),[s,l]=v.useState([]),p=t==null?void 0:t.duration,i=Math.random()*(p||0),u=Math.random()*i,c=()=>{l(C=>[...C,{start:u,end:i,colors:[o(a),o(a),o(a)],id:P.uuid()}])};return r.jsxs(r.Fragment,{children:[r.jsx(R,{url:g.url,onStoreUpdate:m,highlights:s}),r.jsx(E,{mediaListener:t==null?void 0:t.getListener(),setCurrentTime:t==null?void 0:t.setCurrentTime,highlights:s}),r.jsx(B,{addHighlightToStart:c,highlights:s})]})},D={title:"Media Player Controls",component:e,decorators:[y,x],args:{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},argTypes:{url:{name:"url",description:"A media URL. Only file type supported",table:{type:{summary:"string"},defaultValue:{summary:void 0}}}}};e.__docgenInfo={description:"",methods:[],displayName:"EventBasedProgressBar",props:{url:{required:!0,tsType:{name:"string"},description:""}}};var n,d,h;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
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
      id: uuid()
    }]);
  };
  return <>
            <MediaPlayer url={args.url} onStoreUpdate={setMediaContext} highlights={highlights} />
            <EventBasedProgressBarComponent mediaListener={mediaContext?.getListener()} setCurrentTime={mediaContext?.setCurrentTime} highlights={highlights} />
            <RandomHighlight addHighlightToStart={addHighlightToStart} highlights={highlights} />
        </>;
}`,...(h=(d=e.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const O=["EventBasedProgressBar"];export{e as EventBasedProgressBar,O as __namedExportsOrder,D as default};
