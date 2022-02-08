app.controller("changepasswordCtrl", function ($rootScope, $scope, $http) {
  $scope.change = function () {
    if ($rootScope.student.password == $scope.oldpassword) {
      if ($rootScope.student.password == $scope.password) {
        Swal.fire({
          icon: "error",
          title: "Mật khẩu mới trùng với mật khẩu cũ!",
        });
      } else {
        var data = {
          id: $rootScope.student.id,
          username: $rootScope.student.username,
          password: $scope.password,
          fullname: $rootScope.student.fullname,
          email: $rootScope.student.email,
          gender: $rootScope.student.gender,
          birthday: $rootScope.student.birthday,
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
            Swal.fire(
              'Đổi mật khẩu thành công!',
              'You clicked the button!',
              'success'
            )
            window.location.href = "#!index";
          },
          function (error) {
            alert("Đổi mật khẩu thất bại");
          }
        );
      }
    }else{

    }
  };
});
