import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(bodyParser.json());

// keep all users here
const us = [];
// keep all tokens;
const tlist = [];
// keep articles = []
const arts = [];

const authheader = 'authorization-header';

// Check if a token is valid
const isvalTok = (tok) => {
  return tlist.some((t) => t.token === tok && !t.invalid);
};

// Get user by token
const getuser = (tok) => {
  return _.find(us, (u) => {
    return u.tokens.some((t) => t.token === tok && !t.invalid);
  });
};


// lets validate the tok
const vtok = (req, res, next) => {
  const token = req.headers[authheader];


  if (!token) {
    return res.sendStatus(401);
  }



  if (!tlist.includes(token)) {
    return res.sendStatus(401);
  }

  if (!isvtok(token)) {
    return res.sendStatus(401);
  }

  // movone to next
  next();
};


// POST /api/user - Add a user to the database
app.post('/api/user', (req, res) => {
  const { user_id, login, password } = req.body;

  if (_.isEmpty(user_id)) {
    return res.sendStatus(400);
  }
  if (_.isEmpty(login)) {
    return res.sendStatus(400);
  }

  if (_.isEmpty(password)) {
    return res.sendStatus(400);
  }

  // lets check if found
  const u = _.find(us, { user_id });

  if (u) {
    return res.sendStatus(409);
  }

  const user = {
    id: uuidv4(),
    user_id,
    login,
    password,
    toks: [],
  };
  us.push(user);

  // ok its created!
  res.sendStatus(201);
});

app.post('/api/authenticate', (req, res) => {
  const { login, password } = req.body;

  if (_.isEmpty(login)) {
    return res.sendStatus(400);
  }



  if (_.isEmpty(password)) {
    return res.sendStatus(400);
  }


  // check for user

  const u = _.find(us, { login });


  if (!u) {
    return res.sendStatus(404);
  }

  if (u.password !== password) {
    return res.sendStatus(401);
  }

  const tok = uuidv4();
  u.toks.push({ u, invalid: false });
  tlist.push({ u, invalid: false });
  res.status(200).json({ token: tok });
});


app.post('/api/logout', vtok, (req, res) => {
  const tok = req.headers[authheader];

  // get the user
  const u = getuser(tok);
  if (u) {
    const utok = _.find(usr.toks, { tok });
    if (utok) {
      utok.invalid = true;
      _.remove(tlist, { tok });
      res.sendStatus(200);
    }
  }


  res.sendStatus(404);


});

app.post('/api/articles', vtok, (req, res) => {
  const {
    article_id,
    title,
    content,
    visibility
  } = req.body;

  if (_.isEmpty(article_id)) {
    return res.sendStatus(400);
  }

  if (_.isEmpty(title)) {
    return res.sendStatus(400);
  }


  if (_.isEmpty(content)) {
    return res.sendStatus(400);
  }


  if (_.isEmpty(visibility)) {
    return res.sendStatus(400);
  }

  const artId = uuidv4();

  const article = {
    id: artId,
    article_id,
    title,
    content,
    visibility,
    user_id: req.user_id
  };
  arts.push(article);

  res.sendStatus(201);
});

app.get('/api/articles', vtok, (req, res) => {
  const tok = req.headers[authheader];

  // search the user
  const u = getuser(tok)

  // if user found return filtered articles
  if (u) {
    const filteredArticles = _.filter(arts, (ar) => {
      return (
        ar.visibility === 'public' ||
        ar.visibility === 'logged_in' ||
        ar.user_id === req.user_id
      );
    });

    return res.status(200).json(filteredArticles);
  }
  // if not return all articles
  const publicArticles = _.filter(
    arts,
    {
      visibility: 'public'
    }
  );

  res.status(200).json(publicArticles);
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3000');
});




// ==============================================

/* import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define the schema for the document
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  country: String,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Generate a random country from an array of countries
function getRandomCountry() {
  const countries = [
    'Brazil',
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'China',
    'Japan',
    'India',
    'Australia',
    'South Africa',
    // Add more countries as needed
  ];

  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

// Create 30 dummy users with random countries
async function createDummyUsers() {
  const dummyUsers = [];

  for (let i = 1; i <= 30; i++) {
    const user = new User({
      firstName: `First${i}`,
      lastName: `Last${i}`,
      dateOfBirth: new Date(1990, 0, i),
      country: getRandomCountry(),
    });

    dummyUsers.push(user);
  }

  try {
    await User.insertMany(dummyUsers);
    console.log('30 dummy users created successfully');
  } catch (error) {
    console.error('Error creating dummy users:', error);
  }
}

// Find all users between the age of 18 and 25 from Brazil with the first name "Ronaldo"
async function findUsersByAgeAndCountry(firstName, minAge, maxAge, country) {
  try {
    const users = await User.find({
      firstName,
      dateOfBirth: {
        $gte: new Date(new Date().getFullYear() - maxAge, 0, 1),
        $lte: new Date(new Date().getFullYear() - minAge, 11, 31),
      },
      country,
    });
    console.log('Users matching the criteria:', users);
  } catch (error) {
    console.error('Error finding users:', error);
  } finally {
    // Disconnect from the database when finished
    db.close();
  }
}

// Uncomment the line below to create 30 dummy users
// createDummyUsers();

// Find users between the age of 18 and 25 from Brazil with the first name "Ronaldo"

// Define the POST endpoint for creating users
app.post('/users', async (req, res) => {
  try {
    const { name, age, email } = req.body;

    // Validate the payload
    if (!name || !age || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new user
    const user = new User({ name, age, email });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
  // createDummyUsers();
  findUsersByAgeAndCountry('First3', 18, 82, 'Canada');
});
 */

///

/* const db = {};

db.blogPosts.aggregate([
  {
    $match: {

      "authors.registered": true

    }
  },


  {

    $unwind: "$tags"

  },
  {
    $group: {


      _id: "$tags",
      titles: { $push: "$title" },
      size: { $sum: 1 }
    }
  },
  {


    $sort: {
      size: -1,
      _id: 1
    }


  },
  {


    $limit: 10
  }, {
    $project: {
      _id: 0,

      tag: "$_id",
      titles: 1,
      size: 1
    }
  }
]); */