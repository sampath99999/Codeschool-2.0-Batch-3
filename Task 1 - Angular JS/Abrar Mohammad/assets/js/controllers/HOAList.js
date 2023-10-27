financeApp.controller("HOAListController", ['$scope', '$location', "$http", '$rootScope', function ($scope, $location, $http, $rootScope) {
    var access_token = localStorage.getItem("access_token");
    if (!access_token) {
        $location.path("/login")
        return
    }

    $rootScope.showLoader = true

    $scope.getLoader = function (res) {
        if (res) {
            $rootScope.showLoader = false
        } else {
            $rootScope.showLoader = true
        }
    }

    $rootScope.hoaList = []
    function getAllHoa() {
        $http({
            url: "./api/HOAList.php",
            method: "GET"
        }).then(function (response) {
            if (response.data['status']) {
                $rootScope.hoaList = response.data['data']
                $scope.getLoader(response.data['status'])
            } else {
                alert(`${response.data['message']}`)
            }
        }).catch(function (error) {
            alert(error)
        })
    }
    getAllHoa()


    $scope.headOfAccount = [
        { id: 1, name: "higher education, secretariat department" },
        { id: 2, name: "energy, secretariat department" },
        { id: 3, name: "chief electrical inspector to government,hod" },
        { id: 4, name: "technical education,hod" },
        { id: 5, name: "collegiate education,hod" },
        { id: 6, name: "archives tarnaka" },
        { id: 7, name: "intermediate education,hod" },
        { id: 8, name: "oriental manuscripts" },
        { id: 9, name: "animal husbandry,dairy development&fisheries,secretariat department" },
    ]


    $scope.hodErrMsg = ''

    $scope.validateHod = function () {
        if ($scope.hod == "" || $scope.hod == null) {
            $scope.hodErrMsg = "*Please select a value.."
            return false
        } else {
            $scope.hodErrMsg = ''
            return true
        }
    }

    $scope.budgetErrMsg = ''
    $scope.validateBudget = function () {
        if ($scope.budget == '' || $scope.budget == null) {
            $scope.budgetErrMsg = "*Please select a value.."
            return false
        } else {
            $scope.budgetErrMsg = ''
            return true
        }
    }

    $scope.schemeErrMsg = ''

    $scope.validateScheme = function () {
        if ($scope.scheme == "" || $scope.scheme == null) {
            $scope.schemeErrMsg = "*Please select a value.."
            return false
        } else {
            $scope.schemeErrMsg = ''
            return true
        }
    }
    $scope.majorHeadErrMsg = ''


    $scope.validateMajorHead = function () {

        if ($scope.majorHead == "" || $scope.majorHead == null) {
            $scope.majorHeadErrMsg = "*Major Head is a required field."
            return false
        } else {
            $scope.majorHeadErrMsg = ""
            return true
        }
    }

    $scope.validateMajorDesc = function () {
        if ($scope.majorHeadDescription == "" || $scope.majorHeadDescription == null) {
            $scope.majorDescriptionErrMsg = "*Description is a required field.."
            return false
        } else {
            $scope.majorDescriptionErrMsg = ''
            return true
        }
    }

    $scope.subMajorHeadErrMsg = ""

    $scope.validateSubMajorHead = function () {
        if ($scope.subMajorHead == "" || $scope.subMajorHead == null) {
            $scope.subMajorHeadErrMsg = "*Sub Major Head is a required field.."
            return false
        } else {
            $scope.subMajorHeadErrMsg = ''
            return true
        }
    }

    $scope.subMajorHeadDescErrMsg = ''

    $scope.validateSubMajorDesc = function () {
        if ($scope.subMajorHeadDescription == "" || $scope.subMajorHeadDescription == null) {
            $scope.subMajorHeadDescErrMsg = "*Description is a required field"
            return false
        } else {
            $scope.subMajorHeadDescErrMsg = ''
            return true
        }
    }

    $scope.minorHeadErrMsg = ''

    $scope.validateMinorHead = function () {
        if ($scope.minorHead == '' || $scope.minorHead == null) {
            $scope.minorHeadErrMsg = "*Minor Head is a required field"
            return false
        } else {
            $scope.minorHeadErrMsg = ''
            return true
        }
    }

    $scope.minorHeadDescErrMsg = ''

    $scope.validateMinorHeadDesc = function () {
        if ($scope.minorHeadDescription == '' || $scope.minorHeadDescription == null) {
            $scope.minorHeadDescErrMsg = "*Description is a required field"
            return false
        } else {
            $scope.minorHeadDescErrMsg = ''
            return true
        }
    }

    $scope.groupSubHeadErrMsg = ""

    $scope.validateGroupSubHead = function () {
        if ($scope.groupSubHead == '' || $scope.groupSubHead == null) {
            $scope.groupSubHeadErrMsg = "*Group Sub Head is a required field.";
            return false
        } else {
            $scope.groupSubHeadErrMsg = ''
            return true
        }
    }

    $scope.groupSubHeadDescErrMsg = ''

    $scope.validateGroupSubHeadDesc = function () {
        if ($scope.groupSubHeadDesc == '' || $scope.groupSubHeadDesc == null) {
            $scope.groupSubHeadDescErrMsg = "*Description is a required field.."
            return false
        } else {
            $scope.groupSubHeadDescErrMsg = ''
            return true
        }
    }
    $scope.subHeadErrMsg = ''

    $scope.validateSubHead = function () {
        if ($scope.subHead == "" || $scope.subHead == null) {
            $scope.subHeadErrMsg = "*Sub Head is a required field."
            return false
        } else {
            $scope.subHeadErrMsg = ''
            return true
        }
    }

    $scope.subHeadDescErrMsg = ''
    $scope.validateSubHeadDesc = function () {
        if ($scope.subHeadDesc == "" || $scope.subHeadDesc == null) {
            $scope.subHeadDescErrMsg = "*Description is a required field."
            return false
        } else {
            $scope.subHeadDescErrMsg = ''
            return true
        }
    }

    $scope.detailedHeadErrMsg = ''

    $scope.validateDetailedHead = function () {
        if ($scope.detailedHead == '' || $scope.detailedHead == null) {
            $scope.detailedHeadErrMsg = "*Detailed Head is a required field"
            return false
        } else {
            $scope.detailedHeadErrMsg = ''
            return true
        }
    }
    $scope.detailedHeadDescErrMsg = ''
    $scope.validateDetailedHeadDesc = function () {
        if ($scope.detailedHeadDesc == '' || $scope.detailedHeadDesc == null) {
            $scope.detailedHeadDescErrMsg = "*Description is a required field."
            return false
        } else {
            $scope.detailedHeadDescErrMsg = ''
            return true
        }
    }

    $scope.subDetailedErrMsg = ''

    $scope.validateSubDetailHead = function () {
        if ($scope.subDetailedHead == '' || $scope.subDetailedHead == null) {
            $scope.subDetailedErrMsg = "*Sub Detail is a required field."
            return false
        } else {
            $scope.subDetailedErrMsg = ''
            return true
        }
    }

    $scope.subDetailedDescErrMsg = ''

    $scope.validateSubDetailedDesc = function () {
        if ($scope.subDetailedHeadDesc == "" || $scope.subDetailedHeadDesc == null) {
            $scope.subDetailedDescErrMsg = "*Description is a required field"
            return false
        } else {
            $scope.subDetailedDescErrMsg = ''
            return true
        }
    }

    $scope.convertDate = function (date) {
        return new Date(date)
    }

    $scope.votingErrMsg = ''
    $scope.validateVoting = function () {
        if ($scope.voting == "" || $scope.voting == null) {
            $scope.votingErrMsg = "*Please select an option"
            return false
        } else {
            $scope.votingErrMsg = ''
            return true
        }
    }

    $scope.hoaId = ''

    $scope.hoaDetails = []
    $scope.getHao = function (id) {
        $http.get("./api/getHaoById.php", { params: { haoId: parseInt(id) } })
            .then(function (response) {
                if (response.data['status']) {
                    $scope.hoaDetails = response.data['data']
                    for (let each of response.data['data']) {
                        $scope.hoaId = each.id
                        $scope.hod = each.head_of_dept
                        $scope.budget = each.budget_year
                        $scope.scheme = each.estb_scheme
                        $scope.voting = each.charged_voted
                        $scope.majorHead = each.major_head_num
                        $scope.majorHeadDescription = each.major_head
                        $scope.subMajorHead = each.sub_major_head_num
                        $scope.subMajorHeadDescription = each.sub_major_head
                        $scope.minorHead = each.minor_head_num
                        $scope.minorHeadDescription = each.minor_head
                        $scope.groupSubHead = each.group_sub_head_num
                        $scope.groupSubHeadDesc = each.group_sub_head
                        $scope.subHead = each.sub_head_num
                        $scope.subHeadDesc = each.sub_head
                        $scope.detailedHead = each.detailed_head_num
                        $scope.detailedHeadDesc = each.detailed_head
                        $scope.subDetailedHead = each.sub_detailed_head_num
                        $scope.subDetailedHeadDesc = each.sub_detailed_head
                    }
                } else {
                    alert(`${response.data['message']}`)
                }
            })
    }

    $scope.amount = ''

    $scope.getDetail = function (id) {
        $http.get("./api/getHaoById.php", { params: { haoId: parseInt(id) } })
            .then(function (response) {
                if (response.data['status']) {
                    for (let each of response.data['data']) {
                        $scope.headOfAccount = each.head_of_dept
                        $scope.establishment = each.estb_scheme
                        $scope.majorHeadNumber = each.major_head_num
                        $scope.majorHeadDescription = each.major_head
                        $scope.subMajorHeadNumber = each.sub_major_head_num
                        $scope.subMajorHeadDescription = each.sub_major_head
                        $scope.minorHeadNumber = each.minor_head_num
                        $scope.minorHeadDescription = each.minor_head
                        $scope.groupSubHeadNumber = each.group_sub_head_num
                        $scope.groupSubHeadDescription = each.group_sub_head
                        $scope.subHeadNumber = each.sub_head_num
                        $scope.subHeadDescription = each.sub_head
                        $scope.detailedHeadNumber = each.detailed_head_num
                        $scope.detailedHeadDescription = each.detailed_head
                        $scope.subDetailedHeadNumber = each.sub_detailed_head_num
                        $scope.subDetailedHeadDescription = each.sub_detailed_head
                        $scope.charged = each.charged_voted
                        $scope.budgetYear = each.budget_year
                        $scope.amount = each.amount
                    }
                } else {
                    alert(`${response.data['message']}`)
                }
            })
    }

    $scope.updateHoa = function (hoaId) {
        var hoa = `${$scope.majorHead}-${$scope.subMajorHead}-${$scope.minorHead}-${$scope.groupSubHead}-${$scope.subHead}-${$scope.detailedHead}-${$scope.subDetailedHead}-NVN`
        $scope.validateBudget()
        $scope.validateDetailedHead()
        $scope.validateDetailedHeadDesc()
        $scope.validateGroupSubHead()
        $scope.validateGroupSubHeadDesc()
        $scope.validateHod()
        $scope.validateMajorDesc()
        $scope.validateMajorHead()
        $scope.validateMinorHead()
        $scope.validateMinorHeadDesc()
        $scope.validateScheme()
        $scope.validateSubDetailHead()
        $scope.validateSubDetailedDesc()
        $scope.validateSubHead()
        $scope.validateSubHeadDesc()
        $scope.validateSubMajorDesc()
        $scope.validateSubMajorHead()
        $scope.validateVoting()
        if ($scope.hodErrMsg === '' && $scope.budgetErrMsg === '' && $scope.schemeErrMsg === '' && $scope.majorHeadErrMsg === '' && $scope.majorDescriptionErrMsg === '' && $scope.subMajorHeadErrMsg === '' && $scope.subMajorHeadDescErrMsg === '' && $scope.minorHeadErrMsg === '' && $scope.minorHeadDescErrMsg === '' && $scope.groupSubHeadErrMsg === '' && $scope.groupSubHeadDescErrMsg === '' && $scope.subHeadErrMsg === '' && $scope.subHeadDescErrMsg === '' && $scope.detailedHeadErrMsg === '' && $scope.detailedHeadDescErrMsg === '' && $scope.subDetailedErrMsg === '' && $scope.subDetailedDescErrMsg === '' && $scope.votingErrMsg === '') {
            $http({
                url: "./api/updateHoa.php",
                method: "POST",
                data: { hoaNumber: hoa, headOfDept: $scope.hod, budgetYear: $scope.budget, estbScheme: $scope.scheme, majorHeadNum: $scope.majorHead, majorHead: $scope.majorHeadDescription, subMajorHeadNum: $scope.subMajorHead, subMajorHead: $scope.subMajorHeadDescription, minorHeadNum: $scope.minorHead, minorHead: $scope.minorHeadDescription, groupSubHeadNum: $scope.groupSubHead, groupSubHead: $scope.groupSubHeadDesc, subHeadNum: $scope.subHead, subHead: $scope.subHeadDesc, detailedHeadNum: $scope.detailedHead, detailedHead: $scope.detailedHeadDesc, subDetailedHeadNum: $scope.subDetailedHead, subDetailedHead: $scope.subDetailedHeadDesc, charged: $scope.voting, amount: parseInt($scope.amount), hoaId: hoaId }
            }).then(function (response) {
                if (response.data['status']) {
                    Swal.fire({
                        icon: 'success',
                        text: `${response.data['message']}`
                    })
                    for (let each in $rootScope.hoaList) {
                        if ($rootScope.hoaList[each].id == hoaId) {
                            $rootScope.hoaList[each].hoa_number = hoa
                            $rootScope.hoaList[each].head_of_dept = $scope.hod
                            $rootScope.hoaList[each].estb_scheme = $scope.scheme
                            $rootScope.hoaList[each].amount = $scope.amount
                        }
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${response.data['message']}`
                    })
                }
            }, function (error) {
                Swal.fire({
                    icon: 'error',
                    text: `${error}`
                })
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    text: `${error}`
                })
            })
            $("#exit").click()
        } else {
            alert("failed")
        }

    }
}])