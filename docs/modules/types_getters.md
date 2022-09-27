[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / types/getters

# Module: types/getters

## Table of contents

### Interfaces

- [VideoGetters](/docs/interfaces/types_getters.VideoGetters.md)

### Type Aliases

- [VideoGetter](/docs/modules/types_getters.md#videogetter)
- [VideoGettersApi](/docs/modules/types_getters.md#videogettersapi)
- [VideoGettersKey](/docs/modules/types_getters.md#videogetterskey)

## Type Aliases

### VideoGetter

Ƭ **VideoGetter**<`T`\>: (`state`: [`VideoState`](/docs/interfaces/types_video_state.VideoState.md)) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`state`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VideoState`](/docs/interfaces/types_video_state.VideoState.md) |

##### Returns

`T`

#### Defined in

[src/types/getters.ts:3](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/getters.ts#L3)

___

### VideoGettersApi

Ƭ **VideoGettersApi**: { [K in VideoGettersKey]: Function }

#### Defined in

[src/types/getters.ts:28](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/getters.ts#L28)

___

### VideoGettersKey

Ƭ **VideoGettersKey**: keyof [`VideoGetters`](/docs/interfaces/types_getters.VideoGetters.md)

#### Defined in

[src/types/getters.ts:26](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/getters.ts#L26)