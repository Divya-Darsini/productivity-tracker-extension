const backendURL = "http://localhost:4000"; // change if using deployed backend

document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) {
    document.getElementById('msg').innerText = "Email and password required";
    return;
  }

  try {
    const res = await fetch(`${backendURL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      await chrome.storage.local.set({ authToken: data.token });
      document.getElementById('msg').innerText = "Login successful!";
    } else {
      document.getElementById('msg').innerText = data.error || "Login failed";
    }
  } catch (err) {
    document.getElementById('msg').innerText = "Error connecting to server";
  }
});
