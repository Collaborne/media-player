@collaborne/video-player - v1.1.1 / [Modules](/docs/modules.md)

# @collaborne/video-player

A video player build in React on top of [CookPete/react-player](https://github.com/CookPete/react-player).It supports the
[MUI theming and components](https://mui.com) and **own functionality of the Picture-in-Picture and Fullscreen API**.
And yes, it is updated to **React v18** :balloon:!

You can **play** both, **audio** and **video** files.

*Note: At the moment we support URL to video and audio files. Youtube, twitch and other media streaming services URL's are not supported yet.*

[Live demo](https://collaborne.github.io/video-player/)

## Introduction

`@collaborne/video-player` provides a set of: "draft" player that has own PIP and Fullscreen implementation, UI Controls, a
high flexibility for composing different players UI Controls, hooks for accessing media store/data, and even a ready to go media player solution
(with our own customized MUI Themed Components).

### Installation

1. Add as a dependency @collaborne/video-player

```bash
npm install --save @collaborne/video-player
```

2. Install our peer dependencies. As an example we use MUI for theming and it's components, react-transition-group for animation, ...etc.  
You can check peer dependencies in `package.json`. What is a peer dependency you can check [here](https://nodejs.org/es/blog/npm/peer-dependencies/).

## How to use

### The Players

- **Out of the box**

You can just use a component that contains all the futures. See in [CodeSandbox](https://codesandbox.io/s/media-player-example-wnqwb1).  
*NOTE: Wait the sandbox until installs all dependencies.*

```ts
import { VideoPlayer } from '@collaborne/video-player';

export const MyComponent: React.FC = () => {
 return (
   <VideoPlayer videoUrl="some-video-url" />
 );
};
```

- **Compose own UI Controls**

This comes handy when you want to customize controls for the player. [CodeSandbox](https://codesandbox.io/s/core-player-gtlry2?file=/src/App.tsx)  
*NOTE: Wait the sandbox until installs all dependencies.*

```ts
import { CorePlayer, Controls, BottomControls } from "@collaborne/video-player";
import { PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const PlayButton = () => {
  return (
    <IconButton>
      <PlayArrow />
    </IconButton>
  );
};

export default function App() {
  return (
    <>
      <CorePlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4">
        <Controls>
          <BottomControls>
            <PlayButton />
          </BottomControls>
        </Controls>
      </CorePlayer>
      {/* create a container with fixed height to check PIP player */}
      <div style={{ height: "1200px" }} />
    </>
  );
}

```

### Recipes  

- **Using Media Store for the children**

We use [zustand](https://github.com/pmndrs/zustand) for storing media state(current time, isPlaying, isMuted...). 
That's why we can get the state using `zustand` [approach](https://github.com/pmndrs/zustand#then-bind-your-components-and-thats-it).

```ts
import { useMediaStore } from "@collaborne/video-player";
import { PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const PlayButton = () => {
  const play = useMediaStore((state) => state.play);
  return (
    <IconButton onClick={play}>
      <PlayArrow />
    </IconButton>
  );
};


```

- **Using MediaStore outside of the player**
You can get fresh state, via storing its updates in a ref(for best performance practice).



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
