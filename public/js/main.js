const logoutForm = async (e) => {
  e.preventDefault();

  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Error logging in");
  }
};

document.getElementById("logout-btn").addEventListener("click", logoutForm);
