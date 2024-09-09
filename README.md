# Kanban Board

A modern Kanban board application built with React, Firebase, and Material-UI. This project allows users to manage tasks efficiently by organizing them into columns such as "TODO," "IN PROGRESS," and "COMPLETED."

## Features

- **Create, Edit, and Delete Tasks**: Add new tasks with details like title, description, due date, status, and priority. Edit or delete existing tasks as needed.
- **Drag and Drop**: Move tasks between columns using drag-and-drop functionality.
- **Task Priority**: Visualize tasks with priority labels (High, Medium, Low) and distinct color schemes.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Firebase Integration**: Uses Firebase Firestore for real-time database management and authentication.

## Installation

To run the project locally, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/kanban-board.git
    cd kanban-board
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

2. **Install other Dependencies**

    ```bash
    npm install firebase
    npm install react-beautiful-dnd @mui/material @emotion/react @emotion/styled
    ```

4. **Configure Environment Variables**

    Create a `.env` file in the root directory and add your environment variables:

    ```env
    REACT_APP_API_URL=your_api_url
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
    REACT_APP_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    ```

5. **Run the Development Server**

    ```bash
    npm start
    ```

    Navigate to `http://localhost:3000` in your browser to see the application in action.

## Deployment

To deploy the project to Vercel:

1. **Push Code to GitHub**

    Ensure your code is committed and pushed to GitHub.

2. **Connect Your Repository to Vercel**

    - Go to the [Vercel Dashboard](https://vercel.com/dashboard).
    - Click on **"New Project"** and import your GitHub repository.

3. **Set Up Environment Variables**

    - In the Vercel project settings, go to **"Environment Variables"** and add the same variables as in your `.env` file without values, just the keys. Vercel will use these to build and deploy your application.

4. **Deploy**

    - Click on **"Deploy"** and wait for Vercel to build and deploy your project.

## Usage

- **Creating a Task**: Click on the "Create Task" button to open the task modal. Fill in the task details and submit.
- **Moving Tasks**: Drag and drop tasks between the "TODO," "IN PROGRESS," and "COMPLETED" columns.
- **Viewing Task Details**: Click on a task card to view its details.

## Contributing

Feel free to submit issues or pull requests. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit and push your changes (`git push origin feature/your-feature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **React**: For building the user interface.
- **Firebase**: For backend services and real-time database.
- **Material-UI**: For design components and styles.
- **react-beautiful-dnd**: For drag-and-drop functionality.

## Developed By

This project is developed by **Isha Aggarwal**.

---

Feel free to modify this README as needed to better fit your project’s specifics and additional features.
