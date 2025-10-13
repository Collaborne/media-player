import{w as c,a as m,j as n,P as l,B as p}from"./with-player-theme-Dgf0jpvR.js";import{R as i}from"./test-utils-CM-kBDfr.js";import{G as u}from"./Grid-ka_igTX8.js";import"./client-DFmknlot.js";import"./iframe-CU0dkipb.js";const x=["medium","small"],v=["contained","text"],h=["primary"],t=()=>n.jsx(l,{sx:{padding:2},children:h.map(e=>n.jsxs(i.Fragment,{children:[n.jsx("div",{children:n.jsxs("b",{children:["color: ",e]})}),v.map(r=>n.jsx(i.Fragment,{children:n.jsxs("div",{style:{padding:8},children:[n.jsxs("b",{children:["variant: ",r]}),x.map(a=>n.jsx(u,{container:!0,direction:"column",width:"auto",alignItems:"space-between",children:n.jsx("div",{style:{padding:4},children:n.jsxs("div",{children:[n.jsxs("div",{children:["size: ",a]}),n.jsx(p,{size:a,variant:r,color:e,children:a==="small"?"x":"Button text"})]})})},`${e}-${r}-${a}`))]})},`${e}-${r}`))]},e))}),R={title:"UI Kit",component:t,decorators:[c,m]};t.__docgenInfo={description:"",methods:[],displayName:"Button"};var s,o,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  return <Paper sx={{
    padding: 2
  }}>
            {UPDATED_COLOR.map(color => <React.Fragment key={color}>
                    <div>
                        <b>color: {color}</b>
                    </div>
                    {UPDATED_VARIANT.map(variant => <React.Fragment key={\`\${color}-\${variant}\`}>
                            <div style={{
          padding: 8
        }}>
                                <b>variant: {variant}</b>
                                {UPDATED_SIZES.map(size => <Grid key={\`\${color}-\${variant}-\${size}\`} container direction="column" width="auto" alignItems={'space-between'}>
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
                        </React.Fragment>)}
                </React.Fragment>)}
        </Paper>;
}`,...(d=(o=t.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const $=["Button"];export{t as Button,$ as __namedExportsOrder,R as default};
