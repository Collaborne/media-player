[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [types/video-state](/docs/modules/types_video_state.md) / VideoState

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
- [highlights](/docs/interfaces/types_video_state.VideoState.md#highlights)
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

[src/types/video-state.ts:92](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L92)

___

### currentTime

• **currentTime**: `number`

#### Defined in

[src/types/video-state.ts:91](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L91)

___

### duration

• **duration**: `number`

#### Defined in

[src/types/video-state.ts:90](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L90)

___

### emitter

• **emitter**: `Emitter`<`Record`<`EmitterEvents`, `unknown`\>\>

#### Defined in

[src/types/video-state.ts:82](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L82)

___

### endTime

• **endTime**: `number`

#### Defined in

[src/types/video-state.ts:89](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L89)

___

### hasPipTriggeredByClick

• **hasPipTriggeredByClick**: `boolean`

Did pip mode was triggered by click event

#### Defined in

[src/types/video-state.ts:100](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L100)

___

### hasPlayedOrSeeked

• **hasPlayedOrSeeked**: `boolean`

#### Defined in

[src/types/video-state.ts:96](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L96)

___

### highlights

• **highlights**: [`Highlight`](/docs/interfaces/types_video_state.Highlight.md)[]

#### Defined in

[src/types/video-state.ts:103](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L103)

___

### lastActivityRef

• **lastActivityRef**: ``null`` \| `MutableRefObject`<`number`\>

#### Defined in

[src/types/video-state.ts:81](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L81)

___

### loop

• **loop**: `boolean`

#### Defined in

[src/types/video-state.ts:93](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L93)

___

### muted

• **muted**: `boolean`

#### Defined in

[src/types/video-state.ts:87](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L87)

___

### oneTimeStopPoint

• **oneTimeStopPoint**: ``null`` \| `number`

#### Defined in

[src/types/video-state.ts:98](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L98)

___

### pip

• **pip**: `boolean`

#### Defined in

[src/types/video-state.ts:97](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L97)

___

### playPromiseRef

• **playPromiseRef**: `MutableRefObject`<`undefined` \| `Promise`<`void`\>\>

#### Defined in

[src/types/video-state.ts:84](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L84)

___

### playbackRate

• **playbackRate**: `number`

#### Defined in

[src/types/video-state.ts:85](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L85)

___

### playing

• **playing**: `boolean`

#### Defined in

[src/types/video-state.ts:86](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L86)

___

### reactPlayerRef

• **reactPlayerRef**: `RefObject`<`default`\>

#### Defined in

[src/types/video-state.ts:83](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L83)

___

### ready

• **ready**: `boolean`

#### Defined in

[src/types/video-state.ts:95](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L95)

___

### startTime

• **startTime**: `number`

#### Defined in

[src/types/video-state.ts:88](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L88)

___

### videoContainerRef

• **videoContainerRef**: `RefObject`<`HTMLDivElement`\>

Storing wrapper ref of the videoPlayer

#### Defined in

[src/types/video-state.ts:102](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L102)

___

### volume

• **volume**: `number`

#### Defined in

[src/types/video-state.ts:94](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L94)
