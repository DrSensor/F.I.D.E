# Versioning

## `v0.0.0` to `v0.10.0`

- Doesn't implement `unit-test` and `end2end-test`. All patch and feature not been tested.

## `v0.10.0` to `v1.0.0`

- Breaking changes can occur in `MINOR` release (e.g `v0.n.0`)
- Some critical feature must have `unit-test` and/or `end2end-test` before released.

## `v1.x.x`

- Fully follow semver.org
- All new feature must have `unit-test` and/or `end2end-test` before released.

<br/><br/>

# Feature
## Feature on going before/after `v1.x.x`
- File and Folder explorer in following style:
  - [x] grid view in main section
  - [ ] table/list view in main section
  - [ ] control button (sort, group, etc)
- Linking sensor/device data (MQTT topics)
  - [ ] Link into file
  - [ ] ** Link/annotate inside into file (e.g in position x,y when its pdf/jpg/svg)
- [ ] View linked sensor/device in folder (not file)
- Integrate with one of the following IoT service/message broker
  - [ ] [AWSIoT](http://docs.aws.amazon.com/iot/latest/apireference)
  - [ ] [emqtt](http://emqtt.io/docs/v2/rest.html#routes)
  - [ ] ** [Arduino Cloud](https://cloud.arduino.cc)
  - [ ] ** [ThingsBoard](https://thingsboard.io/docs/api/)
- Integrate with one of the following Cloud/Local Storage
  - [x] All OS (Windows, Linux, Mac) local and network storage
  - [ ] ** [Google Drive](https://developers.google.com/drive/v3/reference/)
  - [ ] [BIM360 docs](https://developer.autodesk.com/en/docs/data/v2/reference/http/)
  - [ ] ** [Dropbox](https://dropbox.github.io/dropbox-api-v2-explorer/)
  - [ ] ** [One Drive](https://docs.microsoft.com/id-id/onedrive/developer/rest-api/)
- [ ] Real time sensor data visualization

<br/>

## Feature on going near `v2.x.x`
- Redesign the UI and UX:
  - [ ] Graph relation explorer view
  - [ ] device explorer view
  - [ ] tree view on sidemenu
- [ ] trace Folder-File by version (if integrate with Cloud Storage)
- [ ] Folder-File Statistics
- [ ] ** Sensor/Device Statistics
- File explorer can also support nonfile:
  - [ ] Map with specific max-zoom-out and geofence
  - [ ] Video Stream (rtsp://) url
    - [ ] link/annotate Video Stream at position x,y to sensor
    - [ ] * visualize sensor data as bounding box (if its camera processed data)
- [ ] * Choose type of chart in `real time sensor data visualization`
- Support annotation inside file/link:
  - [ ] image file (jpg/png/pdf/svg)
  - [ ] map
  - [ ] video stream
  - [ ] text/script
- Annotate file/drawing with:
  - [ ] device placement (e.g topic `coffemachine/coffemachine1/SN123` in floor plan drawing at *Room17*)
  - [ ] telemetry topic/data (e.g topic `coffemachine/coffemachine1/SN123/light` in schematics at part *LDR1*)

<br/>

## Something must be done before `v3.x.x` (in `alpha` and `beta` stage)
- [ ] Option to deploy as web apps
- Cloud deploy button/tutorial
  - [ ] Heroku
  - [ ] AWS
- Optimization in Continous Deployment
  - Release official binary
    - [ ] installer in Linux (`.deb`, `.AppImage`, `.snap`, `rpm`)
    - [ ] installer in OS X (`.dmg`) (need to be signed)
    - [ ] installer in Windows (`.exe`, `AppX`) (need to be signed)
  - [ ] test build with latest dependency at `test-dependency` stage

<br/>

> \* : *depend on hype or available device on market* \
** : *chance not to be implemented in the current version*

---
## `v3.x.x` and beyond (Data Science functionality)
- [ ] addons/plugins mechanism
- [ ] use [jupyter kernel gateway](http://jupyter-kernel-gateway.readthedocs.io/en/latest/index.html) for rapid prototyping sensor fusion and/or filter algorithm
- [ ] add docker-compose to use at testing phase
- [ ] add view/page/layout for 

[graph stream data **before** processed] -> [text editor for writing code] -> [graph stream data **after** processed]


### Additional
- Module separation
  - State management (vuex module) as independent project/repository
    - [ ] `vuex-file-managers`
    - [ ] `vuex-iot-brokers`
  - UI component as independent project/repository with some state management module as dependency
    - `vue-file-managers` with `vuex-file-managers` as dependency with some component (decoupled library)
      - [ ] Breadcrumbs
      - [ ] Grid view
      - [ ] List/Table view
      - [ ] Tree view
- Integration (or get inspired) with [myviz](https://github.com/3sigma/MyViz)
