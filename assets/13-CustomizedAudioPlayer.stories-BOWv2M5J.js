import{w as m,m as l,j as e,C as p,M as u,R as c,p as h,F as y,T as g}from"./with-player-theme-Dgf0jpvR.js";import"./test-utils-CM-kBDfr.js";import"./MediaPlayer-udg3aERC.js";import"./CenteredPlayButton-BYPqNZm4.js";import"./useMediaPlayerStyles-D-ZQaBrZ.js";import"./BottomControls-DkDzcT1U.js";import"./Controls-0vdC9ICM.js";import"./EventBasedProgressBar-x6HAD4qw.js";import{w}from"./with-intl-JX79_Mmz.js";import"./client-DFmknlot.js";import"./iframe-CU0dkipb.js";import"./Grid-ka_igTX8.js";const x=l()(a=>({dimension:{width:a.spacing(90),height:a.spacing(50.625)},placeholder:{position:"absolute",width:"100%",height:"100%"},buttons:{position:"absolute",top:"50%",right:"50%",transform:"translate(50%,-50%)"}})),s=a=>{const{dimension:r,placeholder:n,buttons:d}=x().classes;return e.jsx(p,{className:r,...a,children:e.jsxs("div",{className:n,children:[e.jsx(u,{img:"https://images.unsplash.com/photo-1533827432537-70133748f5c8",width:"100%",height:"100%"}),e.jsxs("div",{className:d,children:[e.jsx(c,{}),e.jsx(h,{size:"large"}),e.jsx(y,{}),e.jsx(g,{})]})]})})},B={title:"Audio Player",component:s,decorators:[m,w],args:{url:"https://assets.mixkit.co/sfx/preview/mixkit-game-show-suspense-waiting-667.mp3",audioPlaceholder:void 0,mediaType:void 0},argTypes:{url:{name:"props.url",description:"A media URL. Only file type supported",table:{type:{summary:"string"},defaultValue:{summary:void 0}}},audioPlaceholder:{name:"props.audioPlaceholder",description:"URL to a image to be a placeholder for audio files in PIP mode",table:{type:{summary:"string"},defaultValue:{summary:void 0}}},mediaType:{name:"props.mediaType",description:"Initial media type that will enforce to build corresponding UI ",table:{type:{summary:"MediaType"},defaultValue:{summary:void 0}}}},parameters:{controls:{expanded:!0}}};s.__docgenInfo={description:"",methods:[],displayName:"Customized"};var t,o,i;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const {
    dimension,
    placeholder,
    buttons
  } = useStyles().classes;
  return <CorePlayer className={dimension} {...args}>
            <div className={placeholder}>
                <MediaPoster img="https://images.unsplash.com/photo-1533827432537-70133748f5c8" width="100%" height="100%" />
                <div className={buttons}>
                    <RwdButton />
                    <PlayPauseReplay size="large" />
                    <FwdButton />
                    <TimeDisplay />
                </div>
            </div>
        </CorePlayer>;
}`,...(i=(o=s.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const M=["Customized"];export{s as Customized,M as __namedExportsOrder,B as default};
