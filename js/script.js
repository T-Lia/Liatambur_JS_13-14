'use strict';

$(function () {

    var quizData = {
        title: 'Тест по HTML/CSS',
        data: [
            {
                text: 'Что такое html?',
                answers: ['Язык супертекстовой разметки', 'Язык гипертекстовой разметки', 'Язык для создания анимаций', 'Язык для отображения товаров на сайте'],
                correctAnswer: 1
            },
            {
                text: 'Что такое css?',
                answers: ['Язык, позволяющий выполнять запросы к серверу', 'Язык для генерации html', 'Язык для создания анимаций и отображения картинок', 'Язык для описания внешнего вида документа'],
                correctAnswer: 3
            },
            {
                text: 'Для чего предназначен тег &lt;p&gt;?',
                answers: ['Абзац текста', 'Структурный элемент разметки', 'Выделение жирным текстом', 'Подчеркивает важность контента'],
                correctAnswer: 0
            }
        ]
    };

    localStorage.setItem('quiz', JSON.stringify(quizData));
    var quiz = JSON.parse(localStorage.getItem('quiz'));

	var quizHTML = tmpl('quiz', quiz);

	$('body').append(quizHTML);


    function checkAnswers () {

        var userAnswers = getUserAnswers();
        var correctAnswers = getCorrectAnswers();

        var result = compareAnswers(userAnswers, correctAnswers);
        showModal(result ? 'Тест пройден успешно!' : 'Все пропало.......');
    };

    function getUserAnswers () {
        var $checkBoxs = $('input');
        var userAnswers = [];

        for ( var i = 0; i < $checkBoxs.length; i++) {
            var checkBox = $checkBoxs[i];
            if (checkBox.checked)
                userAnswers.push(
                    {
                        ques: checkBox.getAttribute('quesID'),
                        ans: checkBox.getAttribute('answID')
                    }
                );
        }
        return userAnswers;
    }

    function getCorrectAnswers() {
        var correctAnswers = [];

        for (var j = 0; j < quiz.data.length; j++) {
            correctAnswers.push(
                {
                    ques: j,
                    ans: quiz.data[j].correctAnswer
                }
            );
        }
        return correctAnswers;
    }

    function compareAnswers(actualAns, expectedAns) {
        if (actualAns.length != expectedAns.length)
            return false;

        for ( var i = 0; i < actualAns.length; i++) {
            if (actualAns[i].ques != expectedAns[i].ques || actualAns[i].ans != expectedAns[i].ans)
                return false;
        }
        return true;
    };

    function createModal() {

    };


    function showModal (message) {

        var $modal = $('<div>').addClass('modal-window');
        $('body').append($modal);

        var $modalHeader = $('<h3>').addClass('modal-window_header').text('Результаты теста');
        var $modalText = $('<p>').addClass('modal-window_text').text(message);
        var $button = $('<button>').addClass('btn btn-default').text('OK');
        $('.modal-window').append($modalHeader).append($modalText).append($button);

        var $overlay = $('<div>').addClass('overlay');
        $('body').append($overlay);



        $button.on('click', function () {
            $modal.remove();
            $overlay.remove();

            $('input[type=checkbox]').prop('checked',false);

        });
    };

    var $button = $('.btn');
    $button.on('click', checkAnswers);

});







