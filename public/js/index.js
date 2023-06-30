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
    let log_message = `emitted event ${eventName} using ${this.name}`;
    console.log(log_message);
  }
}

const eventSys = new EventEmitter();

// html button handlers
((function () {
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

  eventSys.on("message", (packet) => {
    let div = document.createElement("div");
    div.innerText = packet.data.message;
    messages.appendChild(div);
  });
  document.querySelector("#typed-message")?.addEventListener("keydown", (e) => { e.key === "Enter" && sendPacket() });
  document.querySelector("#send-message")?.addEventListener("click", sendPacket);
})());

// websocket
((location.pathname == "/") && (function () {
  const ws = new WebSocket("ws://71.84.64.236:5757");

  ws.addEventListener("message", (message) => {
    let packet = JSON.parse(message.data);
    console.log(packet);
    eventSys.emit(packet.type, packet);
  });

  ws.addEventListener("error", () => {
    // document.location = "about:blank";
  });

  ws.addEventListener("open", () => {
    console.log("Connection Opened");
    let token = JSON.parse(localStorage.getItem("token"));
    let packet = JSON.stringify({ type: "init", data: { token } });
    eventSys.emit("sendPacket", packet);
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
})());

((location.pathname == "/login") && (function () {
  const loginForm = async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username")?.value?.trim();
    const password = document.getElementById("login-password")?.value?.trim();

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

  document.getElementById("signup-form")?.addEventListener("submit", signupForm);
})());

((location.pathname == "") && (function () {
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
})());