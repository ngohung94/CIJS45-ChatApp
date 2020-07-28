const init = () => {
    let firebaseConfig = {
      apiKey: "AIzaSyD8WkeWJ0ZVtqHaalg2OO2XxSJQb7sRR34",
      authDomain: "chat-app-64ade.firebaseapp.com",
      databaseURL: "https://chat-app-64ade.firebaseio.com",
      projectId: "chat-app-64ade",
      storageBucket: "chat-app-64ade.appspot.com",
      messagingSenderId: "713948918157",
      appId: "1:713948918157:web:b81f68f2b4bfe80984cdc4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase.app().name)
    
    // view.setActiveScreen('registerScreen')
    view.setActiveScreen('loginScreen')
    
}
window.onload = init 

