import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})

export class QuestionsComponent implements OnInit{
  
  public name:any;
  // this question list has all the questions available in json file
  public questionList:any;
  public currentquestion:number=0;
  public points:number = 0;
  counter = 60;
  // to count the number of correct answers
  correctanswer:number=0;
  incorrectanswer:number=0;
  interval$:any; 
  progress:string='0';
  isquizcompleted:boolean=false;
  // interval is for clock timing
 
  // whenever we use service we should include in the parameter.

  constructor(private questionservice:QuestionService){


  }
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    // yes data is getting but how can we view for this we use to display the data.
    this.getAllQuestions();
    this.startcounter();

  }


  getAllQuestions(){
    // here we have called questionjson() form service
    this.questionservice.getquestionjson()
    .subscribe(res => {
      // console.log(res);
      // this.questionList = res.questions;
      // console.log(this.questionList)
      // console.log(this.currentquestion)
      this.questionList=res.questions;
    });
  }



  // for previous and next question
  nextquestion(){
    this.currentquestion++;

  }

  previousquestion(){
    this.currentquestion--;

  }

  // what's the question number and what's the option?
  answer(currentQno:number,option:any){

    if(currentQno === this.questionList.length){
      this.isquizcompleted = true;
      this.stopcounter();
        }
    // giving if condition if the option of specific question is correct then the users points will increase 10
    if(option.correct){
      this.points+=10;
      // if the answer is correct then the question is next
      this.correctanswer++;
       // after incrementing the points it should go to the next question for this incrementing the question

       setTimeout(()=>{
        this.currentquestion++;
     
      
        this.resetcounter();
             
         // we need to call this function because to increase the progress bar status, not only if an person is giving correct answer 
        // the progress bar should increase it will also increase by false answer also
       this.getprogresspercentage();

       },1000)


     

    }
    else{
      setTimeout(() => {
         // even if the option is incorrect then the current question will increase
      this.currentquestion++;
      // as well giving the incorrectanswer property for increasing the value
      this.incorrectanswer++;
      // calling this function for increasing the progress bar status even if the answer is wrong.
      this.resetcounter();

      this.getprogresspercentage();
        
      }, 1000);
     
     
       // else condition is given if the option is false then the points will decrease
       this.points-=10;

    }

  }

// this is for timer for the timing of an question to be completed
  startcounter(){
      // Using the RxJS interval function to create an observable that emits values every 1000 milliseconds (1 second)

    this.interval$ = interval(1000)
     // Subscribing to the observable to receive the emitted values

    .subscribe(val=>{
     // Decrementing the counter by 1 each time the observable emits a value (every second)

      this.counter--;
      if(this.counter === 0){
        this.currentquestion++;
        this.counter=60;
                // Updating the points (assuming it's a quiz or game) with a penalty of -10 points

        this.points=-10;
      }
    });
    // using the predefined method which works if the time is out
    setTimeout(()=>
    {
      this.interval$.unsubscribe();

    },600000)


  }

  // stopcounter  dfor stopping the counter
  stopcounter(){
    this.interval$.unsubscribe();
    this.counter=0;

  }

  // reset the counter
  resetcounter(){
    // to reset the counter again calling the stopcounter
    this.stopcounter();
    // tehn resetting the counter value to 60
    this.startcounter();
    this.counter=60;

  }


  // for reset the whole quia it will start again

  resetquiz(){
    this.startcounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentquestion=0;
    this.progress="0";

  }


  // initially the progress bar will become 0 so to increase the percentage regarding to the question I need to create an function for this.
  getprogresspercentage(){
    this.progress=((this.currentquestion/this.questionList.length)*100).toString();
    return this.progress;
  }




}
