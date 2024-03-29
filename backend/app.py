import redis
from random import choice
from flask_cors import CORS
from googletrans import Translator
from flask_socketio import SocketIO
from flask import Flask, request, jsonify

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

try:
    r = redis.Redis(host='localhost', port='6379', decode_responses=True)
    r.lrange('banwords', 0, -1)
except redis.exceptions.ConnectionError:
    raise ConnectionRefusedError("Redis not started!")


active_connections = {}

messages = []
symbols = "$X#@%&"


@socketio.on('connect')
def on_connect():
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)
    socketio.emit('new_message', messages)


@socketio.on('request_data')
def on_request_data(data):
    if data["nickname"] not in active_connections.keys():
        active_connections[data["nickname"]] = request.sid
    data = {'count': len(active_connections)}
    socketio.emit('request_data', data)


@socketio.on('new_message')
def on_message(data):
    message = data['message']
    banwords = [word.encode('utf-8', errors='ignore') for word in r.lrange('banwords', 0, -1)]
    banwords = [word.decode('utf-8') for word in banwords]
    filtered = " ".join("".join(choice(symbols) for _ in range(len(word)))
                        if word in banwords else word for word in message.split(" "))
    messages.append({'nickname': data['nickname'], 'message': filtered})
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


@socketio.on('create_banword')
def new_banword(data):
    username = data.get('username')
    if not username:
        socketio.emit("ban_word_response", {'message':"Username is not provided!"})
    if username != 'admin':
        socketio.emit("ban_word_response", {'message':"You are not admin"})

    banword = r.get(data['banword'])
    if not banword:
        r.lpush('banwords', data['banword'])
        socketio.emit("ban_word_response", {'message':'Successfully added to ban-list'})
    socketio.emit("ban_word_response", {'message':'Already in ban-list!'})

@socketio.on('translate')
def translate(data):
    translator = Translator()
    text = data.get('text')
    socketio.emit('translate', {"text":translator.translate(text, src='ru', dest='en').text})

    

if __name__ == '__main__':
    socketio.run(app)

