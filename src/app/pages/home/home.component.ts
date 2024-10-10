import { Component, OnInit } from '@angular/core';
import quizz_questions  from 'src/assets/data/quizz_questions.json';

export interface OptionsData {
  id: number,
  name: string,
  alias: string
}
export interface QuestionData {
  id: number,
  question: string,
  options: OptionsData[],
}
export interface QuizData {
  title: string,
  questions: QuestionData[],
  results: {
    A: string,
    B: string
  }

}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public data: QuizData = quizz_questions

  public ngOnInit(): void {
    console.log(this.data)

  }

}
