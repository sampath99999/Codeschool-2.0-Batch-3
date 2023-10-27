inventoryManagementApp.controller("DashBoardCtrl", [
  "$scope",
  "$http",
  "randomColorGenerationService",
  "productCategoryService",
  "getTopTrendService",
  "getProductsService",
  "$state",
  function (
    $scope,
    $http,
    randomColorGenerationService,
    productCategoryService,
    getTopTrendService,
    getProductsService,
    $state
  ) {
    $scope.showSpinner = false;
    $scope.topTrendsParam = [
      {
        id: "topTrendsBarSellers",
        name: "Sellers",
      },
      {
        id: "topTrendsBarClients",
        name: "Clients",
      },
    ];
    var userId = localStorage.getItem("token");
    if (!userId) {
      $state.go("login");
    }
    $scope.logout = function () {
      $http
        .post("./api/logout.php", { token: userId })
        .then(function (response) {
          if (response.data.status) {
            localStorage.removeItem("token");
            alert(response.data.message);
            $state.go("login");
          }
        });
    };
    $scope.showSpinner = true;
    productCategoryService
      .fetchData()
      .then(function (data) {
        $scope.data = data;
        $scope.generatePieChart();
      })
      .finally(function () {
        $scope.showSpinner = false;
      });

    for (let i = 0; i < $scope.topTrendsParam.length; i++) {
      $scope.showSpinner = true;
      getTopTrendService
        .fetchData($scope.topTrendsParam[i].name)
        .then(function (data) {
          $scope.data = data;
          $scope.generateTopTrendsBarGraph($scope.topTrendsParam[i].id);
        })
        .finally(function () {
          $scope.showSpinner = false;
        });
    }

    $scope.generatePieChart = function () {
      let productCategoryPie = document
        .getElementById("productCategoryPie")
        .getContext("2d");

      let labels = $scope.data.map((item) => item.product_category);
      let values = $scope.data.map((item) => item.count);

      let backgroundColors =
        randomColorGenerationService.generateDistinctColors($scope.data.length);

      $scope.chartInstance = new Chart(productCategoryPie, {
        type: "pie",
        data: {
          datasets: [
            {
              data: values,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
          labels: labels,
        },
        options: {},
      });
    };

    $scope.generateTopTrendsBarGraph = function (id) {
      let topTrendsBar = document.getElementById(id).getContext("2d");
      let labels = $scope.data.map((item) => item.party_name);
      let values = $scope.data.map((item) => item.total_amount);
      let backgroundColors =
        randomColorGenerationService.generateDistinctColors($scope.data.length);
      //   console.log("Data:", $scope.data);
      //   console.log("Labels:", labels);
      //   console.log("Values:", values);

      $scope.chartInstance = new Chart(topTrendsBar, {
        type: "bar",
        data: {
          datasets: [
            {
              label: "Top Trends This Month",
              data: values,
              backgroundColor: backgroundColors,
              borderWidth: 1,
              barPercentage: 0.2,
              categoryPercentage: 0.7,
            },
          ],
          labels: labels,
        },
        options: {},
      });
    };

    $scope.showSpinner = true;
    getProductsService
      .getProducts()
      .then(function (data) {
        $scope.productsData = data;
        $scope.generateDoughnutChart();
      })
      .finally(function () {
        $scope.showSpinner = false;
      });

    $scope.generateDoughnutChart = function () {
      $scope.partyName = "";
      $scope.partyType = ["Client", "Seller"];
      $scope.selectedPartyType = "";
      $scope.partyNameErrMsg = "";
      $scope.partyTypeErrMsg = "";

      $scope.loadPartyDetails = false;
      $scope.loadPartyDetailsPromise = null;

      var products = $scope.productsData.data;
      var labels = [];
      var stockData = [];

      for (var i = 0; i < products.length; i++) {
        labels.push(products[i].product_name);
        stockData.push(products[i].stock || 0);
      }

      let backgroundColors =
        randomColorGenerationService.generateDistinctColors(
          $scope.productsData.data.length
        );

      var productDoughnut = document
        .getElementById("productDoughnut")
        .getContext("2d");

      $scope.chartInstance = new Chart(productDoughnut, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: stockData,
              backgroundColor: backgroundColors,
            },
          ],
        },
        options: {},
      });
    };
  },
]);
