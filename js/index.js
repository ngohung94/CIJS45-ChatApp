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
    // console.log(firebase.app().name)
    // firestoreFunction()
    // addMessageFireBase()

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            if (user.emailVerified) {
                model.currentUser = {
                    displayName: user.displayName,
                    email: user.email
                }
                view.setActiveScreen('chatScreen')
            } else {
                view.setActiveScreen('loginScreen')
                alert('Please verify your email')
            }
        } else {
            view.setActiveScreen('loginScreen')
        }
    });
} 
window.onload = init 

// firestoreFunction = async ()=> {
//   // get one document
//   const documentId  = 'LuuJfcmFZ2p5pUKngVHj'
//   const response = await firebase.firestore().collection('users').doc(documentId).get()
//   const user = getDataFromDoc(response)
//   console.log(user)

//   // get many document
//   // const response2  = await firebase.firestore().collection('users').where('name','==','Ngô Văn Hùng').get()
//   const response2  = await firebase.firestore().collection('users').where('phoneNumber','array-contains','091').get()
//   console.log(response2)
//   const listUser = getDataFromDocs(response2.docs)
//   console.log(listUser)
  
//   // add document
//   const userToAdd = {
//     name : 'ABC',
//     age : 23,
//     email : "abc@gmail.com"
//   }
//   // firebase.firestore().collection('users').add(userToAdd)

//   // update document
//   documentIdUpdate = 'o6iFCeawpp67ucUR1VxP'
//   const dataToUpdate = {
//     address : "Hà Nội",
//     phoneNumber : firebase.firestore.FieldValue.arrayUnion('096')
//   }
//   firebase.firestore().collection('users').doc(documentIdUpdate).update(dataToUpdate)
//   // delete document
//   const docToDelete = "VEugQP7uqr3retqBD6CN"
//   firebase.firestore().collection('users').doc(docToDelete).delete()
// }
// // Get data from doc
getDataFromDoc  = (doc) => {
    const data = doc.data()
    data.id = doc.id
    return data
}
// // Get data from docs
getDataFromDocs = (docs) => {
    return docs.map(item => getDataFromDoc(item))
    const listData = {} 
    for (let index = 0; index < docs.length; index++) {
        const element = getDataFromDoc(docs[index]);
        listData.push(element)
    }
    return listData
}

// // add mess len firebase
// addMessageFireBase = async ()=> {
//     const documentId  = 'TUPswh8j3PdIcZVCDmSn'
//     const response = await firebase.firestore().collection('conversations').doc(documentId).get()
//     const user = getDataFromDoc(response)
//     console.log(user)
// }

