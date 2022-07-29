[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / [types/video-state](/docs/modules/types_video_state.md) / VideoProviderProps

# Interface: VideoProviderProps

[types/video-state](/docs/modules/types_video_state.md).VideoProviderProps

Context Provider for playing videos

## Table of contents

### Properties

- [children](/docs/interfaces/types_video_state.VideoProviderProps.md#children)
- [controlsConfig](/docs/interfaces/types_video_state.VideoProviderProps.md#controlsconfig)
- [initialState](/docs/interfaces/types_video_state.VideoProviderProps.md#initialstate)
- [persistedState](/docs/interfaces/types_video_state.VideoProviderProps.md#persistedstate)

## Properties

### children

• **children**: `ReactNode`

ReactNode that will consume the context

#### Defined in

[src/types/video-state.ts:49](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L49)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Defined in

[src/types/video-state.ts:45](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L45)

___

### initialState

• `Optional` **initialState**: `VideoPlayerInitialState`

Provider's initialization state

#### Defined in

[src/types/video-state.ts:47](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L47)

___

### persistedState

• `Optional` **persistedState**: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)

State that needs to be stored in localStorage

#### Defined in

[src/types/video-state.ts:51](https://github.com/Collaborne/video-player/blob/5338fe4/src/types/video-state.ts#L51)
