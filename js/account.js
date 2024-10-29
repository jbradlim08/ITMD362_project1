export class Account {
  account = []

  constructor() {
    this.loadFromStorage()
  }
  
  loadFromStorage() {
    this.account = JSON.parse(localStorage.getItem('account')) || 
    [{
      username: '',
      password: '',
      email: ''
    }]
  }

  saveToStorage() {
    localStorage.setItem('account', JSON.stringify(this.account));
  }

  // Add new account data to the list
  addToList(username, password, email) {
    this.account.push({
      username,
      password,
      email
    })
    this.saveToStorage()
  }
}
