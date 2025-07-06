## DevTInder Web

- Create a Vite + React application
- Remove unnecessary code and create a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add Navbar component to App.jsx

- Create a navbar saperate component file
- install react router dom
- Create BrowserRouter > Routes > Route= / Body > RouteChildren
- Create an Outlet in your body component
- Create Footer

- Create a login page
- Install axios
- CORS - install cors in backend => add middleware to with configration: oregin, credential: true
- Whenever you're making API call so pass => {withCredentials: true}

- Install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- ConfigureStore => Provider => createSlice => add reducr to store
- Add redux devtools in chrome
- Login and see if your data is coming properly in the store
- Navbar should update as soon as user logs in
- Refactor our code to add constant file + create a components folder

- You should not be access other page without login
- If token is not present, redirect to user login page
- logout features //still pending
- Get the feed and add the feed in the store
- build the user card in the feed
- Edit profile features

- Show Toast Message on save of profile
- New page - See all my connections
- New page - See all my connection requests
- Feture - Accept/Reject connection request

- Send/Ignore user card from the feed
- Sign up new user
- E2E testing

Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile

## Deploment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-16-16-26-75.eu-north-1.compute.amazonaws.com
- install NVM - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
- nvm install 22.14.0
- Git clone
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance
