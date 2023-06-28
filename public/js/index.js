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
(function () {
  const sendPacket = async (event) => {
    const message = document.querySelector("#typed-message").value.trim();

    if (message) {
      console.log(message);
      eventSys.emit(
        "sendPacket",
        JSON.stringify({ type: "message", data: { message } })
      );
    }
  };

  const sendName = async (event) => {
    const name = document.querySelector("#name-message").value.trim();

    if (name) {
      console.log(name);
      eventSys.emit(
        "sendPacket",
        JSON.stringify({ type: "user_name", data: { name } })
      );
    }
  };

  eventSys.on("message", (packet) => {
    let div = document.createElement("div");
    div.innerText = packet.data.message;
    messages.appendChild(div);
  });
  document.querySelector("#send-message").addEventListener("click", sendPacket);

  document.querySelector("#send-name").addEventListener("click", sendName);
})();

// websocket
(function () {
  const ws = new WebSocket("ws://localhost:5757");

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
});
