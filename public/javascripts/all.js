var quizzes;
$(function(){

  $(".dropdown-menu").on('click', 'li a', function(){
    $(".btn:first-child").text($(this).text()+" ");
    $(".btn:first-child").append("<span class='caret'></span>");
    $('#selectedQuiz').val($(this).attr("data-value"));
    $('#qList').empty();
    quizzes.filter(el => el._id == $(this).attr("data-value"))[0]
    .questions.forEach(function(q, index){
      $('#qList').append(
        '<input type="hidden" name="quizQuestions['+index+']" value="'+q+'" />'
      );
    });
    $('#quizTitle').val($(this).text());
    $('#startQuiz').removeClass('disabled');
    $('#startQuiz').addClass('btn-success');
  });

});

function addQuizOption(data){
  quizzes = data;
  quizzes.forEach(function(quiz, index){
    $('.dropdown-menu').append(
      '<li><a href="#" data-value="'+quiz._id+'">'+quiz.title+'</a></li>'
    );
  });
}
