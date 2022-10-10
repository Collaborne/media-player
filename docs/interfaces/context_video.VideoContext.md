[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [context/video](/docs/modules/context_video.md) / VideoContext

# Interface: VideoContext

[context/video](/docs/modules/context_video.md).VideoContext

## Table of contents

### Properties

- [api](/docs/interfaces/context_video.VideoContext.md#api)
- [controlsConfig](/docs/interfaces/context_video.VideoContext.md#controlsconfig)
- [fullScreenApi](/docs/interfaces/context_video.VideoContext.md#fullscreenapi)
- [getHighlightColorBlended](/docs/interfaces/context_video.VideoContext.md#gethighlightcolorblended)
- [lastActivityRef](/docs/interfaces/context_video.VideoContext.md#lastactivityref)
- [markActivity](/docs/interfaces/context_video.VideoContext.md#markactivity)
- [onContext](/docs/interfaces/context_video.VideoContext.md#oncontext)
- [reactPlayerProps](/docs/interfaces/context_video.VideoContext.md#reactplayerprops)
- [reactPlayerRef](/docs/interfaces/context_video.VideoContext.md#reactplayerref)
- [state](/docs/interfaces/context_video.VideoContext.md#state)
- [videoContainerRef](/docs/interfaces/context_video.VideoContext.md#videocontainerref)

## Properties

### api

• `Optional` **api**: `Partial`<[`VideoActionsDispatch`](/docs/modules/types_video_state.md#videoactionsdispatch) & `EmitterAddRemoveListeners` & [`VideoGettersApi`](/docs/modules/types_getters.md#videogettersapi)\>

A collection of getters, setters, emitters for the video

#### Defined in

[src/context/video.tsx:41](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L41)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Defined in

[src/context/video.tsx:47](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L47)

___

### fullScreenApi

• `Optional` **fullScreenApi**: [`FullscreenApi`](/docs/interfaces/types_video_state.FullscreenApi.md)

Fullscreen API getter and setters

#### Defined in

[src/context/video.tsx:57](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L57)

___

### getHighlightColorBlended

• `Optional` **getHighlightColorBlended**: (`colors`: `string`[]) => `undefined` \| `string`

#### Type declaration

▸ (`colors`): `undefined` \| `string`

Blending colors for highlights presented in `<ProgressBar`

##### Parameters

| Name | Type |
| :------ | :------ |
| `colors` | `string`[] |

##### Returns

`undefined` \| `string`

#### Defined in

[src/context/video.tsx:59](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L59)

___

### lastActivityRef

• `Optional` **lastActivityRef**: `MutableRefObject`<`undefined` \| `number`\>

Last activity ref(triggered by mouse move)

#### Defined in

[src/context/video.tsx:43](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L43)

___

### markActivity

• `Optional` **markActivity**: `VoidFunction`

Setter for the lastActivityRef

#### Defined in

[src/context/video.tsx:45](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L45)

___

### onContext

• `Optional` **onContext**: (`context`: [`VideoContext`](/docs/modules/context_video.md#videocontext)) => `void`

#### Type declaration

▸ (`context`): `void`

Blending colors for highlights presented in `<ProgressBar`

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`VideoContext`](/docs/modules/context_video.md#videocontext) |

##### Returns

`void`

#### Defined in

[src/context/video.tsx:61](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L61)

___

### reactPlayerProps

• `Optional` **reactPlayerProps**: `ReactPlayerProps`

Props that will be provided to ReactPlayer

#### Defined in

[src/context/video.tsx:49](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L49)

___

### reactPlayerRef

• `Optional` **reactPlayerRef**: `RefObject`<`default`\>

Instance ref for the ReactPlayer

#### Defined in

[src/context/video.tsx:53](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L53)

___

### state

• `Optional` **state**: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)

Media state

#### Defined in

[src/context/video.tsx:51](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L51)

___

### videoContainerRef

• **videoContainerRef**: `RefObject`<`HTMLDivElement`\>

Ref to the container of the <video>. Used mostly for fullscreen

#### Defined in

[src/context/video.tsx:55](https://github.com/Collaborne/video-player/blob/803dfdf/src/context/video.tsx#L55)
