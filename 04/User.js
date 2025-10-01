export default class User {
  constructor({ email, password }) {
    if (!email.includes('@') || !email.includes('.')) {
      throw new Error('Niepoprawny email');
    }
    if (password.length < 6) {
      throw new Error('Niepoprawne hasło');
    }
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  login() {
    return this.email.includes('devmentor.pl');
  }
}
