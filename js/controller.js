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
  document.getElementById('conversation-name-error').innerText = (dataCreate.conversationTitle.trim() === '' ) ? 'Please input conversation name' :  '' ;
  // document.getElementById('conversation-email-error').innerText = (dataCreate.conversationEmail.trim() === '' ) ? 'Please input friend email' :  '' ;
  let reg_mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
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
