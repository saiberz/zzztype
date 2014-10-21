var app = angular.module("MyApp", ["ngResource"]);

app.controller("init",function ($scope,$resource){

    var WordAPI = $resource("http://randomword.setgetgo.com/get.php",
                            { callback: "JSON_CALLBACK" },
                            { get: { method: "JSONP" }});
    var WordsList = [];
    $scope.list  = [];
    var audioElement = document.getElementById('audio');
    var newWord = function (){
        WordAPI.get().$promise.then(
            function(data){
                WordsList.push(data.Word);
                $scope.list = WordsList;
            }
        );        
    };

    newWord();
    newWord();

    var actual = $scope.focus;
    
    $scope.Start = function() {
        $scope.focus = WordsList[0];
        actual = $scope.focus;        
        window.setInterval(function(){
            newWord();
            console.log("new word");
        }, 2000);
    
        
    };


     $scope.keypress = function(keyEvent) {         
        if(keyEvent.key == $scope.focus[0]){            
            actual = actual.substr(1,actual.length);
            if(actual.length == 2){                
                WordsList.splice(0,1);                
                actual = WordsList[0];
                $scope.focus = actual;
            }
        }
         else {
             audioElement.currentTime = 0;
             audioElement.play();
         }
        $scope.focus = actual;
    };


});
