'use strict';

$(function () {
    var quiz = prepareQuiz();
    renderQuiz(quiz);
});

//Создать модель теста
function prepareQuiz() {
    var testData = getTestData();
    var quiz = createQuiz(testData.title);

    for (var i = 0; i < testData.data.length; i++)
    {
        var questionData = testData.data[i];
        var question = quiz.addQuestion(questionData.text);
        for(var j = 0; j < questionData.answers.length; j++) {
            question.addAnswer(questionData.answers[j], j == questionData.correctAnswer);
        }
    }
    return quiz;
}

//Прочитать данные теста из localStorage
function getTestData() {
    var quizData = {
        title: 'Тест по HTML/CSS',
        data: [
            {
                text: 'Что такое html?',
                answers: ['Язык супертекстовой разметки',
                    'Язык гипертекстовой разметки',
                    'Язык для создания анимаций',
                    'Язык для отображения товаров на сайте'],
                correctAnswer: 1
            },
            {
                text: 'Что такое css?',
                answers: ['Язык, позволяющий выполнять запросы к серверу',
                    'Язык для генерации html',
                    'Язык для создания анимаций и отображения картинок',
                    'Язык для описания внешнего вида документа'],
                correctAnswer: 3
            },
            {
                text: 'Для чего предназначен тег &lt;p&gt;?',
                answers: ['Абзац текста',
                    'Структурный элемент разметки',
                    'Выделение жирным текстом',
                    'Подчеркивает важность контента'],
                correctAnswer: 0
            }
        ]
    };

    localStorage.setItem('quiz', JSON.stringify(quizData));
    var quiz = JSON.parse(localStorage.getItem('quiz'));

    return quiz;
}

//Нарисовать тест
function renderQuiz(quiz) {
    var quizHTML = tmpl('quiz', quiz);
    $('body').append(quizHTML);

    var $button = $('.btn');
    $button.on('click', function() { checkAnswers(quiz); });
}

// Проверить правильность ответов
function checkAnswers (quiz) {
    // установить признаки выбора ответов согласно состоянию чекбокса
    var $checkBoxes = $('input');
    for (var i = 0; i < $checkBoxes.length; i++) {
        var checkBox = $checkBoxes[i];

        var questionNumber = checkBox.getAttribute('quesID');
        var answerNumber = checkBox.getAttribute('answID');
        quiz.questions[questionNumber].answers[answerNumber].setSelected(checkBox.checked);
    }

    // выполнить проверку и показать модальку
    var result = quiz.check();
    showModal(result ? 'Тест пройден успешно!' : 'Все пропало.......');
}

// Нарисовать модальку
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

// Модель теста
function createQuiz(quizTitle) {
    var questions = [];

    //добавить вопрос в тест
    function addQuestion (questionText) {
        var question = new Question(questionText);
        questions.push(question);
        return question;
    }

    // проверить правильно ли выбраны ответы на вопросы
    function check () {
        for (var i = 0; i < questions.length; i++) {
            if (!questions[i].checkChosenAnswers())
                return false;
        }
        return true;
    }

    return {
        title: quizTitle,
        questions: questions,
        addQuestion: addQuestion,
        check: check
    }
}

// Конструктор вопросов
function Question(text) {

    this.questionText = text;
    this.answers = [];

    // метод для пополнения вопроса отевтами
    this.addAnswer = function (answerText, isCorrect) {
        var answer = new Answer(answerText, isCorrect);
        this.answers.push(answer);
    };

    // метод проверки правильности выбранных ответов
    this.checkChosenAnswers = function () {
        for (var i = 0; i < this.answers.length; i++) {
            if (!this.answers[i].check())
                return false;
        }
        return true;
    };
}

// Конструктор ответов
function Answer(text, isCorrect) {

    this.text = text;
    this.isCorrect = isCorrect;
    this.isSelected = false;

    // Метод для проверки правильно ли он выбран/не выбран
    this.check = function() {
        return this.isCorrect == this.isSelected;
    };

    // Метод для управления признаком выбран/не выбран
    this.setSelected = function(selected) {
        this.isSelected = selected;
    };
}