const express = require('express');
const https = require('https');
const WebSocket = require('ws');
const fs = require('fs');
const app = express();

//initialize a simple http server

const options = {
  key: fs.readFileSync(`${__dirname}/ssl/server.key`),
  cert: fs.readFileSync(`${__dirname}/ssl/server.crt`)
};

const server = https.createServer(options, app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


//all connected to the server users 
const users = {};
let rooms = {};
//when a user connects to our sever 
wss.on('connection', function (connection) {

  console.log("User connected");

  //when server gets a message from a connected user 
  connection.on('message', function (message) {

    var data;

    //accepting only JSON messages 
    try {
      data = JSON.parse(message);
      console.log(data);
    } catch (e) {
      console.log("Invalid JSON");
      data = {};
    }

    //switching type of the user message 
    switch (data.type) {
      //when a user tries to login
      case "login":
        console.log("User logged", data.connectionId);
        for (let i = 0; i < data.connectionId.length; i++) {
          //if anyone is logged in with this username then refuse 
          const connectionId = data.connectionId[i];
          if (users.connectionId) {
            sendTo(connection, {
              type: "login",
              success: false
            });
          } else {
            //save user connection on the server 
            users[connectionId] = connection;
            connection.connectionId = connectionId;

            sendTo(connection, {
              type: "login",
              success: true
            });
          }
        }
        break;

      case "offer":
        //for ex. UserA wants to call UserB 
        console.log("Sending offer to: ", data.connectionId);
        console.log("connections", connection);
        //if UserB exists then send him offer details 
        for (let i = 0; i < data.connectionId.length; i++) {
          const connectionId = data.connectionId[i];
          var conn = users[connectionId];

          if (conn != null) {
            //setting tjit UserA connected with UserB 
            if (
              connection.otherConnections &&
              Array.isArray(connection.otherConnections)
            ) {
              connection.otherConnections.push(connectionId);
            } else {
              connection.otherConnections = [connectionId];
            }
            sendTo(conn, {
              type: "offer",
              offer: data.offer,
              connectionId: connection.connectionId
            });
          }
        }

        break;

      case "answer":
        console.log("Sending answer to: ", data.connectionId);
        //for ex. UserB answers UserA 
        for (let i = 0; i < data.connectionId.length; i++) {
          const connectionId = data.connectionId[i];
          var conn = users[connectionId];

          if (conn != null) {
            if (
              connection.otherConnections &&
              Array.isArray(connection.otherConnections)
            ) {
              connection.otherConnections.push(connectionId);
            } else {
              connection.otherConnections = [connectionId];
            }
            sendTo(conn, {
              type: "answer",
              answer: data.answer,
              connectionId: connection.connectionId
            });
          }
        }

        break;

      case "candidate":
        console.log("Sending candidate to:", data.connectionId);
        for (let i = 0; i < data.connectionId.length; i++) {

          const connectionId = data.connectionId[i];
          var conn = users[connectionId];

          if (conn != null) {
            sendTo(conn, {
              type: "candidate",
              candidate: data.candidate,
              connectionId: connection.connectionId
            });
          }
        }
        break;

      case "leave":
        console.log("Disconnecting from", data.connectionId);
        for (let i = 0; i < data.connectionId.length; i++) {
          const connectionId = data.connectionId[i];
          const conn = users[connectionId];
          conn.otherConnections = null;
          for (let j = 0; j < rooms.length; j++) {
            const conns = rooms[j].conn;
            if (conns.includes(connectionId)) {
              const index = conns.indexOf(connectionId);
              conns.splice(index, 1);
            }
          }
          //notify the other user so he can disconnect his peer connection 
          if (conn != null) {
            sendTo(conn, {
              type: "leave",
              connectionId
            });
          }
        }

        break;

      case "group":

        // for (let i = 0; i < data.name.length; i++) {
        //    const name = data.name[i];
        //    const conn = users[name];
        let isNewUser = false;
        const roomId = data.roomId;
        if (!rooms[roomId]) {
          rooms[roomId] = {}
          rooms[roomId].conns = [connection.connectionId];
        } else {
          isNewUser = true;
          rooms[roomId].conns.push(connection.connectionId);
        }
        if (isNewUser === true) {
          // const name = connection.name;
          // const conn = users[name];
          if (connection != null) {
            sendTo(connection, {
              type: "group_notification",
              conns: rooms[roomId].conns
            });
          }

          // notify the other user so he can disconnect his peer connection
          // for (let i = 0; i < rooms[roomId].conns.length; i++) {
          //    const name = rooms[roomId].conns[i];
          //    const conn = users[name];
          //    if (conn != null) {
          //       sendTo(conn, {
          //          type: "group_notification",
          //          conns: [connection.name]
          //       });
          //    }
          // }
        }
        break;
      // }

      default:
        sendTo(connection, {
          type: "error",
          message: "Command not found: " + data.type
        });

        break;
    }

  });

  //when user exits, for example closes a browser window 
  //this may help if we are still in "offer","answer" or "candidate" state 
  connection.on("close", function () {
    console.log("disconnecting user");
    if (connection.connectionId) {
      delete users[connection.connectionId];

      if (connection.otherConnections && Array.isArray(connection.otherConnections)) {
        for (let i = 0; i < connection.otherConnections.length; i++) {
          const connectionId = connection.otherConnections[i];
          console.log("Disconnecting from ", connectionId);
          var conn = users[connectionId];
          conn.otherConnections = null;
          const keys = Object.keys(rooms);
          for (let j = 0; j < keys.length; j++) {
            console.log("rooms[keys[j]].conn", rooms[keys[j]]);
            const conns = rooms[keys[j]].conns;
            if (conns.includes(connection.connectionId)) {
              const index = conns.indexOf(connection.connectionId);
              conns.splice(index, 1);
            }
          }
          if (conn != null) {
            sendTo(conn, {
              type: "leave",
              connectionId: connectionId,
            });
          }
        }
      }
    }

  });

  connection.send(JSON.stringify({ type: "Hello world" }));
});

function sendTo(connection, message) {
  connection.send(JSON.stringify(message));
}

//start our server
server.listen(process.env.PORT || 9090, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});