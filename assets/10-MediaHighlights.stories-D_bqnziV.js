import{w as C,a as M,j as o}from"./with-player-theme-CBkyMqVj.js";import{R as x}from"./test-utils-BFSCaS9q.js";import{R as H,u as R,p as i,h as e}from"./highlights-B46Du2Hl.js";import{M as S}from"./MediaPlayer-Bp9n8-0r.js";import"./CenteredPlayButton-HqI7MB1v.js";import"./useMediaPlayerStyles-Dza5xS_E.js";import"./BottomControls-DBDcaUPL.js";import{u as f}from"./use-player-context-DIsK5id9.js";import"./Controls-BhNCAOdz.js";import"./EventBasedProgressBar-DZSAleNl.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const t=()=>{const{mediaContext:a,setMediaContext:g}=f(),[s,m]=x.useState([]),l=a==null?void 0:a.duration,r=Math.random()*(l||0),c=Math.random()*r,p=()=>{m(u=>[...u,{start:c,end:r,colors:[i(e),i(e),i(e)],id:R.uuid()}])};return o.jsxs(o.Fragment,{children:[o.jsx(S,{onStoreUpdate:g,highlights:s,url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"}),o.jsx(H,{addHighlightToStart:p,highlights:s})]})},b={title:"Media Player Controls",component:t,decorators:[C,M]};t.__docgenInfo={description:"",methods:[],displayName:"MediaHighlights"};var n,h,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
            <MediaPlayer onStoreUpdate={setMediaContext} highlights={highlights} url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" />
            <RandomHighlight addHighlightToStart={addHighlightToStart} highlights={highlights} />
        </>;
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};const A=["MediaHighlights"];export{t as MediaHighlights,A as __namedExportsOrder,b as default};
