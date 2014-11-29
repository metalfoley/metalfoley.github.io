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
    var $playAgain = $("#play-again");
    var randomImage;
    var $img = $("#posterImg");
    var $gameWrapper = $(".gamewrapper");

    //Keep Score starting with zero.
    var score = 0;
    // score= 0;

    //Empty and Used Arrays
    var unusedImages = [posterOne, posterTwo, posterThree, posterFour, posterFive, posterSix, posterSeven, posterEight, posterNine, posterTen];
    var usedImages = [];

    $next.hide();

    function createAnswers() {
        var i, $update, answerText;
        for (i = 0; i < 4; i++) {
            $update = $(".answers p")[i];
            answerText = document.createTextNode(randomImage.randomAnswers[i]);

            //Set answers and then update nodes afterwards
            if (usedImages.length === 0) {
                $update.appendChild(answerText);
            }
            // else if($.contains($update, $update.childNodes[2])) {
            //     $update[i].childNodes[2].nodeValue = "";
            //     $update.childNodes[1].nodeValue = randomImage.randomAnswers[i];
            // }
            else {
                $update.childNodes[1].nodeValue = randomImage.randomAnswers[i];
            }
        }
    }


    function nextImage() {
        $next.velocity("fadeOut", { duration: 250 });
        $playAgain.hide();
        $(".answers p > span").removeClass();

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
            $gameWrapper.velocity("fadeOut", { duration: 500 });
            $next.velocity("fadeOut", { duration: 500 });
            $playAgain.velocity("fadeIn", { duration: 500 });
            // for (var i=0; i<4; i++) { $(".answers p")[i].childNodes[1].nodeValue = ""; }
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
        if ($guess == randomImage.correctAnswer) {
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
    //Go to Next Image
    $next.on('click', nextImage);
    //Restart Game
    // $playAgain.on('click', function() {
    //     usedImages = [];
    //     $playAgain.velocity("fadeOut", { duration: 500 });
    //     $gameWrapper.velocity("fadeIn", { duration: 500 });
    //     score = 0;
    //     $('.add span').text(0);
    //     nextImage();
    // });
    $playAgain.on('click', function() {
        window.location.reload();
    });

});

// $('#humansTxt').foundation('reveal', 'open', 'humans.txt');
