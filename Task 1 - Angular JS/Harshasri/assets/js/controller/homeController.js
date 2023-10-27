myApp.controller("homeController", function ($scope, $state, $http,$rootScope) {
  $rootScope.isLoading=false;
  // $scope.spin=true;
  $scope.userId = window.localStorage.getItem("userId");
    if (!$scope.userId) {
      $state.go("login");
    }

  $scope.name = "";
  $scope.class = "";
  $scope.section = "";
  $scope.address = "";
  $scope.city = "";
 

  $scope.students = [];



  $scope.add = function () {
    $rootScope.isLoading=true;
    $scope.spin=false;
    console.log('from add');
    console.log($scope.name);
    let data= {
      name: $scope.name,
      class: $scope.class,
      section: $scope.section,
      address: $scope.address,
      city: $scope.city


    }
    console.log(data);
    $http({
      method: 'POST',
      url: './api/addStudent.php',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: $scope.name,
        class: $scope.class,
        section: $scope.section,
        address: $scope.address,
        city: $scope.city


      }
    })
      .then(function success(response) {
        $rootScope.isLoading=false;
        $scope.spin=true;
        $scope.getStudents();
        console.log("success");
        $responseData = response.data;
        console.log($responseData);

        if ($responseData.status) {
          console.log($responseData);

        } else {
          alert($responseData.message);
        }


      }, function failure(err) {
        return err;
      })
      .catch(function (error) {
        return error;
      })
      .finally(function(){
        $rootScope.isLoading=false;
      })


  }
  
  $scope.getStudents = function () {
    // $scope.spin=false;
    $rootScope.isLoading=false;
    $http({
      method: "GET",
      url: "./api/getStudents.php",
    })
      .then(function success(response) {
        // $scope.spin=true;
        $rootScope.isLoading=true;
        var responseData = response.data;
        console.log(responseData);

        if (responseData.status) {
          $scope.students = responseData.data;
          console.log($scope.students[1]);
        }

      }, function failure(err) {

        return err;
      })

      .catch(function (error) {
        return error;
      })
      .finally(function(){
        $rootScope.isLoading=false;
      });
  }

  $scope.getStudents();


$scope.updateData=function(e1,e2,e3,e4,e5){
  $rootScope.isLoading=false;
  // console.log(index);
  // $scope.studentId = $scope.students[index].id;
  // $scope.updateName = $scope.students[index].name;
  // $scope.updateClass = $scope.students[index].class;
  // $scope.updateSection = $scope.students[index].section;
  // $scope.updateAddress = $scope.students[index].address;
  // $scope.updateCity = $scope.students[index].city;

  let data= {
    id: $rootScope.studentId,
    name: e1,
    class: e2,
    section: e3,
    address: e4,
    city: e5


  }
  console.log(data);

  $http({
    method: 'POST',
    url: './api/updateStudent.php',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
    .then(function success(response) {
      $rootScope.isLoading=true;
      $scope.getStudents();
      console.log("success");
      $responseData = response.data;
      console.log($responseData);

      if ($responseData.status) {
        console.log($responseData);

      } else {
        alert($responseData.message);
      }


    }, function failure(err) {
      return err;
    })
    .catch(function (error) {
      return error;
    })
    .finally(function(){
      $rootScope.isLoading=false;
    });
}


  $scope.editStudent = function (e1,e2,e3,e4,e5,e6) {
   
 
    console.log("clicked", e1);
    $rootScope.studentId = e1;
    $rootScope.updateName = e2,
    $rootScope.updateClass = e3,
    $rootScope.updateSection = e4,
    $rootScope.updateAddress =e5,
    $rootScope.updateCity = e6
   
  }

  $scope.deleteStudent = function (index) {
    // $scope.spin=false;
    $rootScope.isLoading=false;
    console.log("clicked", index);
    $scope.studentId = $scope.students[index].id;
    console.log($scope.studentId);
    $http({
      method: 'POST',
      url: './api/deleteStudent.php',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: $scope.studentId,

      }
    })
      .then(function success(response) {
        $rootScope.isLoading=true;
        $scope.spin=true;
        $scope.getStudents();
        console.log("success");

        console.log(response);



      }, function failure(err) {
        return err;
      })
      .catch(function (error) {
        return error;
      })
      .finally(function(){
        $rootScope.isLoading=false;
      });

    }

})