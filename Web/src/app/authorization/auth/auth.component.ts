import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserShort } from 'src/app/shared/model/user-short.model';
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
    const user = new UserShort({
      login: this.model.controls.login.value,
      password: this.model.controls.password.value,
    })
    
    if (this.isRegister) {
      await this.authService.register(user);
    } else {
      await this.authService.login(user);
    }

  }

  changeWindow() {
    this.isRegister = !this.isRegister;
  }

}
