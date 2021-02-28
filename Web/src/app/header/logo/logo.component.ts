import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent {

  constructor(public router: Router) {

  }

  navigateBack() {
    this.router.navigateByUrl('');
  }
}
