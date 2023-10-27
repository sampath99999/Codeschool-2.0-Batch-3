myApp.controller("validationController", function ($scope, $http, ValidationService) {
  
  $scope.spin=true;

  $scope.agreementNumber = "";
  $scope.agreementNumberError = "";
  $scope.workName = "";
  $scope.workNameError = "";
  $scope.estimateContract = "";
  $scope.estimateContractError = "";
  $scope.agreementContract = "";
  $scope.agreementContractError = "";
  $scope.expendatureDate = "";
  $scope.expendatureDateError = "";
  $scope.pendingAmount = "";
  $scope.pendingAmountError = "";
  $scope.tendurePercentage = "";
  $scope.tendurePercentageError = "";
  $scope.hoaNumber = "";
  $scope.hoaNumberError = "";
  $scope.panNumber = "";
  $scope.panNumberError = "";


  $scope.validateHoaNumber = function () {
    if ($scope.hoaNumber == "") {
      $scope.hoaNumberError = 'HOA Number is required';
      return false;

    }
    else if (!ValidationService.isValidNumber($scope.hoaNumber)) {
      $scope.hoaNumberError = 'Invalid Number format';
      return false;
    } else {

      $scope.hoaNumberError = "";
      return true;
    }


  };

  $scope.validateWorkName = function () {
    if ($scope.workName == "") {
      $scope.workNameError = 'Work Name is required';
      return false;

    } else if (ValidationService.isValidName($scope.workName)) {
      $scope.workNameError = "";
      return true;
    } else {
      $scope.workNameError = 'Invalid name format';
      return false;
    }
  };


  $scope.validateAgreementNumber = function () {

    if ($scope.agreementNumber == "") {
      $scope.agreementNumberError = 'Agreement Number is required';
      return false;

    } else if (ValidationService.isValidNumber($scope.agreementNumber)) {
      $scope.agreementNumberError = "";
      return true;
    }
    else {
      $scope.agreementNumberError = 'Invalid Number format';
      return false;
    }
  };

  $scope.validateEstimateContract = function () {
    if ($scope.estimateContract == "") {
      $scope.estimateContractError = 'Estimate contract value is required';
      return false;

    } else if (ValidationService.isValidNumber($scope.estimateContract)) {
      $scope.estimateContractError = '';
      return true;
    } else {
      $scope.estimateContractError = 'Invalid contract value';
      return false;
    }
  };

  $scope.validateaAgreementContract = function () {
    if ($scope.agreementContract == "") {
      $scope.agreementContractError = 'Agreement contract value is required';
      return false;

    } else if (ValidationService.isValidNumber($scope.agreementContract)) {
      $scope.agreementContractError = '';
      return true;
    } else {
      $scope.agreementContractError = 'Invalid agreement contract value';
      return false;
    }
  }

  $scope.validatePendingAmount = function () {
    if ($scope.pendingAmount == "") {
      $scope.pendingAmountError = 'Pending Bills Amount is required';

      return false;

    } else if (ValidationService.isValidNumber($scope.pendingAmount)) {
      $scope.pendingAmountError = '';
      return true;
    }

    else {
      $scope.pendingAmountError = 'Invalid Number format';
      return false;
    }
  };
  $scope.validateTendurePercentage = function () {
    if ($scope.tendurePercentage == "") {
      $scope.tendurePercentageError = 'Tendure Percentage is required';

      return false;
    }
    else if (ValidationService.isValidNumber($scope.tendurePercentage)) {
      $scope.tendurePercentageError = '';
      return true;
    }
    else {
      $scope.tendurePercentageError = 'Invalid Percentage';
      return false;
    }
  };

  $scope.validateExpendatureDate = function () {
   
    if($scope.expendatureDate==""){
      $scope.expenditureDateError = 'Expendature date should not be empty!';
    }
    else {
      $scope.expenditureDateError = '';
    }



  }

  $scope.validatePanNumber = function () {
    if ($scope.panNumber == "") {
      $scope.panNumberError = 'Pan Number is required';
      return false;

    }
    else if (/^[a-zA-Z0-9]*$/.test($scope.panNumber)) {
      $scope.panNumberError = "";
      return true;
      
    } else {
      $scope.panNumberError = 'Invalid Number format';
      return false;
      
    }


  };



  $scope.arrlist = [

    {
      "id": 1,
      "text": "Work ID",

    }, {
      "id": 2,
      "text": "LA/RR Award ID",

    }

  ];
  $scope.workerType = [

    {
      "id": 1,
      "text": "Works",

    }, {
      "id": 2,
      "text": "DCW Works",

    }, {
      "id": 3,
      "text": "Works (Form 60C)",

    }

  ];
  $scope.workCompleted = [

    {
      "id": 1,
      "text": "Yes",

    }, {
      "id": 2,
      "text": "No",

    }

  ];
  $scope.selectedAuthority = [

    {
      "id": 1,
      "text": "Govt",

    }, {
      "id": 2,
      "text": "Private",

    }, {
      "id": 3,
      "text": "Other",

    }

  ];
  $scope.selectedSSRYear = [

    {
      "id": 1,
      "text": "2015",

    }, {
      "id": 2,
      "text": "2016",

    }, {
      "id": 3,
      "text": "2017",

    }

  ];

  $scope.searchHoaCode = function () {
    console.log('clickedhoa');
    $scope.spin=false;
    console.log($scope.hoaNumber);
    $http({
      method: "GET",
      url: "./api/getHoa.php?hoa_number=" + $scope.hoaNumber,
    })
      .then(function success(response) {
        $scope.spin=true;
        console.log(response);

        var responseData = response.data;
        if (!responseData.status) {
          $scope.hoaNumberError = responseData.message;
        }

        $scope.headAccountOptions = responseData.data;
        console.log($scope.headAccountOptions.data);


        $scope.onChangeGoNumber = function (data) {
          console.log(data);
          var optionValue = $scope.goNumber;
          console.log('Selected Option Value:', optionValue);
          $scope.values = data;
          console.log(data);
        };


      }, function failure(err) {
        return err;
      })

      .catch(function (error) {
        return error;
      });



  };




  //first
  $scope.uploadedFiles = [];

  $scope.addFiles = function () {
    console.log($("#uploadFile")[0].files);
    console.log("clicked");
    $scope.uploadedFiles.push($("#uploadFile")[0].files[0].name);
    console.log($scope.uploadedFiles);
    $("#uploadFile").val("");
  };

  $scope.removeFile = function (index) {
    $scope.uploadedFiles.splice(index, 1);
  };

  if($("#uploadFile").val()==""){
    $scope.uploadedFilesError = 'Atleast one file is required';
  }
  


  //sec

  $scope.uploadedGOFiles = [];

  $scope.addGoFile = function () {
    $scope.uploadedGOFiles.push($("#uploadGOFile")[0].files[0].name);
    console.log($scope.uploadedGOFiles);

  };
  $scope.removeGoFile = function (index) {
    $scope.uploadedGOFiles.splice(index, 1);
  };
  $("#uploadGOFile").val("");


  //THIRD

  $scope.uploadedAgreement = [];

  $scope.addAgreementFiles = function () {
    $scope.uploadedAgreement.push($("#uploadAgreement")[0].files[0].name);
    console.log($scope.uploadedAgreement);

  };

  $scope.removeAgreementFile = function (index) {
    $scope.uploadedAgreement.splice(index, 1);
  };
  $("#uploadAgreement").val("");

  //four

  $scope.uploadedOtherDocs = [];

  $scope.addOtherDocs = function () {
    $scope.uploadedOtherDocs.push($("#otherDoc")[0].files[0].name);
    console.log($scope.uploadedOtherDocs);

  };

  $scope.removeOtherDocs = function (index) {
    $scope.uploadedOtherDocs.splice(index, 1);
  };
  $("#otherDoc").val("");



  $scope.searchPanNumber = function () {
    console.log($scope.panNumber);
    $scope.spin=false;
    $http({
      method: "GET",
      url: "./api/getPanNumber.php?pan_number=" + $scope.panNumber,
    })
      .then(function success(response) {
        // console.log(response);
        $scope.spin=true;
        var responseData = response.data;
        console.log(responseData);
        
        if (responseData.status) {
          $scope.details = responseData.data[0];
          $scope.panNumberError = "";
        } else {
          $scope.details = "";
          $scope.panNumberError = responseData.message;
        }

        
        console.log($scope.details);

      }, function failure(err) {
        
        return err;
      })

      .catch(function (error) {
        return error;
      });

  };




  $scope.onClickNext = () => {
   
    
    console.log($scope.validateHoaNumber(), $scope.validateWorkName() , $scope.validateAgreementNumber() ,$scope.validateEstimateContract()
    , $scope.validateaAgreementContract(), $scope.validatePendingAmount() , $scope.validateTendurePercentage() && $scope.validatePanNumber())
    if ($scope.validateHoaNumber() && $scope.validateWorkName() && $scope.validateAgreementNumber() && $scope.validateEstimateContract()
      && $scope.validateaAgreementContract() && $scope.validatePendingAmount() && $scope.validateTendurePercentage() &&$scope.validatePanNumber() ) {


        $scope.demo = "success";
      console.log("success");



    
    }
    else {
      console.log("error");
      $scope.demo = "Invalid";
    }


  }
});



