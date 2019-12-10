## EstatePlanR
EstatePlanR is a web application that allows people to create estate plans in a simple, automated way.

## Link to the deployed page
[estateplanr-app.herokuapp.com](estateplanr-app.herokuapp.com)

## People/organizations you borrowed code from or APIs you used 
#### Libraries and Frameworks Used
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/) was used for state management. In order to contribute to this application, you will need to understand how Redux works -- a good starting point is reading through the developer docs available [here](https://redux.js.org/introduction/getting-started). You need to know about async actions.
- [Bootstrap](https://getbootstrap.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Router-Bootstrap](https://github.com/react-bootstrap/react-router-bootstrap) was used to integrate react-bootstrap with react-router
- [React Router](https://reacttraining.com/react-router/)
- [DocxTemplater](https://docxtemplater.com/) was used as the engine for the DOCX templates. It was abstracted to a [utility library](https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/blob/master/server/utils/templating.js). Code snippets were also used from the developer docs for the DOCXTemplater in this utility library.
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [react-async-script-loader](https://www.npmjs.com/package/react-async-script-loader) was used to load global scripts needed for PayPal into the browser environment.
- [react-paypal-button-v2](https://www.npmjs.com/package/react-paypal-button-v2) was used to encapsule the PayPal scripts (which are pure JS) with React. 

#### APIs Used
- [PayPal](https://developer.paypal.com/docs/api/overview/). The API was used to do payments and validation, and the code snippets from the developer documentation were used in the [PayPal Button](https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/blob/master/client/src/components/PaypalButton.jsx) component in the client and [PayPal library](https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/blob/master/server/controllers/paypalClient.js) we wrote on the server.

## Running the project
#### Run Locally
##### 0. Installation
1. Run `npm install`
2. Run `cd client && npm install`

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

#### Run Tests
##### Unit/Integration Tests
1. A MongoDB instance must be running on `localhost`. If MongoDB is installed, you can start it by running `service mongod start`. Alternatively, you can edit the [test config](https://github.com/Intro-to-Software-Team-9a/CEN3031-Project-Fall-2019/blob/master/server/tests/helpers/config.js) to point the integration tests to a cloud MongoDB instance.
2. Run `npm run test` in the project root.

##### Linting
* To lint the server, run `npm run lint` in the project root.
* To lint the client, run `npm run lint` in the client directory OR `npm run lint-client` in the server directory.


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
