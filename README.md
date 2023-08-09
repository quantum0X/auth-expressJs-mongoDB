# Authentication Project using Express.js and MongoDB
This README provides an overview of the Authentication Project built using Express.js and MongoDB.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project aims to provide a solid foundation for building authentication and authorization functionality using Express.js as the backend framework and MongoDB as the database. 

## Features
- User registration with secure password hashing.
- Protected routes requiring user authentication.
- MongoDB for storing user information and session data.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js and npm installed.
- MongoDB is up and running or you can use MongoDB Atlas.

  ### Installation

1. Clone the repository:

```terminal
   git clone https://github.com/quantum0X/auth-expressJs-mongoDB.git
   cd auth-expressJs-mongoDB
```

2. Install the dependencies:
```terminal
npm install
```

### Configuration
1. Create a .env file in the project root and configure the following:
```.env
MONGODB_URL=YOUR_MONGODB_URL
```
2. Adjust other settings in the codebase as per your project requirements.

## Usage
### Running the Server
To start the Express.js server, run:
```
nodemon main.js
```
**Note:** Make sure that you have installed nodemon if not, `npm i -g nodemon`

## Contributing
Contributions are welcome! Please follow the standard GitHub fork and pull request workflow.

## License
This project is licensed under the MIT License.
