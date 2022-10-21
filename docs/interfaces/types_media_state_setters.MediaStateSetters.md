[@collaborne/video-player - v1.1.1](/docs/../README.md) / [Modules](/docs/modules.md) / [types/media-state-setters](/docs/modules/types_media_state_setters.md) / MediaStateSetters

# Interface: MediaStateSetters

[types/media-state-setters](/docs/modules/types_media_state_setters.md).MediaStateSetters

## Table of contents

### Properties

- [\_handleProgress](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#_handleprogress)
- [\_setReady](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#_setready)
- [exitFullscreen](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#exitfullscreen)
- [exitPip](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#exitpip)
- [getListener](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#getlistener)
- [mute](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#mute)
- [pause](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#pause)
- [play](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#play)
- [requestFullscreen](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#requestfullscreen)
- [requestPip](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#requestpip)
- [setCurrentTime](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setcurrenttime)
- [setDuration](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setduration)
- [setEndTime](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setendtime)
- [setHasPipTriggeredByClick](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#sethaspiptriggeredbyclick)
- [setPlaybackRate](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setplaybackrate)
- [setShowControls](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setshowcontrols)
- [setShowPipControls](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setshowpipcontrols)
- [setStartTime](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setstarttime)
- [setVolume](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#setvolume)
- [unmute](/docs/interfaces/types_media_state_setters.MediaStateSetters.md#unmute)

## Properties

### \_handleProgress

• **\_handleProgress**: (`currentTime`: `number`) => `void`

#### Type declaration

▸ (`currentTime`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `currentTime` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:23](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L23)

___

### \_setReady

• **\_setReady**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:22](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L22)

___

### exitFullscreen

• **exitFullscreen**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:18](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L18)

___

### exitPip

• **exitPip**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:16](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L16)

___

### getListener

• **getListener**: () => [`EmitterListeners`](/docs/interfaces/types_emitters.EmitterListeners.md)

#### Type declaration

▸ (): [`EmitterListeners`](/docs/interfaces/types_emitters.EmitterListeners.md)

##### Returns

[`EmitterListeners`](/docs/interfaces/types_emitters.EmitterListeners.md)

#### Defined in

[src/types/media-state-setters.ts:24](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L24)

___

### mute

• **mute**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:6](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L6)

___

### pause

• **pause**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:5](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L5)

___

### play

• **play**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:4](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L4)

___

### requestFullscreen

• **requestFullscreen**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:17](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L17)

___

### requestPip

• **requestPip**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:15](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L15)

___

### setCurrentTime

• **setCurrentTime**: (`relativeSeconds`: `number`) => `void`

#### Type declaration

▸ (`relativeSeconds`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `relativeSeconds` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:10](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L10)

___

### setDuration

• **setDuration**: (`duration`: `number`) => `void`

#### Type declaration

▸ (`duration`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:14](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L14)

___

### setEndTime

• **setEndTime**: (`endTime`: `number`) => `void`

#### Type declaration

▸ (`endTime`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `endTime` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:13](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L13)

___

### setHasPipTriggeredByClick

• **setHasPipTriggeredByClick**: (`hasPipTriggeredByClick`: `boolean`) => `void`

#### Type declaration

▸ (`hasPipTriggeredByClick`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `hasPipTriggeredByClick` | `boolean` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:11](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L11)

___

### setPlaybackRate

• **setPlaybackRate**: (`playbackRate`: `number`) => `void`

#### Type declaration

▸ (`playbackRate`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `playbackRate` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:8](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L8)

___

### setShowControls

• **setShowControls**: (`isUpdated`: `boolean`) => `void`

#### Type declaration

▸ (`isUpdated`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `isUpdated` | `boolean` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:19](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L19)

___

### setShowPipControls

• **setShowPipControls**: (`isUpdated`: `boolean`) => `void`

#### Type declaration

▸ (`isUpdated`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `isUpdated` | `boolean` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:20](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L20)

___

### setStartTime

• **setStartTime**: (`startTime`: `number`) => `void`

#### Type declaration

▸ (`startTime`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `startTime` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:12](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L12)

___

### setVolume

• **setVolume**: (`volume`: `number`) => `void`

#### Type declaration

▸ (`volume`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `volume` | `number` |

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:9](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L9)

___

### unmute

• **unmute**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/types/media-state-setters.ts:7](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/media-state-setters.ts#L7)
