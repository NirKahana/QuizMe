<h1>Welcome to QuizMe!</h1>

This system is destined to offer quick quizes to cyber4s students, and display their results to themselves, and to the instructors.

<h2>DataBase requirements:</h2>
  
<h3>Create an ERD by the following instructions:</h3>
<strong>Tables:</strong>
<div>
  <strong><em>users:</em></strong> id(number), name(string), isadmin(boolean)
</div>
<div>
  <strong><em>quizes:</em></strong> id(number), name(string)
</div>
<div>
  <strong><em>submissions:</em></strong> id(number), user_id(number), quiz_id(number)
</div>
<div>
  <strong><em>labels:</em></strong> id(number), name(string)
</div>
<div>
  <strong><em>quiz_labels:</em></strong> id(number), quiz_id(number), label_id(number)
</div>
<div>
  <strong><em>questions:</em></strong> id(number), title(string), quiz_id(number)
</div>
<div>
  <strong><em>fields:</em></strong> id(number), title(string), question_id(number)
</div>
<br></br>
<h2>Server Requirements</h2>
<br></br>
<strong>Entry Points:</strong>
<br></br>

<div>- getAllQuizes</div>
<div>- getSubmissionsOfQuiz/:id</div>
<div>- getQuestionsOfQuiz/:id</div>
<div>- getFieldsOfQuestion/:id</div>
<br></br>
<div>- getAllUsers</div>
<div>- getSubmissionsOfUser/:id</div>
<br></br>

<h2>Front-End Requirements:</h2>
<br></br>
<div>
<strong>Login Page</strong>
</div>
<div>
<strong>Sign-Up Page</strong>
</div>
<div>
<strong>Landing Page:</strong>
Header, "take a Quiz":
<div>
-Quiz number 1
</div>
<div>
-Quiz number 2
</div>
<div>
-Quiz number 3
</div>
<div>
-Quiz number 3
</div>
</div>
