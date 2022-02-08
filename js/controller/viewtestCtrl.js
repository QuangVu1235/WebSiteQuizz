app.controller('viewtestCtrl', function ($scope, $routeParams, $route, $rootScope) {
    $rootScope.subjects.forEach(Array => {
        if (Array.Id == $routeParams.id) {
            $scope.subject = angular.copy(Array);
            return;
        }
    });
  
    $scope.test = function () {
        if ($rootScope.student == null) {
            Swal.fire({
                icon: 'error',
                title: '<h5>Bạn chưa đăng nhập vui lòng đăng nhập</h5>',
            })
        } else {
            window.location.href = "#!tracnghiem/" + "?id=" + $scope.subject.Id + "&?tenMH=" + $scope.subject.Name;

        }

    }
});