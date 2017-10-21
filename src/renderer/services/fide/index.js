import DSNedbAdapter from 'js-data-nedb'
import { DataStore } from 'js-data'
import { remote } from 'electron'
import path from 'path'

var adapter = new DSNedbAdapter()

var store = new DataStore()
store.registerAdapter('nedb', adapter, { default: true })

// "store" will now use the nedb adapter for all async operations
var User = store.defineMapper({
  name: 'user',
  // path where you want the table file for this resource created
  filepath: path.join(remote.app.getPath('desktop'), 'user.db')
})

adapter.getDb(User).persistence.compactDatafile()
// nedb handler is available here
// User.db // don't run custom queries unless you know what you're doing

// one method you might want to call is User.db.persistence.compactDatafile()

// var a = User.db

// import Datastore from 'nedb'
// import path from 'path'
// import {remote} from 'electron'

// const alquileresDBPath = path.join(remote.app.getPath('desktop'), 'alquileres.db')
// const alquileres = new Datastore({filename: alquileresDBPath, autoload: true})

// console.log(adapter.getDb())
