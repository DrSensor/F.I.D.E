from flask import Flask, render_template
from flask_socketio import SocketIO

from base import Base

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

socketio.on_namespace(Base('/'))
socketio.run(app)
