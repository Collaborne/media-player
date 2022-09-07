[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / types/video-state

# Module: types/video-state

## Table of contents

### Interfaces

- [FullscreenApi](/docs/interfaces/types_video_state.FullscreenApi.md)
- [Highlight](/docs/interfaces/types_video_state.Highlight.md)
- [Segment](/docs/interfaces/types_video_state.Segment.md)
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

[src/types/video-state.ts:108](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L108)

___

### VideoApi

Ƭ **VideoApi**: `Partial`<[`VideoActionsDispatch`](/docs/modules/types_video_state.md#videoactionsdispatch) & `EmitterAddRemoveListeners` & [`VideoGettersApi`](/docs/modules/types_getters.md#videogettersapi)\>

#### Defined in

[src/types/video-state.ts:115](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L115)

___

### VideoDispatchArgs

Ƭ **VideoDispatchArgs**: `unknown`[]

#### Defined in

[src/types/video-state.ts:106](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L106)
