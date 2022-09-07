[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [components/video-player/VideoPlayer](/docs/modules/components_video_player_VideoPlayer.md) / VideoPlayerProps

# Interface: VideoPlayerProps

[components/video-player/VideoPlayer](/docs/modules/components_video_player_VideoPlayer.md).VideoPlayerProps

## Hierarchy

- `Omit`<`FileActionPanelProps`, ``"className"``\>

- `Pick`<[`VideoProviderProps`](/docs/interfaces/types_video_state.VideoProviderProps.md), ``"controlsConfig"`` \| ``"getHighlightColorBlended"`` \| ``"onContext"``\>

  ↳ **`VideoPlayerProps`**

## Table of contents

### Properties

- [actionPanelClassName](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#actionpanelclassname)
- [className](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#classname)
- [controlsConfig](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#controlsconfig)
- [currentPlayingUrl](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#currentplayingurl)
- [getHighlightColorBlended](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#gethighlightcolorblended)
- [hasImageCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#hasimagecover)
- [isCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#iscover)
- [onContext](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#oncontext)
- [onDelete](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#ondelete)
- [onDownload](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#ondownload)
- [removeAsCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#removeascover)
- [setAsCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#setascover)
- [setCurrentPlayingUrl](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#setcurrentplayingurl)
- [theme](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#theme)
- [videoUrl](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#videourl)

## Properties

### actionPanelClassName

• `Optional` **actionPanelClassName**: `string`

CSS class name applied to the file action panel

#### Defined in

[src/components/video-player/VideoPlayer.tsx:35](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L35)

___

### className

• `Optional` **className**: `string`

CSS class name applied to component

#### Defined in

[src/components/video-player/VideoPlayer.tsx:27](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L27)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Inherited from

Pick.controlsConfig

#### Defined in

[src/types/video-state.ts:63](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L63)

___

### currentPlayingUrl

• `Optional` **currentPlayingUrl**: `string`

Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*

#### Defined in

[src/components/video-player/VideoPlayer.tsx:29](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L29)

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

#### Inherited from

Pick.getHighlightColorBlended

#### Defined in

[src/types/video-state.ts:71](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L71)

___

### hasImageCover

• `Optional` **hasImageCover**: `boolean`

If `false` - button is disabled. Note: not all videos can have thumbnails: "Old uploaded videos do not have"

#### Inherited from

Omit.hasImageCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:29](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L29)

___

### isCover

• `Optional` **isCover**: `boolean`

If video's thumbnail is current set as cover

#### Inherited from

Omit.isCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:27](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L27)

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

#### Inherited from

Pick.onContext

#### Defined in

[src/types/video-state.ts:73](https://github.com/Collaborne/video-player/blob/803dfdf/src/types/video-state.ts#L73)

___

### onDelete

• `Optional` **onDelete**: `VoidFunction`

Delete the current video

#### Inherited from

Omit.onDelete

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:21](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L21)

___

### onDownload

• `Optional` **onDownload**: `VoidFunction`

Download the current video

#### Inherited from

Omit.onDownload

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:19](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L19)

___

### removeAsCover

• `Optional` **removeAsCover**: `VoidFunction`

Remove current note thumbnail to this video thumbnail

#### Inherited from

Omit.removeAsCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:25](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L25)

___

### setAsCover

• `Optional` **setAsCover**: `VoidFunction`

Set current note thumbnail to this video thumbnail

#### Inherited from

Omit.setAsCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:23](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L23)

___

### setCurrentPlayingUrl

• `Optional` **setCurrentPlayingUrl**: (`videoUrl`: `string`) => `void`

#### Type declaration

▸ (`videoUrl`): `void`

A function that handles changing of the currentPlayingUrl

##### Parameters

| Name | Type |
| :------ | :------ |
| `videoUrl` | `string` |

##### Returns

`void`

#### Defined in

[src/components/video-player/VideoPlayer.tsx:31](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L31)

___

### theme

• `Optional` **theme**: `Theme`

A MUI theme to control the stylization of the player .

#### Defined in

[src/components/video-player/VideoPlayer.tsx:33](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L33)

___

### videoUrl

• **videoUrl**: `string`

The url of the video file to be played

#### Defined in

[src/components/video-player/VideoPlayer.tsx:25](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoPlayer.tsx#L25)
