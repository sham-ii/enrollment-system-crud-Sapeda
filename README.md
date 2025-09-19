Project Title: CRUD Student Enrollment System

Description: This is a web-based enrollment system built using HTML, JavaScript, CSS, PHP and MySQL.
             The system allows you to manage its different entities like student's record, programs,
             subjects, semesters, and years. Each entities have its own dashboard to view all records
             and handles CRUD operations for easier data management.
             
Setup instructions:
1. Clone or download the project
   >git config --global user.name "github_username"
   >git config --global user.email "email"
   >git clone (my repository link)
2. Import database:
> Open phpMyAdmin or MySQL
> Create a new database
> Import the enroll_db.sql file from the project folder
3. Configure PHP:
> Open db.php (It is inside of the API folder)
> Update the database credentials. (Ex: $conn = new mysqli("localhost", "root", "", "enroll_db");
  Note: Your created database in the phpMyAdmin would be your database here in the example credentials.
4. Run the project:
> Start your local server (Laragon or XAMPP)
> Open your browser and navigate to: http://localhost/enrollment/index.html

Trisha Mae Angel C. Sapeda
BSIS 3-A
