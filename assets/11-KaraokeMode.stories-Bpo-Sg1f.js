import{a1 as N,j as g,$ as C,w as j,a as q,a2 as K,W as x}from"./with-player-theme-CBkyMqVj.js";import{r as T,R as l}from"./test-utils-BFSCaS9q.js";import{M as $}from"./MediaPlayer-Bp9n8-0r.js";import"./CenteredPlayButton-HqI7MB1v.js";import"./useMediaPlayerStyles-Dza5xS_E.js";import"./BottomControls-DBDcaUPL.js";import{u as F}from"./use-player-context-DIsK5id9.js";import"./Controls-BhNCAOdz.js";import"./EventBasedProgressBar-DZSAleNl.js";import{u as U}from"./useToggle-DBuDG7zL.js";import"./client-BX9uNjFb.js";import"./iframe-CMALVNgR.js";function V(){var e=T.useRef(!0);return e.current?(e.current=!1,!0):e.current}var B=function(e,t){return e===t};function X(e,t){t===void 0&&(t=B);var c=T.useRef(),s=T.useRef(e),m=V();return!m&&!t(s.current,e)&&(c.current=s.current,s.current=e),c.current}const G=["isActive"],H=N("button",{shouldForwardProp:e=>!G.includes(e)})(({theme:e,isActive:t=!1})=>({background:t?e.palette.primary.main:"transparent",outline:0,border:0,marginRight:e.spacing(.25),padding:e.spacing(.5),cursor:"pointer"})),L=l.forwardRef((e,t)=>g.jsx(H,{ref:t,...e}));L.__docgenInfo={description:"",methods:[],displayName:"Timestamp",props:{isActive:{required:!0,tsType:{name:"boolean"},description:""}},composes:["ButtonProps"]};const W=(e,t)=>{const c=[];for(let s=0;s<e*t;s++)c.push({start:C(s/t),end:C((s+1)/t),index:s});return c};function z(e,t,c="CLOSEST"){let s=0,m=e.length-1,r={start:0,index:0,end:0},u=0;for(;s<=m&&(u=Math.floor((s+m)/2),r=e[u],!(t>=r.start&&t<r.end));)r.start<t?s=u+1:m=u-1;if(t>=r.start&&t<r.end)return r;if(c==="CLOSEST"){if(t>r.end){const d=Math.abs(t-r.end),o=e[u+1];if(!o)return r;const a=Math.abs(t-(o==null?void 0:o.start));return d<a?r:o}else if(t<r.start){const d=Math.abs(t-r.start),o=e[u-1];if(!o)return r;const a=Math.abs(t-(o==null?void 0:o.end));return d<a?r:o}return r}if(c==="PREV"){const d=e[u-1];return t>=r.end?r:d??r}if(c==="NEXT"){const d=e[u+1];return t<=r.start?r:d??r}return r}const E=(e,t)=>z(e,t,"NEXT"),p=e=>{const[t,c]=U(!1),[s,m]=l.useState(!1),r=l.useRef([]),u=l.useRef([]),d=n=>r.current.push({ref:n}),{setMediaContext:o,mediaContext:a}=F(),y=(a==null?void 0:a.duration)||0,R=l.useRef([]),P=a==null?void 0:a.getListener(),v=a==null?void 0:a.setCurrentTime,[M,h]=K({index:0,end:0,start:0}),b=l.useCallback(()=>{var i,f;const n=(f=(i=a==null?void 0:a.reactPlayerRef)==null?void 0:i.current)==null?void 0:f.getInternalPlayer();if(n)return E(R.current,n.currentTime*1e3-1)},[a]),O=l.useCallback(()=>{const n=b();n&&h(n,1)},[b,h]);x("seeked",O,P),x("ready",()=>m(!0),P),x("onTimeAlarm",n=>{const i=E(R.current,n.seconds);h(i,1)},P);const w=l.useCallback(()=>{for(let n=0;n<y;n++)for(let i=0;i<e.secondsDivider;i++){const f=i===0?0:1/e.secondsDivider*i;u.current.push(C(n+f))}},[y,e.secondsDivider]);l.useEffect(()=>{R.current=W(y,e.secondsDivider),c(),w()},[y,e.secondsDivider,s]);const D=l.useMemo(()=>s&&R.current.length>0?R.current.map(({start:n,end:i,index:f})=>g.jsx(L,{ref:d,onClick:()=>v==null?void 0:v(n),isActive:!1,children:`[${n} - ${i}]`},f)):null,[s,t]),k=X(M),I=T.useCallback(()=>{const n=r.current[M.index];if(n&&n.ref&&(n.ref.style.background="red"),k){const i=r.current[k.index];i&&i.ref&&(i.ref.style.background="")}return null},[M,D]);return g.jsxs("div",{children:[g.jsx($,{url:e.url,onStoreUpdate:o,alarms:u.current}),g.jsx("div",{children:D}),I()]})},ce={title:"Karaoke Mode",component:p,decorators:[j,q],args:{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",secondsDivider:2,isPipEnabled:!0},argTypes:{url:{name:"url",description:"A media URL. Only file type supported",table:{type:{summary:"string"},defaultValue:{summary:void 0}}},secondsDivider:{name:"secondsDivider",description:"Split 1 second into intervals.",table:{type:{summary:"number"},defaultValue:{summary:2}}}}};p.__docgenInfo={description:"",methods:[],displayName:"KaraokeMode",props:{secondsDivider:{required:!0,tsType:{name:"number"},description:""},url:{required:!0,tsType:{name:"string"},description:""},isPipEnabled:{required:!0,tsType:{name:"boolean"},description:""}}};var S,A,_;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const [isTimestampToggle, toggleReadyTimestapms] = useToggle(false);
  const [isPlayerReady, setIsPlayerReady] = React.useState(false);
  const transcriptsElementRef = React.useRef<TranscriptRef[]>([]);
  const alarmRef = React.useRef<number[]>([]);
  const setTranscriptsElementRef = (ref: HTMLButtonElement | null) => transcriptsElementRef.current.push({
    ref
  });
  const {
    setMediaContext,
    mediaContext
  } = usePlayerContext();
  const mediaDuration = mediaContext?.duration || 0;
  const transcriptRef = React.useRef<Transcript[]>([]);
  const listener = mediaContext?.getListener();
  const setCurrentTime = mediaContext?.setCurrentTime;
  const [currentPart, setCurrentPart] = useDelayedState<Transcript>({
    index: 0,
    end: 0,
    start: 0
  });
  const getCurrentTimePart = React.useCallback(() => {
    const mediaEl = mediaContext?.reactPlayerRef?.current?.getInternalPlayer();
    if (!mediaEl) {
      return;
    }
    return findMatchingPartOrNext(transcriptRef.current, mediaEl.currentTime * 1000 - 1);
  }, [mediaContext]);
  const onSeek = React.useCallback(() => {
    const curPart = getCurrentTimePart();
    if (curPart) {
      setCurrentPart(curPart, 1);
    }
  }, [getCurrentTimePart, setCurrentPart]);
  useMediaListener('seeked', onSeek, listener);
  useMediaListener('ready', () => setIsPlayerReady(true), listener);
  useMediaListener('onTimeAlarm', (e: TimeUpdateEvent) => {
    const res = findMatchingPartOrNext(transcriptRef.current, e.seconds);
    setCurrentPart(res, 1);
  }, listener);

  // create alarms from transcript
  const createAlarms = React.useCallback(() => {
    for (let sec = 0; sec < mediaDuration; sec++) {
      for (let secMultiplier = 0; secMultiplier < args.secondsDivider; secMultiplier++) {
        const secondDigits = secMultiplier === 0 ? 0 : 1 / args.secondsDivider * secMultiplier;
        alarmRef.current.push(toTwoDigits(sec + secondDigits));
      }
    }
  }, [mediaDuration, args.secondsDivider]);

  // Create random timestamps due to media duration
  React.useEffect(() => {
    transcriptRef.current = createTimestamps(mediaDuration, args.secondsDivider);
    toggleReadyTimestapms();
    createAlarms();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaDuration, args.secondsDivider, isPlayerReady]);
  const timeStampsMemo = React.useMemo(() => {
    if (isPlayerReady && transcriptRef.current.length > 0) {
      return transcriptRef.current.map(({
        start,
        end,
        index
      }) => {
        return <Timestamp ref={setTranscriptsElementRef} onClick={() => setCurrentTime?.(start)} key={index} isActive={false}>
                        {\`[\${start} - \${end}]\`}
                    </Timestamp>;
      });
    }
    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerReady, isTimestampToggle]);
  const prevCurrent = usePreviousDistinct(currentPart);
  const createActiveSpan = useCallback(() => {
    const element = transcriptsElementRef.current[currentPart.index];
    if (element && element.ref) {
      element.ref.style.background = 'red';
    }
    if (prevCurrent) {
      const element = transcriptsElementRef.current[prevCurrent.index];
      if (element && element.ref) {
        element.ref.style.background = '';
      }
    }
    return null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPart, timeStampsMemo]);
  return <div>
            <MediaPlayer url={args.url} onStoreUpdate={setMediaContext} alarms={alarmRef.current} />
            <div>{timeStampsMemo}</div>
            {createActiveSpan()}
        </div>;
}`,...(_=(A=p.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};const ue=["KaraokeMode"];export{p as KaraokeMode,ue as __namedExportsOrder,ce as default};
