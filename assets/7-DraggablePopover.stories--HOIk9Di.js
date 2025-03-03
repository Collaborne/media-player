import{v as n,w as m,u as l,j as u,G as c,A as d}from"./with-player-theme-CBkyMqVj.js";import{r as P}from"./test-utils-BFSCaS9q.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";const e=s=>{const[i,a]=l(r=>[r.requestPip,r.exitPip],d);return P.useEffect(()=>{if(s.isPip){i();return}a()},[s.isPip,a,i]),u.jsx(c,{})},b={title:"Media Player Controls",component:e,decorators:[n,m],args:{isPip:!1,className:"",xAxisDistance:16,yAxisDistance:16},argTypes:{isPip:{name:"isPip",description:"is Pip mode on",table:{type:{summary:"boolean"},defaultValue:{summary:!1}}}},className:{name:"props.className",description:"Class name applied to div*wrapper of the component",table:{type:{summary:"string"},defaultValue:{summary:void 0}},yAxisDistance:{name:"props.yAxisDistance",description:"Distance from window border bottom, on Y axis in `pixels`, for PIP player position initialization ",table:{type:{summary:"number"},defaultValue:{summary:16}}},xAxisDistance:{name:"props.xAxisDistance",description:"Distance from window border right, on X axis in `pixels`, for PIP player position initialization",table:{type:{summary:"number"},defaultValue:{summary:16}}}},parameters:{controls:{expanded:!0}}};e.__docgenInfo={description:"",methods:[],displayName:"DraggablePopover"};var t,o,p;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const [requestPip, exitPip] = useMediaStore(state => [state.requestPip, state.exitPip], shallow);
  React.useEffect(() => {
    if (args.isPip) {
      requestPip();
      return;
    }
    exitPip();
  }, [args.isPip, exitPip, requestPip]);
  return <Grid />;
}`,...(p=(o=e.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};const D=["DraggablePopover"];export{e as DraggablePopover,D as __namedExportsOrder,b as default};
