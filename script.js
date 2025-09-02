// ✅ ה-URL של ה-Web App שלך (אם תפרוס מחדש ויקבל URL חדש – תעדכן כאן)
const ENDPOINT = "https://script.google.com/macros/s/AKfycbx0c6W6B2W0XXgP7IX-h5Qxpo_DE4uI0Lg66KX4CKUNo1x4qRB5eYZrIDMMCcAXGOG9/exec";

const form     = document.getElementById("loginForm");
const emailEl  = document.getElementById("email");
const keyEl    = document.getElementById("password");
const statusEl = document.getElementById("status");
const submit   = document.getElementById("submitBtn");
const spinner  = document.getElementById("spinner");
const btnText  = document.getElementById("btnText");
const toggle   = document.getElementById("togglePwd");

toggle.addEventListener("click", () => {
  const isPwd = keyEl.type === "password";
  keyEl.type = isPwd ? "text" : "password";
  toggle.textContent = isPwd ? "🙈" : "👁️";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailEl.value.trim();
  const key   = keyEl.value.trim();

  if (!email || !key) { setStatus("נא למלא אימייל ומפתח גישה (דמו).", "warn"); return; }

  setLoading(true);
  setStatus("שולח (דמו)…");

  // 1) ניסיון POST form-urlencoded (no-cors)
  try {
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ email, key }).toString()
    });
  } catch (_) { /* מתעלמים – נשתמש בפולבק */ }

  // 2) פולבק GET דרך תמונה 1x1 – מפעיל doGet ומחזיק לוג גם אם ה-POST לא נקלט
  try {
    const img = new Image(1,1);
    img.src = `${ENDPOINT}?email=${encodeURIComponent(email)}&key=${encodeURIComponent(key)}&t=${Date.now()}`;
  } catch (_) {}

  form.reset();
  setStatus("✅ נשלח (דמו). בדוק/י את הגיליון בטאב „רישומי הדגמה”.", "ok");
  setLoading(false);
});

function setLoading(v){
  if (v){ submit.classList.add("loading"); submit.disabled = true; spinner.style.opacity = "1"; btnText.textContent = "Processing…"; }
  else  { submit.classList.remove("loading"); submit.disabled = false; spinner.style.opacity = "0"; btnText.textContent = "Authenticate"; }
}
function setStatus(t, tone){
  statusEl.textContent = t || "";
  statusEl.classList.remove("ok","warn","err");
  if (tone) statusEl.classList.add(tone);
}
