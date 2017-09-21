#Low Hanging Fruit

This application will enable food sharing between neighbors, who can contact each other to trade food or leave a notice saying that they've got food to give away. Later on, this app will show events in the area where food is being given for free or low cost.

# Contributing

Interested in contributing? Check the contributing guide when it is live for our code quality standards, information about how to pick a ticket or file one for a requested feature, and for our git flow process.

# Set Up

1. Fork this repository.
2. Clone your repository to your local machine: `$ git clone https://github.com/yourgithubnamehere/LowHangingFruit.git`
3. Switch into the correct directory: `$ cd LowHangingFruit/server`
3. Install all node packages: `$ npm install`
4. Create a postgres database called lowhangingfruit.
5. Create a .env file: `$ touch .env`
6. Add a variable called DATABASE_URL and set it to postgres://`whoami`@localhost:5432/lowhangingfruit
7. Start the app with `$ npm start`
