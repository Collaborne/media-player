import{w as l,j as o,C as m,p,q as i}from"./with-player-theme-Dgf0jpvR.js";import"./MediaPlayer-udg3aERC.js";import"./CenteredPlayButton-BYPqNZm4.js";import{u as c}from"./useMediaPlayerStyles-D-ZQaBrZ.js";import{B as u}from"./BottomControls-DkDzcT1U.js";import"./test-utils-CM-kBDfr.js";import{u as d}from"./Controls-0vdC9ICM.js";import"./EventBasedProgressBar-x6HAD4qw.js";import{C}from"./CustomPipControls-BPREd1KI.js";import"./client-DFmknlot.js";import"./iframe-CU0dkipb.js";import"./Grid-ka_igTX8.js";const s=()=>{const{controls:a}=d().classes,{wrapper:n}=c().classes;return o.jsx(m,{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",PIPControls:C,children:o.jsx("div",{className:a,children:o.jsx(u,{children:o.jsxs("div",{className:n,children:[o.jsx(p,{svgClassName:"medium"}),o.jsx(i,{})]})})})})},w={title:"Media Player Controls",component:s,decorators:[l],parameters:{controls:{expanded:!0}}};s.__docgenInfo={description:"",methods:[],displayName:"PIPControls"};var t,r,e;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
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
