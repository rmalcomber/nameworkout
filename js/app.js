(function () {
    var app = angular.module('nameWorkout', []);
    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(true);
    });
    app.controller('calculation', function ($scope, $http, $location) {



        //Delcare the letters array and set it to an empty array
        this.letters = [];

        //The text modal for the input text box
        this.mainText = "";

        //Capture the scope of the controller to access from functions
        var scope = this;

        //Initialise the current selected tab
        this.currentTab = 1;

        this.gymType = false;

        this.init = function () {
            //sets up initialisation for the hint.
            this.hint = this.getHint();
            this.LoadJsonData("nonGym");

            //Checks and loads name query string value to textbox
            var name = $location.search().name;
            this.mainText = (name !== undefined ? name : "");

        }

        //getActiveTab returns if the current tab is active and sets a CSS class
        //if the tab is selected
        //1 = easy
        //2 = medium
        //3 = hard
        //4 = hardcore
        this.getActiveTab = function (i) {
            return this.currentTab === i;
        }

        this.changeExerciseType = function () {
            this.gymType = !this.gymType;
            var str = this.gymType ? "gym" : "nonGym";
            this.LoadJsonData(str);
        }

        this.LoadJsonData = function (file) {
            $http.get('js/Data/' + file + '.json').success(function (data) {
                scope.listOfLetters = data;
                scope.DataLoaded = true;
                scope.onNewUpdate();
            });
        }

        //selectTab sets the currentTab to be the selected tab
        this.selectTab = function (i) {
            this.currentTab = i;
            this.onNewUpdate();
        }

        //The main hint to display
        this.hint = "";

        //getHint Gets a random hint from the array
        this.getHint = function () {
            var val = Math.floor(Math.random() * (listOfHints.length - 1));
            return listOfHints[val];
        }


        //onNewUpdate is called when the controller loops through the maintext 
        //and adds the excersise data to the letters array
        this.onNewUpdate = function () {

            if (this.DataLoaded === false) {
                return false;
            }

            var ch = this.mainText.toLowerCase().split('');
            this.letters = [];

            if (ch.length == 0) {
                this.init();
            }



            $.each(ch, function (i, v) {
                $.each(scope.listOfLetters, function (index, value) {
                    if (v == value.letter) {
                        var val = $.extend(true, {}, value);;
                        val.id = i;
                        val.unit = fixValue(value.unit);
                        val.link = encodeURI("http://www.wikihow.com/wikiHowTo?search=" + val.exercise);
                        scope.letters.push(val);
                        return false;
                    }
                });
            });
        };

        //fixValue returns the passed value multiplied by the difficulty setting
        //defined by the currentTab
        function fixValue(value) {
            var multiplyer;

            if (scope.currentTab == 1) {
                multiplyer = 1;
            }

            if (scope.currentTab == 2) {
                multiplyer = 1.5;
            }

            if (scope.currentTab == 3) {
                multiplyer = 2;
            }

            if (scope.currentTab == 4) {
                multiplyer = 3;
            }
            var retval = Math.round(value * multiplyer);

            if (retval == 0) {
                return null;
            }

            return retval;


        }

    });

    var listOfHints = [
        "Try using your email address for a challenge",
        "Using a '.' will give you a rest",
        "Bored of your name? Try a celebrity. e.g. Engelbert Humperdinck"
    ];

})();