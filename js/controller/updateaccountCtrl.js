app.controller('updateaccountCtrl', function($rootScope, $scope,$http) {
    console.log($rootScope.student)
    $scope.update = function() {
        var data = {
            id: $rootScope.student.id,
            username: $rootScope.student.username,
            password : $rootScope.student.password,
            fullname: $scope.student.fullname,
            email: $scope.student.email,
            gender: $scope.student.gender,
            birthday: $scope.student.birthday,
            schoolfee: $rootScope.student.schoolfee,
            marks: $rootScope.student.marks,
          };
          console.log(data);
          var id = $rootScope.student.id;
  
          $http.put("http://localhost:3000/listStudents/" + data.id, data).then(
            function () {
            $rootScope.student = data;
            console.log( $rootScope.student);
            localStorage.setItem('currentUser', JSON.stringify($rootScope.student));
              var timmer = 
              Swal.fire(
                'Thông tin thành công!',
                'You clicked the button!',
                'success'
              )
              window.location.href = "#!index";
            },
            function (error) {
                Swal.fire(
                    'Đổi thông tin thất bại!',
                    'You clicked the button!',
                    'success'
                  )
            }
          );
        $rootScope.students[$rootScope.indexStudent] = angular.copy($rootScope.student);
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật thông tin cá nhân thành công!',
        });

    }
});