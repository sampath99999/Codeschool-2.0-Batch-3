app.controller(
  "adminController",
  function ($scope, $http, $state, $httpParamSerializerJQLike, $rootScope) {
    $scope.userId = localStorage.getItem("user_id");
    $scope.userType = localStorage.getItem("user_type");

    if (!$scope.userId) {
      $state.go("login");
    }
    if ($scope.userType == "null" || $scope.userType == null) {
      $state.go("home");
    }

    $scope.logout = function () {
      $rootScope.type = null;
      $rootScope.id = null;
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_type");
      $state.go("login");
    };

    $scope.notEmpty = function (e) {
      return `${e} Should Not Be Empty...`;
    };

    $scope.uploadData = function () {
      $scope.questionNameErr = "";
      $scope.option1Err = "";
      $scope.option2Err = "";
      $scope.option3Err = "";
      $scope.option4Err = "";
      $scope.option5Err = "";
      $scope.subjectErr = "";
      $scope.levelErr = "";

      if (!$scope.questionName) {
        $scope.questionNameErr = $scope.notEmpty("Question Name");
        return false;
      }
      if ($scope.questionName.length < 5 || $scope.questionName.length > 30) {
        $scope.questionNameErr =
          "Question Name Should Be In Between 3 To 30 Characters";
        return false;
      }

      if (!$scope.option1) {
        $scope.option1Err = $scope.notEmpty("Option1");
        return false;
      }
      if (!$scope.option2) {
        $scope.option2Err = $scope.notEmpty("Option2");
        return false;
      }
      if (!$scope.option3) {
        $scope.option3Err = $scope.notEmpty("Option3");
        return false;
      }
      if (!$scope.option4) {
        $scope.option4Err = $scope.notEmpty("Option4");
        return false;
      }
      if (!$scope.option5) {
        $scope.option5Err = $scope.notEmpty("Correct Answer");
        return false;
      }
      if (!$scope.subject) {
        $scope.subjectErr = "Please Select Subject";
        return false;
      }
      if (!$scope.level) {
        $scope.levelErr = "Please Select level";
        return false;
      }

      const data = {
        question_name: $scope.questionName,
        option_1: $scope.option1,
        option_2: $scope.option2,
        option_3: $scope.option3,
        option_4: $scope.option4,
        option_5: $scope.option5,
        subject_id: $scope.subject,
        level_id: $scope.level
      };

      console.log(data);

      $http
        .post("./api/questions.php", $httpParamSerializerJQLike(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(
          function (response) {
            let data = response;
            console.log(response);
            // if (data.status) {
            //   $state.go("login");
            // } else {
            //   $("#usernameErr").text(data.message);
            // }

            return true;
          },
          function (error) {
            console.log(error);
          }
        )
        .catch(function (error) {
          console.log(error);
          console.log("error in api .....");
        });

      // window.location.reload();
    };
  }
);
