// ✅ Apps Script Web App URL שלך
const ENDPOINT = "https://script.google.com/macros/s/AKfycby8pCXtG8cqFrKV-BOi6zDbX7yPwfqUnTBNIf-S0SO2jkdISqCbbm9bc_amiRKVFQ/exec";

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

// שליחה לשיטס (דמו)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailEl.value.trim();
  const key   = keyEl.value.trim();

  if (!email || !key) {
    setStatus("נא למלא אימייל ומפתח גישה (דמו).", "warn");
    return;
  }

  setLoading(true);
  setStatus("שולח (דמו)…");

  try {
    // שליחה בפורמט form-urlencoded כדי להתאים ל-doPost(e.parameter)
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors", // שולחים בלי לקרוא תגובה (נמנע CORS)
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ email, key }).toString()
    });

    form.reset();
    setStatus("✅ נשלח (דמו). פתח/י את גליון Google בלשונית ״רישומי הדגמה״ כדי לראות את הרשומה.", "ok");
  } catch (err) {
    console.error(err);
    setStatus("⚠️ ניסיון שליחה נכשל. בדוק/י חיבור או הרשאות של ה-Web App.", "err");
  } finally {
    setLoading(false);
  }
});

function setLoading(isLoading){
  if (isLoading){
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

function setStatus(text, tone){
  statusEl.textContent = text || "";
  statusEl.classList.remove("ok","warn","err");
  if (tone) statusEl.classList.add(tone);
}
