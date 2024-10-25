async function handerFormSubmit(e) {
  e.preventDefault();
  const form = new FormData(e.target);

  const signUpDetails = {
    name: form.get("name"),
    email: form.get("email"),
    password: form.get("password"),
  };

  try {
    await axios.post("http://localhost:3000/api/signup", signUpDetails);
  } catch (err) {
    console.log("Error:", err.message);
  }
}
