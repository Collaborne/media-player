"use strict";(self.webpackChunk_collaborne_media_player=self.webpackChunk_collaborne_media_player||[]).push([[115],{"./.storybook/stories/6-EventBasedProgressBar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{EventBasedProgressBar:()=>EventBasedProgressBar,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _home_runner_work_media_player_media_player_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),_home_runner_work_media_player_media_player_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),uuidv4__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/uuidv4/build/lib/uuidv4.js"),_src__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/index.ts"),_components_random_highlight_RandomHighlight__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/components/random-highlight/RandomHighlight.tsx"),_decorators__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./.storybook/decorators/index.ts"),_decorators_with_player_theme__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./.storybook/decorators/with-player-theme.tsx"),_utils_highlights__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./.storybook/utils/highlights.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/react/jsx-runtime.js"),EventBasedProgressBar=function EventBasedProgressBar(args){var _usePlayerContext=(0,_src__WEBPACK_IMPORTED_MODULE_2__.gDo)(),mediaContext=_usePlayerContext.mediaContext,setMediaContext=_usePlayerContext.setMediaContext,_React$useState=react__WEBPACK_IMPORTED_MODULE_0__.useState([]),_React$useState2=(0,_home_runner_work_media_player_media_player_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_7__.Z)(_React$useState,2),highlights=_React$useState2[0],setHighlights=_React$useState2[1],duration=null==mediaContext?void 0:mediaContext.duration,end=Math.random()*(duration||0),start=Math.random()*end;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__.Syo,{url:args.url,onStoreUpdate:setMediaContext,highlights}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_src__WEBPACK_IMPORTED_MODULE_2__.vNc,{mediaListener:null==mediaContext?void 0:mediaContext.getListener(),setCurrentTime:null==mediaContext?void 0:mediaContext.setCurrentTime,highlights}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_random_highlight_RandomHighlight__WEBPACK_IMPORTED_MODULE_3__.Z,{addHighlightToStart:function addHighlightToStart(){setHighlights((function(prev){return[].concat((0,_home_runner_work_media_player_media_player_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_8__.Z)(prev),[{start,end,colors:[(0,_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.D)(_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.O),(0,_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.D)(_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.O),(0,_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.D)(_utils_highlights__WEBPACK_IMPORTED_MODULE_9__.O)],id:(0,uuidv4__WEBPACK_IMPORTED_MODULE_1__.Vj)()}])}))},highlights})]})};const __WEBPACK_DEFAULT_EXPORT__={title:"Media Player Controls",component:EventBasedProgressBar,decorators:[_decorators__WEBPACK_IMPORTED_MODULE_4__.ij,_decorators_with_player_theme__WEBPACK_IMPORTED_MODULE_5__.l],args:{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},argTypes:{url:{name:"url",description:"A media URL. Only file type supported",table:{type:{summary:"string"},defaultValue:{summary:void 0}}}}},__namedExportsOrder=["EventBasedProgressBar"]},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w3:()=>BottomControls.w,ae:()=>types.a,lD:()=>CorePlayer.l,vN:()=>EventBasedProgressBar,pU:()=>components.pU,Sy:()=>MediaPlayer.S,PF:()=>MediaPoster.P,DF:()=>components.DF,Vj:()=>components.Vj,ko:()=>ProgressBar.k,LU:()=>components.LU,QG:()=>components.QG});__webpack_require__("./src/components/animated-icon-wrapper/AnimatedIconWrapper.tsx"),__webpack_require__("./src/components/big-centered-button/BigCenteredButton.tsx"),__webpack_require__("./src/components/bottom-control-buttons/BottomControlButtons.tsx");var components=__webpack_require__("./src/components/bottom-control-buttons/components/index.ts"),BottomControls=__webpack_require__("./src/components/bottom-controls/BottomControls.tsx"),CorePlayer=(__webpack_require__("./src/components/centered-play-button/CenteredPlayButton.tsx"),__webpack_require__("./src/components/centered-replay-button/CenteredReplayButton.tsx"),__webpack_require__("./src/components/controls/Controls.tsx"),__webpack_require__("./src/components/core-player/CorePlayer.tsx")),types=__webpack_require__("./src/components/core-player/types.ts"),ProgressBar=(__webpack_require__("./src/components/draggable-popover/DraggablePopover.tsx"),__webpack_require__("./src/components/frame/index.ts"),__webpack_require__("./src/components/pip-controls/PipControls.tsx"),__webpack_require__("./src/components/pip-controls/usePipControlsHook.ts"),__webpack_require__("./src/components/play-pause-animation/PauseAnimation.tsx"),__webpack_require__("./src/components/play-pause-animation/PlayAnimation.tsx"),__webpack_require__("./src/components/progress-bar/ProgressBar.tsx")),objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),react=__webpack_require__("./node_modules/react/index.js"),EventRailsProvider=__webpack_require__("./src/context/EventRailsProvider.tsx"),hooks=__webpack_require__("./src/hooks/index.ts"),utils=__webpack_require__("./src/utils/index.ts"),constants=__webpack_require__("./src/utils/constants.ts"),use_event_rails_context=__webpack_require__("./src/hooks/use-event-rails-context.ts"),utils_highlights=__webpack_require__("./src/utils/highlights.ts"),RailStyled=__webpack_require__("./src/components/progress-bar/components/RailStyled.ts"),useRailStyles=__webpack_require__("./src/components/progress-bar/components/useRailStyles.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),BLEND_CONFIG={intensifyAll:!0},EventRail=function EventRail(){var _useEventRailsContext=(0,use_event_rails_context.n)(),duration=_useEventRailsContext.duration,getHighlightColorBlended=_useEventRailsContext.getHighlightColorBlended,highlights=_useEventRailsContext.highlights,sliderRail=(0,useRailStyles.c)().classes.sliderRail;return(0,jsx_runtime.jsx)("div",{className:sliderRail,children:null==highlights?void 0:highlights.map((function(_ref){var id=_ref.id,colors=_ref.colors,start=_ref.start,end=_ref.end,highlightEdgesColor=null==getHighlightColorBlended?void 0:getHighlightColorBlended(colors,BLEND_CONFIG);return(0,jsx_runtime.jsx)(RailStyled.J,{startPoint:(0,utils_highlights.O)(start,duration),width:(0,utils_highlights.O)(end-start,duration),color:null==getHighlightColorBlended?void 0:getHighlightColorBlended(colors),startColorSegment:highlightEdgesColor,endColorSegment:highlightEdgesColor},id)}))})};EventRail.__docgenInfo={description:"",methods:[],displayName:"EventRail"};var ProgressBarStyled=__webpack_require__("./src/components/progress-bar/components/ProgressBarStyled.ts"),_excluded=["mediaListener","highlights","getHighlightColorBlended","setCurrentTime"],EventBasedProgressBar=function EventBasedProgressBar(_ref){var mediaListener=_ref.mediaListener,_ref$highlights=_ref.highlights,highlights=void 0===_ref$highlights?[]:_ref$highlights,_ref$getHighlightColo=_ref.getHighlightColorBlended,getHighlightColorBlended=void 0===_ref$getHighlightColo?utils.NH:_ref$getHighlightColo,setCurrentTime=_ref.setCurrentTime,props=(0,objectWithoutProperties.Z)(_ref,_excluded),_useState=(0,react.useState)(0),_useState2=(0,slicedToArray.Z)(_useState,2),value=_useState2[0],setValue=_useState2[1],_useState3=(0,react.useState)(0),_useState4=(0,slicedToArray.Z)(_useState3,2),duration=_useState4[0],setDuration=_useState4[1];return(0,hooks.Ic)("durationchange",(function(e){return setDuration(e.duration)}),mediaListener),(0,hooks.Ic)("timeupdate",(function(_ref2){var duration=_ref2.duration,seconds=_ref2.seconds;return setValue(duration&&seconds?(0,utils.mu)(seconds/duration*constants.JV):0)}),mediaListener),(0,jsx_runtime.jsx)(EventRailsProvider.$,{highlights,duration,getHighlightColorBlended,children:(0,jsx_runtime.jsx)(ProgressBarStyled.D,(0,objectSpread2.Z)({min:0,max:constants.JV,onChange:function onCurrentTimeUpdate(e,newValue,_activeThumb){if(e.preventDefault(),!Array.isArray(newValue)){var seekTime=newValue/constants.JV*duration;null==setCurrentTime||setCurrentTime(seekTime)}},value,components:{Rail:EventRail}},props))})};EventBasedProgressBar.__docgenInfo={description:"A MUI Slider configured for displaying currentTime/duration values from `MediaStore`\nuses `EmitterListeners` for displaying data\n@category React Component\n@category UI Controls",methods:[],displayName:"EventBasedProgressBar",props:{mediaListener:{required:!1,tsType:{name:"EmitterListeners"},description:""},setCurrentTime:{required:!1,tsType:{name:"signature",type:"function",raw:"(relativeSeconds: number) => void",signature:{arguments:[{type:{name:"number"},name:"relativeSeconds"}],return:{name:"void"}}},description:""},highlights:{required:!1,tsType:{name:"Array",elements:[{name:"Highlight"}],raw:"Highlight[]"},description:"",defaultValue:{value:"[]",computed:!1}},getHighlightColorBlended:{required:!1,tsType:{name:"signature",type:"function",raw:"(\n\tcolors: string[],\n\tparams?: BlendConfig,\n) => string | undefined",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"colors"},{type:{name:"BlendConfig"},name:"params"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"",defaultValue:{value:"(\n\tcolors,\n\t{ intensifyIndex, intensifyAll, discountFactor = 1 } = {},\n) => {\n\tif (colors.length === 0) {\n\t\treturn undefined;\n\t}\n\n\tconst [initial, ...rest] = colors.map(hexToRGB).map((rgb, index) => {\n\t\t// Make the intensified color more prevalent that the other colors.\n\t\tconst alpha =\n\t\t\tintensifyAll || intensifyIndex === index\n\t\t\t\t? INTENSIFIED_ALPHA\n\t\t\t\t: BLEND_ALPHA;\n\t\treturn rgbToRgba(rgb, alpha * discountFactor);\n\t});\n\n\tconst mixed = rest.reduce((background, foreground) => {\n\t\treturn multiply(background, foreground);\n\t}, initial);\n\n\treturn rgbaToHexA(mixed);\n}",computed:!1}}},composes:["SliderProps"]};__webpack_require__("./src/components/media-container/MediaContainer.tsx");var MediaPlayer=__webpack_require__("./src/components/media-player/MediaPlayer.tsx"),MediaPoster=__webpack_require__("./src/components/media-poster/MediaPoster.tsx")},"./src/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{FDY:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.FD,IcN:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.Ic,LUJ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.LU,PFg:()=>_components__WEBPACK_IMPORTED_MODULE_0__.PF,QGR:()=>_components__WEBPACK_IMPORTED_MODULE_0__.QG,Syo:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Sy,VjV:()=>_components__WEBPACK_IMPORTED_MODULE_0__.Vj,gDo:()=>_hooks__WEBPACK_IMPORTED_MODULE_2__.gD,lDp:()=>_components__WEBPACK_IMPORTED_MODULE_0__.lD,pUZ:()=>_components__WEBPACK_IMPORTED_MODULE_0__.pU,vNc:()=>_components__WEBPACK_IMPORTED_MODULE_0__.vN});var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/index.ts"),_hooks__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./src/context/index.ts"),__webpack_require__("./src/hooks/index.ts"));__webpack_require__("./src/store/media-store.ts"),__webpack_require__("./src/utils/index.ts")},"./.storybook/components/random-highlight/RandomHighlight.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>RandomHighlight});var _mui_material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@mui/material/Button/Button.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),RandomHighlight=function RandomHighlight(_ref){var addHighlightToStart=_ref.addHighlightToStart,highlights=_ref.highlights;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{style:{marginTop:"20px",minHeight:"200px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:addHighlightToStart,variant:"contained",children:"Add highlight"}),highlights&&highlights.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:"All Highlights stored in state:"}),highlights.map((function(highlight){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:JSON.stringify(highlight)},highlight.id)}))]})]})};RandomHighlight.__docgenInfo={description:"",methods:[],displayName:"RandomHighlight",props:{addHighlightToStart:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},highlights:{required:!1,tsType:{name:"Array",elements:[{name:"Highlight"}],raw:"Highlight[]"},description:""}}}},"./.storybook/utils/highlights.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>pickRandomItem,O:()=>highlightColors});var highlightColors=["#08E8E8","#F4DF82","#00CF80","#FF6347","#F5AB35","#C67FE8","#C9874F","#EDAEEB","#89CFF0","#FC6399","#7FA8F0","#DAF7A6","#EA99FF"],pickRandomItem=function pickRandomItem(array){return array[Math.round(Math.random()*(array.length-1))]}}}]);