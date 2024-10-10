import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionsData, QuestionData, QuizData } from 'src/app/pages/home/home.component';

const INITIALQUESTION = {
  id: 0,
  question: '',
  options: [{
    id: 0,
    name: '',
    alias: ''
  }]
}

const INITIALDATA = {
  title: '',
  questions: [INITIALQUESTION],
  results: {
    A: '',
    B: ''
  }
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {
  @Input()
  public quizz: QuizData = INITIALDATA;

  public questionCurrent$ = new BehaviorSubject<QuestionData>(INITIALQUESTION);

  public resultMessage$ = new BehaviorSubject<string>('');

  public result$ = new BehaviorSubject({A: 0, B: 0});

  public ngOnInit(): void {
    this.startQuestions();
  }

  public startQuestions() {
    this.resultMessage$.next('');
    this.result$.next({A: 0, B: 0});

    if(this.quizz.questions.length > 1) {
      this.questionCurrent$.next(this.quizz.questions[0]);
    } else {
      this.resultMessage$.next('Quizz não encontrado ou sem perguntas.');
    }
  }

  public handleAnswers(option: OptionsData) {
    const {A, B} = this.result$.value
    const result = option.alias === 'A' ? {A: A + 1, B} : {A, B: B + 1}
    this.result$.next(result)

    this.nextQuestion();
  }

  public nextQuestion() {
    const {A, B} = this.result$.value
    const currentId = this.questionCurrent$.value.id + 1;
    const currentQuestion = this.quizz?.questions.find((question) => currentId === question.id)

    if(currentQuestion){
      this.questionCurrent$.next(currentQuestion);
    } else {
      this.questionCurrent$.next(INITIALQUESTION);
      const message = A > B ? this.quizz.results.A : this.quizz.results.B;
      this.resultMessage$.next(`Você seria um ${message}`)
    }
  }
}
