const view = {}
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case 'loginScreen' :
      document.getElementById('app').innerHTML = components.loginScreen
      const loginForm = document.getElementById('login-form')
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        }
        console.log(data)
        controller.login(data)
      })
    break;
    case 'registerScreen' :
      document.getElementById('app')
      .innerHTML = components.registerScreen
      const registerForm = document.getElementById('register-form')
      registerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const data = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value
        }
        console.log(data)
        controller.register(data)
      })
    break;
  }
}