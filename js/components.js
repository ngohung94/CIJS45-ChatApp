const components = {}
components.loginScreen = 
`<div class="login-container">
  <div class="aside-right">
    <div class="header">
      <h3>MindX chat</h3>
    </div>
    <form id="login-form">
      <div class="input-login-wrapper">
        <div class="input-wrapper">
          <input type="text" 
            placeholder="Email...." 
            name="email">
          <div class="error" id="email-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="password" 
            placeholder="Password...." 
            name="password">
          <div class="error" 
            id="password-error"></div>
        </div>
      </div>
      <div class="form-action">
        <span id="redirect-to-register"  >
        Don't have an account? Register
        </span>
        <button class="btn" type="submit">
          Login
        </button>
      </div>
    </form>
  </div>
</div>
`
components.registerScreen = `
<div class="register-container">
  <div class="aside-right">
    <div class="header">
      <h3>MindX chat</h3>
    </div>
    <form id="register-form">
      <div class="input-name-wrapper">
        <div class="input-wrapper">
          <input type="text" name="firstName" 
          placeholder="First name">
          <div class="error" id="first-name-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastName" 
          placeholder="Last name">
          <div class="error" id="last-name-error"></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type="text" 
          placeholder="Email" 
          name="email">
        <div class="error" id="email-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" 
          placeholder="Password" 
          name="password">
        <div class="error" 
          id="password-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" 
          placeholder="Confirm password" 
          name="confirmPassword">
        <div class="error" 
          id="confirm-password-error"></div>
      </div>
      <div class="form-action">
        <span id="redirect-to-login" >
          Already have an account? Login
        </span>
        <button class="btn" type="submit">
          Register
        </button>
      </div>
    </form>
  </div>
</div>
`


components.chatScreen  = 
`
<div class="chat-container">
<div class="header">
    MindX Chat
    <button id="logOut">Log Out</button>
</div>
<div class="main">
    <div class="conversation-detail">
        <div class="conversation-header">    
        First conversation      
        </div>
        <div class="list-messages" >
          
        </div>
        <form id="send-messenger-form">
          <div class="input-wrapper">
            <input type="text" name="message" placeholder="Type a messenger">
          </div>
          <button type="submit">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>
    </div>
</div>
</div>
`