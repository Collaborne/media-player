import{w as l,j as o,C as m,p,q as c}from"./with-player-theme-CBkyMqVj.js";import"./MediaPlayer-Bp9n8-0r.js";import"./CenteredPlayButton-HqI7MB1v.js";import{u as i}from"./useMediaPlayerStyles-Dza5xS_E.js";import{B as u}from"./BottomControls-DBDcaUPL.js";import"./test-utils-BFSCaS9q.js";import{u as d}from"./Controls-BhNCAOdz.js";import"./EventBasedProgressBar-DZSAleNl.js";import{C}from"./CustomPipControls-BkhT3ikd.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const s=()=>{const{controls:a}=d().classes,{wrapper:n}=i().classes;return o.jsx(m,{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",PIPControls:C,children:o.jsx("div",{className:a,children:o.jsx(u,{children:o.jsxs("div",{className:n,children:[o.jsx(p,{svgClassName:"medium"}),o.jsx(c,{})]})})})})},_={title:"Media Player Controls",component:s,decorators:[l],parameters:{controls:{expanded:!0}}};s.__docgenInfo={description:"",methods:[],displayName:"PIPControls"};var t,r,e;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
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
}`,...(e=(r=s.parameters)==null?void 0:r.docs)==null?void 0:e.source}}};const w=["PIPControls"];export{s as PIPControls,w as __namedExportsOrder,_ as default};
