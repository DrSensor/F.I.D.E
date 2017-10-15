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
This project follow some existing style guide:
- [Vuejs Style Guide](https://vuejs.org/v2/style-guide/) especially in naming
- [Javascript Standard Style](https://standardjs.com/) script
- [PEP 8](https://www.python.org/dev/peps/pep-0008/)

## Project Structure
This project use python script when doing heavy load processing by utilizing [flask-socketio](https://flask-socketio.readthedocs.io/en/latest/) especially in section Class-Based Namespaces. This idea was inspired by [this blog/project](https://github.com/fyears/electron-python-example#preparation)

<!-- Why using RPC? Why not spawning new python process (using python-shell npm package)? -->
<!--  -->