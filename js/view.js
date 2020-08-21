
const view = {}
view.setActiveScreen = (screenName, fromCreateConversation = false) => {
  switch (screenName) {
    case 'loginScreen' :
    // in ra man login
      document.getElementById('app').innerHTML = components.loginScreen
      document.getElementById('redirect-to-register').addEventListener('click', () => {
        view.setActiveScreen('registerScreen')
      })
      const loginForm = document.getElementById('login-form')
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        loginForm.email.value = loginForm.email.value.trim()
        const dataLogin = {
          email: loginForm.email.value,
          password: loginForm.password.value
        }
        controller.login(dataLogin)
      })
    break;

    case 'registerScreen' :
      document.getElementById('app').innerHTML = components.registerScreen
      const registerForm = document.getElementById('register-form')
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const dataRegister = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value
        }
        console.log(dataRegister)
        controller.register(dataRegister)
      })
      document.getElementById('redirect-to-login').addEventListener('click', () => {
        view.setActiveScreen('loginScreen')
      })
    break;

    case  'chatScreen' :
      document.getElementById('app').innerHTML = components.chatScreen
      const sendMessengerForm = document.getElementById("send-messenger-form")
      sendMessengerForm.addEventListener("submit",(e)=>{
        e.preventDefault()
      if(sendMessengerForm.message.value.trim() !== ''){
        const message = {
          content :sendMessengerForm.message.value,
          owner : model.currentUser.email,
          createdAt : (new Date()).toISOString()
        }   
        // view.addMessage(message)
        model.addMessage(message)
        sendMessengerForm.message.value = ''
      }
    })
    
    if(!fromCreateConversation){
      model.loadConversations()
      model.listenConversationsChange()
    }else {
      view.showConversations()
      view.showCurrentConversation()
    }
    // Log Out
      document.getElementById("logOut").addEventListener("click", (e) => {
        e.preventDefault()  
        firebase.auth().signOut().then(() => {
          alert("Sign-out successful.")
        })
      })
    //  Sang màn create conversation
        document.querySelector(".create-conversation .btn").addEventListener('click', () =>{
          view.setActiveScreen('createConversation')
        })

    // add  User to the Conversation
    let addUserForm = document.getElementById("add-user-form")
    addUserForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const user =  addUserForm.email.value
      controller.addUserConversation(user)
      addUserForm.email.value = ''
    })
    
    document.querySelector('#send-messenger-form input').addEventListener('click',() => {
      view.hideNotification(model.currentConversation.id)
    })
    break;

    case 'createConversation' :
      // sang man createConversation
      document.getElementById('app').innerHTML = components.createConversation
      document.querySelector('#back-to-chat').addEventListener('click',() =>{
        view.setActiveScreen("chatScreen" , true)
      })
      
      const creatConversationForm = document.getElementById('create-conversation-form')
      creatConversationForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const dataCreateConversation = {
          conversationTitle : creatConversationForm.conversationTitle.value,
          conversationEmail : creatConversationForm.conversationEmail.value,
        }
        controller.createConversation(dataCreateConversation)
      })
    }
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement("div")
    messageWrapper.classList.add('message-container')
    if (message.owner === model.currentUser.email){
      messageWrapper.classList.add("mine")  
        messageWrapper.innerHTML = `
        <div class="content">
          ${message.content}
          </div>
        `        
    }else {
      messageWrapper.classList.add('their')
      messageWrapper.innerHTML = `
        <div class="owner">
          ${message.owner}
        </div>
        <div class="content">
          ${message.content}
        </div>
      `
    }
    document.querySelector(".list-messages").appendChild(messageWrapper)
}

view.showCurrentConversation = () => {
  document.querySelector('.list-messages').innerHTML = ''
  // Doi ten cuoc tro truyen
  // console.log(model.currentConversation)
  document.getElementsByClassName('conversation-header')[0].innerText = model.currentConversation.title
  // In cac tin nhan len man hinh
  for(message of model.currentConversation.messages){
    view.addMessage(message)
  }
  view.scrollToEndElement()
  // in ten nhung nguoi dung trong mes
  view.showListUsers(model.currentConversation.users)
}
view.showListUsers = (users) => {
  document.querySelector('.list-user').innerText = ''
  for(user of users){
    view.addUser(user)
  }
}
view.addUser = (user) => {
  const userWrapper = document.createElement('div')
  userWrapper.classList.add('user')
  userWrapper.innerText = user
  document.querySelector('.list-user').appendChild(userWrapper)
}
view.scrollToEndElement = () => {
  var element = document.querySelector(".list-messages");
  element.scrollTop = element.scrollHeight;
}

view.showConversations = () => {
  for(oneConversation of model.conversations){
    view.addConversation(oneConversation)
  }
}
// hien thi cuoc tro truyen khi click
view.addConversation = (conversation) => {
  const conversationWrapper = document.createElement("div")
  conversationWrapper.className = 'conversation cursor-pointer'
  conversationWrapper.id = conversation.id
  if (model.currentConversation.id === conversation.id){
    conversationWrapper.classList.add('current')
  }
  conversationWrapper.innerHTML = `
    <div class conversation-title>${conversation.title}</div>
    <div class conversation-num-user>${conversation.users.length} user</div>
    <div class="notification"></div>
  `
  const mediaQuery = window.matchMedia('(max-width: 768px')
  console.log(mediaQuery)
  if(mediaQuery.matches){
    const firstCharacter = conversation.title.charAt(0).toUpperCase()
    console.log(firstCharacter)
    conversationWrapper.firstElementChild.innerText = firstCharacter
    document.querySelector('.create-conversation .btn').innerText = `+`
  
  }
conversationWrapper.addEventListener('click',() => {
    // doi giao dien current
    document.querySelector('.current').classList.remove('current')
    //them class current khi click vao
    conversationWrapper.classList.add('current')
    // thay doi model.currentConversation
    for (oneConversation of model.conversations){
      if(oneConversation.id === conversation.id){
        model.currentConversation = oneConversation
      }
    }
    // const newConversation =  model.conversations.filter(oneConversation => oneConversation.id = model.currentConversation)
    // in cac tin nhan len man hinh
    view.showCurrentConversation()
    view.hideNotification(conversation.id)
  })
  document.querySelector('.list-conversations').appendChild(conversationWrapper)
}

view.setErrorMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message
}

view.updateNumberUsers = (docId, numberUsers) => {
  const conversation = document.getElementById(docId)
  // lay phan tu thu  2 trong div
  const secondChild = conversation.getElementsByTagName('div')[1]
  secondChild.innerText  = numberUsers + ' ' + 'users'
}

view.showNotification = (conversationId) => {
  const conversation = document.getElementById(conversationId)
  conversation.lastElementChild.style = 'display : block'
}
view.hideNotification = (conversationId) => {
  const conversation = document.getElementById(conversationId)
  conversation.lastElementChild.style = 'display : none'
}