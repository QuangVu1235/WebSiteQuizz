app.controller("loginCtrl", function ($scope, $rootScope,$http) {
  $http.get("http://localhost:3000/listStudents").then(function (response) {
    $rootScope.students = response.data;
  });

  $http.get("db/Subjects.js").then(function (response) {
    $rootScope.subjects = response.data;
  });
  $http.get("http://localhost:3000/listKQ").then(function (response) {
    $rootScope.showscore = response.data;
    console.log($rootScope.showscore);
  });
    $scope.login = function () {
        var ig = true;
        $rootScope.students.forEach((st) => {
          if (st.username == $scope.username) {
            if (st.password == $scope.password) {
              Swal.fire({
                icon: "success",
                title: "Đăng nhập thành công!",
                text: "Quay lại trang chủ!",
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1000,
              });
              $rootScope.indexStudent = st.index;
              $rootScope.student = st;
              localStorage.setItem('currentUser', JSON.stringify($rootScope.student));
              window.location.href = "#!index";
              $scope.$apply();
              ig = false;
              return;
            }
          }
        });
        if (ig == true) {
          Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất lại',
             
            })
        }
      };
});
