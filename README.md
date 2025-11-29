# QuizeApp_AlmaBetter
Quiz App
---------

Overview : 
---------
A complete React-based Quiz Application that allows users to create quizzes, manage quiz questions, play quizzes, and view results in a modal. This project uses React, Redux, Redux Thunk, Material-UI, and React Router to create a clean, responsive, and fully functional learning platform.

⭐ Features
🔹 Navigation & Pages
Navbar with Home, My Quiz, Play Quiz
Responsive routing using React Router

🔹 Home Page
Three cards:
Create New Quiz
My Quizzes
Play Quiz

🔹 Create Quiz Flow
Opens a Modal to choose question type:
MCQ (Single Correct) — mandatory
MCQ (Multi Correct)
Short Answer (2 words)
Description (2–4 sentences)
After selecting type → Modal closes and quiz form opens.

🔹 MCQ (Single Correct) Features
Input fields for:
Title (10–30 characters)
Question (10–200 characters)
Add Option button:
Opens an input field for option
Disable option inputs after creation
Delete a specific option
At least 2 options required, otherwise show error
Dropdown to choose correct answer (1, 2, 3…)
Add Question button creates a new form to add multiple questions
Save Questions button:
Saves all questions to localStorage under key "question"

Opens a modal:
"Question created successfully"
Buttons: View All Questions / Close

🔹 My Quiz Page
Table showing:
Title
Active / Inactive radio
Created Date
Actions: Edit & Delete
Edit:
Opens modal with pre-filled data
Delete:
Confirmation modal (Yes / No)
Only Active questions are available for playing quiz

🔹 Play Quiz Page
Input field to enter Full Name (5–50 chars)
Name appears on right side of Navbar
On clicking Start Quiz, the quiz begins

🔹 Quiz Playing Flow
Card shows:
Title
Question
Options (Radio buttons)
Next Question button activates only when an option is selected
Clicking Next Question:
Shows next question
Hides previous question
Updates question count
After last question → Submit Quiz button appears

🔹 Result Page (Modal Version)
After submitting:
Shows Congratulations Modal displaying:
Score: e.g., “You answered 7 out of 10 correctly 🎉”
Below modal, a Result Card also shows score
Fully responsive using Material-UI Grid & Paper

🛠️ Tech Stack
React.js
Redux (state management)
Redux Thunk (async middleware)
Material-UI (MUI) for UI components & responsiveness
React Router for navigation
localStorage for data persistence

Folder Structure :
------------------
src/
├── components/      # Reusable components (Navbar, Modal, QuizCard, Footer)
├── pages/           # Pages (Home, CreateQuiz, MyQuiz, PlayQuiz, login, congratulationsModal, Result)
├── redux/           # Redux (actions, reducers, store)
├── utils/           # Helper functions/constants
├── App.js           # Main app with routes
└── index.js         # Entry point
