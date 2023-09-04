const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");

const app = express();
const PORT = 3000;

const redisClient = redis.createClient();

const SESSION_DURATION = 60000;

app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      ttl: SESSION_DURATION / 1000,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: SESSION_DURATION },
  })
);

app.get("/create-session", (req, res) => {
  req.session.user = { id: 1, name: "Motion Impossible" };
  res.send("Session created!");
});

app.get("/delete-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);
    res.send("Session destroyed!");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// setInterval(() => {
//   const THRESHOLD = Date.now() - 50000;
//   redisClient.keys("sess:*", (err, keys) => {
//     if (err) throw err;

//     keys.forEach((key) => {
//       redisClient.get(key, (err, sessionData) => {
//         if (err) throw err;

//         const sessionObj = JSON.parse(sessionData);
//         if (sessionObj.cookie && sessionObj.cookie.expires < THRESHOLD) {
//           redisClient.del(key, (err) => {
//             if (err) console.error("Error deleting session:", err);
//             else console.log("Deleted dangling session:", key);
//           });
//         }
//       });
//     });
//   });
// }, 30000); // Run the cleanup every 30 seconds.
