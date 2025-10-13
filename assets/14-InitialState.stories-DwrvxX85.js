import{w as C,C as p,j as t,p as P,q as g,T as S,r as x,s as a}from"./with-player-theme-Dgf0jpvR.js";import"./MediaPlayer-udg3aERC.js";import"./CenteredPlayButton-BYPqNZm4.js";import{u as v}from"./useMediaPlayerStyles-D-ZQaBrZ.js";import{B as f}from"./BottomControls-DkDzcT1U.js";import"./test-utils-CM-kBDfr.js";import{u as B}from"./Controls-0vdC9ICM.js";import"./EventBasedProgressBar-x6HAD4qw.js";import{C as I}from"./CustomPipControls-BPREd1KI.js";import"./client-DFmknlot.js";import"./iframe-CU0dkipb.js";import"./Grid-ka_igTX8.js";const c=u=>{const{controls:d}=B().classes,{wrapper:y}=v().classes;return t.jsx(p,{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",PIPControls:I,initialState:u.initialState,children:t.jsx("div",{className:d,children:t.jsxs(f,{children:[t.jsxs("div",{className:y,children:[t.jsx(P,{svgClassName:"medium"}),t.jsx(g,{}),t.jsx(S,{sx:{display:"inline-flex",marginLeft:"16px"}})]}),t.jsx(x,{})]})})})},O={title:"CorePlayer / InitialState",component:p,decorators:[C],parameters:{controls:{expanded:!0}}},s=c.bind({});s.args={initialState:{...a,autoPlay:!0}};s.argTypes={initialState:{name:"props.initialState",description:"Initial state to configure CorePlayer",table:{type:{summary:"CorePlayerInitialState"},defaultValue:{summary:JSON.stringify(a)}}}};const e=c.bind({});e.args={initialState:{...a,durationSeconds:3}};e.argTypes={initialState:{name:"props.initialState",description:"Initial state to configure CorePlayer",table:{type:{summary:"CorePlayerInitialState"},defaultValue:{summary:JSON.stringify(a)}}}};var o,r,i;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  const {
    controls
  } = useControlsStyles().classes;
  const {
    wrapper
  } = useBottomControlButtonsStyles().classes;
  return <CorePlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" PIPControls={CustomPipControls} initialState={args.initialState}>
            <div className={controls}>
                <BottomControls>
                    <div className={wrapper}>
                        <PlayPauseReplay svgClassName="medium" />
                        <PictureInPictureButton />
                        <TimeDisplay sx={{
            display: 'inline-flex',
            marginLeft: '16px'
          }} />
                    </div>
                    <ProgressBar />
                </BottomControls>
            </div>
        </CorePlayer>;
}`,...(i=(r=s.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var l,n,m;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  const {
    controls
  } = useControlsStyles().classes;
  const {
    wrapper
  } = useBottomControlButtonsStyles().classes;
  return <CorePlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" PIPControls={CustomPipControls} initialState={args.initialState}>
            <div className={controls}>
                <BottomControls>
                    <div className={wrapper}>
                        <PlayPauseReplay svgClassName="medium" />
                        <PictureInPictureButton />
                        <TimeDisplay sx={{
            display: 'inline-flex',
            marginLeft: '16px'
          }} />
                    </div>
                    <ProgressBar />
                </BottomControls>
            </div>
        </CorePlayer>;
}`,...(m=(n=e.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};const k=["Autoplay","DurationSeconds"];export{s as Autoplay,e as DurationSeconds,k as __namedExportsOrder,O as default};
