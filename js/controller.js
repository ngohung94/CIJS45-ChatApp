const controller = {}
controller.register = (data) => {
  document.getElementById('first-name-error').innerText = (data.firstName === '' ) ? 'Please input first name' :  '' ;
  document.getElementById('last-name-error').innerText = (data.lastName === '' ) ? 'Please input last name' :  '' ;
  document.getElementById('email-error').innerText = (data.email === '' ) ? 'Please input email' :  '' ;
  document.getElementById('password-error').innerText = (data.password === '' ) ? 'Please input password' :  '' ;
  document.getElementById('confirm-password-error').innerText = (data.confirmPassword === '' ) ? 'Please input confirm password' :  '' ;
}

controller.login = (data) =>{
      document.getElementById('email-error').innerText  = (data.email === '') ? 'Please input email' : '' ;
      document.getElementById('password-error').innerText =  (data.password === '') ? 'Please input password' : '' ;
}