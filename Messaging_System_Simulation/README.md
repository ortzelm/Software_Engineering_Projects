**Messaging System Simulation**

This project simulates a messaging system between clients and a server using JavaScript. 
The system uses images and animations to represent the transmission of messages. 
The project also includes a proactive messaging feature that sends messages every 30 seconds.

**Features**

Message Sending : Clients can send messages to each other by specifying phone numbers.
Proactive Messaging : Every 30 seconds, a proactive message is sent from one client to another.
Message Animation : Messages are visually represented by moving image elements to simulate message transmission.
Cable Status : The availability of the cable connection is indicated by the color of the cable (red for unavailable, blue for available).
Client and Server Interaction : Messages are transferred from the server to the clients based on their availability.

**How It Works**

Clients : Represented by images that can send and receive messages.
Server : The central hub that receives and forwards messages to the appropriate clients.
Cablelines : Each client has a cable connection, which can either be available or unavailable.
Message Packaging : Messages are encapsulated in an Packageboxobject, which is sent from one client to another via the server.
