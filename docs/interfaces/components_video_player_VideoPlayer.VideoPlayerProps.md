[@collaborne/video-player - v0.1.8](/docs/../README.md) / [Modules](/docs/modules.md) / [components/video-player/VideoPlayer](/docs/modules/components_video_player_VideoPlayer.md) / VideoPlayerProps

# Interface: VideoPlayerProps

[components/video-player/VideoPlayer](/docs/modules/components_video_player_VideoPlayer.md).VideoPlayerProps

## Hierarchy

- `Omit`<`FileActionPanelProps`, ``"className"``\>

  ↳ **`VideoPlayerProps`**

## Table of contents

### Properties

- [actionPanelClassName](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#actionpanelclassname)
- [className](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#classname)
- [controlsConfig](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#controlsconfig)
- [currentPlayingUrl](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#currentplayingurl)
- [hasImageCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#hasimagecover)
- [isCover](/docs/interfaces/components_video_player_VideoPlayer.VideoPlayerProps.md#iscover)
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

[src/components/video-player/VideoPlayer.tsx:28](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L28)

___

### className

• `Optional` **className**: `string`

CSS class name applied to component

#### Defined in

[src/components/video-player/VideoPlayer.tsx:18](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L18)

___

### controlsConfig

• `Optional` **controlsConfig**: [`ControlsConfig`](/docs/interfaces/types_controls.ControlsConfig.md)

Configuration that enables/disables some parts of the overlay on top of the video player

#### Defined in

[src/components/video-player/VideoPlayer.tsx:20](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L20)

___

### currentPlayingUrl

• `Optional` **currentPlayingUrl**: `string`

Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*

#### Defined in

[src/components/video-player/VideoPlayer.tsx:22](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L22)

___

### hasImageCover

• `Optional` **hasImageCover**: `boolean`

If `false` - button is disabled. Note: not all videos can have thumbnails: "Old uploaded videos do not have"

#### Inherited from

Omit.hasImageCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:29](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L29)

___

### isCover

• `Optional` **isCover**: `boolean`

If video's thumbnail is current set as cover

#### Inherited from

Omit.isCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:27](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L27)

___

### onDelete

• `Optional` **onDelete**: `VoidFunction`

Delete the current video

#### Inherited from

Omit.onDelete

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:21](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L21)

___

### onDownload

• `Optional` **onDownload**: `VoidFunction`

Download the current video

#### Inherited from

Omit.onDownload

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:19](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L19)

___

### removeAsCover

• `Optional` **removeAsCover**: `VoidFunction`

Remove current note thumbnail to this video thumbnail

#### Inherited from

Omit.removeAsCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:25](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L25)

___

### setAsCover

• `Optional` **setAsCover**: `VoidFunction`

Set current note thumbnail to this video thumbnail

#### Inherited from

Omit.setAsCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:23](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/file-action-panel/FileActionPanel.tsx#L23)

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

[src/components/video-player/VideoPlayer.tsx:24](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L24)

___

### theme

• `Optional` **theme**: `Theme`

A MUI theme to control the stylization of the player .

#### Defined in

[src/components/video-player/VideoPlayer.tsx:26](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L26)

___

### videoUrl

• **videoUrl**: `string`

The url of the video file to be played

#### Defined in

[src/components/video-player/VideoPlayer.tsx:16](https://github.com/Collaborne/video-player/blob/5338fe4/src/components/video-player/VideoPlayer.tsx#L16)
