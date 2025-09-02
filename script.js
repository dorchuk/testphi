document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  alert('📢 סימולציה בלבד – לעולם אל תכניס את הפרטים האישיים שלך בדף שאינך מזהה!');

  // איפוס השדות
  this.reset();
});
