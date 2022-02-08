
var app = angular.module("myApp", ["ngRoute", "ngAnimate",'firebase']);

app.run(function ($rootScope, $http, $timeout) {
  
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

  $rootScope.student=[];
  $rootScope.student = JSON.parse(localStorage.getItem('currentUser'));

  $rootScope.logoff = function () {
    $rootScope.currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = "#!index";
  };
});
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/index", {
      templateUrl: "view/trangchu.html",
      controller: "indexCtrl",
    })
    .when("/gioithieu", {
      templateUrl: "view/gioithieu.html",
    })
    .when("/lienhe", {
      templateUrl: "view/lienhe.html",
    })
    .when("/gopy", {
      templateUrl: "view/gopy.html",
    })
    .when("/hoidap", {
      templateUrl: "view/hoidap.html",
    })
    .when("/login", {
      templateUrl: "view/login.html",
    })
    .when("/create", {
      templateUrl: "view/register.html",
      controller: "registerCtrl",
    })
    .when("/repass", {
      templateUrl: "view/forgotpassword.html",
      controller: "forgotpasswordCtrl",
    })
    .when("/updateaccount", {
      templateUrl: "view/updateaccount.html",
      controller: "updateaccountCtrl",
    })
    .when("/changepassword", {
      templateUrl: "view/changepassword.html",
      controller: "changepasswordCtrl",
    })
    .when("/viewtest/:id?/:tenMH?", {
      templateUrl: "view/viewtest.html",
      // controller: "viewtestCtrl",
    })
    .when("/tracnghiem/:id?/:tenMH?", {
      templateUrl: "view/tracnghiem.html",
      controller: "testCtrl",
    })
    .when("/showscore", {
      templateUrl: "view/showscore.html",
      controller: "showScore",
    })
    .otherwise({ redirectTo: "/index" });
});

app.controller("indexCtrl", function ($scope, $rootScope) {
  $rootScope.student=[];
  $rootScope.student = JSON.parse(localStorage.getItem('currentUser'));
  $scope.cout = 0;
    
  $scope.pageCount = Math.ceil($rootScope.subjects.length / 6);
  $scope.prev = function () {
    if ($scope.cout > 0) {
      $scope.cout -= 6;
    }
  }
  $scope.next = function () {
    if ($scope.cout < ($scope.pageCount - 1) * 6) {
      $scope.cout += 6;
    }
  }
  // }
 });
app.controller(
  "testCtrl",
  function ($scope, $interval, $http, $routeParams, $rootScope, quizfactory) {
    $rootScope.subjects.forEach((ar) => {
      if (ar.Id == $routeParams.id) {
        $rootScope.subject = angular.copy(ar);
        return;
      }
    });
    $http.get("database/" + $routeParams.id + ".js").then(function (response) {
      quizfactory.questions = response.data;
    });
  

    

  }
  

);
app.directive("quiz", function (quizfactory, $routeParams, $interval, $rootScope, $http) {

  return {
    restrict: "AE",
    scope: {},
    templateUrl: "quizz1.html",
    link: function (scope, elem, attrs) {
      scope.start = function () {
        scope.sjname = $routeParams.tenMH;

        scope.id = 1;
        scope.quizend = false;
        scope.inProgess = true;
        scope.getQuestions();
        scope.startTime();
      };
      scope.reset = function () {
        scope.inProgess = false;
        scope.score = 0;
      };
      scope.reset();

      scope.end = function () {
        Swal.fire({
          title: "Bạn có chắc không?",
          text: "Bạn thật sự muốn kết thúc bài thi!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Có",
          cancelButtonText: "Không",
        }).then((result) => {
          if (result.value) {
            scope.timer = 3;
            scope.hide = true;
            Swal.fire({
              title: "Kết thúc bài thi",
              text: "Bài thi sẽ kết thúc sau 3 giây",
              icon: "success",
              showConfirmButton: false,
              closeOnClickOutside: false,
              allowOutsideClick: false,
              timer: 3000,
            });
          }
        });
      };

      scope.getQuestions = function () {
        var q = quizfactory.getQuestions(scope.id);
        scope.answerMode = true;
        if (q) {
          scope.Id = q.Id;
          scope.question = q.Text;
          scope.options = q.Answers;
          scope.answer = q.AnswerId;

        } else {
          scope.quizend = true;
        }
        quizfactory.questions.forEach((ar) => {
          if (ar.Id == scope.Id) {
            scope.Idques.push(angular.copy(ar));
            return;
          }
        });
        scope.options.forEach((ar) => {
          if (ar.Id == scope.answer) {
            scope.dapan.push(angular.copy(ar));
            return;
          }
        });
      };

      scope.nextQuestion = function () {
        if (scope.id < 10) {
          scope.id++;
          scope.index++;
          scope.getQuestions();

        }
      };
      scope.preQuestion = function () {
        if (scope.id > 1) {
          scope.id--;
        }
      };
      scope.optionsmoi = [];
      scope.index = 0;
      scope.Idques = [];
      scope.dapan = [];

      scope.checkAnswer = function () {
        Swal.fire({
          title: 'Bạn đã chắc chắn với đáp án? ',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Có',
          cancelButtonText: 'Không!!',
          timer: 2000
        }).then((result) => {
          if (result.isConfirmed) {

            if (!$("input[name = answer]:checked").length) return;
            var ans = $("input[name = answer]:checked").val();

            if (ans == scope.answer) {
              scope.options.forEach((ar) => {
                if (ar.Id == ans) {
                  scope.optionsmoi.push(angular.copy(ar));
                  return;
                }
              });
              scope.score++;
              scope.correctAns = true;
            } else {
              scope.options.forEach((ar) => {
                if (ar.Id == ans) {
                  scope.optionsmoi.push(angular.copy(ar)); // kết quả chọn
                  return;
                }
              });
            }
            scope.answerMode = false;

          }
        })
      };

      scope.SaveAnswer = function () {
        var data = {
          username: $rootScope.student.username,
          fullname: $rootScope.student.fullname,
          name: $rootScope.subject.Name,
          score: scope.score
        }
        $http.post("http://localhost:3000/listKQ", data).then(function (res) {
       
          Swal.fire(
            'Lưu thành công!',
            'You clicked the button!',
            'success'
          )
          window.location.href = "#!index";

        }, function (error) {
          alert("fail")
        })
      };
      function getms(duration) {
        var minutes = parseInt(duration / 60, 10);
        var seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return {
          minutes: minutes,
          seconds: seconds,
        };
      }
      var time;
      scope.timer = {};
      scope.timer.value = 60 * 15;
      scope.startTime = function () {
        function countdown() {
          var ms = getms(scope.timer.value);
          scope.timer.minutes = ms.minutes;
          scope.timer.seconds = ms.seconds;

          if (--scope.timer.value < 0) {
            scope.timer = 0;
            scope.hide = true;
            Swal.fire("Bạn đã hết thời gian làm bài");
          }
        }
        countdown();
        time = $interval(function () {
          countdown();
        }, 1000);
      };
      scope.stoptime = function () {
        $interval.cancel(time);
      };

      scope.hide = false;
    },
  };
});
app.factory("quizfactory", function ($http, $routeParams) {
  $http.get("database/" + $routeParams.id + ".js").then(function (response) {
    questions = response.data;
    // alert(questions.length)
  });
  return {
    getQuestions: function (id) {
      // return questions[id];

      var random = questions[Math.floor(Math.random() * questions.length)];
      var count = questions.length;
      if (count > 10) {
        count = 10;
      }
      if (id < count) {
        return random;
      } else {
        false;
      }
    },
  };
});


app.directive('rePass', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, mCtrl) {
      function rePas(value) {
        var pass = scope.password;
        if (pass == value) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(rePas);
    }
  }
});
app.directive('fee', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, mCtrl) {
      function Sfee(value) {
        var pass = parseInt(value)
        if (pass >= 2000000) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(Sfee);
    }
  }
});
