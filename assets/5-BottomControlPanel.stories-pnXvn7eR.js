import{v as G,w as N,j as t,G as s,p as m,R as c,F as x,V as C,x as B,T as j,y as p,q as y,z as f}from"./with-player-theme-CBkyMqVj.js";import{a as P,B as b}from"./useMediaPlayerStyles-Dza5xS_E.js";import{B as g}from"./BottomControls-DBDcaUPL.js";import{C as h}from"./Controls-BhNCAOdz.js";import"./test-utils-BFSCaS9q.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const n=()=>{const{gridCentered:e}=P().classes;return t.jsx(h,{children:t.jsx(g,{children:t.jsxs(b,{children:[t.jsx(s,{item:!0,className:e,xs:!0,children:t.jsxs(s,{item:!0,className:e,xs:!0,justifyContent:"flex-start",children:[t.jsx(m,{svgIconSize:"medium"}),t.jsx(c,{}),t.jsx(x,{}),t.jsx(C,{}),t.jsx(B,{})]})}),t.jsx(s,{item:!0,className:e,xs:!0,justifyContent:"center",children:t.jsx(j,{})}),t.jsxs(s,{item:!0,className:e,xs:!0,justifyContent:"flex-end",children:[t.jsx(p,{}),t.jsx(y,{}),t.jsx(f,{})]})]})})})},o=()=>{const{gridCentered:e}=P().classes;return t.jsx(h,{children:t.jsx(g,{children:t.jsxs(b,{children:[t.jsx(s,{item:!0,className:e,xs:!0,children:t.jsxs(s,{item:!0,className:e,xs:!0,justifyContent:"flex-start",children:[t.jsx(m,{svgIconSize:"medium",disabled:!0}),t.jsx(c,{disabled:!0}),t.jsx(x,{disabled:!0}),t.jsx(C,{disabled:!0}),t.jsx(B,{})]})}),t.jsx(s,{item:!0,className:e,xs:!0,justifyContent:"center",children:t.jsx(j,{})}),t.jsxs(s,{item:!0,className:e,xs:!0,justifyContent:"flex-end",children:[t.jsx(p,{disabled:!0}),t.jsx(y,{disabled:!0}),t.jsx(f,{disabled:!0})]})]})})})},V={title:"Media Player Controls",component:n,decorators:[G,N],parameters:{controls:{expanded:!0}}};n.__docgenInfo={description:"",methods:[],displayName:"BottomControlButtons"};o.__docgenInfo={description:"",methods:[],displayName:"BottomControlButtonsDisabled"};var r,i,a;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    gridCentered
  } = useMediaPlayerStyles().classes;
  return <Controls>
            <BottomControls>
                <BottomControlButtonsComponent>
                    <Grid item className={gridCentered} xs>
                        <Grid item className={gridCentered} xs justifyContent="flex-start">
                            <PlayPauseReplay svgIconSize="medium" />
                            <RwdButton />
                            <FwdButton />
                            <VolumeButton />
                            <VolumeSlider />
                        </Grid>
                    </Grid>
                    <Grid item className={gridCentered} xs justifyContent="center">
                        <TimeDisplay />
                    </Grid>
                    <Grid item className={gridCentered} xs justifyContent="flex-end">
                        <PlaybackRateButton />
                        <PictureInPictureButton />
                        <FullscreenButton />
                    </Grid>
                </BottomControlButtonsComponent>
            </BottomControls>
        </Controls>;
}`,...(a=(i=n.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var d,l,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const {
    gridCentered
  } = useMediaPlayerStyles().classes;
  return <Controls>
            <BottomControls>
                <BottomControlButtonsComponent>
                    <Grid item className={gridCentered} xs>
                        <Grid item className={gridCentered} xs justifyContent="flex-start">
                            <PlayPauseReplay svgIconSize="medium" disabled />
                            <RwdButton disabled />
                            <FwdButton disabled />
                            <VolumeButton disabled />
                            <VolumeSlider />
                        </Grid>
                    </Grid>
                    <Grid item className={gridCentered} xs justifyContent="center">
                        <TimeDisplay />
                    </Grid>
                    <Grid item className={gridCentered} xs justifyContent="flex-end">
                        <PlaybackRateButton disabled />
                        <PictureInPictureButton disabled />
                        <FullscreenButton disabled />
                    </Grid>
                </BottomControlButtonsComponent>
            </BottomControls>
        </Controls>;
}`,...(u=(l=o.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const v=["BottomControlButtons","BottomControlButtonsDisabled"];export{n as BottomControlButtons,o as BottomControlButtonsDisabled,v as __namedExportsOrder,V as default};
