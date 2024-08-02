"use strict";(self.webpackChunk_collaborne_media_player=self.webpackChunk_collaborne_media_player||[]).push([[151],{"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w3:()=>BottomControls.w,ae:()=>types.a,lD:()=>CorePlayer.l,vN:()=>EventBasedProgressBar,pU:()=>bottom_control_buttons.pU,Sy:()=>MediaPlayer.S,PF:()=>MediaPoster.P,DF:()=>bottom_control_buttons.DF,Vj:()=>bottom_control_buttons.Vj,ko:()=>ProgressBar.k,LU:()=>bottom_control_buttons.LU,QG:()=>bottom_control_buttons.QG});__webpack_require__("./src/components/animated-icon-wrapper/AnimatedIconWrapper.tsx"),__webpack_require__("./src/components/big-centered-button/BigCenteredButton.tsx");var bottom_control_buttons=__webpack_require__("./src/components/bottom-control-buttons/index.ts"),BottomControls=__webpack_require__("./src/components/bottom-controls/BottomControls.tsx"),CorePlayer=(__webpack_require__("./src/components/centered-play-button/CenteredPlayButton.tsx"),__webpack_require__("./src/components/centered-replay-button/CenteredReplayButton.tsx"),__webpack_require__("./src/components/controls/index.ts"),__webpack_require__("./src/components/core-player/CorePlayer.tsx")),types=__webpack_require__("./src/components/core-player/types.ts"),mui=(__webpack_require__("./src/components/draggable-popover/DraggablePopover.tsx"),__webpack_require__("./node_modules/tss-react/esm/mui.js")),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");(0,mui.ZL)()((function(theme){return{playerFrame:{position:"absolute",top:0,right:0,bottom:0,left:0,borderWidth:1,borderStyle:"solid",borderColor:theme.palette.divider,boxSizing:"border-box",pointerEvents:"none",zIndex:2}}}));__webpack_require__("./src/components/pip-controls/PipControls.tsx"),__webpack_require__("./src/components/pip-controls/usePipControlsHook.ts"),__webpack_require__("./src/components/play-pause-animation/PauseAnimation.tsx"),__webpack_require__("./src/components/play-pause-animation/PlayAnimation.tsx");var ProgressBar=__webpack_require__("./src/components/progress-bar/ProgressBar.tsx"),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),EventRailsProvider=__webpack_require__("./src/context/EventRailsProvider.tsx"),hooks=__webpack_require__("./src/hooks/index.ts"),utils=__webpack_require__("./src/utils/index.ts"),constants=__webpack_require__("./src/utils/constants.ts"),use_event_rails_context=__webpack_require__("./src/hooks/use-event-rails-context.ts"),utils_highlights=__webpack_require__("./src/utils/highlights.ts"),RailStyled=__webpack_require__("./src/components/progress-bar/components/RailStyled.ts"),useRailStyles=__webpack_require__("./src/components/progress-bar/components/useRailStyles.ts"),BLEND_CONFIG={intensifyAll:!0},EventRail=function EventRail(){var _useEventRailsContext=(0,use_event_rails_context.n)(),duration=_useEventRailsContext.duration,getHighlightColorBlended=_useEventRailsContext.getHighlightColorBlended,highlights=_useEventRailsContext.highlights,sliderRail=(0,useRailStyles.c)().classes.sliderRail;return(0,jsx_runtime.jsx)("div",{className:sliderRail,children:null==highlights?void 0:highlights.map((function(_ref){var id=_ref.id,colors=_ref.colors,start=_ref.start,end=_ref.end,highlightEdgesColor=null==getHighlightColorBlended?void 0:getHighlightColorBlended(colors,BLEND_CONFIG);return(0,jsx_runtime.jsx)(RailStyled.J,{startPoint:(0,utils_highlights.O)(start,duration),width:(0,utils_highlights.O)(end-start,duration),color:null==getHighlightColorBlended?void 0:getHighlightColorBlended(colors),startColorSegment:highlightEdgesColor,endColorSegment:highlightEdgesColor},id)}))})};EventRail.__docgenInfo={description:"",methods:[],displayName:"EventRail"};var ProgressBarStyled=__webpack_require__("./src/components/progress-bar/components/ProgressBarStyled.ts"),_excluded=["mediaListener","highlights","getHighlightColorBlended","setCurrentTime"],EventBasedProgressBar=function EventBasedProgressBar(_ref){var mediaListener=_ref.mediaListener,_ref$highlights=_ref.highlights,highlights=void 0===_ref$highlights?[]:_ref$highlights,_ref$getHighlightColo=_ref.getHighlightColorBlended,getHighlightColorBlended=void 0===_ref$getHighlightColo?utils.NH:_ref$getHighlightColo,setCurrentTime=_ref.setCurrentTime,props=(0,objectWithoutProperties.Z)(_ref,_excluded),_useState=(0,react.useState)(0),_useState2=(0,slicedToArray.Z)(_useState,2),value=_useState2[0],setValue=_useState2[1],_useState3=(0,react.useState)(0),_useState4=(0,slicedToArray.Z)(_useState3,2),duration=_useState4[0],setDuration=_useState4[1];return(0,hooks.Ic)("durationchange",(function(e){return setDuration(e.duration)}),mediaListener),(0,hooks.Ic)("timeupdate",(function(_ref2){var duration=_ref2.duration,seconds=_ref2.seconds;return setValue(duration&&seconds?(0,utils.mu)(seconds/duration*constants.JV):0)}),mediaListener),(0,jsx_runtime.jsx)(EventRailsProvider.$,{highlights,duration,getHighlightColorBlended,children:(0,jsx_runtime.jsx)(ProgressBarStyled.D,(0,objectSpread2.Z)({min:0,max:constants.JV,onChange:function onCurrentTimeUpdate(e,newValue,_activeThumb){if(e.preventDefault(),!Array.isArray(newValue)){var seekTime=newValue/constants.JV*duration;null==setCurrentTime||setCurrentTime(seekTime)}},value,components:{Rail:EventRail}},props))})};EventBasedProgressBar.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:"EventBasedProgressBar",props:{mediaListener:{required:!1,tsType:{name:"EmitterListeners"},description:""},setCurrentTime:{required:!1,tsType:{name:"signature",type:"function",raw:"(relativeSeconds: number) => void",signature:{arguments:[{type:{name:"number"},name:"relativeSeconds"}],return:{name:"void"}}},description:""},highlights:{required:!1,tsType:{name:"Array",elements:[{name:"Highlight"}],raw:"Highlight[]"},description:"",defaultValue:{value:"[]",computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:"signature",type:"function",raw:"(\n\tcolors: string[],\n\tparams?: BlendConfig,\n) => string | undefined",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"colors"},{type:{name:"BlendConfig"},name:"params"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"",defaultValue:{value:"(\n\tcolors,\n\t{ intensifyIndex, intensifyAll, discountFactor = 1 } = {},\n) => {\n\tif (colors.length === 0) {\n\t\treturn undefined;\n\t}\n\n\tconst [initial, ...rest] = colors.map(hexToRGB).map((rgb, index) => {\n\t\t// Make the intensified color more prevalent that the other colors.\n\t\tconst alpha =\n\t\t\tintensifyAll || intensifyIndex === index\n\t\t\t\t? INTENSIFIED_ALPHA\n\t\t\t\t: BLEND_ALPHA;\n\t\treturn rgbToRgba(rgb, alpha * discountFactor);\n\t});\n\n\tconst mixed = rest.reduce((background, foreground) => {\n\t\treturn multiply(background, foreground);\n\t}, initial);\n\n\treturn rgbaToHexA(mixed);\n}",computed:!1}}},composes:["SliderProps"]};__webpack_require__("./src/components/media-container/MediaContainer.tsx");var MediaPlayer=__webpack_require__("./src/components/media-player/MediaPlayer.tsx"),MediaPoster=(__webpack_require__("./src/components/media-player/useMediaPlayerStyles.ts"),__webpack_require__("./src/components/media-poster/MediaPoster.tsx"))},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FDY:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.FD,IcN:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.Ic,LUJ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.LU,PFg:()=>_components__WEBPACK_IMPORTED_MODULE_0__.PF,QGR:()=>_components__WEBPACK_IMPORTED_MODULE_0__.QG,Syo:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sy,VjV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Vj,gDo:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.gD,lDp:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lD,pUZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pU,vNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.vN});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/context/index.ts"),__webpack_require__("./src/hooks/index.ts"));__webpack_require__("./src/store/media-store.ts"),__webpack_require__("./src/utils/index.ts")},"./.storybook/components/custom-pip-controls/CustomPipControls.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>CustomPipControls});var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/material/Grid/Grid.js"),_src__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/index.ts"),_src_context_MediaProvider__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/context/MediaProvider.tsx"),_src_hooks_use_on_hovered_element__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/hooks/use-on-hovered-element.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js"),CustomPipControls=function CustomPipControls(){var showPipControls=(0,_src_context_MediaProvider__WEBPACK_IMPORTED_MODULE_1__.v)((function(state){return state.showPipControls})),_useOnHoveredPipContr=(0,_src_hooks_use_on_hovered_element__WEBPACK_IMPORTED_MODULE_2__.gG)(),onMouseEnter=_useOnHoveredPipContr.onMouseEnter,onMouseLeave=_useOnHoveredPipContr.onMouseLeave;return showPipControls?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__.ZP,{position:"absolute",display:"flex",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_src__WEBPACK_IMPORTED_MODULE_0__.VjV,{size:"large",svgIconSize:"large",onMouseEnter,onMouseLeave})}):null};CustomPipControls.__docgenInfo={description:"",methods:[],displayName:"CustomPipControls"}},"./node_modules/react-transition-group/esm/Transition.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>esm_Transition});var objectWithoutPropertiesLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),inheritsLoose=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"),react=__webpack_require__("./node_modules/react/index.js"),react_dom=__webpack_require__("./node_modules/react-dom/index.js");const config_disabled=!1;var TransitionGroupContext=__webpack_require__("./node_modules/react-transition-group/esm/TransitionGroupContext.js"),UNMOUNTED="unmounted",EXITED="exited",ENTERING="entering",ENTERED="entered",Transition=function(_React$Component){function Transition(props,context){var _this;_this=_React$Component.call(this,props,context)||this;var initialStatus,appear=context&&!context.isMounting?props.enter:props.appear;return _this.appearStatus=null,props.in?appear?(initialStatus=EXITED,_this.appearStatus=ENTERING):initialStatus=ENTERED:initialStatus=props.unmountOnExit||props.mountOnEnter?UNMOUNTED:EXITED,_this.state={status:initialStatus},_this.nextCallback=null,_this}(0,inheritsLoose.Z)(Transition,_React$Component),Transition.getDerivedStateFromProps=function getDerivedStateFromProps(_ref,prevState){return _ref.in&&prevState.status===UNMOUNTED?{status:EXITED}:null};var _proto=Transition.prototype;return _proto.componentDidMount=function componentDidMount(){this.updateStatus(!0,this.appearStatus)},_proto.componentDidUpdate=function componentDidUpdate(prevProps){var nextStatus=null;if(prevProps!==this.props){var status=this.state.status;this.props.in?status!==ENTERING&&status!==ENTERED&&(nextStatus=ENTERING):status!==ENTERING&&status!==ENTERED||(nextStatus="exiting")}this.updateStatus(!1,nextStatus)},_proto.componentWillUnmount=function componentWillUnmount(){this.cancelNextCallback()},_proto.getTimeouts=function getTimeouts(){var exit,enter,appear,timeout=this.props.timeout;return exit=enter=appear=timeout,null!=timeout&&"number"!=typeof timeout&&(exit=timeout.exit,enter=timeout.enter,appear=void 0!==timeout.appear?timeout.appear:enter),{exit,enter,appear}},_proto.updateStatus=function updateStatus(mounting,nextStatus){if(void 0===mounting&&(mounting=!1),null!==nextStatus)if(this.cancelNextCallback(),nextStatus===ENTERING){if(this.props.unmountOnExit||this.props.mountOnEnter){var node=this.props.nodeRef?this.props.nodeRef.current:react_dom.findDOMNode(this);node&&function forceReflow(node){node.scrollTop}(node)}this.performEnter(mounting)}else this.performExit();else this.props.unmountOnExit&&this.state.status===EXITED&&this.setState({status:UNMOUNTED})},_proto.performEnter=function performEnter(mounting){var _this2=this,enter=this.props.enter,appearing=this.context?this.context.isMounting:mounting,_ref2=this.props.nodeRef?[appearing]:[react_dom.findDOMNode(this),appearing],maybeNode=_ref2[0],maybeAppearing=_ref2[1],timeouts=this.getTimeouts(),enterTimeout=appearing?timeouts.appear:timeouts.enter;!mounting&&!enter||config_disabled?this.safeSetState({status:ENTERED},(function(){_this2.props.onEntered(maybeNode)})):(this.props.onEnter(maybeNode,maybeAppearing),this.safeSetState({status:ENTERING},(function(){_this2.props.onEntering(maybeNode,maybeAppearing),_this2.onTransitionEnd(enterTimeout,(function(){_this2.safeSetState({status:ENTERED},(function(){_this2.props.onEntered(maybeNode,maybeAppearing)}))}))})))},_proto.performExit=function performExit(){var _this3=this,exit=this.props.exit,timeouts=this.getTimeouts(),maybeNode=this.props.nodeRef?void 0:react_dom.findDOMNode(this);exit&&!config_disabled?(this.props.onExit(maybeNode),this.safeSetState({status:"exiting"},(function(){_this3.props.onExiting(maybeNode),_this3.onTransitionEnd(timeouts.exit,(function(){_this3.safeSetState({status:EXITED},(function(){_this3.props.onExited(maybeNode)}))}))}))):this.safeSetState({status:EXITED},(function(){_this3.props.onExited(maybeNode)}))},_proto.cancelNextCallback=function cancelNextCallback(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},_proto.safeSetState=function safeSetState(nextState,callback){callback=this.setNextCallback(callback),this.setState(nextState,callback)},_proto.setNextCallback=function setNextCallback(callback){var _this4=this,active=!0;return this.nextCallback=function(event){active&&(active=!1,_this4.nextCallback=null,callback(event))},this.nextCallback.cancel=function(){active=!1},this.nextCallback},_proto.onTransitionEnd=function onTransitionEnd(timeout,handler){this.setNextCallback(handler);var node=this.props.nodeRef?this.props.nodeRef.current:react_dom.findDOMNode(this),doesNotHaveTimeoutOrListener=null==timeout&&!this.props.addEndListener;if(node&&!doesNotHaveTimeoutOrListener){if(this.props.addEndListener){var _ref3=this.props.nodeRef?[this.nextCallback]:[node,this.nextCallback],maybeNode=_ref3[0],maybeNextCallback=_ref3[1];this.props.addEndListener(maybeNode,maybeNextCallback)}null!=timeout&&setTimeout(this.nextCallback,timeout)}else setTimeout(this.nextCallback,0)},_proto.render=function render(){var status=this.state.status;if(status===UNMOUNTED)return null;var _this$props=this.props,children=_this$props.children,childProps=(_this$props.in,_this$props.mountOnEnter,_this$props.unmountOnExit,_this$props.appear,_this$props.enter,_this$props.exit,_this$props.timeout,_this$props.addEndListener,_this$props.onEnter,_this$props.onEntering,_this$props.onEntered,_this$props.onExit,_this$props.onExiting,_this$props.onExited,_this$props.nodeRef,(0,objectWithoutPropertiesLoose.Z)(_this$props,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return react.createElement(TransitionGroupContext.Z.Provider,{value:null},"function"==typeof children?children(status,childProps):react.cloneElement(react.Children.only(children),childProps))},Transition}(react.Component);function noop(){}Transition.contextType=TransitionGroupContext.Z,Transition.propTypes={},Transition.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:noop,onEntering:noop,onEntered:noop,onExit:noop,onExiting:noop,onExited:noop},Transition.UNMOUNTED=UNMOUNTED,Transition.EXITED=EXITED,Transition.ENTERING=ENTERING,Transition.ENTERED=ENTERED,Transition.EXITING="exiting";const esm_Transition=Transition}}]);