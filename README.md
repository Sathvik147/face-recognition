
# Face Detection Web Application

This web application utilizes React.js and the face-api.js library for real-time face detection and recognition. Users can register, log in, and utilize the live webcam feed to detect and recognize faces.

## Table of Contents

- Installation
- Usage
- Deployment
- Documentation
- Contributing 
- License

## Installation 
To run this project locally, follow these steps:

- Clone the repository:
```
git clone https://github.com/noobtuber20103152/face-detection-app

```
- Navigate into the project directory:
```
cd face-detection-app

```

- Install dependencies:

```
npm install

```

## Usage 
After completing the installation steps, you can run the project locally using the following command:

```
npm dev
```
This will start the development server, and you can access the application at http://localhost:5173 in your web browser.

## Deployment 
The application has been deployed to Vercel and can be accessed at the following live URL:

https://face-detection-app-rho.vercel.app/

## Documentation

### Architecture and Design Choices

The application is built using React.js for the frontend and Node.js with Express.js for the backend. The frontend provides a user-friendly interface for registration, login, and accessing the live webcam feed for face detection. The backend handles API requests, integrates the face-api.js library for face recognition, and manages data storage and retrieval.

### Challenges Faced 

- Ensuring real-time data processing and response for seamless user experience.
- Managing privacy and security concerns regarding data storage and retrieval.
- Deploying the application to Vercel and optimizing for scalability.
## AI Model Integration and Performance 
The face-api.js library was chosen for face recognition due to its ease of use and comprehensive features. It accurately detects faces in various conditions, including different angles and lighting, providing reliable results for the application's functionality.