const init = () => {
  console.log('Windown loaded')
  view.setActiveScreen('registerScreen')
  view.setActiveScreen('loginScreen')
}
window.onload = init 

function login_to_register() {
  view.setActiveScreen('registerScreen')
}

function register_to_login() {
  view.setActiveScreen('loginScreen')
}
