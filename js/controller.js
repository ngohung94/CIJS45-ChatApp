const controller = {}
controller.register = (data) => {
    document.getElementById('first-name-error').innerText = (data.firstName.trim() === '' ) ? 'Please input first name' :  '' ;
    document.getElementById('last-name-error').innerText = (data.lastName.trim() === '' ) ? 'Please input last name' :  '' ;
    document.getElementById('email-error').innerText  = (data.email.trim() === '' ) ? 'Please input email' :  '' ;
    document.getElementById('password-error').innerText = (data.password === '') ? 'Please input password' :  '' ;

    if (data.confirmPassword === ''){
      document.getElementById('confirm-password-error').innerText = 'Please input confirm password' 
    }else if ( data.password !== data.confirmPassword ){
      document.getElementById('confirm-password-error').innerText  = `Password didn't match`
    }else{
      document.getElementById('confirm-password-error').innerText  = ''
    }

    if(data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !== '' && data.password === data.confirmPassword){
      model.register(data)
    }
  }

controller.login = (dataLogin) =>{
    document.getElementById('email-error').innerText  = (dataLogin.email === '' ) ? 'Please input email' : '' ; 
    document.getElementById('password-error').innerText =  (dataLogin.password === '' ) ? 'Please input password' : '' ;

  if(dataLogin.email !== '' && dataLogin.password !== ''){
    model.login(dataLogin)
  }
}

