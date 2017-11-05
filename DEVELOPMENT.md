## Local Development
#### Build Setup

``` bash
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