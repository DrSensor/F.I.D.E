from flask_socketio import Namespace, emit


class Base(Namespace):
    def on_connect(self):
        pass

    def on_disconnect(self):
        pass

    def on_event(self, data):
        emit('message', data)
