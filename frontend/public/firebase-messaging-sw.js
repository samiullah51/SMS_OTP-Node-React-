// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC4qz9EaE66B-gfPnnruOfVNLSUlrnow5o",
  authDomain: "notification-76dbc.firebaseapp.com",
  projectId: "notification-76dbc",
  storageBucket: "notification-76dbc.appspot.com",
  messagingSenderId: "345595867197",
  appId: "1:345595867197:web:52b2c5add5aafcc4fcfa54",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  //payload.notification.title
  //payload.notification.body
  const notificationTitle = "DEMO TITLE";
  const notificationOptions = {
    body: "DEMO description of the notification",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
