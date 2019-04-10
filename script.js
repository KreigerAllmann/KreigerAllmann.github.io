//global variables
let currentQuestion = 0;
let score = 0; 

let questions = [
  {
    title: 'Dogs have sensitive noses. How many receptors do dogs noses have?', 
    answers: ['1 million', '50 million', '100 million', '300 million'], 
    correct: '300 million'
  },
  {
    title: 'Much like a persons fingerprint a dogs _____ is unique as well', 
    answers: ['Pawprint', 'Tongueprint', 'Noseprint', 'Earprint'], 
    correct: 'Noseprint'
  },
  {
    title: 'Dogs are not colorblind. They can see in what colors?', 
    answers: ['Infrared', 'Ultraviolet', 'Red and green', 'Yellow and blue'], 
    correct: 'Yellow and blue'
  },
  {
    title: 'How many teeth does an adult dog have', 
    answers: ['28', '34', '42', '56'], 
    correct: '34'
  },
  {
    title: 'Nearly all dogs have pink tongues except for?', 
    answers: ['Mastiff and Labrador', 'Poodle and Basenji', 'Newfoundland and Borzi', 'Chow Chow and Shar Pei'], 
    correct: 'Chow Chow and Shar Pei'
  }
];

//wait until DOM is loaded
$(document).ready(function() {
  
  //initialiaze the screens
  $(".start").show();
  $(".quiz").hide();
  $(".feedback").hide();
  $(".summary").hide();
  $(".noselected").hide();

  //event handlers
  $(".restart-button").click(function() {
   
    //reset current score
    score = 0;
    //reset current question number
    currentQuestion = 0;
    //show the start screen
    $(".start").show();
    //hide the summary screen
    $(".summary").hide();
  });


  $(".start-button").click(function(){
    
    //toggle the screens
    $(".start").hide(); 
    $(".quiz").show();

    //display question and score information
    displayQuestion();
    displayScore();
  });

  $(".submit-answer").click(function(){
    $(".quiz").hide();

   //inspects the radio button and assigns value if clicked, if not selected this will return undefined
   let answerSelected = $("input[name='answer']:checked").val();
   
   //checks if user has selected a value
   if(answerSelected) {

     //take the radio button value selected and match against correct answer
     let correctAnswerForQuestion = questions[currentQuestion].correct;
     if(answerSelected === correctAnswerForQuestion) {
       $(".feedback").show();
       $(".statement").html("Congrats. You are correct!");

       //increase the winning score by 1
       score = score + 1;

       //show updated score in html
       displayScore();
     }
     else {
       //display correct answer if user got answer wrong
       $(".feedback").show();
       $(".statement").html("I'm sorry, the correct answer is: " + correctAnswerForQuestion);
     }
   }
   else {
     //user has not selected an answer for the choices
     $(".noselected").show();
   }
});

$(".goback").click(function() {
    $(".quiz").show();
    $(".noselected").hide();
})

$(".continue").click(function(){
 
  //reached end of questions
  if(currentQuestion == questions.length -1) {
   
    $(".quiz").hide();
    $(".feedback").hide();
    $(".summary").show();
    $(".question-total").html(questions.length);

  } else if (currentQuestion < questions.length) {
    currentQuestion++;
    $(".feedback").hide();
    $(".quiz").show();
    displayQuestion();  
  } 

}); 


  


  function displayScore() {
    $(".score").html("Score: " + score);
  }
  
  function displayQuestion() {

      //show current question number
      $(".question-number").html("Question Number " + (currentQuestion+1) + " out of " + questions.length);

      //display question title in h2 header
      $(".questions").html('<h2 class="question">'+ questions[currentQuestion].title  +'</h2>');

      //calculate the number of answers for the current question
      let numberOfAnswersForThisQuestion = questions[currentQuestion].answers.length;

      let answerString = "<ul>";

      //loop through the answers for the current question and generate the html (radio buttons) - add to answer string
      for(let answerIndex = 0; answerIndex < numberOfAnswersForThisQuestion; answerIndex++) {
       
        answerString = answerString + '<li><label class="answer-choices"><input type="radio" name="answer" value='+ '"' + questions[currentQuestion].answers[answerIndex] + '"' + '/>'+questions[currentQuestion].answers[answerIndex]+'</label></li>'; 
      }  

      answerString = answerString + "</ul>";

      //after all the answers have been assined an <li> and added to answerstring, append to html
      $(".questions").append(answerString);

  };

});