

function Validation(values) {
    let error = {};
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const password_pattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/;
  
    if (!values.email.trim()) {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Invalid email format";
    }
  
    if (!values.password.trim()) {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password =
        "Password must include 1 uppercase letter, 1 special char, and be 8-16 chars long.";
    }
  
    return error;
  }
  
  export default Validation;
  