[@collaborne/video-player - v1.1.2](/docs/../README.md) / [Modules](/docs/modules.md) / [components/media-player/MediaPlayer](/docs/modules/components_media_player_MediaPlayer.md) / MediaPlayerProps

# Interface: MediaPlayerProps

[components/media-player/MediaPlayer](/docs/modules/components_media_player_MediaPlayer.md).MediaPlayerProps

## Hierarchy

- `Omit`<`CorePlayerProps`, ``"children"``\>

  ↳ **`MediaPlayerProps`**

## Table of contents

### Properties

- [alarms](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#alarms)
- [children](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#children)
- [className](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#classname)
- [getHighlightColorBlended](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#gethighlightcolorblended)
- [highlights](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#highlights)
- [initialState](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#initialstate)
- [onStoreUpdate](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#onstoreupdate)
- [theme](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#theme)
- [url](/docs/interfaces/components_media_player_MediaPlayer.MediaPlayerProps.md#url)

## Properties

### alarms

• `Optional` **alarms**: `number`[]

Trigger points (in sec) when an alert event is emitted

#### Inherited from

Omit.alarms

#### Defined in

[src/components/core-player/CorePlayer.tsx:38](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L38)

___

### children

• `Optional` **children**: `ReactNode`

#### Defined in

[src/components/media-player/MediaPlayer.tsx:30](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/media-player/MediaPlayer.tsx#L30)

___

### className

• `Optional` **className**: `string`

CSS class name applied to component

#### Inherited from

Omit.className

#### Defined in

[src/components/core-player/CorePlayer.tsx:25](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L25)

___

### getHighlightColorBlended

• `Optional` **getHighlightColorBlended**: `BlendColors`

Blend highlights colors in the scrub bar

#### Inherited from

Omit.getHighlightColorBlended

#### Defined in

[src/components/core-player/CorePlayer.tsx:31](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L31)

___

### highlights

• `Optional` **highlights**: [`Highlight`](/docs/interfaces/types_media_state.Highlight.md)[]

Highlights to be displayed in the scrub bar

#### Inherited from

Omit.highlights

#### Defined in

[src/components/core-player/CorePlayer.tsx:29](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L29)

___

### initialState

• `Optional` **initialState**: `CorePlayerInitialState`

`CorePlayer` initial state

#### Inherited from

Omit.initialState

#### Defined in

[src/components/core-player/CorePlayer.tsx:35](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L35)

___

### onStoreUpdate

• `Optional` **onStoreUpdate**: (`store`: `MediaStore`) => `void`

#### Type declaration

▸ (`store`): `void`

Callback for media store update

##### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `MediaStore` |

##### Returns

`void`

#### Inherited from

Omit.onStoreUpdate

#### Defined in

[src/components/core-player/CorePlayer.tsx:33](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L33)

___

### theme

• `Optional` **theme**: `Theme`

A MUI theme to control the stylization of the player .

#### Inherited from

Omit.theme

#### Defined in

[src/components/core-player/CorePlayer.tsx:27](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L27)

___

### url

• **url**: `string`

The url of the media file to be played

#### Inherited from

Omit.url

#### Defined in

[src/components/core-player/CorePlayer.tsx:23](https://github.com/Collaborne/video-player/blob/1c3dd32/src/components/core-player/CorePlayer.tsx#L23)
