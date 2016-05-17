angular.module('rockPaperScissors')
.controller('baseCtrl', function($scope, $interval){
  var tock;

  $scope.restart = function(){
    $scope.minutes = 0;
    $scope.seconds = 0;
    $scope.won = 0;
    $scope.tied = 0;
    $scope.lost = 0;
    $scope.playing = false;
    $interval.cancel(tock);
    $scope.userSelection = "./images/blank.png";
    $scope.compSelection = "./images/blank.png";
  };
  $scope.restart();

  $scope.play = function(){
    $scope.playing = true;
    tick();
    tock = $interval(tick, 1000);
    $scope.$on('$destroy', function() { $interval.cancel(tock); } );
  };
  $scope.pause = function() {
    $scope.playing = false;
    $interval.cancel(tock);
  };

  function tick(){
    $scope.seconds--;
    if($scope.minutes === 0)
     if($scope.seconds === 9) alert("10 seconds remaining");
     else if($scope.seconds === 0) endGame();
    if($scope.seconds < 0){
      $scope.minutes--;
      $scope.seconds = 59;
    }
  }

  function endGame(){
    if($scope.won > $scope.lost) alert("Congratulations. You won!!");
    else if($scope.won === $scope.lost) alert("TIED");
    else alert("Sorry, but you lost this time...");
    $scope.restart();
  }

  $scope.throw = function(choice){
    if($scope.playing){
      switch(choice){
        case 1: $scope.userSelection = "/./images/Rock1.png"; break;
        case 2: $scope.userSelection = "/./images/Paper1.png"; break;
        case 3: $scope.userSelection = "/./images/Scissors1.png"; break;
        case 4: $scope.userSelection = "/./images/Lizard1.png"; break;
        case 5: $scope.userSelection = "/./images/Spock1.png"; break;
      }

      var comp = $scope.theory ? Math.ceil(Math.random()*5) : Math.ceil(Math.random()*3);

      switch(comp){
        case 1: $scope.compSelection = "/./images/Rock2.png"; break;
        case 2: $scope.compSelection = "/./images/Paper2.png"; break;
        case 3: $scope.compSelection = "/./images/Scissors2.png"; break;
        case 4: $scope.compSelection = "/./images/Lizard2.png"; break;
        case 5: $scope.compSelection = "/./images/Spock2.png"; break;
      }


      if(choice === comp) $scope.tied++;
      else switch(choice){
        case 1:
          (comp === 3 || comp === 4) ? $scope.won++ : $scope.lost++; break;
        case 2:
          (comp === 1 || comp === 5) ? $scope.won++ : $scope.lost++; break;
        case 3:
          (comp === 2 || comp === 4) ? $scope.won++ : $scope.lost++; break;
        case 4:
          (comp === 2 || comp === 5) ? $scope.won++ : $scope.lost++; break;
        case 5:
          (comp === 1 || comp === 3) ? $scope.won++ : $scope.lost++; break;
      }
    }
  };

});
