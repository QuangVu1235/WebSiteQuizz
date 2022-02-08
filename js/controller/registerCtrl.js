app.controller('registerCtrl', function($rootScope, $scope, $http) {
    $scope.register = function() {
        var data = {
            username: $scope.username,
            password: $scope.password,
            fullname: $scope.fullname,
            email: $scope.email,
            gender: $scope.gender,
            birthday: $scope.birthday,
            schoolfee:$scope.schoolfee,
            marks: $scope.marks
           
          }
          $http.post("http://localhost:3000/listStudents",data).then(function(res){
            Swal.fire(
              'Đăng kí thành công!',
              'You clicked the button!',
              'success'
            );
            window.location.href = "#!index";
          },function(error) {
              
          })
        // $scope.studentR = {};
        $scope.repassword = '';
        // $rootScope.students.push(angular.copy($scope.studentR));
        
        
    }
});