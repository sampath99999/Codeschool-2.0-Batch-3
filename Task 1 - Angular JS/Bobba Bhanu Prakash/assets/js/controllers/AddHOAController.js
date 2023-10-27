app.controller("AddHOAController", [
  "$scope",
  "$http",
  "$filter",
  "$rootScope",
  "$state",
  function ($scope, $http, $filter, $rootScope, $state) {
    function init() {
      $scope.selectedHOD = null;
      $scope.selectedYear = null;
      $scope.selectedScheme = null;
      $scope.majorHead = "";
      $scope.majorHeadDesc = "";
      $scope.subMajorHead = "";
      $scope.subMajorHeadDesc = "";
      $scope.minorHead = "";
      $scope.minorHeadDesc = "";
      $scope.groupSubHead = "";
      $scope.groupSubHeadDesc = "";
      $scope.subHead = "";
      $scope.subHeadDesc = "";
      $scope.detailedHead = "";
      $scope.detailedHeadDesc = "";
      $scope.subDetailedHead = "";
      $scope.subDetailedHeadDesc = "";
      $scope.selectedCharged = null;
      $scope.amount = "";
    }
    init();
    $scope.nameOfHOD = [
      "HIGHER EDUCATION SECRETARIAT DEPARTMENT",
      "ENERGY SECRETARIAT DEPARTMENT",
      "CHIEF ELECTRICAL INSPECTOR TO GOVERNMENT, HOD",
      "TECHNICAL EDUCATION, HOD",
      "COLLEGIATE EDUCATION HOD",
      "ARCHIVES TARNAKA",
      "INTERMEDIATE EDUCATION, HOD",
      "ORIENTAL MANUSCRIPTS",
      "ANIMAL HUSBANDRY, DAIRY DEVELOPMENT & FISHERIES, SECRETARIAT DEPARTMENT",
      "INDUSTRIAL TRIBUNAL-II, HYDERABAD",
      "ADDITIONAL INDUSTRIAL TRIBUNAL,HYDERABAD",
      "INDUSTRIAL TRIBUNAL-I, HYDERABAD",
      "CHIEF ELECTORIAL OFFICER, ELECTIONS",
      "TOWN AND COUNTRY PLANNING",
      "PRINCIPAL CHIEF CONSERVATOR OF FOREST, HOD",
      "FISHERIES, HOD",
    ];
    $scope.budgetYear = ["2023-2024", "2022-2023", "2021-2022", "2020-2021"];
    $scope.schemes = ["Establishment", "Scheme"];
    $scope.chargedList = ["Voted", "Charged"];
    $scope.validateHOD = function () {
      $scope.HODErr = "";
      if ($scope.selectedHOD == null) {
        $scope.HODErr = "Please select HOD";
        return false;
      }
      return true;
    };
    $scope.validateYear = function () {
      $scope.yearErr = "";
      if ($scope.selectedYear == null) {
        $scope.yearErr = "Please select year";
        return false;
      }
      return true;
    };
    $scope.validateScheme = function () {
      $scope.schemeErr = "";
      if ($scope.selectedScheme == null) {
        $scope.schemeErr = "Please select scheme";
        return false;
      }
      return true;
    };
    var global = "";
    function validate(modelName, errorName, gen_name, number) {
      $scope[errorName] = "";
      $scope[modelName] = $scope[modelName].replace(/[^0-9]/g, "");
      if ($scope[modelName] == "") {
        $scope[errorName] = gen_name + "can't be empty";
        return false;
      } else if (
        String($scope[modelName]).length < number &&
        String($scope[modelName]).length > 0
      ) {
        $scope[errorName] = gen_name + "must contain " + number + " characters";
        return false;
      } else if (String($scope[modelName]).length == number) {
        global = $scope[modelName];
      } else {
        $scope[modelName] = global;
        return false;
      }
      return true;
    }
    function validateDesc(modelName, errorName) {
      $scope[errorName] = "";
      if ($scope[modelName] == "") {
        $scope[errorName] = "Description can't be empty";
        return false;
      }
      return true;
    }
    $scope.validateMajorHead = function () {
      return validate("majorHead", "majorHeadErr", "Major head", 4);
    };
    $scope.validateMajorHeadDesc = function () {
      return validateDesc("majorHeadDesc", "majorHeadDescErr");
    };
    $scope.validateSubMajorHead = function () {
      return validate("subMajorHead", "subMajorHeadErr", "Sub major head", 2);
    };

    $scope.validateSubMajorHeadDesc = function () {
      return validateDesc("subMajorHeadDesc", "subMajorHeadDescErr");
    };

    $scope.validateMinorHead = function () {
      return validate("minorHead", "minorHeadErr", "Minor head", 3);
    };
    $scope.validateMinorHeadDesc = function () {
      return validateDesc("minorHeadDesc", "minorHeadDescErr");
    };
    $scope.validateGroupSubHead = function () {
      return validate("groupSubHead", "groupSubHeadErr", "Group Sub Head", 2);
    };
    $scope.validateGroupSubHeadDesc = function () {
      return validateDesc("groupSubHeadDesc", "groupSubHeadDescErr");
    };
    $scope.validateSubHead = function () {
      return validate("subHead", "subHeadErr", "Sub head", 2);
    };
    $scope.validateSubHeadDesc = function () {
      return validateDesc("subHeadDesc", "subHeadDescErr");
    };

    $scope.validateDetailedHead = function () {
      return validate("detailedHead", "detailedHeadErr", "Detailed head", 3);
    };
    $scope.validateDetailedHeadDesc = function () {
      return validateDesc("detailedHeadDesc", "detailedHeadDescErr");
    };
    $scope.validateSubDetailedHead = function () {
      return validate(
        "subDetailedHead",
        "subDetailedHeadErr",
        "Sub detailed head",
        3
      );
    };
    $scope.validateSubDetailedHeadDesc = function () {
      return validateDesc("subDetailedHeadDesc", "subDetailedHeadDescErr");
    };

    $scope.validateCharged = function () {
      $scope.chargedErr = "";
      if ($scope.selectedCharged == null) {
        $scope.chargedErr = "Please select Charged/Voted";
        return false;
      }
      return true;
    };
    $scope.validateAmount = function () {
      $scope.amountErr = "";
      $scope.amountInWords = "";

      if (typeof $scope.amount === "string") {
        $scope.amount = $scope.amount.trim();
        $scope.amount = $scope.amount.replace(/[^0-9.]/g, "");
      }

      if ($scope.amount.length === 0) {
        $scope.amountErr = "Amount can't be empty";
        return false;
      }
      $scope.amountInWords =
        $filter("convertToWords")($scope.amount) + " Rupees";
      return true;
    };
    $scope.submitHOA = function () {
      $scope.validateHOD();
      $scope.validateScheme();
      $scope.validateYear();
      $scope.validateMajorHead();
      $scope.validateMajorHeadDesc();
      $scope.validateMinorHead();
      $scope.validateMinorHeadDesc();
      $scope.validateGroupSubHead();
      $scope.validateGroupSubHeadDesc();
      $scope.validateSubHead();
      $scope.validateSubHeadDesc();
      $scope.validateDetailedHead();
      $scope.validateDetailedHeadDesc();
      $scope.validateSubDetailedHead();
      $scope.validateSubDetailedHeadDesc();
      $scope.validateSubMajorHead();
      $scope.validateSubMajorHeadDesc();
      $scope.validateCharged();
      $scope.validateAmount();

      if (
        $scope.validateHOD() &&
        $scope.validateScheme() &&
        $scope.validateYear() &&
        $scope.validateMajorHead() &&
        $scope.validateMajorHeadDesc() &&
        $scope.validateMinorHead() &&
        $scope.validateMinorHeadDesc() &&
        $scope.validateGroupSubHead() &&
        $scope.validateGroupSubHeadDesc() &&
        $scope.validateSubHead() &&
        $scope.validateSubHeadDesc() &&
        $scope.validateDetailedHead() &&
        $scope.validateDetailedHeadDesc() &&
        $scope.validateSubDetailedHead() &&
        $scope.validateSubDetailedHeadDesc() &&
        $scope.validateSubMajorHead() &&
        $scope.validateSubMajorHeadDesc() &&
        $scope.validateCharged() &&
        $scope.validateAmount()
      ) {
        var hoa =
          $scope.majorHead +
          "-" +
          $scope.subMajorHead +
          "-" +
          $scope.minorHead +
          "-" +
          $scope.groupSubHead +
          "-" +
          $scope.subHead +
          "-" +
          $scope.detailedHead +
          "-" +
          $scope.subDetailedHead +
          "-" +
          "NVN";
        var hoaObj = {
          hod: $scope.selectedHOD,
          year: $scope.selectedYear,
          scheme: $scope.selectedScheme,
          mjhDesc: $scope.majorHeadDesc,
          hoa: hoa,
          smhDesc: $scope.subMajorHeadDesc,
          mhDesc: $scope.minorHeadDesc,
          gshDesc: $scope.groupSubHeadDesc,
          shDesc: $scope.subHeadDesc,
          dhDesc: $scope.detailedHeadDesc,
          sdhDesc: $scope.subDetailedHeadDesc,
          charged: $scope.selectedCharged,
          amount: $scope.amount,
        };
        $http({
          method: "POST",
          url: "./api/addHOA.php",
          data: hoaObj,
        })
          .then(
            function (response) {
              console.log(response);
              if (response.data.status == true) {
                Swal.fire("Done!", response.data.message, "success");
                $state.go("HOAList");
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
      }
    };
    $scope.clearHOA = function () {
      init();
    };
    $scope.edit = function (record) {
      $scope.selectedHOD = record.name_of_hod;
      $scope.selectedYear = record.budget_year;
      $scope.selectedScheme = record.hod_type;
      $scope.majorHead = record.hoa.slice(0, 4);
      $scope.majorHeadDesc = record.mjh_desc;
      $scope.subMajorHead = record.hoa.slice(5, 7);
      $scope.subMajorHeadDesc = record.smh_desc;
      $scope.minorHead = record.hoa.slice(8, 11);
      $scope.minorHeadDesc = record.mh_desc;
      $scope.groupSubHead = record.hoa.slice(12, 14);
      $scope.groupSubHeadDesc = record.gsh_desc;
      $scope.subHead = record.hoa.slice(15, 17);
      $scope.subHeadDesc = record.sh_desc;
      $scope.detailedHead = record.hoa.slice(18, 21);
      $scope.detailedHeadDesc = record.dh_desc;
      $scope.subDetailedHead = record.hoa.slice(22, 25);
      $scope.subDetailedHeadDesc = record.sdh_desc;
      $scope.selectedCharged = record.status;
      $scope.amount = parseInt(record.amount);
      $scope.record = record;
    };

    $scope.update = function (record) {
      $scope.validateHOD();
      $scope.validateScheme();
      $scope.validateYear();
      $scope.validateMajorHead();
      $scope.validateMajorHeadDesc();
      $scope.validateMinorHead();
      $scope.validateMinorHeadDesc();
      $scope.validateGroupSubHead();
      $scope.validateGroupSubHeadDesc();
      $scope.validateSubHead();
      $scope.validateSubHeadDesc();
      $scope.validateDetailedHead();
      $scope.validateDetailedHeadDesc();
      $scope.validateSubDetailedHead();
      $scope.validateSubDetailedHeadDesc();
      $scope.validateSubMajorHead();
      $scope.validateSubMajorHeadDesc();
      $scope.validateCharged();
      $scope.validateAmount();
      if (
        $scope.validateHOD() &&
        $scope.validateScheme() &&
        $scope.validateYear() &&
        $scope.validateMajorHead() &&
        $scope.validateMajorHeadDesc() &&
        $scope.validateMinorHead() &&
        $scope.validateMinorHeadDesc() &&
        $scope.validateGroupSubHead() &&
        $scope.validateGroupSubHeadDesc() &&
        $scope.validateSubHead() &&
        $scope.validateSubHeadDesc() &&
        $scope.validateDetailedHead() &&
        $scope.validateDetailedHeadDesc() &&
        $scope.validateSubDetailedHead() &&
        $scope.validateSubDetailedHeadDesc() &&
        $scope.validateSubMajorHead() &&
        $scope.validateSubMajorHeadDesc() &&
        $scope.validateCharged() &&
        $scope.validateAmount()
      ) {
        var hoa =
          $scope.majorHead +
          "-" +
          $scope.subMajorHead +
          "-" +
          $scope.minorHead +
          "-" +
          $scope.groupSubHead +
          "-" +
          $scope.subHead +
          "-" +
          $scope.detailedHead +
          "-" +
          $scope.subDetailedHead +
          "-" +
          "NVN";
        var hoaObj = {
          hod: $scope.selectedHOD,
          year: $scope.selectedYear,
          scheme: $scope.selectedScheme,
          mjhDesc: $scope.majorHeadDesc,
          hoa: hoa,
          smhDesc: $scope.subMajorHeadDesc,
          mhDesc: $scope.minorHeadDesc,
          gshDesc: $scope.groupSubHeadDesc,
          shDesc: $scope.subHeadDesc,
          dhDesc: $scope.detailedHeadDesc,
          sdhDesc: $scope.subDetailedHeadDesc,
          charged: $scope.selectedCharged,
          amount: $scope.amount,
          id: record.id,
        };
        $http({
          method: "POST",
          url: "./api/updateHOA.php",
          data: hoaObj,
        })
          .then(
            function (response) {
              if (response.data.status == true) {
                record.hoa = hoa;
                record.name_of_hod = hoaObj.hod;
                record.amount = hoaObj.amount;
                record.hod_type = hoaObj.scheme;
                record.mjh_desc = hoaObj.mjhDesc;
                record.smh_desc = hoaObj.smhDesc;
                record.mh_desc = hoaObj.mhDesc;
                record.gsh_desc = hoaObj.gshDesc;
                record.sh_desc = hoaObj.shDesc;
                record.dh_desc = hoaObj.dhDesc;
                record.sdh_desc = hoaObj.sdhDesc;
                record.status = hoaObj.charged;
                record.budget_year = hoaObj.year;
                Swal.fire("Done!", response.data.message, "success");
                document.getElementById("exitBtn").click();
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
      }
    };
  },
]);
