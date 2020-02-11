Survey
    .StylesManager
    .applyTheme("bootstrap");

function surveyValidateQuestion(s, options) {
    if (options.name == 'rkquestion1') {
       if(options.value == undefined) {
            options.error = "suggestion: Hermit / Sociable / Serious / Grumpy / do not know yet ";
        }
    }
     if (options.name == 'rkquestion3') {
       if(options.value == undefined) {
            options.error = "suggestion: Anna   ";
        }
    }
    if (options.name == 'rkquestion4') {
       if(options.value == undefined) {
            options.error = "suggestion: perro and reverse: errop ";
        }
    }
}

var json = {
    title: "Welcome to Quiz ZIPDEV",
    showProgressBar: "bottom",
    showTimerPanel: "bottom",
    maxTimeToFinishPage: 30,
    maxTimeToFinish: 120,
    firstPageIsStarted: true,
    startSurveyText: "Start Quiz ZIPDEV",
    pages: [{
        
        questions: [{
            type: "html",
            html: "You are about to start quiz by ZIPDEV. <br/>You have 30 seconds for every page and 25 seconds for the whole survey of 4 questions.<br/>Please click on <b>'Start Quiz'</b> button when you are ready."
        }]
    }, {
        maxTimeToFinish: 10,
        questions: [{
            type: "text",
            name: "rkquestion1",
            description: "example: Hermit / Sociable / Serious / Grumpy / do not know yet",
            title: "How do you describe yourself as a developer?",
            correctAnswer: "Hermit"
        }]
    }, {
        maxTimeToFinish: 10,
        questions: [{
            type: "radiogroup",
            name: "rkquestion2",
            title: "Select the JavaScript based technologies:'",
            choicesOrder: "random",
            choices: [
                "AngularJS", "Ember", "VueJs", "Java", "C#"
            ],
            correctAnswer: "AngularJS"
        }]
    }, {
        questions: [{
            type: "text",
            name: "rkquestion3",
            title: "Ask the user for introducing a palindrome",
        }]
    }, {
        questions: [{
            type: "multipletext",
            name: "rkquestion4",
            title: "Present two textboxes to the user, first of them asking for a sentence and the second one the same sentence in reverse",
            items: [
                {
                    name: "sentence1",
                    title: "First Sentence",
                }, {
                    name: "sentence2",
                    title: "Second Sentence in reverse text",
                }
            ]
        }]
    }],
    completedHtml: "<h4>You have answered correctly <b>{correctedAnswers}</b> questions from <b>{questionCount}</b>.</h4>"
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function(result) {
        //console.log(result)
        // console.log(result.data)
        let rkquestion1 = result.data.rkquestion1 === undefined ? "Answer not selected/Answer not given" : result.data.rkquestion1  ;
        let rkquestion2 = result.data.rkquestion2 === undefined ? "Answer not selected/Answer not given" : result.data.rkquestion2  ;
        
        let checkPalindrome=palindrome(result.data.rkquestion3);
            checkPalindrome= checkPalindrome === true ? "This is a palindrome <span class='pull-right glyphicon glyphicon-ok' aria-hidden='true'></span>" : "This is not a palindrome <span class='pull-right glyphicon glyphicon-remove' aria-hidden='true'></span>";
        
        let rkquestion3 = result.data.rkquestion3 === undefined ? "Answer not selected/Answer not given" : checkPalindrome ;
        let rkquestion4 = result.data.rkquestion4; 

        if (result.data.rkquestion4 === undefined) {
            rkquestion4 = result.data.rkquestion4 === undefined ? "Answer not selected/Answer not given" : `Reverse value is: ${reverseString(result.data.rkquestion4.sentence1)}`;

        }else{
            rkquestion4 = result.data.rkquestion4.sentence2 === undefined || result.data.rkquestion4 === undefined ? "Answer not selected/Answer not given" : `The Reverse value is: ${reverseString(result.data.rkquestion4.sentence1)}`;
            let checkReverseText =  result.data.rkquestion4.sentence2 === reverseString(result.data.rkquestion4.sentence1) ? "<span class='pull-right glyphicon glyphicon-ok' aria-hidden='true'>":"<span class='pull-right glyphicon glyphicon-remove' aria-hidden='true'>";
            rkquestion4Answ = result.data.rkquestion4.sentence2;

            rkquestion4Answ = result.data.rkquestion4.sentence2 === undefined ? "Answer not selected/Answer not given" : `Your Reverse value is: ${result.data.rkquestion4.sentence2} ${checkReverseText}`;

        }

        $('#surveyResult')
            .html(templateResult(rkquestion1, rkquestion2, rkquestion3, rkquestion4, rkquestion4Answ))
            onload()
    });
    $("#surveyElement").Survey({ model: survey, onValidateQuestion: surveyValidateQuestion });
    $(".sv_start_btn").addClass("btn-primary btn-block");
    


function templateResult(rkquestion1, rkquestion2, rkquestion3, rkquestion4, rkquestion4Answ) {
    return `
        <div class="panel panel-default">
          <div class="panel-heading">Results of Task</div>
          <div class="panel-body">
             <ul class="list-group">
                <li class="list-group-item">Anwers of Question #1: <b>${rkquestion1}</b></li>
                <li class="list-group-item">Anwers of Question #2: <b>${rkquestion2}</b></li>
                <li class="list-group-item">Anwers of Question #3: <b>${rkquestion3}</b></li>
                <li class="list-group-item reverseQ">Anwers of Question #4:
                <br />${rkquestion4} 
                <br />${rkquestion4Answ}</li>                
             </ul>
          </div>
        </div>

    `;
}

function palindrome(str) {
    if(str === undefined){
        return undefined;
    }else{
        var re = /[\W_]/g;
        var lowRegStr = str.toLowerCase().replace(re, '');
        var reverseStr = lowRegStr.split('').reverse().join('');
        return reverseStr === lowRegStr;    
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
