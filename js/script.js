import {Account} from './account.js'
const account1 = new Account()
let currentState = 1


// Username validation
let isValidUsername = false;
const usernameInput = document.querySelector('.input_username');

if (usernameInput) {
  usernameInput.addEventListener('input', (event) => {
    let val = event.target.value;
    let length = val.length;

    if (length > 15) {
      alert('Limit words: 15');
      val = val.slice(0, 15); // Trim to 15 characters
    }

    // Check for spaces
    if (/\s/.test(val)) {
      alert('No spaces allowed in username');
      val = val.replace(/\s/g, ''); // Remove any spaces
    }

    event.target.value = val;

    isValidUsername = length <= 15 && !/\s/.test(val);
  });
}


// Password validation
let isValidPassword = false
const passwordInput = document.querySelector('.input_password')
if (passwordInput) {
  passwordInput.addEventListener('input', (event) => {
    let val = event.target.value;

    // Define regular expressions for each requirement
    const hasNoSpaces = !/\s/.test(val);
    const hasTwoUppercase = (val.match(/[A-Z]/g) || []).length >= 2;
    const hasTwoNumbers = (val.match(/\d/g) || []).length >= 2;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    // Check if all conditions are met
    isValidPassword = hasNoSpaces && hasTwoUppercase && hasTwoNumbers && hasSymbol
  })
}

// Email validation
let isValidEmail = false;
const emailInput = document.querySelector('.input_email');

if (emailInput) {
  emailInput.addEventListener('input', (event) => {
    let val = event.target.value;

    // Basic email format check: contains @ and a domain part
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidFormat = emailPattern.test(val);

    isValidEmail = isValidFormat;
  });
}




 // validation for all
if(usernameInput && passwordInput && emailInput){
  document.querySelector('.form_submit_input').addEventListener('click', () => {
    // Signin state
    if(currentState == 1){
      let accountExist = false
      account1.account.forEach((account) => {
        if(account.email == emailInput.value){
          alert('account is exist with this email')
          accountExist = true
        }
      })
     
      if(!accountExist){
        if(isValidUsername && isValidPassword && isValidEmail && currentState == 1){
          account1.addToList(usernameInput.value, passwordInput.value, emailInput.value)
        } else if(!isValidPassword && !isValidEmail){
          alert('Password and Email is not valid')
        } else if(!isValidPassword){
          alert('Password is not valid')
        } else if(!isValidEmail){
          alert('Email is not valid')
        }
      }
        
    } 

    // login state
    else{
      let accountExist = false
      account1.account.forEach((account) => {
        if(account.username == usernameInput.value && account.password == passwordInput.value && account.email == emailInput.value && currentState == 2){
          accountExist = true
        }
      })

      if(accountExist){
        alert('successfuly login')
      }else{
        alert('account is not found')
      }
    }
    
  })
}



// to switch sign in and log in
const submitInput = document.querySelector('.form_submit_input')
document.querySelector('.already_have_account').addEventListener('click',(event) => {
  event.preventDefault();

  event.target.innerText == "Already have account" ? 
    event.target.innerText = "Don't have account" : 
    event.target.innerText = "Already have account"

  submitInput.value == 'Sign in' ?
    submitInput.value = 'Log in' :
    submitInput.value = 'Sign in'

  currentState == 1 ? // login state
    currentState = 2 : // Signin state
    currentState = 1

})

console.log(account1)