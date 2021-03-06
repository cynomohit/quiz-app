import React from 'react'
import $ from 'jquery'
import Question from './Question'

export default class Quiz extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        quiz: {},
        index: 0,
        answers: [],
	userAns: [],
	checked : "",
	userSelected : [],
	totalQues : 0
      }
  }

  componentDidMount() {
    $.getJSON('./data/quiz.json', function(result) {
      this.setState({quiz: result})
	this.setState({'totalQues': this.state.quiz.questions.length})
	//alert('Total Ques:---'+this.state.totalQues)
    }.bind(this))
  }

  handleNext(event) {

	let ratingNode = ""
	if(this.state.userSelected[this.state.index] != null && this.state.userSelected[this.state.index] != 'null')
	{
		ratingNode = this.state.quiz.questions[this.state.index].answers[this.state.userSelected[this.state.index]].label
		//alert('ratingNode-----'+ratingNode);
	}
	else
	{ 
		//alert('Answer Not given'); 
		this.state.userSelected.push('null');
	}

	if(this.state.userSelected.length >= 0)
	{	
		if(this.state.userSelected[this.state.index] != 'null')
		{
			//alert('inside if')
			//alert('selected length----'+this.state.userSelected.length)
			//alert('Quesindex-----'+this.state.index)
			//alert('Ansindex-----'+this.state.userSelected[this.state.index])
		
			this.state.quiz.questions[this.state.index].answers[this.state.userSelected[this.state.index]].checked = "true"
		}
	}

    	if (this.state.index < this.state.quiz.questions.length) {
     	 this.setState({'index': this.state.index + 1})
	
    	} else {
      	let score = this.state.score || 0
      	this.state.answers.map((answer, i) => (
	score = score + this.state.quiz.questions[i].answers[answer].point
      	))
      	this.setState({'score': score})
    	}

  }

  handlePrev() {

    	//alert('ansList-----'+this.state.userSelected)
   
    	let ratingNode = ""
	if(this.state.userSelected[this.state.index-1] != 'null')
	{
		ratingNode = this.state.quiz.questions[this.state.index-1].answers[this.state.userSelected[this.state.index-1]].label
		//alert('ratingNode-----'+ratingNode);
	}
	else{ 
		//alert('Answer Not given');
		this.state.userSelected.push('null');
	}
	
    	if (this.state.index < this.state.quiz.questions.length) {
      	this.setState({'index': this.state.index - 1})
	
	if(this.state.userSelected.length >= 0)
	{	if(this.state.userSelected[this.state.index-1] != 'null')
		{
			//alert('inside if')
			//alert('selected length----'+this.state.userSelected.length)
			//alert('Quesindex-----'+this.state.index-1)
			//alert('Ansindex-----'+this.state.userSelected[this.state.index-1])
			this.state.quiz.questions[this.state.index-1].answers[this.state.userSelected[this.state.index-1]].checked = "true"
		}
	}
    } 
  }

  handleFinish() {

      	//alert(this.state.index)
    	if (this.state.index < this.state.quiz.questions.length) {
     	this.setState({'index': this.state.index + 1})
	
    	} else {

      	let score = this.state.score || 0
      	this.state.answers.map((answer, i) => (
	//alert('mapAnswer------'+answer),
	//alert('mapAnswerrrr2------'+i),
        score = score + this.state.quiz.questions[i].answers[answer].point
      	))
      this.setState({'score': score})
    }
  }


  handleAnswerSelected(event) {
    this.state.userSelected = [...this.state.answers.slice(0, this.state.index),
                parseInt(event.target.value),
                ...this.state.answers.slice(this.state.index + 1)]
    this.setState({'answers': this.state.userSelected})
	//alert('ansList-----'+this.state.userSelected);
	//alert('ansList31-----'+this.state.answers);
  }
	
   myFunction(event) {
	alert(parseInt(event.target.value))
	
   }


  render() {

    const {
      quiz, index, answers, userAns
    } = this.state

    let completed = (quiz.questions && (index === quiz.questions.length)) ? true : false
    let numberOfQuestions = quiz.questions ? quiz.questions.length : 0
    let score = 0
	
    var hidefinish = "";
    var hideprev = "";
    var hidenext = "";
    var type = "hidden";
    var cls = "button";
    var read = "true";
	
    let exactIndex = index + 1	
	if(index === 0)
	{
		hideprev = true
		hidenext = false
		hidefinish = true
	}

	else if(exactIndex === numberOfQuestions)
	{
		hidenext = true
		hideprev = false
		hidefinish = false
	}
	
	else if(index  < this.state.quiz.questions.length && index  > 0)
	{
		hidenext = false
		hideprev = false
		hidefinish = true
	}

	if (completed) {
      		this.state.answers.map((answer, i) => (
		//alert('mapAnswer------'+answer),
		//alert('mapAnswerrrr2------'+i),
		(answer === 'null' 	
			? ('') :
        		(score = score + this.state.quiz.questions[i].answers[answer].point,
			this.state.userAns.push(this.state.quiz.questions[i].answers[answer].label)
			) 
		)
      		))
    	   }


    return (
      <div>
        <h1>{quiz.title}</h1>
        {completed ? (
	<div>
            <p>Congratulations, you have completed the quiz.</p>
	    <p>	Your score is {score}</p>
	    <p>	*Please fill the below form.</p>
		<form action="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST" id="webToLead">
		
		<input type={type} name="oid" value="00D28000000Kwkp"/>
		<input type={type} name="retURL" value="cynoteck.com/demoApp/thankYou.html"/>
		<table>

		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr>
		<td><label for="first_name">First Name</label></td>
		<td>:&nbsp;&nbsp;</td>
		<td><input id="first_name" maxlength="40" name="first_name" size="20" type="text" required="required"/></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr>
		<td><label for="last_name">Last Name</label></td>
		<td>:&nbsp;&nbsp;</td>
		<td><input  id="last_name" maxlength="80" name="last_name" size="20" type="text" required="required"/></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr>
		<td><label for="mobile">Mobile</label></td>
		<td>:&nbsp;&nbsp;</td>
		<td><input  id="mobile" maxlength="40" name="mobile" size="20" type="text" /></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr>
		<td><label for="email">Email</label></td>
		<td>:&nbsp;&nbsp;</td>
		<td><input  id="email" maxlength="80" name="email" size="20" type="text" required="required"/></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr>
		<td><label for="company">Company</label></td>
		<td>:&nbsp;&nbsp;</td>
		<td><input  id="company" maxlength="40" name="company" size="20" type="text" required="required"/></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>

		<tr>
		<td><label >User Answers</label></td>
		<td>:</td>
		<td><textarea  id="00N2800000J9Duo" name="00N2800000J9Duo" rows="5" type="text" wrap="soft" value={userAns}></textarea>
		<br/></td>
		</tr>

		<tr><td>&nbsp;&nbsp;<br/></td></tr>

		<tr>
		<td><label >Score Obtained</label></td>
		<td>:</td>
		<td><input ref="scoreobt" id="00N2800000J8uRW" name="00N2800000J8uRW" size="20" type="text" readonly={read} value={score}/>
		<br/></td>
		</tr>
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		
		<tr><td>&nbsp;&nbsp;<br/></td></tr>
		
		</table>
		<input class={cls} type="submit" name="submit"/>
		 </form>
	</div> )
        : (
	<div>
          <h2>Question {index + 1} of {numberOfQuestions}</h2>
          {quiz.questions && index < numberOfQuestions ?
            <Question
              question={quiz.questions[index]}
              index={index}
              onAnswerSelected={(event) => this.handleAnswerSelected(event)}
              onNext={() => this.handleNext()}
	      onPrev={() => this.handlePrev()}
	      onFinish={() => this.handleFinish()}
	      hfinish = {hidefinish}
	      hprev = {hideprev}
	      hnext = {hidenext}
	      totalQues = {this.state.totalQues}
	      
            />  : ''}
          </div>
	  )
        }
      </div>
    )
  }
}
