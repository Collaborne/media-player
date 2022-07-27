# @collaborne/video-player
A video player build in React on top of [CookPete/react-player](https://github.com/CookPete/react-player). With nice 
[MUI theming](https://mui.com) support and stylish replacement of browser video controls (UI and PiP event).
And yes, it is updated to **React v18** :balloon:!

*Note: At the moment support only on video files! Other sources are not yet supported(Youtube/vimeo...)* 

[Live demo](https://collaborne.github.io/video-player/)

## Install

```bash
npm install --save @collaborne/video-player
```

## How to use
 - **Simplified** or *out of the box* - if you don't need to manage any states by your own, or usage of the api, you can just use VideoPlayer

```import React from 'react';
import { VideoPlayer } from '@collaborne/video-player';

export const MyComponent: React.FC = () => {
	return (
		<VideoPlayer videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" />
	);
};
```
-  **Composed**  or *individual*-  This case recommended is when you need to control video state (playing, pausing, muting...). 
You need wrap your components in `VideoProvider` and add `VideoContainer` as a children too. 
Then you can consume `VideoContext` via `useVideo` hook.
```
import React from 'react';
import { useVideo, VideoProvider, VideoContainer } from '@collaborne/video-player';

const App = () => {
  <VideoProvider
		controlsConfig={{
			alwaysShowConfig: true,
		}}
	>
    <MyComponent1/>
    <MyComponent2/>
    <VideoContainer videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"/>
    <MyComponent3/>
    ...
  </VideoProvider>
}

const MyComponent2: React.FC = () => {
	const { api } = useVideo();
	return (
		<div>
			<p>Video is playing: {api?.getPlaying?.()}</p>
			<p>Video is muted: {api?.getMuted?.()}</p>
			<p>Video total duration: {api?.getDuration?.()}</p>
		</div>
	);
};
```
[Image](https://i.ibb.co/kxzKhWB/Screenshot-from-2022-07-26-22-41-43.png)

## Interfaces

  -  `ControlsConfig` - all parameters are **optional**
  
|name                          |type   	        | default value   	| description   	|   	
| ---	                         | ---	          | ---	              | ---	            |
|   alwaysShowConfig           |   `boolean`    |    false          |    Always show action panel on top right side(without hiding)|
|   bottomControls             |   `boolean`    |    true           |    Show bottom control panel|
|   fileActionsPanel           |   `boolean`    |    true           |    Shows action panel on top right side|
|   pip                        |   `boolean`    |    true           |    Shows pip button in the bottom control panel|
|   fullscreen                 |   `boolean`    |    true           |    Shows fullscreen button in the bottom control panel|
|   volume                     |   `boolean`    |    true           |    Shows volume controls in the bottom control panel|
|   speed                      |   `boolean`    |    true           |    Shows playback rate in the bottom control panel|
|   progressBar                |   `boolean`    |    true           |    Shows video's progress bar|
|   eventAnimationDurationMs   |   `number`     |    300            |    Play/pause animation duration for these events |
  
### for the Simplified
- `VideoPlayerProps` - the **Simplified** case. 

  *Note1: The only **required** param is **videoUrl***   
  *Note2: **FileActionPanel** and props that are provided to it **are used in collaborne internal projects**. How to disable it - just update controlsConfig params. More integration information - PM.*   

|    name                      |   type   	                     | default value   	            | description   	|   	
|   :---	                     |---	                             |  -	                          |  ---	          | 
|   videoUrl     	             |   `string`    	                 |  -  	                        |   The url of the video file to be played   	|   	
|   className	                 |   `string`   	                 |  -                           |   CSS class name applied to component   	|   	
|   theme 	                   |   `Theme`                       |  -                          	|   A MUI theme to control the stylization of the player .   	|   	
|   controlsConfig 	           |   `ControlsConfig`              | `DEFAULT_CONTROLS_CONFIG`  	|   Configuration that enables/disables some parts of the overlay on top of the video player  	|   	
|   actionPanelClassName       |   `string`                      | -  	                        |   CSS class name applied to the file action panel    	|   	
|   currentPlayingUrl          |   `string`                      | -                            |   Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*    	|   	
|   setCurrentPlayingUrl       |   `(videoUrl: string) => void`  | -                            |   A function that handles changing of the currentPlayingUrl    	|   	
|   onDelete                   |   `VoidFunction`                | -                            |   Used in FileActionPanel. Delete the current video     	|   	
|   onDownload                 |   `VoidFunction`                | -                            |   Used in FileActionPanel. Download the current video     	|   	
|   setAsCover                 |   `VoidFunction`                | -                            |   Used in FileActionPanel. Set current note thumbnail to this video thumbnail      	|   	
|   removeAsCover              |   `VoidFunction`                | -                            |   Used in FileActionPanel. Remove this thumbnail from note thumbnail     	|   	
|   isCover                    |   `boolean`                     | -                            |   Used in FileActionPanel. If this video's thumbnails is set as a cover image for the note    	|   	
|   hasImageCover              |   `boolean`                     | -                            |   Used in FileActionPanel. Video has a cover image! Some video do not have thumbnails!   	|   	

### for the Composed

- `VideoProviderProps` - the **Composed** case. 

  *Note1: All params are optional, except children(ReactNode)*   
	*Note2: If you do not use **FileActionPanel**, then set for the `controlsConfig={fileActionsPanel: false}`. VideoProvider - to set the UI components*

|    name                      |   type   	                     | default value   	            | description   	|   	
|   :---	                     |---	                             |  -	                          |  ---	          | 
|   controlsConfig 	           |   `ControlsConfig`              | `DEFAULT_CONTROLS_CONFIG`  	|   Configuration that enables/disables some parts of the overlay on top of the video player  	|   	
|   initialState  	           |   `VideoPlayerInitialState`     | `PROVIDER_INITIAL_STATE`   	|   Initial state for the React Provider  	|   	
|   persistedState  	         |   `VideoState`                  | `VideoState`               	|   State that needs to be persisted in local storage. *Ex: playbackRate, muted, volume...*   	|   	
|   children  	               |   `ReactNode`                   |  -                         	|   ReactNode that will be wrapped into provider   	|   	

- `VideoContainerProps`- the **Composed** case. 

  *Note1: The only **required** param is **videoUrl***   
  *Note2: **FileActionPanel** and props that are provided to it **are used in collaborne internal projects**. How to disable it - just update controlsConfig params. More integration information - PM.*   

|    name                      |   type   	                     | default value   	            | description   	|   	
|   :---	                     |---	                             |  -	                          |  ---	          | 
|   videoUrl     	             |   `string`    	                 |  -  	                        |   The url of the video file to be played   	|   	
|   className	                 |   `string`   	                 |  -                           |   CSS class name applied to component   	|   	
|   hasPlayEnabled 	           |   `Theme`                       |  -                          	|   Is play behavior enabled. In the background it checks   	|   	
|   actionPanelClassName       |   `string`                      | -  	                        |   CSS class name applied to the file action panel    	|   	
|   currentPlayingUrl          |   `string`                      | -                            |   Used when you have multiple videos, and only one video is played at same time. *Ex: Video 1 plays, and video 2 is on pause. Playing video 2, pauses video 1*    	|   	
|   setCurrentPlayingUrl       |   `(videoUrl: string) => void`  | -                            |   A function that handles changing of the currentPlayingUrl    	|   	
|   onDelete                   |   `VoidFunction`                | -                            |   Used in FileActionPanel. Delete the current video     	|   	
|   onDownload                 |   `VoidFunction`                | -                            |   Used in FileActionPanel. Download the current video     	|   	
|   setAsCover                 |   `VoidFunction`                | -                            |   Used in FileActionPanel. Set current note thumbnail to this video thumbnail      	|   	
|   removeAsCover              |   `VoidFunction`                | -                            |   Used in FileActionPanel. Remove this thumbnail from note thumbnail     	|   	
|   isCover                    |   `boolean`                     | -                            |   Used in FileActionPanel. If this video's thumbnails is set as a cover image for the note    	|   	
|   hasImageCover              |   `boolean`                     | -                            |   Used in FileActionPanel. Video has a cover image! Some video do not have thumbnails!   	|   	

- `VideoContext` - the **Composed** case, available through `useVideo` hook (can be undefined on first mount)

|    name                      |   type   	                               | description   	|   	
|   :---	                     |---	                                       |  ---	          | 
|   api     	                 |   `VideoApi`    	                         |   A collection of setters and getters for controlling video  	|   	
|   lastActivityRef	           |   `MutableRefObject<number | undefined>`  |   Last mouse activity on video player   	|   	
|   markActivity 	             |   `VoidFunction`                          |   The setter for lastActivityRef   	|   	
|   controlsConfig 	           |   `ControlsConfig`                        |   Configuration that enables/disables some parts of the overlay on top of the video player  	|   	
|   reactPlayerProps 	         |   `ReactPlayerProps`                      |   Props that are charged [CookPete/react-player](https://github.com/CookPete/react-player)  	|   	
|   state           	         |   `VideoState`                            |   The video state(play, pause, startTime, endTime, volume, isReady...)  	|   	
|   reactPlayerRef             |   `RefObject<ReactPlayer>`                |   The ref to the instance of [CookPete/react-player](https://github.com/CookPete/react-player)  	|   	
|   videoContainerRef          |   `VideoState`                            |   The wrapper of <video> tag. Mainly used for fullscreen actions  	|   	
|   fullScreenApi              |   `FullscreenApi`                         |   An api that allows you to control current fullscreen status, request, exit mode...  	|   	


## FAQ  

- **Q:** How about timing? If we need to stop a video at 1026 ms from the duration?  
 **A:** We set for [CookPete/react-player](https://github.com/CookPete/react-player) have a progressInterval of 50ms.
 So it will be stopped at interval 1000-1050ms.

- **Q:** Do you support Youtube, vimeo sources?  
 **A:** At the moment, no. We support only files.

## License

MIT © [Collaborne](https://github.com/Collaborne)
