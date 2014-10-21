var app = angular.module("MyApp", ["ngResource"]);

app.controller("init",function ($scope,$resource){

    var WordAPI = $resource("http://randomword.setgetgo.com/get.php",
                            { callback: "JSON_CALLBACK" },
                            { get: { method: "JSONP" }});
    var WordsList = [];

    var newWord = function (){
        WordAPI.get().$promise.then(
            function(data){
                WordsList.push(data.Word);
            }
        );
    };

    newWord();
    newWord();

    var actual = $scope.focus;

    $scope.Start = function() {
        $scope.focus = WordsList[0];
        actual = $scope.focus;
    };



    $scope.keypress = function(keyEvent) {
        if(keyEvent.key == $scope.focus[0]){
            console.log(WordsList);
            actual = actual.substr(1,actual.length);
            if(actual.length == 2){
                WordsList.splice(0,1);
                newWord();
                actual = WordsList[0];
                $scope.focus = actual;
            }
        }
        $scope.focus = actual;
    };


});
