import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class MeditationComponent implements OnInit {
  panelOpenState = false;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});
  courses = [
    { title: 'Курс 1. Начало', content: 'Начало началось с начала!', description: 'О том с чего все началось' },
    { title: 'Курс 2. Позитив', content: 'Позитив - это лучшее', description: 'Позитив как основа всего' },
    { title: 'Курс 3. Негатив', content: 'Негатив конвертировать в позитив', description: 'Негатив как часть жизни и как его интерпретировать' },
    { title: 'Курс 4. Окружение', content: 'Окружение и мировоззрение', description: 'Наше окружение - наша жизнь' }

  ]

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


}
