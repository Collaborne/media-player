[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / [types/video-state](/docs/modules/types_video_state.md) / VideoState

# Interface: VideoState

[types/video-state](/docs/modules/types_video_state.md).VideoState

State for video. Keeping info about current video player behavior

## Table of contents

### Properties

- [currentRelativeTime](/docs/interfaces/types_video_state.VideoState.md#currentrelativetime)
- [currentTime](/docs/interfaces/types_video_state.VideoState.md#currenttime)
- [duration](/docs/interfaces/types_video_state.VideoState.md#duration)
- [emitter](/docs/interfaces/types_video_state.VideoState.md#emitter)
- [endTime](/docs/interfaces/types_video_state.VideoState.md#endtime)
- [hasPipTriggeredByClick](/docs/interfaces/types_video_state.VideoState.md#haspiptriggeredbyclick)
- [hasPlayedOrSeeked](/docs/interfaces/types_video_state.VideoState.md#hasplayedorseeked)
- [lastActivityRef](/docs/interfaces/types_video_state.VideoState.md#lastactivityref)
- [loop](/docs/interfaces/types_video_state.VideoState.md#loop)
- [muted](/docs/interfaces/types_video_state.VideoState.md#muted)
- [oneTimeStopPoint](/docs/interfaces/types_video_state.VideoState.md#onetimestoppoint)
- [pip](/docs/interfaces/types_video_state.VideoState.md#pip)
- [playPromiseRef](/docs/interfaces/types_video_state.VideoState.md#playpromiseref)
- [playbackRate](/docs/interfaces/types_video_state.VideoState.md#playbackrate)
- [playing](/docs/interfaces/types_video_state.VideoState.md#playing)
- [reactPlayerRef](/docs/interfaces/types_video_state.VideoState.md#reactplayerref)
- [ready](/docs/interfaces/types_video_state.VideoState.md#ready)
- [startTime](/docs/interfaces/types_video_state.VideoState.md#starttime)
- [videoContainerRef](/docs/interfaces/types_video_state.VideoState.md#videocontainerref)
- [volume](/docs/interfaces/types_video_state.VideoState.md#volume)

## Properties

### currentRelativeTime

• **currentRelativeTime**: `number`

#### Defined in

[src/types/video-state.ts:70](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L70)

___

### currentTime

• **currentTime**: `number`

#### Defined in

[src/types/video-state.ts:69](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L69)

___

### duration

• **duration**: `number`

#### Defined in

[src/types/video-state.ts:68](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L68)

___

### emitter

• **emitter**: `Emitter`<`Record`<`EmitterEvents`, `unknown`\>\>

#### Defined in

[src/types/video-state.ts:60](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L60)

___

### endTime

• **endTime**: `number`

#### Defined in

[src/types/video-state.ts:67](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L67)

___

### hasPipTriggeredByClick

• **hasPipTriggeredByClick**: `boolean`

Did pip mode was triggered by click event

#### Defined in

[src/types/video-state.ts:78](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L78)

___

### hasPlayedOrSeeked

• **hasPlayedOrSeeked**: `boolean`

#### Defined in

[src/types/video-state.ts:74](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L74)

___

### lastActivityRef

• **lastActivityRef**: ``null`` \| `MutableRefObject`<`number`\>

#### Defined in

[src/types/video-state.ts:59](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L59)

___

### loop

• **loop**: `boolean`

#### Defined in

[src/types/video-state.ts:71](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L71)

___

### muted

• **muted**: `boolean`

#### Defined in

[src/types/video-state.ts:65](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L65)

___

### oneTimeStopPoint

• **oneTimeStopPoint**: ``null`` \| `number`

#### Defined in

[src/types/video-state.ts:76](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L76)

___

### pip

• **pip**: `boolean`

#### Defined in

[src/types/video-state.ts:75](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L75)

___

### playPromiseRef

• **playPromiseRef**: `MutableRefObject`<`undefined` \| `Promise`<`void`\>\>

#### Defined in

[src/types/video-state.ts:62](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L62)

___

### playbackRate

• **playbackRate**: `number`

#### Defined in

[src/types/video-state.ts:63](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L63)

___

### playing

• **playing**: `boolean`

#### Defined in

[src/types/video-state.ts:64](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L64)

___

### reactPlayerRef

• **reactPlayerRef**: `RefObject`<`default`\>

#### Defined in

[src/types/video-state.ts:61](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L61)

___

### ready

• **ready**: `boolean`

#### Defined in

[src/types/video-state.ts:73](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L73)

___

### startTime

• **startTime**: `number`

#### Defined in

[src/types/video-state.ts:66](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L66)

___

### videoContainerRef

• **videoContainerRef**: `RefObject`<`HTMLDivElement`\>

Storing wrapper ref of the videoPlayer

#### Defined in

[src/types/video-state.ts:80](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L80)

___

### volume

• **volume**: `number`

#### Defined in

[src/types/video-state.ts:72](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L72)
