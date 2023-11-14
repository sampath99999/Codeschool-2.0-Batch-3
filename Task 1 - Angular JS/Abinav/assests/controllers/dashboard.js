myApp.controller("dashboard", function ($scope, $http, $state) {
  $scope.mailContainer = true;
  $scope.receiverMail = "";
  $scope.subject = "";
  $scope.message = "";
  $scope.id = localStorage.getItem("id");
  $scope.messages = [];
  $scope.messageInfo = "";
  $scope.loader = true;
  $scope.sentMails = [];

  $scope.showMailContainer = function () {
    $scope.mailContainer = false;
  };
  $scope.closeMailContainer = function () {
    $scope.mailContainer = true;
  };

  $scope.sendMail = () => {
    $scope.loader = false;

    const userData = {
      sender_id: $scope.id,
      receiverMail: $scope.receiverMail,
      subject: $scope.subject,
      message: $scope.message,
    };

    $http.post("./api/sendMail.php", userData).then(
      (response) => {
        const responseData = response.data;
        const status = responseData.status;

        if (status === true) {
          $scope.receiverMail="";
          $scope.subject="";
          $scope.message="";
          $scope.loader = true;
          $scope.mailContainer = true;
          const toastLiveExample = document.getElementById("liveToast");
          const toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        } else {
          $scope.invalidRecipient = "Incorrect recipient email address";
          $scope.loader = true;
        }
      },
      (error) => {
        console.log(error);
        console.log("errored out");
        $scope.loader = true;
      }
    );
  };

  const userId = {
    id: $scope.id,
  };

  $http.post("./api/getUserMails.php", userId).then(
    (response) => {
      const responseData = response.data;
      const status = responseData.status;
      if (status === true) {
        $scope.messageInfo = response.data.data;

        $scope.messageInfo.forEach(function (item) {
          $scope.messages.push(item);
        });
        console.log($scope.messages);
      } else {
        $scope.invalidCredentials = "Incorrect username or password";
      }
    },
    (error) => {
      console.log(error);
      console.log("errored out");
    }
  );

  $http.post("./api/sentMails.php", userId).then(
    (response) => {
      const responseData = response.data;
      const status = responseData.status;
      if (status === true) {
        $scope.sentMessages = response.data.data;

        $scope.sentMessages.forEach(function (item) {
          $scope.sentMails.push(item);
        });
      } else {
        $scope.invalidCredentials = "Incorrect username or password";
      }
    },
    (error) => {
      console.log(error);
      console.log("errored out");
    }
  );

  $scope.logout = () => {
    console.log("logout");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    $state.go("login");
  };
});
