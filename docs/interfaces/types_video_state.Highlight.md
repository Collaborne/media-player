[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [types/video-state](/docs/modules/types_video_state.md) / Highlight

# Interface: Highlight

[types/video-state](/docs/modules/types_video_state.md).Highlight

An interval of timestamps in seconds, that will be "highlighted" in the scrub bar. Useful when you want to split video duration into small segments/chunks

## Hierarchy

- [`Segment`](/docs/interfaces/types_video_state.Segment.md)

  ↳ **`Highlight`**

## Table of contents

### Properties

- [color](/docs/interfaces/types_video_state.Highlight.md#color)
- [end](/docs/interfaces/types_video_state.Highlight.md#end)
- [id](/docs/interfaces/types_video_state.Highlight.md#id)
- [start](/docs/interfaces/types_video_state.Highlight.md#start)

## Properties

### color

• **color**: `string`

Color of the highlight. This must be a HEX color code

#### Defined in

[src/types/video-state.ts:40](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L40)

___

### end

• **end**: `number`

End time of a segment

#### Inherited from

[Segment](/docs/interfaces/types_video_state.Segment.md).[end](/docs/interfaces/types_video_state.Segment.md#end)

#### Defined in

[src/types/video-state.ts:32](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L32)

___

### id

• **id**: `string`

Id of the highlight

#### Defined in

[src/types/video-state.ts:38](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L38)

___

### start

• **start**: `number`

Starting time of a segment

#### Inherited from

[Segment](/docs/interfaces/types_video_state.Segment.md).[start](/docs/interfaces/types_video_state.Segment.md#start)

#### Defined in

[src/types/video-state.ts:30](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L30)
