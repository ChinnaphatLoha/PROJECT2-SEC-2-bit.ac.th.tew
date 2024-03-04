# Software Requirements Document for Retrospective Meeting Application

## 1. Introduction

As a member of an agile development team, I need a tool to facilitate retrospective meetings, so we can reflect on our past iterations and improve our processes.

## 2. User Flow

### First-Time User Login

- When a user logs in for the first time, they need to provide their username and display name.
- If the username already exists in the database, the user will be prompted to try again with a different username.

### Password Generation

- Upon successful username registration, the system will automatically generate a password for the user's account.
- This password is encrypted and securely stored in the database.

### Project Creation

- Users have the option to create new projects for hosting retrospective meetings.
They provide basic information such as the project name, description, and the type of retrospective.
- Each project is assigned a unique passkey for others to join.
The user who creates the project is designated as the owner, while others are added as participants.

### Meeting Scheduling

- Project owners can schedule meetings for their projects.
- They specify the date, time, and other basic details for each meeting.

### Joining Projects and Notifications

- Users can join projects by entering the unique passkey assigned to each project.
- Once joined, users will receive notifications about upcoming meetings related to the projects they're part of.

### Meeting Execution

- Each meeting begins and ends according to the date and time set during its creation.

### Meeting Data Formats

- Retrospective meetings may have different data formats depending on the type of retrospective being conducted.

## 3. User Requirements

| Priority | Requirement                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------- |
| 1        | Schedule retrospective meetings for each iteration.                                                |
| 1        | Invite team members to scheduled retrospective meetings.                                           |
| 1        | Provide a platform for team members to give feedback anonymously during the retrospective meeting. |
| 1        | Allow team members to propose and prioritize action items.                                         |
| 2        | Receive notifications about upcoming retrospective meetings.                                       |
| 3        | Generate reports summarizing feedback and action items discussed during the retrospective.         |

## 4. Functional Requirements

| Priority | Requirement                                                                          |
| -------- | ------------------------------------------------------------------------------------ |
| 1        | Enable facilitators to create and manage multiple retrospective sessions.            |
| 1        | Allow users to input and view feedback anonymously during the retrospective meeting. |
| 2        | Support multiple retrospective meeting formats.                                      |
| 3        | Export meeting summaries and action items as PDF or CSV files.                       |

## 5. Non-Functional Requirements

| Priority | Requirement                                                                |
| -------- | -------------------------------------------------------------------------- |
| 1        | Have a user-friendly interface for ease of use.                            |
| 1        | Ensure application accessibility from desktop and mobile devices.          |
| 2        | Implement robust security measures to protect anonymity of feedback.       |
| 2        | Ensure scalability to accommodate teams of varying sizes.                  |
| 3        | Maintain a response time of less than 2 seconds for all user interactions. |

## 6. Change Management

All changes to the software requirements document must be documented in the change log, including the reason for the change and the impact on other requirements.

---

**Note:** This software requirements document follows a standardized format with priorities assigned to each requirement. This prioritization helps in identifying core functionalities for the MVP (Minimum Viable Product) and guides the development process accordingly.
