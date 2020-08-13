const controller = {}
controller.register = (dataRegister) => {
    document.getElementById('first-name-error').innerText = (dataRegister.firstName.trim() === '' ) ? 'Please input first name' :  '' ;
    document.getElementById('last-name-error').innerText = (dataRegister.lastName.trim() === '' ) ? 'Please input last name' :  '' ;
    document.getElementById('email-error').innerText  = (dataRegister.email.trim() === '' ) ? 'Please input email' :  '' ;
    document.getElementById('password-error').innerText = (dataRegister.password === '') ? 'Please input password' :  '' ;

    if (dataRegister.confirmPassword === ''){
      document.getElementById('confirm-password-error').innerText = 'Please input confirm password' 
    }else if ( dataRegister.password !== dataRegister.confirmPassword ){
      document.getElementById('confirm-password-error').innerText  = `Password didn't match`
    }else{
      document.getElementById('confirm-password-error').innerText  = ''
    }

    if(dataRegister.firstName !== '' && dataRegister.lastName !== '' && dataRegister.email !== '' && dataRegister.password !== '' && dataRegister.confirmPassword !== '' && dataRegister.password === dataRegister.confirmPassword){
      model.register(dataRegister)
    }
  }

controller.login = (dataLogin) =>{
    document.getElementById('email-error').innerText  = (dataLogin.email === '' ) ? 'Please input email' : '' ; 
    document.getElementById('password-error').innerText =  (dataLogin.password === '' ) ? 'Please input password' : '' ;

  if(dataLogin.email !== '' && dataLogin.password !== ''){
    model.login(dataLogin)
  }
}

controller.createConversation = (dataCreate) => {
  let reg_mail = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
    if (dataCreate.conversationTitle == ''){
      document.getElementById('conversation-name-error').innerText = 'Please input friend email'
    }else {
      document.getElementById('conversation-name-error').innerText = ''
    }
    
    if (dataCreate.conversationEmail == ''){
      document.getElementById('conversation-email-error').innerText = 'Please input friend email'
    }else if (!reg_mail.test(dataCreate.conversationEmail)){     
      document.getElementById('conversation-email-error').innerText = 'Invalid email (Example: abc@gmail.com)';
      return false
    }else {
      document.getElementById('conversation-email-error').innerText = ''
    }

  if(dataCreate.conversationTitle !== '' && dataCreate.conversationEmail !== ''){
    model.createConversation(dataCreate)
  }
}
