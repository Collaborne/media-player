[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / types/video-state

# Module: types/video-state

## Table of contents

### Interfaces

- [FullscreenApi](/docs/interfaces/types_video_state.FullscreenApi.md)
- [VideoProviderProps](/docs/interfaces/types_video_state.VideoProviderProps.md)
- [VideoState](/docs/interfaces/types_video_state.VideoState.md)

### Type Aliases

- [VideoActionsDispatch](/docs/modules/types_video_state.md#videoactionsdispatch)
- [VideoApi](/docs/modules/types_video_state.md#videoapi)
- [VideoDispatchArgs](/docs/modules/types_video_state.md#videodispatchargs)

## Type Aliases

### VideoActionsDispatch

Ƭ **VideoActionsDispatch**: { [key in keyof VideoActions]: Function }

#### Defined in

[src/types/video-state.ts:85](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L85)

___

### VideoApi

Ƭ **VideoApi**: `Partial`<[`VideoActionsDispatch`](/docs/modules/types_video_state.md#videoactionsdispatch) & `EmitterAddRemoveListeners` & [`VideoGettersApi`](/docs/modules/types_getters.md#videogettersapi)\>

#### Defined in

[src/types/video-state.ts:92](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L92)

___

### VideoDispatchArgs

Ƭ **VideoDispatchArgs**: `unknown`[]

#### Defined in

[src/types/video-state.ts:83](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L83)
