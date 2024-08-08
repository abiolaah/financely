# Financely - Personal Finance Tracker

The Financely WebApp project is a user-friendly web application built to simulate a tracking system. The aim of the web app is to help track income and expenses and manage budgets. The Tech stack used is Reactjs and Firebase

## Table of Contents
- [Instruction](#instruction)
- [Frontend](#frontend)
    - [Steps for Frontend with Clonned Repository](#steps-for-frontend-with-clonned-repository)
    - [Steps for Building Frontend from Scratch](#steps-for-building-frontend-from-scratch)
- [Lessons](#lesson)
- [React Note](#react-note)

### Instruction
- To clone the repository, copy and paste the command below to your terminal
```sh
 git clone https://github.com/abiolaah/financely.git
```
- Follow the steps in [this documentation](https://firebase.google.com/docs/build?_gl=1*zt8ep9*_up*MQ..*_ga*ODk0OTU0MjE5LjE3MjMxMzkzMzk.*_ga_CW55HF8NVT*MTcyMzEzOTMzOC4xLjAuMTcyMzEzOTMzOC4wLjAuMA..) to get started with firebase.



### Frontend
The frontend is built using Reactjs and the dependencies are listed below:
- TailwindCSS: for design instead of basic CSS. Check out its documentation [here](https://tailwindcss.com/docs/installation).
- Shadcn UI: to get custom and easy to use components. Check out its documentation [here](https://ui.shadcn.com/docs).
- React-Router-Dom: to navigate between pages. Check out its documentation [here](https://www.npmjs.com/package/react-router-dom).
- lucide-react: to get icons to represent. Check out its documentation [here](https://lucide.dev/).
- ant-design: to get custom and easy to use components. Check out its documentation [here](https://ant.design/components/overview).
- ant-design/charts: to get charts diagrams. Check out its documentation [here](https://www.npmjs.com/package/@ant-design/charts).

#### Steps for Frontend with Clonned Repository
Below are steps to follow if using the cloned repository
1. After following the clonning instruction above.
2. Navigate to the root directory in your terminal.
    ```sh
    cd financely
    ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Start the frontend development server with the command below
     ```sh
    npm run dev
    ```
5. Open your web browser and navigate to ```http://localhost:5173``` to view the application.

#### Steps for Building Frontend from Scratch
Below are steps to follow if building from scratch
1. Navigate to the root directory of your project in terminal
```sh
cd <name-of-your-project>
```
2. Create a new React app using the Vite with the command below
```sh
npm create vite@latest
```
3. Give the project a name. I would recommend using frontend or client if the backend and frontend will be in the same main directory
4. Use the down arrow key to navigate to React and use Enter or Return to select it as your framework.
5. Use the down arrow key to navigate to Javascript and use Enter or Return to select it as your variant.
6. Run the command below to navigate to the frontend directory
```sh
cd <name-of-frontend-directory>
```
7. Run the command below to install necessary basic dependencies for react
```sh
npm install
```
8. Start the frontend development server with the command below
 ```sh
npm run dev
```
or 
```sh
npm start
```
9. Open your web browser and navigate to ```http://localhost:5173``` to view the application.

10. Use the command below to install the dependencies for this project. List of dependencies/package are above
```sh
npm install <package-name>
```
11. You can use the code in the repository to complete your code.

### Lesson
- Learnt to create a financial tracker using Reactjs, Firebase, TailwindCSS, Shadcn UI and AntDesign. 
- I learnt to use firestore for data storage and firebase authentication for sign in and sign up.


### React Note
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh