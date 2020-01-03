# Lofi Labs - A Machine Learning and Web Development Project

**Team:** Olivier Gabison, Joo Jang, Si Woo Park, Caedon Hsieh

**Machine Learning Lead:** Daniel Bang

**Full-Stack Development Lead:** Elise Lee

## Development Guide
### Front End Development
The front end is built in **React 16.12.0**. To start your front end development environment:
1. Go to the lofi-frontend folder, usually by typing the following into your command line: 
	`cd lofi-frontend`
2. Start the development server: `npm start`
3. Go to http://localhost:3000 to view it in the browser

### Back End Development
The back end is in **Python 3** using **Flask**, with a **MongoDB** database.
#### First-time development: Setting up virtual environment
A virtual environment is an isolated copy of Python that lets you work on one project without worrying about changes globally that may affect other projects. Packages installed in your virtual environment will not affect the global Python installation.
1. Go to lofi-backend: `cd lofi-backend`
2. Create virtual environment: `virtualenv mypython`
3. Activate virtual environment: `source mypython/bin/activate`
4. Install requirements into virtual environment: `pip install -r requirements.txt`

From now on, just make sure you are in your virtual environment when developing in lofi-backend.
- To activate virtual environment: `source mypython/bin/activate`
- To deactivate virtual environment: `deactivate`

## Pull Requests Procedure
To make a change to the repository, open a pull request. First, your code changes should be on a branch (ex, "elise-icons-update") other than master. To create a pull request:
1. Click on the "Pull requests" tab from the lofi-labs repo in Github
2. Click "new pull request"
3. The base branch should be "master," and the compare banch should be your branch (ex, "elise-icons-update").
4. Click "create pull request" and review the changes you are proposing to make sure only your intended changes are present.
