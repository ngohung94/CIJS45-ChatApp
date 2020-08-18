const model = {}
model.currentUser = undefined;
// load cuoc tro chuyen
model.conversations = undefined;
model.currentConversation = undefined;
// luu lai ten tren fire base
model.collectionName = 'conversations';
model.register = async (data) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    firebase.auth().currentUser.updateProfile({
      displayName: data.firstName + ' ' + data.lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check you email!')
    view.setActiveScreen('loginScreen')
  } catch(err) {
    console.log(err)
    alert(err.message)
  }

    // .then( res => {
    //     firebase.auth().currentUser.updateProfile({
    //         displayName : data.fistName + " " + data.lastName,
    //     })
    //     firebase.auth().currentUser.sendEmailVerification().catch((err) => {
    //         console.log(err)
    //     });
    // });
    
}

model.login = async (dataLogin) => {
    try {
      const response =  await firebase.auth().signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
      console.log(response)
          if (response.user.emailVerified === false){
              document.getElementById('email-error').innerText  = 'Please verify your email'
          }else{
              model.currentUser = {
                  displayName : response.user.displayName,
                  email : response.user.email
              } 
              view.setActiveScreen('chatScreen')
          }
      } catch(err){
          console.log(err)
          if (err.code == 'auth/user-not-found' || err.code == 'auth/invalid-email') {
              document.getElementById('email-error').innerText  = `${err.message}`
          } else if (err.code == 'auth/wrong-password') {
            document.getElementById('password-error').innerText  = `${err.message}`
          }
    }
}

model.addMessage = (message) => {
        const dataToUpdate = {
          messages : firebase.firestore.FieldValue.arrayUnion(message)
        }
        firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate)
}

model.loadConversations = async () =>{
    const response = await firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get()
    model.conversations = getDataFromDocs(response.docs)
    // load cuoc tro chuyen dau tien
    if(model.conversations.length > 0){
      model.currentConversation = model.conversations[0]
      view.showCurrentConversation()
    }
    view.showConversations()
}     
// lang nghe thay doi
model.listenConversationsChange  = () => {
  let isFirstRun = true ;
  firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email)
  .onSnapshot((res) => {
    if(isFirstRun){
      isFirstRun = false ;
      return 
    }
    // 1 list document su thay doi
    const docChanges = res.docChanges()
    console.log(docChanges)
    for(oneChange of docChanges) {
      const type = oneChange.type
      if(type === 'modified'){
        const docData = getDataFromDoc(oneChange.doc)
        // update lai model.conversation
        for( let index = 0 ;index < model.conversations.length; index++){
          if(model.conversations[index].id === docData.id){
            model.conversations[index] = docData
          }
        }
        if (docData.messages[docData.messages.length - 1].owner !== model.currentUser.email){
          view.showNotification(docData.id)
        }
        // update model.currentConversation
        if(docData.id === model.currentConversation.id){
          if(docData.users.length !== model.currentConversation.users.length){
            view.addUser(docData.users[docData.users.length - 1])
            view.updateNumberUsers(docData.id,docData.users.length)
          }else {
            const lastMessage = docData.messages[docData.messages.length - 1]
            view.addMessage(lastMessage)
            view.scrollToEndElement()
          }
          model.currentConversation = docData
        }
      }
      if(type === 'added'){
        const docData = getDataFromDoc(oneChange.doc)
        model.conversations.push(docData)
        view.addConversation(docData)
      }
    }
  })
}

// add  new conversation
model.createConversation =  (dataCreateConversation) => {
  firebase.firestore().collection(model.collectionName).add(dataCreateConversation)
  view.setActiveScreen('chatScreen',true)  // them true de lang nghe thay doi ko bi add nhieu lan 
}

// add user to the conversation
model.addUser = (user) => {
  const dataToUpdate = {
    users : firebase.firestore.FieldValue.arrayUnion(user)
  }
  firebase.firestore().collection(model.collectionName).doc(model.currentConversation.id).update(dataToUpdate)
}