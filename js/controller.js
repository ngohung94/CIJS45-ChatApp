const controller = {}
controller.register = (data) => {
    if (data.firstName.trim() === ''){
      view.setErrorMessage('first-name-error', 'Please input first name')
    }else {
      view.setErrorMessage('first-name-error', '')
    }
    if (data.lastName.trim() === ''){
      view.setErrorMessage('last-name-error' , 'Please input last name')
    }else {
      view.setErrorMessage('last-name-error', '')
    }
    if (data.email.trim() === ''){
      view.setErrorMessage('email-error' , 'Please input email')
    }else {
      view.setErrorMessage('email-error', '')
    }
    if (data.password.trim() === ''){
      view.setErrorMessage('password-error' , 'Please input password')
    }else {
      view.setErrorMessage('password-error', '')
    }
    if (data.confirmPassword.trim() === ''){
      view.setErrorMessage('confirm-password-error' , 'Please input confirm password')
    }else if ( data.password !== data.confirmPassword ){
      view.setErrorMessage('confirm-password-error' , `Password didn't match`)
    }else{
      view.setErrorMessage('confirm-password-error' , '')
    }
    if(data.firstName.trim() !== '' && data.lastName.trim() !== '' && data.email.trim() !== '' && data.password.trim() !== '' && data.confirmPassword.trim() !== '' && data.password.trim() === data.confirmPassword.trim()){
      model.register(data)
    }
  }

controller.login = (dataLogin) =>{
  if (dataLogin.email.trim() === ''){
    view.setErrorMessage('email-error' , 'Please input email')
  }else {
    view.setErrorMessage('email-error', '')
  }
  if (dataLogin.password.trim() === ''){
    view.setErrorMessage('password-error' , 'Please input password')
  }else {
    view.setErrorMessage('password-error', '')
  }
  if(dataLogin.email.trim() !== '' && dataLogin.password.trim() !== ''){
    model.login(dataLogin)
  }
}

controller.createConversation = ({conversationTitle,conversationEmail}) => {
    if (conversationTitle.trim() === ''){
      view.setErrorMessage('conversation-name-error', 'Please input conversation name')
    }else {
      view.setErrorMessage('conversation-name-error', '')
    }

    if (conversationEmail.trim() === ''){
      view.setErrorMessage('conversation-email-error' , 'Please input friend email')
    }else {
      view.setErrorMessage('conversation-email-error', '')
    }

  if(conversationTitle.trim() !== '' && conversationEmail.trim() !== ''){
    const dataCreateConversation = {
      title : conversationTitle,
      users : [conversationEmail,model.currentUser.email],
      createdAt : (new Date()).toISOString(),
      messages : []
    }
    model.createConversation(dataCreateConversation)
  }
}

controller.addUserConversation = (user) =>{
  if (user.trim() === ''){
    view.setErrorMessage('add-user-email-error' , 'Please input friend email')
  }else {
    view.setErrorMessage('add-user-email-error', '')
  }
  if (user.trim() !== ''){
    model.addUser(user)
  }
}