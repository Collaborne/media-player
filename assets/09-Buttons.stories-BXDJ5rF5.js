import{w as o,a as c,j as t,P as l,G as m,B as p}from"./with-player-theme-CBkyMqVj.js";import"./test-utils-BFSCaS9q.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const x=["medium","small"],u=["contained","text"],v=["primary"],e=()=>t.jsx(l,{sx:{padding:2},children:v.map(r=>t.jsxs(t.Fragment,{children:[t.jsx("div",{children:t.jsxs("b",{children:["color: ",r]})}),u.map(s=>t.jsx(t.Fragment,{children:t.jsxs("div",{style:{padding:8},children:[t.jsxs("b",{children:["variant: ",s]}),x.map(i=>t.jsx(m,{container:!0,direction:"column",width:"auto",alignItems:"space-between",children:t.jsx("div",{style:{padding:4},children:t.jsxs("div",{children:[t.jsxs("div",{children:["size: ",i]}),t.jsx(p,{size:i,variant:s,color:r,children:i==="small"?"x":"Button text"})]})})}))]})}))]}))}),_={title:"UI Kit",component:e,decorators:[o,c]};e.__docgenInfo={description:"",methods:[],displayName:"Button"};var a,n,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  return <Paper sx={{
    padding: 2
  }}>
            {UPDATED_COLOR.map(color => <>
                    <div>
                        <b>color: {color}</b>
                    </div>
                    {UPDATED_VARIANT.map(variant => <>
                            <div style={{
          padding: 8
        }}>
                                <b>variant: {variant}</b>
                                {UPDATED_SIZES.map(size => <Grid container direction="column" width="auto" alignItems={'space-between'}>
                                        <div style={{
              padding: 4
            }}>
                                            <div>
                                                <div>size: {size}</div>
                                                <MUIButton size={size} variant={variant} color={color}>
                                                    {size === 'small' ? 'x' : 'Button text'}
                                                </MUIButton>
                                            </div>
                                        </div>
                                    </Grid>)}
                            </div>
                        </>)}
                </>)}
        </Paper>;
}`,...(d=(n=e.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const P=["Button"];export{e as Button,P as __namedExportsOrder,_ as default};
