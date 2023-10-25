app.controller("LoginController", [
  "$scope",
  "$http",
  "$rootScope",
  "$state",
  function ($scope, $http, $rootScope, $state) {
    var userId = localStorage.getItem("token");
    if (userId) {
      $state.go("budget");
    }
    $scope.menuItems = [
      { state: "home", name: "HOME" },
      { state: "payslip", name: "PAYSLIP" },
      { state: "utrReport", name: "UTR REPORT" },
      { state: "budgetVolumes", name: "BUDGET VOLUMES" },
      { state: "gpfLedger", name: "GPF LEDGER" },
      { state: "tutorials", name: "Tutorials" },
    ];
    $scope.dropDownMenuItems = [
      {
        name: "CHALLANS",
        dropDownItems: [
          { state: "ChallanForm", name: "CHALLAN FORM" },
          {
            state: "ChallanFormEseva",
            name: "CHALLAN FORM FOR E-SEVA(TRANSPORT)",
          },
          { state: "ChallanFormForTSTSL", name: "CHALLAN FORM FOR TSTSL" },
          {
            state: "FOREIGNSERVICEREGISTRATION",
            name: "FOREIGN SERVICE REGISTRATION",
          },
          { state: "ManualChallanSearch", name: "MANUALCHALLANSEARCH" },
        ],
      },
      {
        name: "CYBER TREASURY",
        dropDownItems: [
          { state: "CyberChallanDetails", name: "CYBER CHALLAN DETAILS" },
          { state: "MINES AND GEOLOGY", name: "MINES AND GEOLOGY" },
        ],
      },
    ];
    $scope.errors = { userName: "", password: "", captcha: "" };
    $scope.userName = "";
    $scope.password = "";
    $scope.captcha = "";
    $scope.login = function () {
      flag = 0;
      $scope.errors.userName = "";
      $scope.errors.password = "";
      $scope.errors.captcha = "";
      if ($scope.userName == "") {
        $scope.errors.userName = "User name is required";
        return false;
      }
      if ($scope.password == "") {
        $scope.errors.password = "Password is required";
        return false;
      }
      if ($scope.captcha == "") {
        $scope.errors.captcha = "Captcha is required";
        return false;
      }
      if ($scope.captcha != "" && $scope.captcha != "fatt") {
        $scope.errors.captcha = "Captcha is invalid";
        return false;
      }

      $rootScope.loader = true;
      $http({
        method: "POST",
        url: "./api/login.php",
        data: { userName: $scope.userName, password: $scope.password },
      })
        .then(
          function (response) {
            if (response.data.status == true) {
              localStorage.setItem("token", response.data.data);
              $state.go("budget");
            } else if (response.data.status == false) {
              Swal.fire("Oops!", response.data.message, "error");
            }
          },
          function (reject) {
            Swal.fire(reject.status, reject.statusText, "error");
          }
        )
        .finally(function () {
          $rootScope.loader = false;
        });
    };
  },
]);
