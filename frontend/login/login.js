async function handerFormSubmit(e) {
  e.preventDefault();
  const form = new FormData(e.target);

  const loginDetails = {
    email: form.get("email"),
    password: form.get("password"),
  };

  try {
    if (loginDetails.email == "" || loginDetails.password == "") {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: "Please fill all the fields",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    await axios.post("http://localhost:3000/login", loginDetails);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      text: "Login Successful",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: error.response.data.message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    }
    
    // clear the form fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}


