from flask_cors import CORS
from flask_socketio import SocketIO
from flask import Flask, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

active_connections = {}

@socketio.on('connect')
def on_connect():
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)
    print(active_connections)

@socketio.on('request_data')
def on_request_data(data):
    if data["nickname"] not in active_connections.keys():
        active_connections[data["nickname"]] = True
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)
    
@socketio.on('disconnect')
def on_disconnect():
    print(f"Disconnect event received for sid {request.sid}")
    if request.sid in active_connections:
        del active_connections[request.sid]
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)

if __name__ == '__main__':
    socketio.run(app)