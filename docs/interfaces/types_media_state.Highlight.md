[@collaborne/video-player - v1.1.1](/docs/../README.md) / [Modules](/docs/modules.md) / [types/media-state](/docs/modules/types_media_state.md) / Highlight

# Interface: Highlight

[types/media-state](/docs/modules/types_media_state.md).Highlight

An interval of timestamps in seconds, that will be "highlighted" in the scrub bar. Useful when you want to split media duration into small segments/chunks

## Hierarchy

- [`Segment`](/docs/interfaces/types_media_state.Segment.md)

  ↳ **`Highlight`**

## Table of contents

### Properties

- [colors](/docs/interfaces/types_media_state.Highlight.md#colors)
- [end](/docs/interfaces/types_media_state.Highlight.md#end)
- [id](/docs/interfaces/types_media_state.Highlight.md#id)
- [start](/docs/interfaces/types_media_state.Highlight.md#start)

## Properties

### colors

• **colors**: `string`[]

Color of the highlight. This must be a HEX color code

#### Defined in

[src/types/media-state.ts:16](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state.ts#L16)

___

### end

• **end**: `number`

End time of a segment

#### Inherited from

[Segment](/docs/interfaces/types_media_state.Segment.md).[end](/docs/interfaces/types_media_state.Segment.md#end)

#### Defined in

[src/types/media-state.ts:8](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state.ts#L8)

___

### id

• **id**: `string`

Id of the highlight

#### Defined in

[src/types/media-state.ts:14](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state.ts#L14)

___

### start

• **start**: `number`

Starting time of a segment

#### Inherited from

[Segment](/docs/interfaces/types_media_state.Segment.md).[start](/docs/interfaces/types_media_state.Segment.md#start)

#### Defined in

[src/types/media-state.ts:6](https://github.com/Collaborne/video-player/blob/4f0c880/src/types/media-state.ts#L6)
