# Website Name : EduConnect
# Admin Credentials:
+ email: educonnect@gmail.com
+ password: EduConnect12#
# [Live URL] (https://educonnect-9f39f.web.app/)
# [Server github] (https://github.com/HFsa-RaShid/edu-connect-server)

# Key Concepts
EduConnect aims to streamline educational activities by providing a centralized platform where students can easily find study sessions, tutors can manage sessions and materials, and administrators can oversee and facilitate the entire process. It solves the problem of fragmented educational interactions by offering a cohesive environment for learning and collaboration.

# Major Features
+ Role-Based Access Control (RBAC):
EduConnect excels with its robust RBAC system, ensuring secure and efficient user management across students, tutors, and administrators. This feature allows precise control over platform access and permissions, enhancing overall security and user experience.

+ Comprehensive Dashboard Functionality:
The platform offers extensive dashboard capabilities tailored for both students and tutors. Students can efficiently manage booked sessions, create and manage personal notes, and access study materials. Tutors benefit from tools to create sessions, upload materials, and manage session details, all of which streamline administrative tasks and foster collaboration.

+ Dynamic Session Management:
EduConnect provides dynamic session management features that facilitate seamless session creation, approval workflows, and detailed session views. This functionality supports transparent communication between tutors and administrators, ensuring clear session details and streamlined booking processes for students.

# Technologies Used
+ Frontend: Tanstack Query for efficient data fetching, JWT implementation for secure authentication, and responsive design for optimal user experience.
+ Backend: Node.js with Express.js for robust server-side operations, MongoDB for flexible and scalable data storage, and middleware for role-based access control.
+ Integration: Social login integration using Google and GitHub OAuth for seamless user authentication.

# Local Setup Guide
To run EduConnect locally on your machine, follow these steps:
+ Clone the Client Repository:
  + git clone https://github.com/HFsa-RaShid/edu-connect-client.git
  + cd edu-connect-client

+ Clone the Server Repository:
  + git clone https://github.com/HFsa-RaShid/edu-connect-server.git
  + cd edu-connect-server

+ Install Dependencies:
  + npm install

+ Set Environment Variables:
  + Create a .env file in the root directory and configure necessary environment variables such as database connection URI, JWT secret key, and Auth credentials.

+ Start the Server:
  + Install nodemon globally (if you haven't already):npm install -g nodemon

+ Access the Application:
  + Open your web browser and navigate to http://localhost:3000  to access the locally running instance of EduConnect.