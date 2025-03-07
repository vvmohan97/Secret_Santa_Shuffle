# Secret Santa Shuffle

## Overview
Secret Santa Shuffle is a web application that helps teams easily manage their Secret Santa gift exchange. Upload your team list, shuffle names, and create unforgettable moments!

## Features
- Upload employee list in CSV or XLSX format
- Assign employees to their Secret Santa
- Download assigned pairs for reference
- Smooth user experience with animations and UI enhancements
- Responsive design for various screen sizes

## Technologies Used
### Frontend:
- React.js
- Material UI
- JavaScript (ES6+)
- CSS (Animations & Styling)
- PropTypes

### Backend:
- Node.js
- Express.js
- MySQL
- Multer (for file uploads)
- Cors

## Installation

### Frontend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/secret-santa-shuffle.git
   ```

2. Navigate to the project directory:
   ```sh
   cd secret-santa-shuffle
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm start
   ```

### Backend Setup:
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add your MySQL database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=secret_santa
   PORT=5000
   ```

4. Run database migrations (if applicable):
   ```sh
   node migrate.js
   ```

5. Start the backend server:
   ```sh
   node server.js
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`
2. Upload a CSV or XLSX file containing employee details
3. Click "Upload File" to process the employee list
4. Assign employees randomly using the "Assign Employee" tab
5. Download the assigned list for reference

## File Structure
```
secret-santa-shuffle/
│-- frontend/
│   │-- src/
│   │   ├── components/
│   │   ├── asserts/
│   │   ├── api/
│   │   ├── styles/
│   │-- public/
│   │-- package.json
│   │-- README.md
│-- backend/
│   │-- routes/
│   │-- controllers/
│   │-- models/
│   │-- config/
│   │-- server.js
│   │-- package.json
│   │-- .env
```

## Contribution
Contributions are welcome! Follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For any questions or issues, feel free to reach out via [GitHub Issues](https://github.com/yourusername/secret-santa-shuffle/issues).

