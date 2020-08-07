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
        firebase.firestore().collection(model.collectionName).doc("TUPswh8j3PdIcZVCDmSn").update(dataToUpdate)
}

model.loadConversations = async () =>{
    const response = await firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get()
    model.conversations = getDataFromDocs(response.docs)
    if(model.conversations.length > 0){
      model.currentConversation = model.conversations[0]
      view.showCurrentConversation()
    }
}     

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
        console.log(docData)
        // update lai model.conversation
        for( let index = 0 ;index < model.conversations.length; index++){
          if(model.conversations[index].id === docData.id){
            model.conversations[index] = docData
          }
        }
        // update model.currentConversation
        if(docData.id === model.currentConversation.id){
          model.currentConversation = docData
          const lastMessage = docData.messages[docData.messages.length - 1]
          view.addMessage(lastMessage)
        }
        view.scrollToEndElement()
      }
    }
  })
}