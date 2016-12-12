

exports.start = function(req, res){
  if(req.session.currentQuiz == ''){
    var sess = req.session;
    sess.currentQuiz = req.body.selectedQuiz;
    sess.questionIndex = 0;
    sess.questionList = req.body.quizQuestions;
    sess.correctAnswers = 0;
    sess.quizTitle = req.body.quizTitle;
  }
  res.render('question', {'session': sess});
};

exports.setAnswer = function(req, res){
  var sess = req.session;
  if(sess.currentQuiz != ''){
    var correct = req.body.isCorrect;
    var currentIndex = req.body.currentIndex;
    if(currentIndex == sess.questionIndex){
      sess.questionIndex += 1;
      sess.correctAnswers += parseInt(correct,10);
      if(sess.questionIndex == sess.questionList.length){
        sess.currentQuiz = '';
        res.render('index', {});
      }
    }
    res.render('question', {'session': sess});
  } else {
    res.render('index', {});
  }
  res.render('question', {'session': sess});
};
