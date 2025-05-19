function SignupValidation(values) {
  let errors = {};

  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$/;

  // Name Validation: Min 20 chars, Max 60 chars
  if (!values.name || values.name.trim() === "") {
    errors.name = "Name is required";
  } else if (values.name.length < 20) {
    errors.name = "Name must be at least 20 characters";
  } else if (values.name.length > 60) {
    errors.name = "Name must be less than 60 characters";
  }

  // Email Validation
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Invalid email format";
  }

  // Password Validation
  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Password must be 8-16 characters, include 1 uppercase letter and 1 special character";
  }

  // Address Validation: Max 400 chars
  if (!values.address || values.address.trim() === "") {
    errors.address = "Address is required";
  } else if (values.address.length > 400) {
    errors.address = "Address must be less than 400 characters";
  }

  return errors;
}

export default SignupValidation;
