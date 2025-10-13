import{w as C,a as M,j as o}from"./with-player-theme-Dgf0jpvR.js";import{R as H}from"./test-utils-CM-kBDfr.js";import{M as x}from"./MediaPlayer-udg3aERC.js";import"./CenteredPlayButton-BYPqNZm4.js";import"./useMediaPlayerStyles-D-ZQaBrZ.js";import"./BottomControls-DkDzcT1U.js";import{u as R}from"./use-player-context-V0Yx91bV.js";import"./Controls-0vdC9ICM.js";import"./EventBasedProgressBar-x6HAD4qw.js";import{R as S,c as f,p as e,h as i}from"./highlights-5CIZdbVI.js";import"./client-DFmknlot.js";import"./iframe-CU0dkipb.js";import"./Grid-ka_igTX8.js";const t=()=>{const{mediaContext:a,setMediaContext:g}=R(),[r,m]=H.useState([]),l=a==null?void 0:a.duration,s=Math.random()*(l||0),c=Math.random()*s,p=()=>{m(u=>[...u,{start:c,end:s,colors:[e(i),e(i),e(i)],id:f()}])};return o.jsxs(o.Fragment,{children:[o.jsx(x,{onStoreUpdate:g,highlights:r,url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"}),o.jsx(S,{addHighlightToStart:p,highlights:r})]})},E={title:"Media Player Controls",component:t,decorators:[C,M]};t.__docgenInfo={description:"",methods:[],displayName:"MediaHighlights"};var n,h,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
            <MediaPlayer onStoreUpdate={setMediaContext} highlights={highlights} url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" />
            <RandomHighlight addHighlightToStart={addHighlightToStart} highlights={highlights} />
        </>;
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source}}};const U=["MediaHighlights"];export{t as MediaHighlights,U as __namedExportsOrder,E as default};
