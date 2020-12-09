import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent {
  title = 'Web';
  constructor(private router: Router) {

  }

  toMeditation() {
    this.router.navigateByUrl('meditation');
  }

  toPsy() {
    this.router.navigateByUrl('psy');
  }

  toFinish() {
    this.router.navigateByUrl('finish');
  }
}
