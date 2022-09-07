[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / types/actions

# Module: types/actions

## Table of contents

### Interfaces

- [VideoActions](/docs/interfaces/types_actions.VideoActions.md)

### Type Aliases

- [PartialVideoState](/docs/modules/types_actions.md#partialvideostate)
- [VideoAction](/docs/modules/types_actions.md#videoaction)
- [VideoActionKeys](/docs/modules/types_actions.md#videoactionkeys)
- [VideoStateSetter](/docs/modules/types_actions.md#videostatesetter)

## Type Aliases

### PartialVideoState

Ƭ **PartialVideoState**: `Partial`<[`VideoState`](/docs/interfaces/types_video_state.VideoState.md)\> \| `void`

#### Defined in

[src/types/actions.ts:3](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L3)

___

### VideoAction

Ƭ **VideoAction**: `VideoActionMap`[[`VideoActionKeys`](/docs/modules/types_actions.md#videoactionkeys)]

#### Defined in

[src/types/actions.ts:62](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L62)

___

### VideoActionKeys

Ƭ **VideoActionKeys**: keyof [`VideoActions`](/docs/interfaces/types_actions.VideoActions.md)

#### Defined in

[src/types/actions.ts:50](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L50)

___

### VideoStateSetter

Ƭ **VideoStateSetter**: `VideoSettersMap`[[`VideoActionKeys`](/docs/modules/types_actions.md#videoactionkeys)]

#### Defined in

[src/types/actions.ts:70](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/actions.ts#L70)
