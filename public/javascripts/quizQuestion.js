StaticConfiguration = new (function() {
  var data = {}
  this.setVariable = function(key, value) {
    if(typeof data[key] == 'undefined') {
      data[key] = value;
      $('#loadbar').show();
      $('#quiz').fadeOut();
      $.ajax({
        url: "http://localhost:8080/tomcat/rs/question/check/"+questionList[questionIndex],
        data: "", //ur data to be sent to server
        headers: {
          Accept: "application/json"
        },
        type: "GET",
        success: function (ans) {
          setTimeout(function(){
            $('#quiz').children().each(function(index) {
              if($(this).find('input:radio').val() == ans){
                $(this).removeClass('btn-default');
                $(this).addClass('btn-success');
                $(this).find('text').append('<strong> (Correct Answer) </strong>')
              } else if($(this).find('input:radio').val() == value) {
                $(this).removeClass('btn-default');
                $(this).addClass('btn-danger');
                $(this).find('text').append('<strong> (Your Answer) </strong>')
              }
              $(this).addClass('disabled');
            });
          }, 1000);
          setTimeout(function(){
            var ansText, btText = "Next Question";
            if (value == ans) {
              ansText = "<strong>CORRECT</strong> &nbsp;&nbsp; Current Mark: "+
              (correctAnswers+1)+
              " out of "+
              (questionIndex+1)+
              " &nbsp;&nbsp; ";
            } else {
              ansText = "<strong>INCORRECT</strong> &nbsp;&nbsp; Current Mark: "+
              (correctAnswers)+
              " out of "+
              (questionIndex+1)+
              " &nbsp;&nbsp; ";
            }
            if(questionIndex == questionList.length - 1){
              ansText += "Congratulations! You had finished this test  &nbsp;&nbsp; ";
              btText = "Quiz Index";
            }
            $( "#answer" ).html(ansText);
            $('.modal-footer').append(
              '<input type="submit" name="submit" class="btn btn-default" value="'+btText+'" />'
            );
            $('#quiz').show();
            $('#loadbar').fadeOut();
            /* something else */
          }, 1500);
          data["isCorrect"] = (value == ans)? 1 : 0;
        },
        error: function (x, y, z) {
          alert(x.responseText +"  " +x.status);
        }
      });
    }
    else {
      // Maybe a little error handling too...
      throw new Error("You can't resend your answer!");
    }
  };
  this.getVariable = function(key) {
    if (typeof data[key] == 'undefined') {
      // Maybe a little error handling too...
      throw new Error("Can't get static variable that isn't defined!");
    }
    else {
      return data[key];
    }
  };
})();

$(function(){
  var loading = $('#loadbar').hide();

  function selectAnswer() {
    StaticConfiguration.setVariable('choice', $(this).find('input:radio').val());
  }

  $.ajax({
    url: "http://localhost:8080/tomcat/rs/question/get/"+questionList[questionIndex],
    data: "", //ur data to be sent to server
    headers: {
      Accept: "application/json"
    },
    type: "GET",
    success: function (question) {
      var questionsLeft='';
      if(questionIndex != questionList.length - 1){
        questionsLeft = ' ('+(questionList.length - (questionIndex +1))+' question/s left)';
      } else {
        questionsLeft = ' (Last question)';
      }
      $('#headerTitle').append(questionsLeft);
      $('#questionTitle').text("  "+question.question);
      question.answers.forEach(function(answer, index) {
        var nextElement = $('<label class="element-animation1 btn btn-lg btn-primary btn-block"><span class="btn-label" style="line-height:60px;">'+String.fromCharCode(97 + index)+')</span> <input type="radio" name="q_answer" value="'+answer.seqNo+'"><text>'+answer.answer+'</text></label>');
        nextElement.click(selectAnswer);
        $('#quiz').append(nextElement);
      });
    },
    error: function (x, y, z) {
      alert(x.responseText +"  " +x.status);
    }
  });
});

function validateAnswer(){
  $('.modal-footer').append(
    '<input type="hidden" name="isCorrect" value="'+StaticConfiguration.getVariable("isCorrect")+'" />'
  );
  $('.modal-footer').append(
    '<input type="hidden" name="currentIndex" value="'+questionIndex+'" />'
  );
}
