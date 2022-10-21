[@collaborne/video-player - v1.1.1](/docs/../README.md) / [Modules](/docs/modules.md) / types/emitters

# Module: types/emitters

## Table of contents

### Interfaces

- [EmitterListeners](/docs/interfaces/types_emitters.EmitterListeners.md)

### Type Aliases

- [EmitterEvents](/docs/modules/types_emitters.md#emitterevents)
- [ExtendedEvents](/docs/modules/types_emitters.md#extendedevents)
- [MediaEvents](/docs/modules/types_emitters.md#mediaevents)
- [ShowControlsEvent](/docs/modules/types_emitters.md#showcontrolsevent)
- [TimeUpdateEvent](/docs/modules/types_emitters.md#timeupdateevent)
- [VoidEvents](/docs/modules/types_emitters.md#voidevents)
- [VoidEventsKey](/docs/modules/types_emitters.md#voideventskey)

### Functions

- [isShowControlsEvent](/docs/modules/types_emitters.md#isshowcontrolsevent)
- [isTimeUpdateEvent](/docs/modules/types_emitters.md#istimeupdateevent)

## Type Aliases

### EmitterEvents

Ƭ **EmitterEvents**: `Emitter`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)\>

#### Defined in

[src/types/emitters.ts:36](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L36)

___

### ExtendedEvents

Ƭ **ExtendedEvents**: `Object`

Events that MediaApi is listening, and have arguments

#### Type declaration

| Name | Type |
| :------ | :------ |
| `durationchange` | { `duration`: `number`  } |
| `durationchange.duration` | `number` |
| `onTimeAlarm` | [`TimeUpdateEvent`](/docs/modules/types_emitters.md#timeupdateevent) |
| `progress` | [`TimeUpdateEvent`](/docs/modules/types_emitters.md#timeupdateevent) |
| `seeked` | { `diffMs`: `number`  } |
| `seeked.diffMs` | `number` |
| `setPlaybackRate` | { `playbackRate`: `number`  } |
| `setPlaybackRate.playbackRate` | `number` |
| `showControls` | [`ShowControlsEvent`](/docs/modules/types_emitters.md#showcontrolsevent) |
| `showPipControls` | [`ShowControlsEvent`](/docs/modules/types_emitters.md#showcontrolsevent) |
| `timeupdate` | [`TimeUpdateEvent`](/docs/modules/types_emitters.md#timeupdateevent) |

#### Defined in

[src/types/emitters.ts:23](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L23)

___

### MediaEvents

Ƭ **MediaEvents**: [`VoidEvents`](/docs/modules/types_emitters.md#voidevents) & [`ExtendedEvents`](/docs/modules/types_emitters.md#extendedevents)

#### Defined in

[src/types/emitters.ts:34](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L34)

___

### ShowControlsEvent

Ƭ **ShowControlsEvent**: `Object`

Event emitted when `showControls` was triggered

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isUpdated` | `boolean` |

#### Defined in

[src/types/emitters.ts:41](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L41)

___

### TimeUpdateEvent

Ƭ **TimeUpdateEvent**: `Record`<``"seconds"`` \| ``"duration"``, `number`\>

Event emitted on `timeupdate`. Same as browsers native

#### Defined in

[src/types/emitters.ts:39](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L39)

___

### VoidEvents

Ƭ **VoidEvents**: `Record`<[`VoidEventsKey`](/docs/modules/types_emitters.md#voideventskey), `void`\>

Events that MediaApi is listening, and have no arguments

#### Defined in

[src/types/emitters.ts:20](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L20)

___

### VoidEventsKey

Ƭ **VoidEventsKey**: ``"*"`` \| ``"play"`` \| ``"pause"`` \| ``"autoplayStart"`` \| ``"ready"`` \| ``"firstReady"`` \| ``"ended"`` \| ``"mute"`` \| ``"unnmute"`` \| ``"end"`` \| ``"pipEnter"`` \| ``"pipExit"`` \| ``"fullscreenEnter"`` \| ``"fullscreenExit"``

#### Defined in

[src/types/emitters.ts:3](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L3)

## Functions

### isShowControlsEvent

▸ **isShowControlsEvent**(`event`): event is ShowControlsEvent

Typeguard for `ShowControlsEvent`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `unknown` |

#### Returns

event is ShowControlsEvent

#### Defined in

[src/types/emitters.ts:43](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L43)

___

### isTimeUpdateEvent

▸ **isTimeUpdateEvent**(`event`): event is TimeUpdateEvent

Typeguard for `TimeUpdateEvent`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `unknown` |

#### Returns

event is TimeUpdateEvent

#### Defined in

[src/types/emitters.ts:48](https://github.com/Collaborne/video-player/blob/9f9c33d/src/types/emitters.ts#L48)
