Features
CRUD Operations: Perform CRUD (Create, Read, Update, Delete) operations on student records.
File Uploads: Upload student photographs with file size and type validation.
Error Handling: Comprehensive error handling for various scenarios, including file upload errors and database operation failures.
RESTful API: Exposes a RESTful API for easy integration with frontend applications.



Project Structure
The project follows a modular structure, with separate files for routes, controllers, models, and middleware. 

controllers/: Contains controller functions for handling CRUD operations and file uploads.
models/: Defines MongoDB schema models for student records.
routes/: Defines API routes for different CRUD operations.
uploads/: Directory for storing uploaded student photographs.
app.js: Entry point of the application, where Express.js server is configured.


Installation:
    1:Clone the repository
    2:Install dependencies:
            cd student-management-system
            npm install
    3:Start the server:
            npm start

API Endpoints
    GET /api/students
            : Retrieve all student records.
    GET /api/students/
            : Retrieve details of a specific student.
    POST /api/students
            : Create a new student record.
    PUT /api/students/
            : Update details of a specific student.
    PUT /api/students/
            /deactivate: Deactivate a specific student.


Storage Options for Photographs:
    By default, student photographs are stored locally in the uploads/ directory. For production use or larger scale applications,
    it's ideal  to use a cloud storage solution like Amazon S3. To switch to Amazon S3 or any other cloud storage provider, modify the file upload configuration in the controllers/studentController.js file.

Dependencies
    express: Web framework for Node.js.
    mongoose: MongoDB object modeling tool for Node.js.
    multer: Middleware for handling file uploads.
    path: Utility for working with file and directory paths.
    nodemon: Utility that automatically restarts the server when changes are detected.
