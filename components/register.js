const handleRegister = async (e) => {
  e.preventDefault();
  const registerForm = document.querySelector(".register-form");
  const formData = new FormData(registerForm);
  const plainData = Object.fromEntries(formData.entries());
  const JsonData = JSON.stringify(plainData);
  const res = await fetch(
    "https://nervous-puce-gloves.cyclic.app/api/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JsonData,
    }
  );

  if (res.ok) {
    const token = res.headers.get("x-auth-token");
    sessionStorage.setItem("jwt", token);
    window.location.replace("/components/static/home.html");
  } else {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
};

export { handleRegister };
