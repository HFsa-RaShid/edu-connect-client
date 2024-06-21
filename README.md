# Website Name : EduConnect
# Assignment variant : Assignment12_category_0023
# Admin email: educonnect@gmail.com
#  Admin password: EduConnect12#
# [Live URL] (https://educonnect-9f39f.web.app/)

EduConnect is a comprehensive Collaborative Study Platform designed to connect students, tutors, and administrators, enhancing educational collaboration, resource sharing, and user management.

# Key Features

# Authentication & Authorization:
+ User Registration: Sign-up forms for students, tutors, and administrators with fields for name, email, password, and role selection.
+ User Login: JWT-based authentication for secure session management. Social login using Google and GitHub with automatic student role assignment.
+ Role-Based Access Control: Middleware to check roles and permissions, protecting routes for authorized access only.

# Home Page:
+ Navbar: Displays logo, website name, and login/signup buttons (profile, logout, and dashboard buttons if logged in).
+ Banner Section: Professional background image relevant to the website.
+ Study Session Section: Display 3-6 study session cards with titles, descriptions, and registration status. "See all sessions" button for more than 6 sessions.
+ Tutor Section: Showcases all tutors.
+ Footer: Includes essential links and information.

# Study Session Details:
Accessible to logged-in users, displaying comprehensive session information including tutor details, ratings, descriptions, and registration info.
+ Booking: Free sessions booked directly; paid sessions redirect to a payment page. Session info stored in "bookedSession" collection.

# Student Dashboard:
+ View Booked Sessions: Detailed session information with review and rating options.
+ Create and Manage Notes: Personal notes creation, updating, and deletion.
+ Study Materials Access: View and download materials for booked sessions, categorized by session.

# Tutor Dashboard:
+ Create Study Session: Forms for session creation with necessary details and default status set to pending.
+ View Study Sessions: Tutors can see approved/rejected sessions and resend approval requests for rejected ones.
+ Upload and Manage Materials: Upload images and links for approved sessions, view, update, and delete materials.

# Admin Dashboard:
+ View and Manage Users: Search, view, and update user roles.
+ View and Approve Study Sessions: Approve/reject sessions with popups for specifying fee and feedback. Manage session updates and deletions.
+ Manage Materials: View and remove inappropriate or outdated content.

# Advanced Features:
+ Tanstack Query Integration: Used for data fetching with GET methods.
+ JWT Implementation: Secure token storage in local storage.
+ Pagination: Implemented for View All Materials page(admin) and Manage Personal Notes page(student).
+ Admin Feedback on Rejections: Popup for rejection reasons and feedback.
+ Tutor Profile Management: Profile photo upload and change functionality, with additional customization options like adding helmets and animations.


EduConnect offers a robust and user-friendly platform tailored to the dynamic needs of modern education, fostering collaboration and effective management of educational activities.