[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [types/video-state](/docs/modules/types_video_state.md) / VideoProviderProps

# Interface: VideoProviderProps

[types/video-state](/docs/modules/types_video_state.md).VideoProviderProps

Context Provider for playing videos

## Table of contents

### Properties

- [children](/docs/interfaces/types_video_state.VideoProviderProps.md#children)
- [controlsConfig](/docs/interfaces/types_video_state.VideoProviderProps.md#controlsconfig)
- [getHighlightColorBlended](/docs/interfaces/types_video_state.VideoProviderProps.md#gethighlightcolorblended)
- [initialState](/docs/interfaces/types_video_state.VideoProviderProps.md#initialstate)
- [onContext](/docs/interfaces/types_video_state.VideoProviderProps.md#oncontext)
- [persistedState](/docs/interfaces/types_video_state.VideoProviderProps.md#persistedstate)

## Properties

### children

• **children**: `ReactNode`

ReactNode that will consume the context

#### Defined in

[src/types/video-state.ts:67](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L67)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Defined in

[src/types/video-state.ts:63](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L63)

___

### getHighlightColorBlended

• `Optional` **getHighlightColorBlended**: (`colors`: `string`[]) => `string`

#### Type declaration

▸ (`colors`): `string`

Blending colors for highlights presented in `<ProgressBar>`

##### Parameters

| Name | Type |
| :------ | :------ |
| `colors` | `string`[] |

##### Returns

`string`

#### Defined in

[src/types/video-state.ts:71](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L71)

___

### initialState

• `Optional` **initialState**: `VideoPlayerInitialState`

Provider's initialization state

#### Defined in

[src/types/video-state.ts:65](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L65)

___

### onContext

• `Optional` **onContext**: (`context`: [`VideoContext`](/docs/modules/context_video.md#videocontext)) => `void`

#### Type declaration

▸ (`context`): `void`

A callback that can updates VideoContext outside of the VideoProvider

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`VideoContext`](/docs/modules/context_video.md#videocontext) |

##### Returns

`void`

#### Defined in

[src/types/video-state.ts:73](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L73)

___

### persistedState

• `Optional` **persistedState**: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)

State that needs to be stored in localStorage

#### Defined in

[src/types/video-state.ts:69](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L69)