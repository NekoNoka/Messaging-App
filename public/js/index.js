"use strict";

const messages = document.querySelector("#messages");

class EventEmitter {
  constructor(name = "Emitter") {
    this.table = {};
    this.name = name;
  }
  on(eventName, callBack) {
    let temp = this.table[eventName];
    if (temp) {
      temp.push(callBack);
    } else {
      this.table[eventName] = [callBack];
    }
    let log_message = `added event ${eventName} to ${this.name}`;
    console.log(log_message);
  }
  emit(eventName, ...args) {
    this.table[eventName]?.forEach((callBack) => callBack(...args));
    let log_message = `finished emitting event ${eventName} using ${this.name}`;
    console.log(log_message);
  }
  delete(eventName) {
    delete this.table[eventName];
  }
}

const eventSys = new EventEmitter();

// html button handlers
(function () {
  const sendPacket = async (event) => {
    const message = document.querySelector("#typed-message").value.trim();
    document.querySelector("#typed-message").value = "";

    if (message) {
      console.log(message);
      eventSys.emit(
        "sendPacket",
        JSON.stringify({ type: "message", data: { message } })
      );
    }
  };

  eventSys.on("message", (data) => {
    let div = document.createElement("div");
    div.innerText = data.message;
    messages.appendChild(div);
  });
  document.querySelector("#typed-message")?.addEventListener("keydown", (e) => {
    e.key === "Enter" && sendPacket();
  });
  document
    .querySelector("#send-message")
    ?.addEventListener("click", sendPacket);
})();

// websocket
(function () {
  if (location.pathname !== "/") return;

  const ws = new WebSocket("ws://" + location.hostname + ":5757");

  ws.addEventListener("message", (message) => {
    let packet = JSON.parse(message.data);
    console.log(packet);
    eventSys.emit(packet.type, packet.data);
  });

  ws.addEventListener("error", () => {
    // document.location = "about:blank";
  });

  ws.addEventListener("open", () => {
    console.log("Connection Opened");
    let token = JSON.parse(localStorage.getItem("token"));
    let packet = JSON.stringify({ type: "init", data: { token } });
    eventSys.emit("sendPacket", packet);
    eventSys.emit("wsconnect");
    // document.location = "about:blank";
  });

  ws.addEventListener("close", () => {
    console.log("Connection Closed");
    // document.location = "about:blank";
  });

  eventSys.on("sendPacket", (packet) => {
    console.log(packet);
    ws.send(packet);
  });
})();

(function () {
  if (location.pathname !== "/login") return;
  const loginForm = async (e) => {
    e.preventDefault();

    const username = document.querySelector("#login-username")?.value?.trim();
    const password = document.querySelector("#login-password")?.value?.trim();

    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        localStorage.setItem("token", JSON.stringify(await response.json()));
        document.location.replace("/");
      } else {
        alert("Error logging in");
      }
    }
  };

  const signupForm = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username-signup")?.value?.trim();
    const password = document.getElementById("signup-password")?.value?.trim();

    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        localStorage.setItem("token", JSON.stringify(await response.json()));
        document.location.replace("/");
      } else {
        alert("Error signing up");
      }
    }
  };

  document.getElementById("login-form")?.addEventListener("submit", loginForm);

  document
    .getElementById("signup-form")
    ?.addEventListener("submit", signupForm);
})();

(function () {
  if (location.pathname !== "/") return;
  const logoutForm = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert("Error logging out");
    }
  };

  document.getElementById("logout-btn")?.addEventListener("click", logoutForm);
})();

(function () {
  if (location.pathname !== "/") return;
  const addChannelForm = async (e) => {
    const channelName = document.querySelector("#channel-name")?.value?.trim();

    e.preventDefault();
    if (channelName) {
      let packet = JSON.stringify({
        type: "create_channel",
        data: { name: channelName },
      });
      eventSys.on("create_channel_update", (data) => {
        console.log(data.status, data.name);
        eventSys.delete("create_channel_update");
      });
      eventSys.emit("sendPacket", packet);
    }
  };
  document
    .querySelector("#submit-channel-btn")
    ?.addEventListener("click", addChannelForm);
})();

function selectNav(div, el) {
  document.querySelector("#home").className = "hidden";
  document.querySelector("#lobby").className = "hidden";
  document.querySelector("#add-channel").className = "hidden";
  document.querySelector("#about").className = "hidden";

  document.querySelector("#home-btn").classList.remove("active");
  document.querySelector("#discover-btn").classList.remove("active");
  document.querySelector("#create-channel-btn").classList.remove("active");
  document.querySelector("#about-us").classList.remove("active");

  document.querySelector("#home-btn").classList.remove("disabled");
  document.querySelector("#discover-btn").classList.remove("disabled");
  document.querySelector("#create-channel-btn").classList.remove("disabled");
  document.querySelector("#about-us").classList.remove("disabled");

  div.className = "";
  el?.classList?.add("active");
  el?.classList?.add("disabled");
}

(function () {
  if (location.pathname !== "/") return;

  function viewHome() {
    selectNav(
      document.querySelector("#home"),
      document.querySelector("#home-btn")
    );
  }

  function viewSearch() {
    populateChannelInfo();
  }

  function viewChannelForm() {
    selectNav(
      document.querySelector("#add-channel"),
      document.querySelector("#create-channel-btn")
    );
  }

  function aboutUs() {
    selectNav(
      document.querySelector("#about"),
      document.querySelector("#about-us")
    );
  }

  document.getElementById("about-us")?.addEventListener("click", aboutUs);
  document.querySelector("#home-btn")?.addEventListener("click", viewHome);
  document
    .querySelector("#discover-btn")
    ?.addEventListener("click", viewSearch);
  document
    .querySelector("#create-channel-btn")
    ?.addEventListener("click", viewChannelForm);
})();

function getChannel(id, callback) {
  let packet = JSON.stringify({
    type: "join_channel",
    data: { id },
  });
  eventSys.on("join_channel", (data) => {
    callback(data);
    eventSys.delete("join_channel");
  });
  eventSys.emit("sendPacket", packet);
}

function populateChannel(id) {
  getChannel(id, (data) => {
    console.log(data);
    let messagesEl = document.querySelector("#messages");
    messagesEl.innerHTML = "";
    for (let Message of data.Messages) {
      let div = document.createElement("div");
      div.innerText = Message.message;
      messagesEl.appendChild(div);
    }
  });
}

(function () {
  if (location.pathname !== "/") return;

  document.querySelector("#logout-btn").classList.remove("disabled");
})();

function populateChannelInfo() {
  let packet = JSON.stringify({
    type: "public_channels",
  });

  eventSys.on("public_channels", (data) => {
    let table = document.createElement("div");

    for (let item of data.channels) {
      let divContainer = document.createElement("div");
      let li = document.createElement("div");
      let btn = document.createElement("button");
      btn.innerHTML = `join: ${item.name}`;
      btn.addEventListener("click", () => populateChannel(item.id));
      selectNav(
        document.querySelector("#lobby"),
        document.querySelector("#discover-btn")
      );
      li.textContent = item.name;

      divContainer.appendChild(li);
      divContainer.appendChild(btn);
      table.appendChild(divContainer);
    }
    document.querySelector("#channel-list").innerHTML = "";
    document.querySelector("#channel-list").appendChild(table);

    eventSys.delete("public_channels");
  });

  eventSys.emit("sendPacket", packet);
}
eventSys.on("wsconnect", populateChannelInfo);
