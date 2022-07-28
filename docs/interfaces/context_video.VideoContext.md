[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / [context/video](/docs/modules/context_video.md) / VideoContext

# Interface: VideoContext

[context/video](/docs/modules/context_video.md).VideoContext

## Table of contents

### Properties

- [api](/docs/interfaces/context_video.VideoContext.md#api)
- [controlsConfig](/docs/interfaces/context_video.VideoContext.md#controlsconfig)
- [fullScreenApi](/docs/interfaces/context_video.VideoContext.md#fullscreenapi)
- [lastActivityRef](/docs/interfaces/context_video.VideoContext.md#lastactivityref)
- [markActivity](/docs/interfaces/context_video.VideoContext.md#markactivity)
- [reactPlayerProps](/docs/interfaces/context_video.VideoContext.md#reactplayerprops)
- [reactPlayerRef](/docs/interfaces/context_video.VideoContext.md#reactplayerref)
- [state](/docs/interfaces/context_video.VideoContext.md#state)
- [videoContainerRef](/docs/interfaces/context_video.VideoContext.md#videocontainerref)

## Properties

### api

• `Optional` **api**: `Partial`<[`VideoActionsDispatch`](/docs/modules/types_video_state.md#videoactionsdispatch) & `EmitterAddRemoveListeners` & [`VideoGettersApi`](/docs/modules/types_getters.md#videogettersapi)\>

A collection of getters, setters, emitters for the video

#### Defined in

[src/context/video.tsx:36](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L36)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Defined in

[src/context/video.tsx:42](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L42)

___

### fullScreenApi

• `Optional` **fullScreenApi**: [`FullscreenApi`](/docs/interfaces/types_video_state.FullscreenApi.md)

Fullscreen API getter and setters

#### Defined in

[src/context/video.tsx:52](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L52)

___

### lastActivityRef

• `Optional` **lastActivityRef**: `MutableRefObject`<`undefined` \| `number`\>

Last activity ref(triggered by mouse move)

#### Defined in

[src/context/video.tsx:38](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L38)

___

### markActivity

• `Optional` **markActivity**: `VoidFunction`

Setter for the lastActivityRef

#### Defined in

[src/context/video.tsx:40](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L40)

___

### reactPlayerProps

• `Optional` **reactPlayerProps**: `ReactPlayerProps`

Props that will be provided to ReactPlayer

#### Defined in

[src/context/video.tsx:44](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L44)

___

### reactPlayerRef

• `Optional` **reactPlayerRef**: `RefObject`<`default`\>

Instance ref for the ReactPlayer

#### Defined in

[src/context/video.tsx:48](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L48)

___

### state

• `Optional` **state**: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)

Video state

#### Defined in

[src/context/video.tsx:46](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L46)

___

### videoContainerRef

• **videoContainerRef**: `RefObject`<`HTMLDivElement`\>

Ref to the container of the <video>. Used mostly for fullscreen

#### Defined in

[src/context/video.tsx:50](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L50)
