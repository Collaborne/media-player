@collaborne/video-player - v1.1.1 / [Modules](/docs/modules.md)

# @collaborne/video-player

A video player build in React on top of [CookPete/react-player](https://github.com/CookPete/react-player).It supports the
[MUI theming and components](https://mui.com) and **own functionality of the Picture-in-Picture and Fullscreen API**.
And yes, it is updated to **React v18** :balloon:!  
*Note: At the moment we only support url from a video file! Other media not yet supported(YouTube/Vimeo/...)*

[Live demo](https://collaborne.github.io/video-player/)

## Introduction

You can use video-player as out of the box, or advanced mode. In **out of the box** version you just need to provide a **videoUrl** and that's it.
As a **advanced use**, we assume that you will need to **consume VideoApi** (you can **subscribe to video events** or just **call** **setters** or **getters** for the video state).

### Installation

 Note: @collaborne/video-player has **peer deps** (mui, tss-react, react-use and other libs), so it will require to install them too. You can check them in **package.json** at peerDependencies

```bash
npm install --save @collaborne/video-player
```

## How to use

### Out of the box

```ts
import React from 'react';
import { VideoPlayer } from '@collaborne/video-player';

export const MyComponent: React.FC = () => {
 return (
   <VideoPlayer videoUrl="some-video-url" />
 );
};
```

### Advanced usage

- **External use**. You just create a ref with video context and you can listen to events or call any api methods.

```ts
import React from 'react';
import { useVideoListener, VideoPlayer, usePlayerContext } from '@collaborne/video-player';

export const MyComponent: React.FC = () => {
  const { videoContextApi, setVideoContext } = usePlayerContext()
  useVideoListener('play', () => console.log('Play event emitted'), videoContextApi);
 return (
   <VideoPlayer
      videoUrl="some-video-url"
      onContext={setVideoContext}
   />
 );
};
```

- **Internal use** - You add your component as a VideoContext's Consumer. `VideoPlayer` and `CorePlayer` components are already wrapped in `VideoContext.Provider`

```ts
import React from 'react';
import { useVideoListener, useVideo } from '@collaborne/video-player';

export const PlayButton:React.FC = () => {
  const { api } = useVideo()
 return <button onClick={api?.play()}> Play </button>
};

export const MyComponent: React.FC = () => {
  const { videoContextApi, setVideoContext } = usePlayerContext()
  useVideoListener('play', () => console.log('Play event emitted'), videoContextApi);
 return (
   <VideoPlayer
      videoUrl="some-video-url"
      onContext={setVideoContext}
   >
   <PlayButton/>
   </VideoPlayer>
 );
};
```

We have exported 2 component: `CorePlayer` and `VideoPlayer`. `VideoPlayer` - is a component with our vision and ideas on how should a player look like(it contains all the UI elements for player).
On other hand, `CorePlayer` - just a component that has all the functionality(PIP logic integrated here too), but without any UI controls.
Mathematically speaking, we will have this expression `VideoPlayer = CorePlayer + UI Elements`

## Documentation

Latest changes, types and interfaces [here](/docs/modules.md).

## Debugging

We use [debug](https://github.com/debug-js/debug) package for logging events. As you can see in our [live demo](https://collaborne.github.io/video-player/),
player provides you logs for native `<video>` play and pause events, and also when state is changed. To use it in any your environment(we used in our storybook environment)
you need to add to yours `process.env` a parameter of `DEBUG=*`, that will print all these logs in browser's DevTools.

## FAQ  

- **Q:** How to use player in a performant way? How to avoid rerenders?  
 **A:** Subscribe to events. We emit events for almost all use cases(`play`, `pause`, `timeupdate`, `durationchange`, ...etc) and store videoContext in a `React.RefObject`.  
 In this case, you can check updates by subscribing to player events and call any setter or getter that you need too.

- **Q:** Do you support Youtube, vimeo sources?  
 **A:** At the moment, no. We support only files.

## License

Apache-2.0 © [Collaborne](https://github.com/Collaborne)
