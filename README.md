## EstatePlanR
EstatePlanR is a web application that allows people to create estate plans in a simple, automated way.

## Link to the deployed page
[estateplanr-app.herokuapp.com](estateplanr-app.herokuapp.com)

## People/organizations you borrowed code from or APIs you used 
#### Libraries and Frameworks Used
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Bootstrap](https://getbootstrap.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Router-Bootstrap](https://github.com/react-bootstrap/react-router-bootstrap)
- [React Router](https://reacttraining.com/react-router/)
- [DocxTemplater](https://docxtemplater.com/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

#### APIs Used
- [PayPal](https://developer.paypal.com/docs/api/overview/)


## Features Implemented
#### Landing Page
![landing][landing]

#### Users can complete a questionnaire
![questionnaire][questionnaire]
![questionnaire2][questionnaire2]

#### Users can create accounts
![createaccount][createaccount]

#### Users can purchase templates via PayPal
![checkout1][checkout1]
![checkout2][checkout2]
![checkout3][checkout3]

#### Users can manage their account via a dashboard
![profile1][profile1]

#### Users can download their documents, update their documents, and view previous version of documents
![yourdocs][yourdocs]

#### Users can add new questionnaire responses
![editresponse][editresponse]

#### Users can view previous questionnaire responses
![responses1][responses1]
![responses2][responses2]

#### Users can change their password or email
![changepassword][changepassword]

#### Users can delete their account
![deleteaccount][deleteaccount]

#### Admins can edit the questionnaire
![admineditquestionnaire][admineditquestionnaire]

#### Admins can upload templates
![adminaddtemplate][adminaddtemplate]

#### Admins can test templates
![admintesttemplate][admintesttemplate]

#### Admins can create mock responses
![admineditresponse][admineditresponse]


## Running the project
#### Run Locally
##### 1. Configuration
1. Create a new file `/server/config/config.js`.
2. Copy the contents of `/server/config/config.example.js` into your new file.
3. Replace the session secret with a new secret value.
4. Replace the DB URI with your MongoDB URI.

##### 2. `npm run dev`
This starts the server and client simultaneously in development mode. A browser window should open automatically with the url `localhost:3000`. If not, open Chrome and navigate to that URL.

#### Deploy to Heroku
##### 0. Create Project
Create an "app" on Heroku. As of 2019, this can be done by navigating to [dashboard.heroku.com/apps](https://dashboard.heroku.com/apps) and clicking "New".

##### 1. Configuration
Run the following commands from the project root.

1. `heroku login`. This will authenticate you with Heroku.
2. `heroku git:remote -a [your-app-name-on-heroku]`. This will configure the app to deploy to your newly-created Heroku app.

Then add the following environment variables.

1. `heroku config:set DB_URI=[your-mongodb-uri]`
2. `heroku config:set SESSION_SECRET=[your-session-secret]`

##### 2. Deployment
1. `git push heroku master`. This will build and deploy EstatePlanR to Heroku.


## Other Configuration Information
### File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


### Available Scripts

In the project directory, you can run:

##### `npm run dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

##### `npm run client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


##### `npm run server`

Runs just the server in development mode.<br>


##### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

[adminaddtemplate]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/adminaddtemplate.png
[admineditquestionnaire]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/admineditquestionnaire.png
[admineditresponse]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/admineditresponse.png
[admintesttemplate]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/admintesttemplate.png
[changepassword]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/changepassword.png
[checkout1]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/checkout1.png
[checkout2]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/checkout2.png
[checkout3]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/checkout3.png
[createaccount]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/create-account.png
[deleteaccount]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/deleteaccount.png
[editresponse]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/editresponse.png
[landing]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/landing.png
[profile1]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/profile1.png
[questionnaire]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/questionnaire.png
[questionnaire2]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/questionnaire-t2.png
[responses1]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/responses1.png
[responses2]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/responses2.png
[yourdocs]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/yourdocs.png
[yourresponses]: https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/raw/master/docs/images/yourresponses.png
