import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isRegister = false;
  model = new FormGroup({});
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.initialize();
  }

  ngOnInit(): void {
  }

  initialize() {
    this.model = this.formBuilder.group({
      login: this.login,
      password: this.password
    })
  }

  async auth() {
    if (this.isRegister) {
      await this.authService.register({ login: this.model.controls.login.value, password: this.model.controls.password.value });
    } else {
      await this.authService.login({ login: this.model.controls.login.value, password: this.model.controls.password.value });
    }

  }

  changeWindow() {
    this.isRegister = !this.isRegister;
  }

}
