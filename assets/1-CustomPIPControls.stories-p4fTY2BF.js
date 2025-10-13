import{w as l,j as o,C as m,p,q as i}from"./with-player-theme-ulL8b6Vb.js";import"./MediaPlayer-C9osFftJ.js";import"./CenteredPlayButton-CVuQl_BT.js";import{u as c}from"./useMediaPlayerStyles-gXGsFrVH.js";import{B as u}from"./BottomControls-Ca7DUT9Y.js";import"./test-utils-CM-kBDfr.js";import{u as d}from"./Controls-CRSmehvV.js";import"./EventBasedProgressBar-CoNxsDdy.js";import{C}from"./CustomPipControls-C8vVNLwu.js";import"./client-DFmknlot.js";import"./iframe-CjMey2r5.js";import"./Grid-D8PGgL2T.js";const s=()=>{const{controls:a}=d().classes,{wrapper:n}=c().classes;return o.jsx(m,{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",PIPControls:C,children:o.jsx("div",{className:a,children:o.jsx(u,{children:o.jsxs("div",{className:n,children:[o.jsx(p,{svgClassName:"medium"}),o.jsx(i,{})]})})})})},w={title:"Media Player Controls",component:s,decorators:[l],parameters:{controls:{expanded:!0}}};s.__docgenInfo={description:"",methods:[],displayName:"PIPControls"};var t,r,e;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const {
    controls
  } = useControlsStyles().classes;
  const {
    wrapper
  } = useBottomControlButtonsStyles().classes;
  return <CorePlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" PIPControls={CustomPipControls}>
            <div className={controls}>
                <BottomControls>
                    <div className={wrapper}>
                        <PlayPauseReplay svgClassName="medium" />
                        <PictureInPictureButton />
                    </div>
                </BottomControls>
            </div>
        </CorePlayer>;
}`,...(e=(r=s.parameters)==null?void 0:r.docs)==null?void 0:e.source}}};const S=["PIPControls"];export{s as PIPControls,S as __namedExportsOrder,w as default};
