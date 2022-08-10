@collaborne/video-player - v0.1.8 / [Modules](/docs/modules.md)

# @collaborne/video-player
A video player build in React on top of [CookPete/react-player](https://github.com/CookPete/react-player). With nice 
[MUI theming](https://mui.com) support and stylish replacement of browser video controls (UI and PiP event).
And yes, it is updated to **React v18** :balloon:!

*Note: At the moment we only support url from a video file! Other media not yet supported(YouTube/Vimeo/...)* 

[Live demo](https://collaborne.github.io/video-player/)

## Install

```bash
npm install --save @collaborne/video-player
```

## How to use
 - **Simplified** or *out of the box* - if you don't need to manage any states by your own, or usage of the api, you can just use VideoPlayer

```ts
import React from 'react';
import { VideoPlayer } from '@collaborne/video-player';

export const MyComponent: React.FC = () => {
	return (
		<VideoPlayer videoUrl="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" />
	);
};
```
-  **Composed**  or *individual*-  This case recommended is when you want to control video state (playing, pausing, muting...). 
You need to wrap your components in `VideoProvider` and add `VideoContainer` as a children too. 
Then you can consume `VideoContext` via `useVideo` hook.
```ts
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

## Documentation

## Debugging

We use [debug](https://github.com/debug-js/debug) package for logging events. As you can see in our [live demo](https://collaborne.github.io/video-player/),
player provides you logs for native `<video>` play and pause events, and also when state is changed. To use it in any your environment(we used in our storybook environment)
you need to add to yours `process.env` a parameter of `DEBUG=*`, that will print all these logs in browser's DevTools.

## FAQ  

- **Q:** How about timing? If we need to stop a video at 1026ms?  
 **A:** For the [ReactPlayer](https://github.com/CookPete/react-player) we set a `progressInterval=50ms`, that means that video will stop at interval 1000-1050ms.

- **Q:** Do you support Youtube, vimeo sources?  
 **A:** At the moment, no. We support only files.

## License

Apache-2.0 © [Collaborne](https://github.com/Collaborne)
