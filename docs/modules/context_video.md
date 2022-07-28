[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / context/video

# Module: context/video

## Table of contents

### Namespaces

- [VideoProvider](/docs/modules/context_video.VideoProvider.md)

### Interfaces

- [VideoContext](/docs/interfaces/context_video.VideoContext.md)

### Variables

- [VideoContext](/docs/modules/context_video.md#videocontext)

### Functions

- [VideoProvider](/docs/modules/context_video.md#videoprovider)

## Variables

### VideoContext

• **VideoContext**: `Context`<``null`` \| [`VideoContext`](/docs/modules/context_video.md#videocontext)\>

A React Context - to share video api through components

#### Defined in

[src/context/video.tsx:34](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L34)

[src/context/video.tsx:56](https://github.com/Collaborne/video-player/blob/5338fe4/src/context/video.tsx#L56)

## Functions

### VideoProvider

▸ **VideoProvider**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

A provider that should wrap VideoContainer for context consuming

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`VideoProviderProps`](/docs/interfaces/types_video_state.VideoProviderProps.md) |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:520
