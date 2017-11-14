<h1>
    <span>F.I.D.E</span> 
    <span><img src="build/icons/256x256.png" alt="Field IoT Data/Device Explorer" align="right"></span>
    <span>(WIP)</span>
</h1>
\fɪdˈɛ\

[![Build Status](https://travis-ci.org/DrSensor/F.I.D.E.svg?branch=master)](https://travis-ci.org/DrSensor/F.I.D.E)
[![Build status](https://ci.appveyor.com/api/projects/status/mjefjrnm444kt1rr?svg=true)](https://ci.appveyor.com/project/DrSensor/f-i-d-e)
[![Dependency Status](https://dependencyci.com/github/DrSensor/F.I.D.E/badge)](https://dependencyci.com/github/DrSensor/F.I.D.E)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDrSensor%2FF.I.D.E.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FDrSensor%2FF.I.D.E?ref=badge_shield)

## Field IoT Data/Device Explorer

<!-- Insert LOGO HERE -->

> A desktop application for manage and explore IoT Device in the Field


## Overview
This app aims to help manage and explore IoT Data by taking File Explorer like app approach. In this case the data can be from third party MQTT broker (e.g AWSIoT or Mosquitto).

<!-- Insert GIF Image for application Demo HERE-->

The idea are each MQTT topic can be linked to file or folder from your local drive or Cloud Drive Storage (e.g Google Drive, BIM360 docs). Then you can explore the file and the real time data at the same time. Some benefit of this that you can relate IoT device to Floor Plan drawing then the drawing can be interact to control/monitor devices.

## Use case
Some use case that this app can do:
- map device script (e.g arduino file) to MQTT topics
- plan device placement in Drawing file (e.g Floor Plan drawing)
- relate mqtt topics with schematics diagram (in photo or just schematics)
- defining project specification
- many more coming soon

See [ROADMAP.md](./ROADMAP.md).


---
> *Notice that, this project is still under active development, many functionalities or features are not implemented yet, and some parts are still buggy. Until it reach version 1.0.0, this project will not fully follow [Semantic Versioning rule](http://semver.org). Each MINOR ( e.g v0.n.0 ) release can introduces breaking change.*

---
## Contributing
All individuals can contribute by making Pull-Request but only individuals that making significant and valuable contributions are given commit-access to the project to contribute as they see fit.

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [openopensource.org](http://openopensource.org/) for more details.



---
This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[de85f81](https://github.com/SimulatedGREG/electron-vue/tree/de85f81890c01500113738bfe57bef136f9fbf52) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FDrSensor%2FF.I.D.E.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FDrSensor%2FF.I.D.E?ref=badge_large)
