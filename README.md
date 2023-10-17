# Employee Performance Review Feedback (EPRF) System

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Features (Admin)](#features-admin)
  - [Add Department](#add-department)
  - [Add Position](#add-position)
  - [Add Employee](#add-employee)
  - [View Employees](#view-employees)
    - [Delete Employee](#delete-employee)
    - [Toggle Rights](#toggle-rights)
    - [Add Performances](#add-performances)
    - [No. of Performances](#no-of-performances)
  - [Allocate Participation](#allocate-participation)
- [Features (Employee)](#features-employee)
  - [Pending Feedbacks](#pending-feedbacks)


The EPRF System offers two types of logins:

1. **Admin**: Easily manage departments, positions, and employee registrations. Admins can add and evaluate employee performances, and delegate this responsibility to managers. They can also perform various performance-related operations and switch roles between admin and employee.
2. **Employee**: Provide feedback on performances received from other employees, contributing to a culture of constructive performance assessment.

## **Prerequisites**
- Node.js
- MongoDB

# **Installation**

To set up the project, follow these steps:

1. **Clone the repository:** `git clone https://github.com/CharanOfficials/student_placement_report_gen/`
2. **Install dependencies:** Run `npm install`
3. **Start the Server:** Run `npm start`

# **Configuration**

1. Create a `.env` file and set the following variables:
   - `JWT_SECRET`: Your secret key for authentication
   - `DB_URL`: Your MongoDB connection string
   - `API_KEY`: Your adzuna API key for jobs API
   - `APP_KEY`: Your adzuna app key for jobs API

## Admin Features

### Add Department
- Create and manage departments within the organization.
- Assign unique identifiers and details to each department.

### Add Position
- Define various job positions and roles within the company departments.

### Add Employee
- Register new employees into the EPRF system.
- Associate employees with their respective departments and positions.
- Grant employee access and rights based on their roles.

### View Employees
- Access a comprehensive list of all employees in the organization.
- Display detailed employee information, including department, position, and contact details.

### Allocate Participation
- Assign and manage employee performance evaluations.
- Allocate responsibilities to employees for assessing the performance of their peers.

The Employee Performance Review Feedback System offers a robust solution for efficient department and employee management within your organization, ensuring smooth operations and employee evaluations.

# **Usage**

### **Manage Employees**

1. **Add Department:** Easily create new departments within the "Manage Employees" section.
2. **Register Position:** Register new positions linked to the previously added departments, ensuring organized job roles.
3. **Add Employee:** Register new employees under their respective departments and positions. The positions are automatically populated based on the chosen department.
4. **View Employees:** Access a comprehensive list of all registered employees. To update employee information, simply click the "Edit" button located in the second-to-last column of the table.

   4.1. **Delete Employee:**
        - Safely remove employees from the system, excluding admin-level employees.
        - Ensure that only authorized users with the necessary rights can perform deletions.
        - Protect your data while maintaining the integrity of employee records.

   4.2. **Toggle Rights:**
        - Empower administrators to switch user roles between employees and admins.
        - Provide flexibility and control in managing user privileges.
        - Efficiently adapt to changing organizational needs and permissions.
    
   4.3. **Add Performances:**
        - Record individual employee-specific performance evaluations.
        - Maintain a history of employee performances for reference and analysis.
      
   4.4. **No. of Performances:**
        - Display the number of performance evaluations for each employee.
        - Clicking the pen icon (visible only if count > 0) reveals a new tab with the following features:
            4.4.1. **View Feedback:** Access feedback submitted by the respective owner of the performance.
            4.4.2. **Edit/View Performance:** Modify performance evaluations when feedback is not provided by the employee who owns the performance.
        - **Delete Performance:**
            - Allows removal of unsubmitted feedback in performance evaluations.
            - Ensures data accuracy and performance record integrity.
   
5. **Allocate Participations:**
        - Streamline the allocation of performance reviews.
        - Features three columns:
            1. **Allocate By:** The name of the logged-in user responsible for allocation.
            2. **Allocated:** A list of employees designated for performance reviews.
            3. **Allocated To:** The employees to whom those in the "Allocated" list are assigned for reviews.
        - Note: An employee in the "Allocated To" column can never be on the "Allocated" list to ensure fair and unbiased evaluations.

## Employee Features

1. **Pending Feedbacks:**
         - Enable your employees to submit feedback on their own performance effortlessly. With this feature, employees can provide valuable insights and self-assessments, contributing to a more transparent and productive work environment.

