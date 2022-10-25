[@collaborne/video-player - v1.1.2](/docs/../README.md) / [Modules](/docs/modules.md) / [types/emitters](/docs/modules/types_emitters.md) / EmitterListeners

# Interface: EmitterListeners

[types/emitters](/docs/modules/types_emitters.md).EmitterListeners

## Table of contents

### Properties

- [addEventListener](/docs/interfaces/types_emitters.EmitterListeners.md#addeventlistener)
- [removeEventListener](/docs/interfaces/types_emitters.EmitterListeners.md#removeeventlistener)

## Properties

### addEventListener

• **addEventListener**: <Key\>(`type`: `Key`, `handler`: `Handler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)[`Key`]\>) => `void`(`type`: ``"*"``, `handler`: `WildcardHandler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)\>) => `void`

#### Type declaration

▸ <`Key`\>(`type`, `handler`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`VoidEventsKey`](/docs/modules/types_emitters.md#voideventskey) \| keyof [`ExtendedEvents`](/docs/modules/types_emitters.md#extendedevents) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Key` |
| `handler` | `Handler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)[`Key`]\> |

##### Returns

`void`

▸ (`type`, `handler`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"*"`` |
| `handler` | `WildcardHandler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)\> |

##### Returns

`void`

#### Defined in

[src/types/emitters.ts:54](https://github.com/Collaborne/video-player/blob/1c3dd32/src/types/emitters.ts#L54)

___

### removeEventListener

• **removeEventListener**: <Key\>(`type`: `Key`, `handler?`: `Handler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)[`Key`]\>) => `void`(`type`: ``"*"``, `handler`: `WildcardHandler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)\>) => `void`

#### Type declaration

▸ <`Key`\>(`type`, `handler?`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `Key` | extends [`VoidEventsKey`](/docs/modules/types_emitters.md#voideventskey) \| keyof [`ExtendedEvents`](/docs/modules/types_emitters.md#extendedevents) |

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Key` |
| `handler?` | `Handler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)[`Key`]\> |

##### Returns

`void`

▸ (`type`, `handler`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"*"`` |
| `handler` | `WildcardHandler`<[`MediaEvents`](/docs/modules/types_emitters.md#mediaevents)\> |

##### Returns

`void`

#### Defined in

[src/types/emitters.ts:53](https://github.com/Collaborne/video-player/blob/1c3dd32/src/types/emitters.ts#L53)
