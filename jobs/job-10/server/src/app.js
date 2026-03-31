import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

const authHeader = 'authorization-header';

// Data storage
const users = [
  {
    id: uuidv4(),
    user_id: "user1",
    login: "user1@example.com",
    password: "password1",
    tokens: [],
  },
  {
    id: uuidv4(),
    user_id: "user2",
    login: "user2@example.com",
    password: "password2",
    tokens: [],
  },
];
const tokens = [];
const articles = [
  {
    id: uuidv4(),
    article_id: "article1",
    title: "Article 1",
    content: "This is the content of Article 1",
    visibility: "public",
    user_id: "user1",
  },
  {
    id: uuidv4(),
    article_id: "article2",
    title: "Article 2",
    content: "This is the content of Article 2",
    visibility: "private",
    user_id: "user1",
  },
  {
    id: uuidv4(),
    article_id: "article3",
    title: "Article 3",
    content: "This is the content of Article 3",
    visibility: "logged_in",
    user_id: "user2",
  },
];

// Check if a token is valid
const isTokenValid = (token) => {
  return tokens.some((t) => t.token === token && !t.invalid);
};

// Get user by token
const getUserByToken = (token) => {
  return users.find((user) => {
    return user.tokens.some((t) => t.token === token && !t.invalid);
  });
};

// Middleware to validate token
const validateToken = (req, res, next) => {
  const token = req.headers[authHeader];

  if (!token) {
    return res.sendStatus(401);
  }

  if (!isTokenValid(token)) {
    return res.sendStatus(401);
  }

  // Move to the next middleware
  next();
};

// POST /api/user - Add a user to the database
app.post('/api/user', (req, res) => {
  const { user_id, login, password } = req.body;

  if (!user_id || !login || !password) {
    return res.sendStatus(400);
  }

  const existingUser = users.find((user) => user.user_id === user_id);

  if (existingUser) {
    return res.sendStatus(409);
  }

  const user = {
    id: uuidv4(),
    user_id,
    login,
    password,
    tokens: [],
  };
  users.push(user);

  res.sendStatus(201);
});

// POST /api/authenticate - Authenticate a user
app.post('/api/authenticate', (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const user = users.find((user) => user.login === login);

  if (!user || user.password !== password) {
    return res.sendStatus(401);
  }

  const token = uuidv4();
  user.tokens.push({ token, invalid: false });
  tokens.push({ token, invalid: false });

  res.status(200).json({ token });
});

// POST /api/logout - Log out the user
app.post('/api/logout', validateToken, (req, res) => {
  const token = req.headers[authHeader];
  const user = getUserByToken(token);

  if (user) {
    const userToken = user.tokens.find((t) => t.token === token);

    if (userToken) {
      userToken.invalid = true;
      tokens.splice(tokens.findIndex((t) => t.token === token), 1);

      return res.sendStatus(200);
    }
  }

  res.sendStatus(401);
});

// POST /api/articles - Create an article
app.post('/api/articles', validateToken, (req, res) => {
  const { article_id, title, content, visibility } = req.body;

  if (!article_id || !title || !content || !visibility) {
    return res.sendStatus(400);
  }

  const article = { id: uuidv4(), article_id, title, content, visibility, user_id: req.user_id };
  articles.push(article);

  res.sendStatus(201);
});

// GET /api/articles - Get a list of articles
app.get('/api/articles', validateToken, (req, res) => {
  const token = req.headers[authHeader];
  const user = getUserByToken(token);

  if (user) {
    const filteredArticles = articles.filter((article) => {
      return (
        article.visibility === 'public' ||
        article.visibility === 'logged_in' ||
        article.user_id === user.user_id
      );
    });

    if (filteredArticles.length === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).json(filteredArticles);
  }

  const publicArticles = articles.filter((article) => article.visibility === 'public');

  if (publicArticles.length === 0) {
    return res.sendStatus(404);
  }

  res.status(200).json(publicArticles);
});

// GET /api/articles-pager - Get a list of articles with pagination
app.get('/api/articles-pager', validateToken, (req, res) => {
  const token = req.headers[authHeader];
  const user = getUserByToken(token);
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  let articlesList = articles;

  if (user) {
    articlesList = articles.filter((article) => {
      return (
        article.visibility === 'public' ||
        article.visibility === 'logged_in' ||
        article.user_id === user.user_id
      );
    });
  } else {
    articlesList = articles.filter((article) => article.visibility === 'public');
  }

  if (startIndex >= articlesList.length) {
    return res.status(200).json({ articles: [], totalPages: 0 });
  }

  const paginatedArticles = articlesList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(articlesList.length / pageSize);

  res.status(200).json({ articles: paginatedArticles, totalPages });
});

// PUT /api/articles - Update an article
app.put('/api/articles', validateToken, (req, res) => {
  const { article_id, title, content, visibility } = req.body;

  if (!article_id) {
    return res.sendStatus(400);
  }

  const articleIndex = articles.findIndex((article) => article.article_id === article_id);

  if (articleIndex === -1) {
    return res.sendStatus(404);
  }

  const user = getUserByToken(req.headers[authHeader]);

  if (articles[articleIndex].user_id !== user.user_id) {
    return res.sendStatus(403);
  }

  articles[articleIndex] = {
    ...articles[articleIndex],
    title: title || articles[articleIndex].title,
    content: content || articles[articleIndex].content,
    visibility: visibility || articles[articleIndex].visibility,
  };

  res.sendStatus(200);
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

/* function processURLs(urls) {
  const promises = [];

  function processURL(url, index) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = `Response from ${url}`;
        resolve({ response, index });
      }, Math.random() * 1000);
    });
  }

  for (let i = 0; i < urls.length; i++) {
    const promise = processURL(urls[i], i);
    promises.push(promise);
  }

  const responses = [];
  let currentIndex = 0;

  async function processNextPromise() {
    if (currentIndex >= promises.length) {
      return;
    }

    const promise = promises[currentIndex];
    currentIndex++;

    const { response, index } = await promise;

    responses[index] = response;
    console.log(response);

    await processNextPromise();
  }

  return new Promise((resolve, reject) => {
    processNextPromise().then(() => {
      console.log('All responses:', responses);
      resolve(responses);
    }).catch((error) => {
      reject(error);
    });
  });
}

const urls = [
  'http://example.com/1',
  'http://example.com/2',
  'http://example.com/3',
  'http://example.com/4',
  'http://example.com/5',
  'http://example.com/6'
];

processURLs(urls).then((responses) => {
  console.log('Final responses:', responses);
}).catch((error) => {
  console.error('Error:', error);
}); */