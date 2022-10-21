[@collaborne/video-player - v1.1.1](/docs/../README.md) / [Modules](/docs/modules.md) / [types/media-state-external-initializers](/docs/modules/types_media_state_external_initializers.md) / MediaStateExternalInitializers

# Interface: MediaStateExternalInitializers

[types/media-state-external-initializers](/docs/modules/types_media_state_external_initializers.md).MediaStateExternalInitializers

## Table of contents

### Properties

- [alarms](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#alarms)
- [getHighlightColorBlended](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#gethighlightcolorblended)
- [initialState](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#initialstate)
- [lastActivityRef](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#lastactivityref)
- [lastPipActivityRef](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#lastpipactivityref)
- [markActivity](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#markactivity)
- [markPipActivity](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#markpipactivity)
- [mediaContainerRef](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#mediacontainerref)
- [onStoreUpdate](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#onstoreupdate)
- [playPromiseRef](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#playpromiseref)
- [reactPlayerRef](/docs/interfaces/types_media_state_external_initializers.MediaStateExternalInitializers.md#reactplayerref)

## Properties

### alarms

• **alarms**: `number`[]

Trigger points (in sec) when an alert event is emitted

#### Defined in

[src/types/media-state-external-initializers.ts:16](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L16)

___

### getHighlightColorBlended

• `Optional` **getHighlightColorBlended**: `BlendColors`

#### Defined in

[src/types/media-state-external-initializers.ts:13](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L13)

___

### initialState

• **initialState**: `CorePlayerInitialState`

#### Defined in

[src/types/media-state-external-initializers.ts:12](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L12)

___

### lastActivityRef

• **lastActivityRef**: `RefObject`<`number`\>

Store last mouse activity

#### Defined in

[src/types/media-state-external-initializers.ts:20](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L20)

___

### lastPipActivityRef

• **lastPipActivityRef**: `RefObject`<`number`\>

Store last mouse activity of the PIP player

#### Defined in

[src/types/media-state-external-initializers.ts:24](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L24)

___

### markActivity

• **markActivity**: `VoidFunction`

Marks mouse activity

#### Defined in

[src/types/media-state-external-initializers.ts:18](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L18)

___

### markPipActivity

• **markPipActivity**: `VoidFunction`

Marks mouse activity for the PIP player

#### Defined in

[src/types/media-state-external-initializers.ts:22](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L22)

___

### mediaContainerRef

• **mediaContainerRef**: `RefObject`<`HTMLDivElement`\>

#### Defined in

[src/types/media-state-external-initializers.ts:11](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L11)

___

### onStoreUpdate

• `Optional` **onStoreUpdate**: (`store`: `MediaStore`) => `void`

#### Type declaration

▸ (`store`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `MediaStore` |

##### Returns

`void`

#### Defined in

[src/types/media-state-external-initializers.ts:14](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L14)

___

### playPromiseRef

• **playPromiseRef**: `MutableRefObject`<`undefined` \| `Promise`<`void`\>\>

#### Defined in

[src/types/media-state-external-initializers.ts:10](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L10)

___

### reactPlayerRef

• **reactPlayerRef**: `RefObject`<`default`\>

#### Defined in

[src/types/media-state-external-initializers.ts:9](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state-external-initializers.ts#L9)
