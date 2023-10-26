app.controller("signUpCtrl", function ($scope, $http, $location) {
  $scope.registerUserName = "Rahul";
  $scope.registerUserNameError = "";
  $scope.registerUserEmail = "rahul@gmal.com";
  $scope.registerUserEmailError = "";
  $scope.registerPhoneNumber = "";
  $scope.registerPhoneNumberError = "";
  $scope.registerUserPassword = "asdW#3";
  $scope.registerUserConfirmPassword = "asdW#3";
  $scope.registerUserPasswordError = "";
  $scope.registerUserConfirmPasswordError = "";
  $scope.registerFormError = "";
  $scope.registerUserPincode = "";
  $scope.registerUserStreet = "";
  $scope.registerUserDno = "";
  $scope.registerUserDistrict = "";
  $scope.registerUserState = "";
  $scope.registerUserPincodeError = "";
  $scope.registerUserStreetError = "";
  $scope.registerUserDnoError = "";
  $scope.registerUserDistrictError = "";
  $scope.registerUserStateError = "";
  const commonPasswords = [
    "password",
    "123456",
    "hello",
    "abcdef",
    "admin",
    "username",
  ];
  $scope.userNameValidation = function () {
    const name = $scope.registerUserName;
    if (!(name.length > 4 && name.length <= 22)) {
      $scope.registerUserNameError =
        "*Minimum length between 4 and 22 characters";
      return false;
    }
    if (/[0-9]+/.test(name)) {
      $scope.registerUserNameError = "*Should contain alphabets only";
      return false;
    }
    if (name[0] !== name[0].toUpperCase()) {
      $scope.registerUserNameError = "*First letter should be capital";
      return false;
    }
    $scope.registerUserNameError = "";
    return name;
  };

  $scope.phoneNumberValidation = function () {
    const phoneNumber = $scope.registerPhoneNumber;
    if (!(phoneNumber.length === 10)) {
      $scope.registerPhoneNumberError = "*Should contain exactly 10 digits";
      return false;
    }
    if (!/^[0-9]+$/.test(phoneNumber)) {
      $scope.registerPhoneNumberError = "*Should contain numbers only";
      return false;
    }
    $scope.registerPhoneNumberError = "";
    return phoneNumber;
  };

  $scope.userPasswordValidation = function () {
    const userPassword = $scope.registerUserPassword;
    if (!userPassword) {
      $scope.registerUserPasswordError = "*Password cannot be empty.";
      return false;
    }
    if (userPassword.length < 5 || userPassword.length > 25) {
      $scope.registerUserPasswordError =
        "*Password should be between 5 and 25 characters.";
      return false;
    }
    if (!/[A-Z]/.test(userPassword)) {
      $scope.registerUserPasswordError =
        "*Password should contain at least one uppercase letter.";

      return false;
    }
    if (!/[a-z]/.test(userPassword)) {
      $scope.registerUserPasswordError =
        "*Password should contain at least one lowercase letter.";
      return false;
    }
    if (!/\d/.test(userPassword)) {
      $scope.registerUserPasswordError =
        "*Password should contain at least one number.";
      return false;
    }
    if (!/[!@#$%^&*()_+{}:;<>,.?~]/.test(userPassword)) {
      $scope.registerUserPasswordError =
        "*Password should contain at least one special character.";
      return false;
    }
    if (commonPasswords.includes(userPassword.toLowerCase())) {
      $scope.registerUserPasswordError =
        "*Password is too common or easily guessable.";
      return false;
    }
    if (/([a-zA-Z0-9])\1/.test(userPassword)) {
      $scope.registerUserPasswordError =
        "*Password should not contain repeating characters.";
      return false;
    }
    if (/\s/.test(userPassword)) {
      $scope.registerUserPasswordError = "*Password should not contain spaces.";
      return false;
    }
    $scope.registerUserPasswordError = "";
    return userPassword;
  };

  $scope.userPasswordConfirmValidation = function () {
    const userConfirmPassword = $scope.registerUserConfirmPassword;
    const userPassword = $scope.registerUserPassword;
    if (userConfirmPassword === "") {
      $scope.registerUserConfirmPasswordError =
        "*User password cannot be empty";
      return false;
    }
    if (!(userPassword === userConfirmPassword)) {
      $scope.registerUserConfirmPasswordError = "*Password didn't match";
      return false;
    }
    $scope.registerUserConfirmPasswordError = "";
    return userConfirmPassword;
  };

  $scope.userEmailValidation = function () {
    const userEmail = $scope.registerUserEmail;
    const pattern =
      /^[a-zA-Z0-9]+(?:[._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (userEmail.length < 6) {
      $scope.registerUserEmailError = "*Minimum length 6 characters";
      return false;
    }
    if ((userEmail.match(/@/g) || []).length > 1) {
      $scope.registerUserEmailError = "*Only one @ is allowed.";
      return false;
    }
    if ((userEmail.match(/@/g) || []).length === 0) {
      $scope.registerUserEmailError = "*@ is missing";
      return false;
    }
    if (userEmail.includes("..")) {
      $scope.registerUserEmailError = "*Consecutive dots are not allowed.";
      return false;
    }
    if (!pattern.test(userEmail)) {
      $scope.registerUserEmailError = "*Invalid Email format";
      return false;
    }
    $scope.registerUserEmailError = "";
    return userEmail;
  };

  $scope.userPincodeValidation = function () {
    const userPincode = $scope.registerUserPincode;
    if (userPincode === "") {
      $scope.registerUserPincodeError = "*User pincode cannot be empty";
      return false;
    }
    if (!/^[0-9]+$/.test(userPincode)) {
      $scope.registerUserPincodeError = "Pincode should contain numbers only";
      return false;
    }
    $scope.registerUserPincodeError = "";
    return userPincode;
  };

  $scope.userStreetValidation = function () {
    const userStreet = $scope.registerUserStreet;
    if (userStreet === "") {
      $scope.registerUserStreetError = "*User street cannot be empty";
      return false;
    }
    $scope.registerUserStreetError = "";
    return userStreet;
  };

  $scope.userDnoValidation = function () {
    const userDno = $scope.registerUserDno;
    if (userDno === "") {
      $scope.registerUserDnoError = "*User dno cannot be empty";
      return false;
    }
    $scope.registerUserDnoError = "";
    return userDno;
  };

  $scope.userDistrictValidation = function () {
    const userDistrict = $scope.registerUserDistrict;
    if (userDistrict === "") {
      $scope.registerUserDistrictError = "*User district cannot be empty";
      return false;
    }
    if (/\d/.test(userDistrict)) {
      $scope.registerUserDistrictError = "District shouldn't contain numbers";
      return false;
    }
    $scope.registerUserDistrictError = "";
    return userDistrict;
  };

  $scope.userStateValidation = function () {
    const userState = $scope.registerUserState;
    if (userState === "") {
      $scope.registerUserStateError = "*User state  cannot be empty";
      return false;
    }
    if (/\d/.test(userState)) {
      $scope.registerUserStateError =
        "*User State shouldn't contain numbers only";
      return false;
    }
    $scope.registerUserStateError = "";
    return userState;
  };

  $scope.registerFormSubmission = function (event) {
    event.preventDefault();
    const userName = $scope.userNameValidation();
    const userEmail = $scope.userEmailValidation();
    const userPhoneNumber = $scope.phoneNumberValidation();
    const userPassword = $scope.userPasswordValidation();
    const userConfirmPassword = $scope.userPasswordConfirmValidation();
    const userPincode = $scope.userPincodeValidation();
    const userStreet = $scope.userStreetValidation();
    const userDno = $scope.userDnoValidation();
    const userDistrict = $scope.userDistrictValidation();
    const userState = $scope.userStateValidation();
    if (
      userName &&
      userEmail &&
      userPhoneNumber &&
      userPassword &&
      userConfirmPassword &&
      userPincode &&
      userStreet &&
      userDno &&
      userDistrict &&
      userState
    ) {
      const userData = {
        userName,
        userEmail,
        userPhoneNumber,
        userPassword,
        userConfirmPassword,
        userPincode,
        userStreet,
        userDno,
        userDistrict,
        userState,
      };
      const ulrEncodedUserData = jQuery.param(userData);
      $http
        .post("./api/customerRegistration.php", ulrEncodedUserData, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then(
          (response) => {
            if (response.data.status === true) {
              $location.path("login");
              alert("User created successfully");
            } else {
              console.log(response);
              $scope.registerFormError = "*" + response.data.data.message;
            }
          },
          (error) => {
            $scope.registerFormError = error["data"];
          }
        )
        .catch((error) => {
          $scope.registerFormError = error;
        });
      $scope.registerFormError = "";
    } else {
      $scope.registerFormError = "*Please fill the required feilds";
    }
  };
});
