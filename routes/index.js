/* GET home page. */
exports.index = function(req, res){
  req.session.currentQuiz = "";
  req.session.questionIndex = -1;
  req.session.questionList = [];
  req.session.correctAnswers = 0;
  req.session.quizTitle = "";
  res.render('index', { title: 'Quiz Index'});
};
