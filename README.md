# Secret Santa Shuffle - Backend

## Overview
This is the backend for the Secret Santa Shuffle application, built using Node.js, Express.js, and MySQL. It handles user data, file uploads, and employee assignments.

## Features
- RESTful API using Express.js
- MySQL database integration
- Secure file uploads with Multer
- Environment variables for configuration
- Data retrieval and assignment logic

## Technologies Used
- Node.js
- Express.js
- MySQL
- Multer (for file uploads)
- Cors
- dotenv (for environment variables)

## Installation

### Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/secret-santa-shuffle.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd secret-santa-shuffle/backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add your MySQL database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=secret_santa
   PORT=5000
   ```
5. Run database migrations (if applicable):
   ```sh
   node migrate.js
   ```
6. Start the backend server:
   ```sh
   node server.js
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/upload` | Uploads an employee list file |
| POST | `/assign` | Assigns Secret Santa pairs |
| GET | `/download` | Downloads the assigned list |
| GET | `/employees` | Retrieves employee data |

## File Structure
```
backend/
│-- routes/
│-- controllers/
│-- models/
│-- config/
│-- server.js
│-- package.json
│-- .env
```
