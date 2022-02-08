app.controller('forgotpasswordCtrl', function($rootScope, $scope) {
    
    $scope.getPass = function() {
        var ck = true;
        $rootScope.students.forEach(st => {
           
            if (st.email == $scope.email && st.username == $scope.username) {
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "vupqps11565@fpt.edu.vn",
                    Password: "smjdaxxbrehpkghr",
                    To: st.email,
                    From: "OnlineTraining@fpt.edu.vn",
                    Subject: "Reset Password",
                    Body: "Chào: " + "<b> " +  st.email + "</b>" + "<br>Đây là mật khẩu mới của bạn: " + "<b>" + st.password + "</b>"
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Lấy lại tài khoản thành công!',
                    text: 'Mật khẩu: ' + st.password,
                });
                ck = false;
                return;
            }
        });
        if (ck) {
            Swal.fire({
                icon: 'error',
                title: 'Lấy lại tài khoản thất bại!',
                text: 'Vui lòng nhập lại thông tin',
            });
        }
    }

});