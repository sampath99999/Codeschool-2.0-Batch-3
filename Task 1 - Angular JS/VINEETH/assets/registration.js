myApp.controller('RegistrationController', function ($scope, $http,$state) {
    $scope.user = {
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmedPassword: '',
    };

    $scope.nameError = '';
    $scope.phoneError = '';
    $scope.emailError = '';
    $scope.passwordError = '';
    $scope.confirmError = '';

    $scope.validateName = function () {
        const name = $scope.user.name;
        if (!name) {
            $scope.nameError = 'PLEASE ENTER THE NAME';
            return false;
        } else if (name.length < 3 || name.length > 50) {
            $scope.nameError = 'NAME MUST BE BETWEEN 3 AND 50 CHARACTERS';
            return false;
        } else if (!/^[A-Z][a-z]{1,49}$/.test(name)) {
            $scope.nameError = 'FIRST LETTER MUST BE CAPITAL.';
            return false;
        } else {
            $scope.nameError = '';
            return true;
        }
    };

    $scope.validatePhone = function () {
        const phone = $scope.user.phone;
        if (!phone) {
            $scope.phoneError = 'PLEASE ENTER THE PHONE NUMBER';
            return false;
        } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
            $scope.phoneError = 'PHONE NUMBER MUST BE A 10-DIGIT NUMBER.';
            return false;
        } else {
            $scope.phoneError = '';
            return true;
        }
    };

    $scope.validateEmail = function () {
        const email = $scope.user.email;
        const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email) {
            $scope.emailError = 'PLEASE ENTER AN EMAIL ADDRESS';
            return false;
        } else if (!emailRegex.test(email)) {
            $scope.emailError = 'PLEASE ENTER A VALID EMAIL ADDRESS';
            return false;
        } else {
            $scope.emailError = '';
            return true;
        }
    };

    $scope.validatePassword = function () {
        const password = $scope.user.password;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,25}$/;
        if (!password) {
            $scope.passwordError = 'PLEASE ENTER A PASSWORD';
            return false;
        } else if (password.length < 5 || password.length > 25) {
            $scope.passwordError = 'PASSWORD MUST BE BETWEEN 5 AND 25 CHARACTERS';
            return false;
        } else if (!passwordRegex.test(password)) {
            $scope.passwordError = 'PASSWORD MUST CONTAIN AT LEAST ONE UPPERCASE LETTER, ONE LOWERCASE LETTER, ONE NUMBER, AND ONE SPECIAL CHARACTER';
            return false;
        } else {
            $scope.passwordError = '';
            return true;
        }
    };

    $scope.validateConfirmedPassword = function () {
        const confirmedPassword = $scope.user.confirmedPassword;
        const password = $scope.user.password;
        if (!confirmedPassword) {
            $scope.confirmError = 'PLEASE ENTER THE CONFIRMATION PASSWORD';
            return false;
        } else if (confirmedPassword !== password) {
            $scope.confirmError = 'PASSWORDS DO NOT MATCH';
            return false;
        } else {
            $scope.confirmError = '';
            return true;
        }
    };

    $scope.signup = function () {
        var isNameValid = $scope.validateName();
        var isPhoneValid = $scope.validatePhone();
        var isEmailValid = $scope.validateEmail();
        var isPasswordValid = $scope.validatePassword();
        var isConfirmedPasswordValid = $scope.validateConfirmedPassword();

        if (isNameValid && isPhoneValid && isEmailValid && isPasswordValid && isConfirmedPasswordValid) {
            $http({
                method: 'POST',
                url: './../api/registration.php',
                data: {
                    name: $scope.user.name,
                    phone: $scope.user.phone,
                    email: $scope.user.email,
                    password: $scope.user.password
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                console.log('Registration success:', response.data);
                $state.go('login');
            }, function (error) {
                console.error('Registration error:', error.data);
            });
        }
    };
});
