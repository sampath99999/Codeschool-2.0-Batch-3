financeApp.controller("LoginController", ["$scope", "$state", "$http", "$location", function ($scope, $state, $http, $location) {

    var access_token = localStorage.getItem("access_token");
    if (access_token) {
        $location.path("/")
        return
    }
    $scope.hoverValue = false
    $scope.showHover = function () {
        $scope.hoverValue = true
    }
    $scope.hideHover = function () {
        $scope.hoverValue = false
    }

    $scope.hoverItems = [
        {
            id: 1,
            name: "challan form"
        },
        {
            id: 2,
            name: "challan form for e-seva(transport)"
        },
        {
            id: 3,
            name: "challan form for tstsl"
        },
        {
            id: 4,
            name: "foreign service registration"
        },
        {
            id: 5,
            name: "manual challan search"
        },
    ]

    $scope.treasuries = [
        {
            id: 1,
            value: "cyber challan details"
        },
        {
            id: 2,
            value: "mines and geology challans"
        }
    ]

    $scope.treasuryValue = false


    $scope.showTreasury = function () {
        $scope.treasuryValue = true
    }

    $scope.hideTreasury = function () {
        $scope.treasuryValue = false
    }


    $scope.email = ''
    $scope.password = ''

    $scope.emailErrMsg = ''

    $scope.validateEmail = function () {
        if ($scope.email === "") {
            $scope.emailErrMsg = "*Please enter email.."
            return false
        } else if (
            !$scope.email.endsWith(".com") ||
            !$scope.email.match(/[@]/)
        ) {
            $scope.emailErrMsg = "*Please enter valid email.."
            return false
        } else {
            $scope.emailErrMsg = ''
            return true
        }
    }


    $scope.passwordErrMsg = ''

    $scope.validatePassword = function () {
        if ($scope.password === "") {
            $scope.passwordErrMsg = "*Password is a required field"
            return false;
        } else if (!($scope.password.match(/\w/) && $scope.password.match(/\W/))) {
            $scope.passwordErrMsg = "*Password must be alpha-numeric and special characters"
            return false
        } else {
            $scope.passwordErrMsg = ''
            return true
        }
    }

    $scope.signIn = function () {
        $scope.validateEmail();
        $scope.validatePassword();
        if ($scope.emailErrMsg === '' && $scope.passwordErrMsg === '') {
            $http({
                url: "./api/login.php",
                method: "POST",
                data: { email: $scope.email, password: $scope.password }
            }).then(function (response) {
                if (response.data['status']) {
                    Swal.fire({
                        icon: 'success',
                        text: `${response.data['message']}`
                    })
                    localStorage.setItem("access_token", response.data['data'])
                    $location.path("/")
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${response.data['message']}`,
                    })
                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: 'Please enter email and password',
            })
        }
    }

}])