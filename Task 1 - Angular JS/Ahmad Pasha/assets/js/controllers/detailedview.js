app.controller(
  "detailedViewController",
  function (
    $scope,
    $http,
    $stateParams,
    $state,
    $interval,
    $httpParamSerializerJQLike
  ) {
    $scope.subjectId = $stateParams.subjectId;
    $scope.userId = localStorage.getItem("user_id");
    $scope.levelId = $stateParams.levelId;
    $scope.spinner = false;
    $scope.score = 0;
    $scope.i = 0;
    $scope.showScore = "";
    $scope.time = 100;
    $scope.message = "";
    $scope.selectedBtn = "";
    $scope.quationStatus = false;
    $scope.questions = "";
    $scope.txt_color = "";

    $scope.check = true;

    $scope.getValue = function (e) {
      $scope.selectedBtn = e;
    };
    async function getData() {
      await $http
        .get(
          `./api/quizDetails.php?subject_id=${$scope.subjectId}&level_id=${$scope.levelId}`
        )
        .then(
          function success(response) {
            $scope.spinner = true;
            $scope.questions = response.data.data;
            $scope.answer = $scope.questions[$scope.i]["answer"];
          },
          function error(error) {
            console.log(error);
          }
        )
        .catch(function (error) {
          console.log(error);
          console.log("error in api .....");
        });
    }

    getData();

    $scope.sendData = async function () {
      const data = {
        subject_id: $scope.subjectId,
        level_id: $scope.levelId,
        score: $scope.score,
        user_id: $scope.userId,
      };

      await $http
        .post("./api/results.php", $httpParamSerializerJQLike(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(
          function (response) {
            let data = response;
            if (data.status) {
              // $state.go("login");
            } else {
              $("#usernameErr").text(data.message);
            }

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
    };

    $scope.interval = $interval(function () {
      $scope.time--;
      if ($scope.time === 0) {
        $interval.cancel($scope.interval);
        $scope.sendData();
        $state.go("result", {
          subjectId: $scope.subjectId,
          levelId: $scope.levelId,
          score: $scope.score,
        });
      }
    }, 1000);

    $scope.validate = function () {
      if ($scope.selectedBtn == "") {
        $scope.message = "please select the option";
        $scope.txt_color = "text-danger";
        return false;
      }

      if ($scope.answer === $scope.selectedBtn) {
        $scope.showScore = "+10";
        $scope.message = `Correct Answer`;
        $scope.txt_color = "text-success";
        $scope.score = $scope.score + 10;
        $scope.quationStatus = true;
      }
      if ($scope.answer !== $scope.selectedBtn) {
        $scope.showScore = "-1";
        $scope.score = $scope.score - 1;
        $scope.message = `Correct Answer is ${$scope.answer}`;
        $scope.txt_color = "text-danger";
        $scope.quationStatus = true;
      }
    };

    $scope.next = function () {
      if ($scope.quationStatus === true) {
        $scope.quationStatus = false;
        $scope.message = "";
        if ($scope.questions.length - 1 > $scope.i) {
          $scope.i = $scope.i + 1;
          $scope.answer = $scope.questions[$scope.i]["answer"];
        } else {
          $scope.message = "";
          $scope.sendData();
          $interval.cancel($scope.interval);
          $state.go("result", {
            subjectId: $scope.subjectId,
            levelId: $scope.levelId,
            score: $scope.score,
          });

          return false;
        }
      } else {
        $scope.message = "First Complete This Question";
        $scope.txt_color = "text-danger";
      }
    };
  }
);
