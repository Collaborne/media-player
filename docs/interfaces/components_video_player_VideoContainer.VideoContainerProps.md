[@collaborne/video-player - v0.1.12](/docs/../README.md) / [Modules](/docs/modules.md) / [components/video-player/VideoContainer](/docs/modules/components_video_player_VideoContainer.md) / VideoContainerProps

# Interface: VideoContainerProps

[components/video-player/VideoContainer](/docs/modules/components_video_player_VideoContainer.md).VideoContainerProps

VideoContainer Props

## Hierarchy

- `Omit`<`ControlProps`, ``"isVisible"``\>

  ↳ **`VideoContainerProps`**

## Table of contents

### Properties

- [actionPanelClassName](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#actionpanelclassname)
- [className](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#classname)
- [hasImageCover](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#hasimagecover)
- [hasPlayEnabled](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#hasplayenabled)
- [isCover](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#iscover)
- [onDelete](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#ondelete)
- [onDownload](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#ondownload)
- [onPlay](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#onplay)
- [removeAsCover](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#removeascover)
- [setAsCover](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#setascover)
- [url](/docs/interfaces/components_video_player_VideoContainer.VideoContainerProps.md#videourl)

## Properties

### actionPanelClassName

• `Optional` **actionPanelClassName**: `string`

#### Inherited from

Omit.actionPanelClassName

#### Defined in

[src/components/controls/Controls.tsx:23](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/controls/Controls.tsx#L23)

___

### className

• `Optional` **className**: `string`

CSS class name applied to component

#### Defined in

[src/components/video-player/VideoContainer.tsx:24](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoContainer.tsx#L24)

___

### hasImageCover

• `Optional` **hasImageCover**: `boolean`

If `false` - button is disabled. Note: not all videos can have thumbnails: "Old uploaded videos do not have"

#### Inherited from

Omit.hasImageCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:29](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L29)

___

### hasPlayEnabled

• `Optional` **hasPlayEnabled**: `boolean`

Boolean that represents if the play is enabled.

#### Defined in

[src/components/video-player/VideoContainer.tsx:20](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoContainer.tsx#L20)

___

### isCover

• `Optional` **isCover**: `boolean`

If video's thumbnail is current set as cover

#### Inherited from

Omit.isCover

#### Defined in

[src/components/file-action-panel/FileActionPanel.tsx:27](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/file-action-panel/FileActionPanel.tsx#L27)

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

### onPlay

• `Optional` **onPlay**: `VoidFunction`

Callback triggered by play event

#### Defined in

[src/components/video-player/VideoContainer.tsx:22](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoContainer.tsx#L22)

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

### url

• **url**: `string`

The url of the video file to be played

#### Defined in

[src/components/video-player/VideoContainer.tsx:18](https://github.com/Collaborne/video-player/blob/803dfdf/src/components/video-player/VideoContainer.tsx#L18)
