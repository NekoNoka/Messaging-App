const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers/index");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const wss = require("./ws-server");
const eventSys = require("./event_handler/eventSys");
const packetSys = require("./packet_handler/packetSys");
const models = require("./models/index");

const app = express();
const expressWs = require('express-ws')(app);
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.ws('/', function (ws, req) {
  let id =
    wss.connections.push({
      ws,
      channel: "",
      name: undefined,
      verified: false,
      bucket: new Array(5).fill(0),
    }) - 1;
  ws.on("close", (code, reason) => {
    console.log({ code, reason });
    eventSys.emit("user_left", { id, wss });
    wss.connections[id] = undefined;
  });
  ws.on("message", (packet) => {
    try {
      packet = JSON.parse(packet);
      if (typeof packet.type === "string")
        packetSys.emit(packet.type, {
          packet,
          wss,
          id,
          user: wss.connections[id],
          models,
        });
    } catch (error) {
      console.log(error);
    }
  });
  eventSys.emit("user_connected", { id, wss });
  console.log('socket', req.testing);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});


// const wss = {
//   Server: new WebSocketServer({ noServer: true }),
//   connections: [],
//   tokens: {}
// };