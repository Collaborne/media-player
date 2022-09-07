[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [types/actions](/docs/modules/types_actions.md) / VideoActions

# Interface: VideoActions

[types/actions](/docs/modules/types_actions.md).VideoActions

List of setters for the VideoState

## Table of contents

### Properties

- [\_handleProgress](/docs/interfaces/types_actions.VideoActions.md#_handleprogress)
- [\_setReady](/docs/interfaces/types_actions.VideoActions.md#_setready)
- [addHighlightToStart](/docs/interfaces/types_actions.VideoActions.md#addhighlighttostart)
- [exitPip](/docs/interfaces/types_actions.VideoActions.md#exitpip)
- [mute](/docs/interfaces/types_actions.VideoActions.md#mute)
- [pause](/docs/interfaces/types_actions.VideoActions.md#pause)
- [play](/docs/interfaces/types_actions.VideoActions.md#play)
- [replaceHighlights](/docs/interfaces/types_actions.VideoActions.md#replacehighlights)
- [requestPip](/docs/interfaces/types_actions.VideoActions.md#requestpip)
- [setCurrentTime](/docs/interfaces/types_actions.VideoActions.md#setcurrenttime)
- [setDuration](/docs/interfaces/types_actions.VideoActions.md#setduration)
- [setEndTime](/docs/interfaces/types_actions.VideoActions.md#setendtime)
- [setHasPipTriggeredByClick](/docs/interfaces/types_actions.VideoActions.md#sethaspiptriggeredbyclick)
- [setLoop](/docs/interfaces/types_actions.VideoActions.md#setloop)
- [setNewBounds](/docs/interfaces/types_actions.VideoActions.md#setnewbounds)
- [setPlaybackRate](/docs/interfaces/types_actions.VideoActions.md#setplaybackrate)
- [setStartTime](/docs/interfaces/types_actions.VideoActions.md#setstarttime)
- [setVolume](/docs/interfaces/types_actions.VideoActions.md#setvolume)
- [unmute](/docs/interfaces/types_actions.VideoActions.md#unmute)

## Properties

### \_handleProgress

• **\_handleProgress**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `currentTime`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `currentTime`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `currentTime` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:44](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L44)

___

### \_setReady

• **\_setReady**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:43](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L43)

___

### addHighlightToStart

• **addHighlightToStart**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `highlights`: [`Highlight`](/docs/interfaces/types_video_state.Highlight.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `highlights`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `highlights` | [`Highlight`](/docs/interfaces/types_video_state.Highlight.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:38](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L38)

___

### exitPip

• **exitPip**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:33](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L33)

___

### mute

• **mute**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:12](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L12)

___

### pause

• **pause**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:11](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L11)

___

### play

• **play**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:9](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L9)

___

### replaceHighlights

• **replaceHighlights**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `highlights`: [`Highlight`](/docs/interfaces/types_video_state.Highlight.md)[]) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `highlights`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `highlights` | [`Highlight`](/docs/interfaces/types_video_state.Highlight.md)[] |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:34](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L34)

___

### requestPip

• **requestPip**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:32](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L32)

___

### setCurrentTime

• **setCurrentTime**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `relativeSeconds`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `relativeSeconds`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `relativeSeconds` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:20](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L20)

___

### setDuration

• **setDuration**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `duration`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `duration`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `duration` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:30](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L30)

___

### setEndTime

• **setEndTime**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `endTime`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `endTime`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `endTime` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:29](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L29)

___

### setHasPipTriggeredByClick

• **setHasPipTriggeredByClick**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `hasPipTriggeredByClick`: `boolean`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `hasPipTriggeredByClick`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `hasPipTriggeredByClick` | `boolean` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:24](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L24)

___

### setLoop

• **setLoop**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `loop`: `boolean`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `loop`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `loop` | `boolean` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:14](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L14)

___

### setNewBounds

• **setNewBounds**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `duration`: `NewBounds`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `duration`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `duration` | `NewBounds` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:10](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L10)

___

### setPlaybackRate

• **setPlaybackRate**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `playbackRate`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `playbackRate`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `playbackRate` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:15](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L15)

___

### setStartTime

• **setStartTime**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `startTime`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `startTime`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `startTime` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:28](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L28)

___

### setVolume

• **setVolume**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md), `volume`: `number`) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`, `volume`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |
| `volume` | `number` |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:19](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L19)

___

### unmute

• **unmute**: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Type declaration

▸ (`state`): [`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

[`PartialVideoState`](/docs/modules/types_actions.md#partialvideostate)

#### Defined in

[src/types/actions.ts:13](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L13)
