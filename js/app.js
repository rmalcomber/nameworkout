(function () {
    var app = angular.module('nameWorkout', []);

    app.controller('calculation', function () {

        //Delcare the letters array and set it to an empty array
        this.letters = [];

        //The text modal for the input text box
        this.mainText = "";

        //Capture the scope of the controller to access from functions
        var scope = this;

        //Initialise the current selected tab
        this.currentTab = 1;

        //init sets up initialisation for the hint.
        this.init = function () {
            this.hint = this.getHint();
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

            var ch = this.mainText.toLowerCase().split('');
            this.letters = [];

            if (ch.length == 0) {
                this.init();
            }

            $.each(ch, function (i, v) {
                $.each(listOfLetters, function (index, value) {
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

    //Object array of all letters and exercises
    var listOfLetters = [
        {
            id: 0,
            letter: 'a',
            exercise: 'Pushups',
            unit: 15,
            unitSuffix: ''
        },
        {
            letter: 'b',
            exercise: 'Jumping Jacks',
            unit: 50,
            unitSuffix: ''
        },
        {
            letter: 'c',
            exercise: 'Crunches',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'd',
            exercise: 'Burpees',
            unit: 10,
            unitSuffix: ''
        },
        {
            letter: 'e',
            exercise: 'Wall Sit',
            unit: 60,
            unitSuffix: 'Second'
        },
        {
            letter: 'f',
            exercise: 'Arm Circles',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'g',
            exercise: 'squats',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'h',
            exercise: 'Jumping Jacks',
            unit: 50,
            unitSuffix: ''
        },
        {
            letter: 'i',
            exercise: 'Plank',
            unit: 60,
            unitSuffix: 'Second'
        },
        {
            letter: 'j',
            exercise: 'Mountain Climbers',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'k',
            exercise: 'Crunches',
            unit: 40,
            unitSuffix: ''
        },
        {
            letter: 'l',
            exercise: 'Burpees',
            unit: 12,
            unitSuffix: ''
        },
        {
            letter: 'm',
            exercise: 'Squat Jumps',
            unit: 15,
            unitSuffix: ''
        },
        {
            letter: 'n',
            exercise: 'Pushups',
            unit: 10,
            unitSuffix: ''
        },
        {
            letter: 'o',
            exercise: 'lunges',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'p',
            exercise: 'Tricep Dips',
            unit: 10,
            unitSuffix: ''
        },
        {
            letter: 'q',
            exercise: 'Jumping Jacks',
            unit: 20,
            unitSuffix: ''
        },
        {
            letter: 'r',
            exercise: 'Plank',
            unit: 15,
            unitSuffix: 'Second'
        },
        {
            letter: 's',
            exercise: 'Bicycle Crunches',
            unit: 30,
            unitSuffix: ''
        },
        {
            letter: 't',
            exercise: 'Wall Sit',
            unit: 60,
            unitSuffix: 'Second'
        },
        {
            letter: 'u',
            exercise: 'High Knees',
            unit: 40,
            unitSuffix: ''
        },
        {
            letter: 'v',
            exercise: 'Squats',
            unit: 30,
            unitSuffix: ''
        },
        {
            letter: 'w',
            exercise: 'Tricep Dips',
            unit: 15,
            unitSuffix: ''
        },
        {
            letter: 'x',
            exercise: 'Mountain Climbers',
            unit: 10,
            unitSuffix: ''
        },
        {
            letter: 'y',
            exercise: 'Jumping Lunges',
            unit: 12,
            unitSuffix: ''
        },
        {
            letter: 'z',
            exercise: 'Crunches',
            unit: 30,
            unitSuffix: ''
        },
        {
            letter: ' ',
            exercise: '',
            unit: '',
            unitSuffix: ''
        },
        {
            letter: '@',
            exercise: 'Reverse Crunch',
            unit: '30',
            unitSuffix: ''
        },
        {
            letter: '.',
            exercise: 'Rest',
            unit: '10',
            unitSuffix: 'Second'
        }

    ];
    //array of hints
    var listOfHints = [
        "Try using your email address for a challenge",
        "Using a '.' will give you a rest",
        "Bored of your name? Try a celebrity. e.g. Engelbert Humperdinck"
    ];

})();
