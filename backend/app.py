from flask_cors import CORS
from flask_socketio import SocketIO
from flask import Flask, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

active_connections = {}

messages = []

@socketio.on('connect')
def on_connect():
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)
    socketio.emit('new_nessage', messages)

@socketio.on('request_data')
def on_request_data(data):
    if data["nickname"] not in active_connections.keys():
        active_connections[data["nickname"]] = request.sid
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)

@socketio.on('new_message')
def on_message(data):
    messages.append({'nickname': data['nickname'], 'message': data['message']})
    socketio.emit('new_message', messages)
    

@socketio.on('disconnect')
def on_disconnect():
    print(f"Disconnect event received for sid {request.sid}")
    for nickname, sid in active_connections.items():
        if sid == request.sid:
            del active_connections[nickname]
            break
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)

if __name__ == '__main__':
    socketio.run(app)