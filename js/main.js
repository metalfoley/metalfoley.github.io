$(document).ready(function() {
"use strict";

    //POSTERS//

    function Poster(censored, uncensored, answerOne, answerTwo, answerThree, correctAnswer, answers) {
        this.censored = censored;
        this.uncensored = uncensored;
        this.answerOne = answerOne;
        this.answerTwo = answerTwo;
        this.answerThree = answerThree;
        this.correctAnswer = correctAnswer;
        this.answers = [answerOne, answerTwo, answerThree, correctAnswer];
        this.randomAnswers = shuffle(this.answers);
    }
    var posterOne = new Poster("gonebabygone_c", "gonebabygone_u", "Mystic River", "Eastern Promises", "The Town", "Gone Baby Gone");
    var posterTwo = new Poster("oculus_c", "oculus_u","Sinister", "Insidious", "The Conjuring", "Oculus");
    var posterThree = new Poster("drive_c", "drive_u", "Rush", "Bronson", "Blue Valentine", "Drive");
    var posterFour = new Poster("zodiac_c","zodiac_u", "The Game", "Panic Room", "Source Code", "Zodiac");
    var posterFive = new Poster("silverliningsplaybook_c","silverliningsplaybook_u", "Friends With Benefits", "Crazy Stupid Love", "American Hustle", "Silver Linings Playbook");
    var posterSix = new Poster("darkknight_c","darkknight_u", "Inception", "The Prestige", "Batman Begins", "The Dark Knight");
    var posterSeven = new Poster("fightclub_c","fightclub_u", "Pulp Fiction", "Seven", "Snatch", "Fight Club");
    var posterEight = new Poster("elephantman_c","elephantman_u", "Eraserhead", "The Deer Hunter", "Blue Velvet", "The Elephant Man");
    var posterNine = new Poster("dune_c","dune_u", "Stargate", "The Fifth Element", "Contact", "Dune");
    var posterTen = new Poster("yougotmail_c","yougotmail_u", "Sleepless in Seattle", "Pretty Woman", "Runaway Bride", "You've Got Mail");


////////////////VARIABLES/////////////////
    var $next = $("#next-button");
    var randomImage;
    var $img = $("#posterImg");
    var $gameWrapper = $(".gamewrapper");

    //Keep Score starting with zero.
    var score = 0;

    //Empty and Used Arrays
    var unusedImages = [posterOne, posterTwo, posterThree, posterFour, posterFive, posterSix, posterSeven, posterEight, posterNine, posterTen];
    var usedImages = [];

    $next.hide();

    function createAnswers() {
        var i, $update, $options, answerText;
        for (i = 0; i < 4; i++) {
            $update = $(".answers p")[i];
            $options = $(".answers-mobile option")[i+1];
            answerText = document.createTextNode(randomImage.randomAnswers[i]);

            //Set initial answers
            if (usedImages.length === 0) {
                if($(".answers-mobile").css("display") != "block") {
                    $update.appendChild(answerText);
                }
                else {
                    $options.appendChild(answerText);
                }
            }
            //Update answers
            else {
                if($(".answers-mobile").css("display") != "block") {
                    $update.childNodes[1].nodeValue = randomImage.randomAnswers[i];
                }
                else {
                    $options.childNodes[0].nodeValue = randomImage.randomAnswers[i];
                }
            }
        }
    }


    function nextImage() {
        $next.velocity("fadeOut", { duration: 250 });
        $(".answers p > span").removeClass();
        $('.answers-mobile').prop('selectedIndex',0);

        //Find Random Image Src from unusedImages Array
        (function() {
            var pullRandom = Math.floor(Math.random() * unusedImages.length);
            randomImage = unusedImages[pullRandom];
            return randomImage;
        }());

        //See if current image has already been used
        //Image has not been used, so make current image the new src and push it into the usedImages array
        if (usedImages.indexOf(randomImage) == -1) {
            $img.attr("src", "img/" + randomImage.censored + ".png").attr("alt", randomImage.correctAnswer);
            createAnswers();
            usedImages.push(randomImage);
        }
        //End of game.
        else if (usedImages.length == 10) {
            var $ending = $("#endinfo");
            var $playAgain = $("#play-again");
            var endVarSentence;
            // var $endText = $("#end-text");
            var $endInfo = '<p id="end-text"></p>';
            $endInfo += '<div class="score"><p class="add" id="add">Score: <span>0</span>/10</p></div>';
            $endInfo += '<div id="play-again"><a href="#">Play Again?</a></div>';
            $ending.html($endInfo);
            switch(score) {
                case 0:
                    endVarSentence = "What you just scored is one of the most insanely idiotic things I have ever seen. Everyone in this room is now dumber for having seen to it. May God have mercy on your soul.";
                    break;
                case 1:
                    endVarSentence = "1 point? I fart in your general direction! Your mother was a hamster and your father smelt of elderberries!";
                    break;
                case 2:
                    endVarSentence = "Good score? We don't need no stinkin' good scores!";
                    break;
                case 3:
                    endVarSentence = "Say hello to my little score!";
                    break;
                case 4:
                    endVarSentence = "Scores is a box of chocolates. You never know what you're gonna get.";
                    break;
                case 5:
                    endVarSentence = "Just when I think you couldn't possibly be any dumber, you go and score somethin' like this -- and totally redeem yourself! Ha Ha!";
                    break;
                case 6:
                    endVarSentence = "This one time at band camp I scored a 6 out of 10";
                    break;
                case 7:
                    endVarSentence = "I achieved this score with some fava beans and a nice chianti.";
                    break;
                case 8:
                    endVarSentence = "In case I don't see ya, good afternoon, good evening, and good score!";
                    break;
                case 9:
                    endVarSentence = "Do, or do not. There is no try";
                    break;
                default:
                    endVarSentence = "If scoring perfect is cool, consider me Miles Davis!";
            }
            // $endText.text(endVarSentence);
            $gameWrapper.velocity("fadeOut", { duration: 500 });
            $ending.velocity("fadeIn", { duration: 500 });
            $playAgain.on('click', function() {
                window.location.reload();
            });
            $('#add span').text(score);
            var $endText = $("#end-text");
            $endText.text(endVarSentence);
        }
        //Image has been used, so find another random image
        else {
            nextImage();
        }
    }
    nextImage();


    function checkIfCorrect() {
        var $answerColor = $(this).children();
        var $guess = $(this).text().substring(1);
        var $guessMobile = $(".answers-mobile option:selected").text();
        if ($guess == randomImage.correctAnswer || $guessMobile == randomImage.correctAnswer) {
            $answerColor.addClass("correct");
            score++;
            $('.add span').text(score);
        }
        else {
            $answerColor.addClass("wrong");
        }
        $next.velocity("fadeIn", { duration: 250 });
        $img.attr("src", "img/" + randomImage.uncensored + ".png").attr("alt", randomImage.correctAnswer);
        return score;
    }



    //**
    ////////////////BUTTONS///////////////////
    //**

    //Check if answer is correct
    $(".answers p").on('click', checkIfCorrect);
    //Check if correct for mobile
    $(".container").on('change', '.answers-mobile', checkIfCorrect);
    //Go to Next Image
    $next.on('click', nextImage);
    //Restart Game
    // $playAgain.on('click', function() {
    //     window.location.reload();
    // });

});

// $('#humansTxt').foundation('reveal', 'open', 'humans.txt');
