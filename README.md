![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)

# Flask-SocketIO and React Chat Application

This is a real-time chat application built using Flask-SocketIO on the backend and React on the frontend. It allows users to engage in instant messaging, choose a nickname, and customize the chat theme. The application also displays the number of users currently online in the chat room.

## Features

- **Real-time Messaging**: Users can send and receive messages instantly, creating a seamless chat experience.
- **Nickname Selection**: Users have the option to choose a unique nickname to identify themselves in the chat.
- **Chat Theme Customization**: Users can change the visual theme of the chat interface to suit their preferences.
- **Online User Count**: The application provides a live count of the number of users currently online in the chat room.

## Technologies Used

- **Backend**: Flask-SocketIO, Python
- **Frontend**: React, JavaScript, HTML, CSS
- **Communication Protocol**: WebSocket

## Installation

To set up the chat application locally, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd chat-application`
3. Install the required dependencies:
   - Backend:
     - Create a virtual environment (optional): `python -m venv venv`
     - Activate the virtual environment (optional):
       - For Windows: `venv\Scripts\activate`
       - For Unix/Linux: `source venv/bin/activate`
     - Install the dependencies: `pip install -r requirements.txt`
   - Frontend:
     - Navigate to the frontend directory: `cd frontend`
     - Install the dependencies: `npm install`

## Usage

To start the chat application, follow these steps:

1. Install Gunicorn (if not already installed): `pip install gunicorn`
2. Run the backend server using Gunicorn:
   - Activate the virtual environment (if using): 
     - For Windows: `venv\Scripts\activate`
     - For Unix/Linux: `source venv/bin/activate`
   - Start the server: `gunicorn wsgi:app`
   - By default, Gunicorn runs the server on `http://localhost:8000`.

3. Run the frontend:
   - Navigate to the frontend directory (if not already): `cd frontend`
   - Start the development server: `npm start`
4. Open your browser and visit `http://localhost:3000` to access the chat application.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:
- Fork the repository
- Create a new branch for your feature or bug fix
- Commit your changes
- Push your branch to your forked repository
- Submit a pull request

## License

This project is licensed under the [MIT License](https://github.com/SoulNaturalist/reactive-super-chat/blob/main/LICENSE).
