# Protected Docs - Backend

The backend of the "Protected Docs" application is built using Node.js with the Express framework, MySQL for database storage, and Socket.IO for real-time communication. This backend provides the API endpoints necessary for creating and managing rooms, documents, and user authentication.

## Features

- User Authentication: Users need to authenticate themselves to access and modify documents within a room.
- Room Creation: Users can create private rooms by providing a password.
- Document Management: Users can create, edit, and delete documents within their rooms.
- Real-Time Collaboration: Socket.IO enables real-time synchronization of document changes among room collaborators.

## Getting Started

To run the backend of the Protected Docs project locally:

1. Clone the repository: `git clone https://github.com/your-username/protected-docs.git`
2. Navigate to the backend directory: `cd protected-docs/backend`
3. Install dependencies: `npm install`
4. Create the database using `db-seed.sql` file.
5. Configure environment variables: Create a `.env` file with the necessary configurations - database connection, frontend URI.
6. Start the server: `npm start`

The backend server will run at the specified port and connect to the configured MySQL database.

## Socket.IO Integration

Socket.IO is used to enable real-time collaboration among room collaborators. When a user makes changes to a document, the changes are broadcasted to other users in the same room, allowing them to see modifications in real time.

## Authentication and Room Access

Users must authenticate with their credentials to access rooms and documents. When a user creates a room, they provide a password that acts as an access key. Other users need to enter this password to join the room and access documents.

## Contributing

Contributions to enhance the backend of the Protected Docs application are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Implement changes and commit: `git commit -m "Add your changes"`
4. Push changes to your fork: `git push origin feature/your-feature`
5. Open a pull request to the main repository.

## Issues

For bug reports, feature requests, or assistance, [create an issue](https://github.com/your-username/protected-docs/issues).

## Contact

If you have questions or suggestions, feel free to contact us at me4saurabh4u@gmail.com.
