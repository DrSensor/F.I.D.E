## Local Development
#### Build Setup

``` bash
yarn add electron --dev --unsafe-perm=true

# install dependencies (better to use yarn for dependency lock consistency)
yarn

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

## Dependency
This project is hugely depend on:
- Vuejs and Vuex
- Electron
- Vuetify
- EChart
- SocketIO and `flask-socketio`

## Maintained/Watched Dependency
This project use some of library that have a really high [TF]() and no alternative library with better `TF` score.
Because of that, there is need to watch and maintain this package:
- [vue-annotator](https://github.com/DrSensor/vue-annotator)
- [mqtt-pattern](https://github.com/RangerMauve/mqtt-pattern)
- [js-data-autosql]()? still there are high chance that I will replace it with [bookshelfjs]()
<!--  -->

## Some package that have potential
This is personal list of library/component that can be used in this project.
- [portal-vue](https://linusborg.github.io/portal-vue/#/guide?id=what-is-portalvue)
- [vue-svgicon](https://github.com/MMF-FE/vue-svgicon) a workaround if **Vuetify** still not support custom icon
- [vued3tree](https://github.com/David-Desmaisons/Vue.D3.tree) for visualizing [mqtt topic](http://harizanov.com/2014/09/mqtt-topic-tree-structure-improvements/) and file hierarchy. The good example how it was use is [vuetron](http://vuetron.io/#component-tree)
- [http-vue-loader](https://github.com/FranckFreiburger/http-vue-loader) for building plugin mechanism with the plugin is in `.vue` format :sunglasses:

For more curated list to do component hunting you can use https://madewithvuejs.com/

## Style Guide
This project follow this style guide:
- use single file components (i.e. *.vue)
- follow [Vuejs Style Guide](https://vuejs.org/v2/style-guide/),
especially in naming
- follow [Javascript Standard Style](https://standardjs.com/)
- follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) for 
[worker](src/worker/)
- use [Lazy Load `import`](https://alexjoverm.github.io/2017/07/16/Lazy-load-in-Vue-using-Webpack-s-code-splitting/) in 
  - [pages](src/renderer/pages/) when using components,
  - [layouts](src/renderer/layouts/) when using pages and components,
  - [router](src/renderer/router/) when using pages
- use [ifdef](https://github.com/nippur72/ifdef-loader) `BUILD_TARGET!='web'` when using electron API.
(~~TODO: soon will be replaced with preprocess-loader~~)
- when using p5js use [instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)

## Tips
- VSCode settings

```
    "editor.tabSize": 2,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "vetur.format.js.InsertSpaceBeforeFunctionParenthesis": true,
    "vetur.format.html.wrap_attributes": "auto",
    "vetur.format.html.wrap_line_length": 20,
```

## Project Structure
Directory structure of this project heavily influence on [nuxtjs directory structure guide](https://nuxtjs.org/guide/directory-structure)

This project use python script when doing heavy load processing by utilizing [flask-socketio](https://flask-socketio.readthedocs.io/en/latest/) especially in section Class-Based Namespaces. This idea was inspired by [this blog/project](https://github.com/fyears/electron-python-example#preparation)

<!-- The reason why using RPC? Why not spawning new python process (using python-shell npm package)? -->
<!--  -->