'use strict';
//
// var builder = {
// 	questions: [],
//
// 	setHeader: function (header) {
// 		this.headerText = header;
// 	},
//
// 	addQuestion: function(quesText, answers) {
// 		this.questions.push({
// 			text: quesText,
// 			answers: answers});
// 	},
//
// 	buildHTML: function(parentElement) {
// 		var wrapper = document.createElement('div');
// 		wrapper.classList.add('wrapper');
// 		parentElement.appendChild(wrapper);
//
// 		var header = document.createElement('h3');
// 		header.classList.add('text-center');
// 		header.innerHTML = this.headerText;
// 		wrapper.appendChild(header);
//
// 		var questions = this.questions;
//
// 		for (var i = 0; i < questions.length; i++) {
// 			var divQues = document.createElement('div');
// 			divQues.classList.add('divQues');
// 			wrapper.appendChild(divQues);
//
//
// 			var question = document.createElement('p');
// 			question.innerHTML = i + 1 + '. ' + questions[i].text;
// 			divQues.appendChild(question);
//
// 			var answers = questions[i].answers;
//
// 			for (var j = 0; j < answers.length; j++) {
// 				var chBoxContainer = document.createElement('div');
// 				chBoxContainer.classList.add('chBoxContainer');
// 				divQues.appendChild(chBoxContainer);
//
// 				var id = i + '_' + j;
//
// 				var checkbox = document.createElement('input');
// 				chBoxContainer.appendChild(checkbox);
// 				checkbox.setAttribute('type', 'checkbox');
// 				checkbox.setAttribute('id', id);
//
// 				var answer = document.createElement('label');
// 				answer.innerHTML = answers[j];
// 				chBoxContainer.appendChild(answer);
// 				answer.setAttribute('for', id);
// 			}
// 		}
//
// 		var button = document.createElement('button');
// 		button.innerHTML = 'Проверить мои результаты';
// 		wrapper.appendChild(button);
// 		button.setAttribute('type', 'button');
// 		button.classList.add('btn');
// 		button.classList.add('btn-default');
// 	}
// };
//
// var ans = ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'];
//
// builder.setHeader("Тест по программированию");
// builder.addQuestion('Вопрос №1', ans);
// builder.addQuestion('Вопрос №2', ans);
// builder.addQuestion('Вопрос №3', ans);
// builder.buildHTML(document.body);

$(function () {

	var quizData = {
        title: 'Тест по HTML/CSS',
        data: [
            {
                text: 'Что такое html?',
                answers: ['Язык супертекстовой разметки', 'Язык гипертекстовой разметки', 'Язык для создания анимаций', 'Язык для отображения товаров на сайте']
            },
            {
                text: 'Что такое css?',
                answers: ['Язык, позволяющий выполнять запросы к серверу', 'Язык для генерации html', 'Язык для создания анимаций и отображения картинок', 'Язык для описания внешнего вида документа']
            },
            {
                text: 'Для чего предназначен тег &lt;p&gt;?',
                answers: ['Абзац текста', 'Структурный элемент разметки', 'Выделение жирным текстом', 'Подчеркивает важность контента']
            }
        ]
    };

    localStorage.setItem('quiz', JSON.stringify(quizData));
    var quiz = JSON.parse(localStorage.getItem('quiz'));

	var quizHTML = tmpl('quiz', quiz);

	$('body').append(quizHTML);
});

// console.log(questions);
// console.log(quiz);



