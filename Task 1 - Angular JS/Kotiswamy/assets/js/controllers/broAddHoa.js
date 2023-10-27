app.controller("BroAddHoaCtrl", [
  "$scope",
  "$window",
  "$state",
  "$http",
  "$rootScope",
  function ($scope, $window, $state, $http, $rootScope) {
    var token = $window.localStorage.getItem("access_token");
    if (!token) {
      $state.go("login");
      return;
    }
    if (token) {
      $http.get("api/tokenValidation.php").then(function (response) {
        if (response.data.message === "Invalid user") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data["message"],
          });
          $window.localStorage.removeItem("access_token");
          $state.go("login");
          return;
        }
      });
    }
    $scope.emptyValues = function () {
      // inputs
      $scope.headOfAccount = null;
      $scope.headOfAccountId = null;
      $scope.budgetYear = null;
      $scope.budgetYearId = null;
      $scope.establishment = null;
      $scope.establishmentId = null;
      $scope.majorHeadNum = null;
      $scope.majorHeadDesc = null;
      $scope.subMajorHeadNum = null;
      $scope.subMajorHeadDesc = null;
      $scope.minorHeadNum = null;
      $scope.minorHeadDesc = null;
      $scope.groupSubHeadNum = null;
      $scope.groupSubHeadDesc = null;
      $scope.subHeadNum = null;
      $scope.subHeadDesc = null;
      $scope.detailedHeadNum = null;
      $scope.detailedHeadDesc = null;
      $scope.subDetailedHeadNum = null;
      $scope.subDetailedHeadDesc = null;
      $scope.charged = null;
      $scope.chargedId = null;
      $scope.estAmount = null;
      // Err msgs
      $scope.headOfAccountErrMsg = null;
      $scope.budgetYearErrMsg = null;
      $scope.establishmentErrMsg = null;
      $scope.majorHeadNumErrMsg = null;
      $scope.majorHeadDescErrMsg = null;
      $scope.subMajorHeadNumErrMsg = null;
      $scope.subMajorHeadDescErrMsg = null;
      $scope.minorHeadNumErrMsg = null;
      $scope.minorHeadDescErrMsg = null;
      $scope.groupSubHeadNumErrMsg = null;
      $scope.groupSubHeadDescErrMsg = null;
      $scope.subHeadNumErrMsg = null;
      $scope.subHeadDescErrMsg = null;
      $scope.detailedHeadNumErrMsg = null;
      $scope.detailedHeadDescErrMsg = null;
      $scope.subDetailedHeadNumErrMsg = null;
      $scope.subDetailedHeadDescErrMsg = null;
      $scope.chargedErrMsg = null;
      $scope.estAmountErrMsg = null;
    };
    $scope.emptyValues();
    $scope.headOfAccountList = [
      { id: 0, name: "higher education, secretariat department" },
      { id: 1, name: "energy, secretariat department" },
      { id: 2, name: "chief electrical inspector to government,hod" },
      { id: 3, name: "technical education,hod" },
      { id: 4, name: "collegiate education,hod" },
      { id: 5, name: "archives tarnaka" },
      { id: 6, name: "intermediate education,hod" },
      { id: 7, name: "oriental manuscripts" },
      {
        id: 8,
        name: "animal husbandry,dairy development&fisheries,secretariat department",
      },
    ];
    $scope.budgetYearList = [
      { id: 0, year: "2023-2024" },
      {
        id: 1,
        year: "2022-2023",
      },
      { id: 2, year: "2021-2022" },
      { id: 3, year: "2020-2021" },
    ];
    $scope.establishmentList = [
      { id: 0, name: "Establishment" },
      { id: 1, name: "Scheme" },
    ];
    $scope.chargedList = [
      { id: 0, name: "Charged" },
      { id: 1, name: "Voted" },
    ];

    $scope.getHoaDetails = function (hoaId) {
      $scope.hoaId = hoaId;
      $http({
        method: "POST",
        url: "api/getHoa.php",
        data: { hoaId: hoaId },
      }).then(
        function (response) {
          if (response["status"]) {
            $scope.hoaItem = response.data["data"];
            $scope.headList = $scope.hoaItem.hoa_tier.split("-");
            $scope.headOfAccount = $scope.hoaItem.dep_hod;
            for (let i of $scope.headOfAccountList) {
              if (i.name === $scope.headOfAccount) {
                $scope.headOfAccountId = i.id.toString();
              }
            }
            $scope.establishment = $scope.hoaItem.e_s;
            for (let i of $scope.establishmentList) {
              if (i.name === $scope.establishment) {
                $scope.establishmentId = i.id.toString();
              }
            }
            $scope.majorHeadNum = $scope.headList[0];
            $scope.majorHeadDesc = $scope.hoaItem.mjh_desc;
            $scope.subMajorHeadNum = $scope.headList[1];
            $scope.subMajorHeadDesc = $scope.hoaItem.smjh_desc;
            $scope.minorHeadNum = $scope.headList[2];
            $scope.minorHeadDesc = $scope.hoaItem.mih_desc;
            $scope.groupSubHeadNum = $scope.headList[3];
            $scope.groupSubHeadDesc = $scope.hoaItem.gsh_desc;
            $scope.subHeadNum = $scope.headList[4];
            $scope.subHeadDesc = $scope.hoaItem.sh_desc;
            $scope.detailedHeadNum = $scope.headList[5];
            $scope.detailedHeadDesc = $scope.hoaItem.dh_desc;
            $scope.subDetailedHeadNum = $scope.headList[6];
            $scope.subDetailedHeadDesc = $scope.hoaItem.sdh_desc;
            $scope.charged = $scope.hoaItem.c_v;
            for (let i of $scope.chargedList) {
              if (i.name === $scope.charged) {
                $scope.chargedId = i.id.toString();
              }
            }
            $scope.budgetYear = $scope.hoaItem.budget_year;
            for (let i of $scope.budgetYearList) {
              if (i.year === $scope.budgetYear) {
                $scope.budgetYearId = i.id.toString();
              }
            }
            $scope.estAmount = $scope.hoaItem.est_amount;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          }
        },
        function (response) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.status + " " + response.statusText,
          });
        }
      );
    };

    // validations
    $scope.validateDropDown = function (modelName, errorMsg) {
      if ($scope[modelName] === null || $scope[modelName] === "") {
        $scope[errorMsg] = "Please choose an option";
        return false;
      } else {
        $scope[errorMsg] = null;
        return true;
      }
    };

    $scope.validateNum = function (modelName, errorMsg, inputLabel, length) {
      if ($scope[modelName] !== null) {
        $scope[modelName] = $scope[modelName].replace(/[^0-9]/g, "");
      }
      if ($scope[modelName] === null || $scope[modelName] === "") {
        $scope[errorMsg] = inputLabel + " is required";
        return false;
      } else if ($scope[modelName].toString().length < length) {
        $scope[errorMsg] = "Please Enter " + length + " digits";
        return false;
      } else {
        $scope[errorMsg] = null;
        return true;
      }
    };

    $scope.validateDesc = function (modelName, errorMsg, inputLabel) {
      if ($scope[modelName] === null || $scope[modelName] === "") {
        $scope[errorMsg] = inputLabel + " is required";
        return false;
      } else {
        $scope[errorMsg] = null;
        return true;
      }
    };

    $scope.estAmountValidation = function () {
      if (typeof $scope.estAmount === "string") {
        $scope.estAmount = $scope.estAmount.replace(/[^0-9]/g, "");
      }
      if ($scope.estAmount === null || $scope.estAmount === "") {
        $scope.estAmountErrMsg = "Estimated amount is required";
        return false;
      } else {
        $scope.estAmountErrMsg = null;
        return true;
      }
    };

    // clear data btn

    $scope.clearDataBtn = function () {
      $scope.emptyValues();
    };

    // submit data btn
    $scope.submitBtn = function () {
      $scope.estAmountValidation();
      $scope.validateDropDown("headOfAccount", "headOfAccountErrMsg");
      $scope.validateDropDown("budgetYear", "budgetYearErrMsg");
      $scope.validateDropDown("establishment", "establishmentErrMsg");
      $scope.validateDropDown("charged", "chargedErrMsg");
      $scope.validateNum("majorHeadNum", "majorHeadNumErrMsg", "Major head", 4);
      $scope.validateNum(
        "subMajorHeadNum",
        "subMajorHeadNumErrMsg",
        "Sub major head",
        2
      );
      $scope.validateNum("minorHeadNum", "minorHeadNumErrMsg", "Minor head", 3);
      $scope.validateNum(
        "groupSubHeadNum",
        "groupSubHeadNumErrMsg",
        "Group sub head",
        2
      );
      $scope.validateNum("subHeadNum", "subHeadNumErrMsg", "Sub head", 2);
      $scope.validateNum(
        "detailedHeadNum",
        "detailedHeadNumErrMsg",
        "Detailed head",
        3
      );
      $scope.validateNum(
        "subDetailedHeadNum",
        "subDetailedHeadNumErrMsg",
        "Sub detailed head",
        3
      );
      $scope.validateDesc(
        "majorHeadDesc",
        "majorHeadDescErrMsg",
        "Major head description"
      );
      $scope.validateDesc(
        "subMajorHeadDesc",
        "subMajorHeadDescErrMsg",
        "Sub major head description"
      );
      $scope.validateDesc(
        "minorHeadDesc",
        "minorHeadDescErrMsg",
        "Minor head description"
      );
      $scope.validateDesc(
        "groupSubHeadDesc",
        "groupSubHeadDescErrMsg",
        "Group sub head description"
      );
      $scope.validateDesc(
        "subHeadDesc",
        "subHeadDescErrMsg",
        "Sub head description"
      );
      $scope.validateDesc(
        "detailedHeadDesc",
        "detailedHeadDescErrMsg",
        "Detailed head description"
      );
      $scope.validateDesc(
        "subDetailedHeadDesc",
        "subDetailedHeadDescErrMsg",
        "Sub detailed head description"
      );

      if (
        !(
          $scope.headOfAccountErrMsg &&
          $scope.budgetYearErrMsg &&
          $scope.establishmentErrMsg &&
          $scope.chargedErrMsg &&
          $scope.majorHeadNumErrMsg &&
          $scope.subMajorHeadNumErrMsg &&
          $scope.minorHeadNumErrMsg &&
          $scope.groupSubHeadNumErrMsg &&
          $scope.subHeadNumErrMsg &&
          $scope.detailedHeadNumErrMsg &&
          $scope.subDetailedHeadNumErrMsg &&
          $scope.majorHeadDescErrMsg &&
          $scope.subMajorHeadDescErrMsg &&
          $scope.minorHeadDescErrMsg &&
          $scope.groupSubHeadDescErrMsg &&
          $scope.subHeadDescErrMsg &&
          $scope.detailedHeadDescErrMsg &&
          $scope.subDetailedHeadDescErrMsg &&
          $scope.estAmountErrMsg
        )
      ) {
        let hod = $scope.headOfAccountList[$scope.headOfAccount].name;
        let estSch = $scope.establishmentList[$scope.establishment].name;
        let majorHead = $scope.majorHeadNum;
        let majorHeadDesc = $scope.majorHeadDesc;
        let subMajorHead = $scope.subMajorHeadNum;
        let subMajorHeadDesc = $scope.subMajorHeadDesc;
        let minorHead = $scope.minorHeadNum;
        let minorHeadDesc = $scope.minorHeadDesc;
        let groupSubHead = $scope.groupSubHeadNum;
        let groupSubHeadDesc = $scope.groupSubHeadDesc;
        let subHead = $scope.subHeadNum;
        let subHeadDesc = $scope.subHeadDesc;
        let detailedHead = $scope.detailedHeadNum;
        let detailedHeadDesc = $scope.detailedHeadDesc;
        let subDetailedHead = $scope.subDetailedHeadNum;
        let subDetailedHeadDesc = $scope.subDetailedHeadDesc;
        let charVot = $scope.chargedList[$scope.charged].name;
        let budgetYear = $scope.budgetYearList[$scope.budgetYear].year;
        let estAmount = $scope.estAmount;
        let data = {
          hod: hod,
          estSch: estSch,
          majorHead: majorHead,
          majorHeadDesc:majorHeadDesc,
          subMajorHead: subMajorHead,
          subMajorHeadDesc: subMajorHeadDesc,
          minorHead: minorHead,
          minorHeadDesc: minorHeadDesc,
          groupSubHead: groupSubHead,
          groupSubHeadDesc: groupSubHeadDesc,
          subHead: subHead,
          subHeadDesc: subHeadDesc,
          detailedHead: detailedHead,
          detailedHeadDesc: detailedHeadDesc,
          subDetailedHead: subDetailedHead,
          subDetailedHeadDesc: subDetailedHeadDesc,
          charVot: charVot,
          budgetYear: budgetYear,
          estAmount: estAmount,
        };
        $http({
          method: "POST",
          url: "api/insertHoa.php",
          data: JSON.stringify(data),
        }).then(
          function (response) {
            if (response.data["status"]) {
              Swal.fire({
                icon: "success",
                title: "Data Submitted",
                text: "Successful",
              });
              $scope.emptyValues();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data["message"],
              });
            }
          },
          function (response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.status + " " + response.statusText,
            });
          }
        );
      }
    };

    // update data btn
    $scope.updateHoaBtn = function () {
      $scope.estAmountValidation();
      $scope.validateDropDown("headOfAccountId", "headOfAccountErrMsg");
      $scope.validateDropDown("budgetYearId", "budgetYearErrMsg");
      $scope.validateDropDown("establishmentId", "establishmentErrMsg");
      $scope.validateDropDown("chargedId", "chargedErrMsg");
      $scope.validateNum("majorHeadNum", "majorHeadNumErrMsg", "Major head", 4);
      $scope.validateNum(
        "subMajorHeadNum",
        "subMajorHeadNumErrMsg",
        "Sub major head",
        2
      );
      $scope.validateNum("minorHeadNum", "minorHeadNumErrMsg", "Minor head", 3);
      $scope.validateNum(
        "groupSubHeadNum",
        "groupSubHeadNumErrMsg",
        "Group sub head",
        2
      );
      $scope.validateNum("subHeadNum", "subHeadNumErrMsg", "Sub head", 2);
      $scope.validateNum(
        "detailedHeadNum",
        "detailedHeadNumErrMsg",
        "Detailed head",
        3
      );
      $scope.validateNum(
        "subDetailedHeadNum",
        "subDetailedHeadNumErrMsg",
        "Sub detailed head",
        3
      );
      $scope.validateDesc(
        "majorHeadDesc",
        "majorHeadDescErrMsg",
        "Major head description"
      );
      $scope.validateDesc(
        "subMajorHeadDesc",
        "subMajorHeadDescErrMsg",
        "Sub major head description"
      );
      $scope.validateDesc(
        "minorHeadDesc",
        "minorHeadDescErrMsg",
        "Minor head description"
      );
      $scope.validateDesc(
        "groupSubHeadDesc",
        "groupSubHeadDescErrMsg",
        "Group sub head description"
      );
      $scope.validateDesc(
        "subHeadDesc",
        "subHeadDescErrMsg",
        "Sub head description"
      );
      $scope.validateDesc(
        "detailedHeadDesc",
        "detailedHeadDescErrMsg",
        "Detailed head description"
      );
      $scope.validateDesc(
        "subDetailedHeadDesc",
        "subDetailedHeadDescErrMsg",
        "Sub detailed head description"
      );
      if (
        !(
          $scope.headOfAccountErrMsg &&
          $scope.budgetYearErrMsg &&
          $scope.establishmentErrMsg &&
          $scope.chargedErrMsg &&
          $scope.majorHeadNumErrMsg &&
          $scope.subMajorHeadNumErrMsg &&
          $scope.minorHeadNumErrMsg &&
          $scope.groupSubHeadNumErrMsg &&
          $scope.subHeadNumErrMsg &&
          $scope.detailedHeadNumErrMsg &&
          $scope.subDetailedHeadNumErrMsg &&
          $scope.majorHeadDescErrMsg &&
          $scope.subMajorHeadDescErrMsg &&
          $scope.minorHeadDescErrMsg &&
          $scope.groupSubHeadDescErrMsg &&
          $scope.subHeadDescErrMsg &&
          $scope.detailedHeadDescErrMsg &&
          $scope.subDetailedHeadDescErrMsg &&
          $scope.estAmountErrMsg
        )
      ) {
        let hod = $scope.headOfAccountList[$scope.headOfAccountId].name;
        let estSch =$scope.establishmentList[$scope.establishmentId].name;
        let majorHead = $scope.majorHeadNum;
        let majorHeadDesc = $scope.majorHeadDesc;
        let subMajorHead = $scope.subMajorHeadNum;
        let subMajorHeadDesc = $scope.subMajorHeadDesc;
        let minorHead = $scope.minorHeadNum;
        let minorHeadDesc = $scope.minorHeadDesc;
        let groupSubHead = $scope.groupSubHeadNum;
        let groupSubHeadDesc = $scope.groupSubHeadDesc;
        let subHead = $scope.subHeadNum;
        let subHeadDesc = $scope.subHeadDesc;
        let detailedHead = $scope.detailedHeadNum;
        let detailedHeadDesc = $scope.detailedHeadDesc;
        let subDetailedHead = $scope.subDetailedHeadNum;
        let subDetailedHeadDesc = $scope.subDetailedHeadDesc;
        let charVot = $scope.chargedList[$scope.chargedId].name;
        let budgetYear = $scope.budgetYearList[$scope.budgetYearId].year;
        let estAmount = $scope.estAmount;
        let data = {
          hod: hod,
          estSch: estSch,
          majorHead: majorHead,
          majorHeadDesc:majorHeadDesc,
          subMajorHead: subMajorHead,
          subMajorHeadDesc: subMajorHeadDesc,
          minorHead: minorHead,
          minorHeadDesc: minorHeadDesc,
          groupSubHead: groupSubHead,
          groupSubHeadDesc: groupSubHeadDesc,
          subHead: subHead,
          subHeadDesc: subHeadDesc,
          detailedHead: detailedHead,
          detailedHeadDesc: detailedHeadDesc,
          subDetailedHead: subDetailedHead,
          subDetailedHeadDesc: subDetailedHeadDesc,
          charVot: charVot,
          budgetYear: budgetYear,
          estAmount: estAmount,
        };
        $http({
          method: "POST",
          url: "api/updateHoa.php",
          data: JSON.stringify(data),
        }).then(
          function (response) {
            if (response.data["status"]) {
              Swal.fire({
                icon: "success",
                title: "Data Updated",
                text: "Successful",
              });
              for (let i of $rootScope.hoaList) {
                if ($scope.hoaId === i.id) {
                  i.hoa_tier = `${$scope.majorHeadNum}-${$scope.subMajorHeadNum}-${$scope.minorHeadNum}-${$scope.groupSubHeadNum}-${$scope.subHeadNum}-${$scope.detailedHeadNum}-${$scope.subDetailedHeadNum}-PVN`;
                  i.dep_hod =
                    $scope.headOfAccountList[$scope.headOfAccountId].name;
                  i.e_s =
                    $scope.establishmentList[$scope.establishmentId].name;
                  i.est_amount = $scope.estAmount;
                }
              }
              $scope.emptyValues();
              jQuery("#cancelBtn").click();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data["message"],
              });
            }
          },
          function (response) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.status + " " + response.statusText,
            });
          }
        );
      }
    };

  },
]);
