function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // הצגה על המסך בלבד (ולא שידור החוצה)
  const output = document.getElementById('output');
  output.innerText = `You entered:\nEmail: ${email}\nPassword: ${password}\n\n🔴 This is why you must check the URL!`;
}
