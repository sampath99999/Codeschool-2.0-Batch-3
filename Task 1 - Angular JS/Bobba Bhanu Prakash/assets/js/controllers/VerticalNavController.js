app.controller("VerticalNavController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.navList = [
      { state: "BRO", name: "BRO" },
      { state: "additionalFunds", name: "Additional Funds" },
      { state: "resumption", name: "Reappropriation/Resumption" },
      { state: "HOAList", name: "HOA List" },
      { state: "contingency", name: "Contingency" },
      { state: "addHOA", name: "Add HOA" },
      { state: "usersMapping", name: "Users Mapping" },
      { state: "sectionUsersMapping", name: "Section Users Mapping" },
      { state: "exportReport", name: "Export Report" },
      { state: "sectionList", name: "Section List" },
      { state: "sectionsHods", name: "Sections Hods" },
      { state: "BROLogs", name: "BRO Logs" },
      { state: "userPermissions", name: "User Permissions" },
      { state: "HODsNonListing", name: "HODs Non Listing" },
      { state: "broClrMemoList", name: "BRO Clr Memo Submission List" },
    ];
  },
]);
