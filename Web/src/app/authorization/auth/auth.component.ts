import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  model = new FormGroup({});
  login = new FormControl('11', [Validators.required]);
  password = new FormControl('11', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.initialize();
    console.log(this.model);

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
    let eres = await this.authService.login({ login: 'User', password: 'user' });
    console.log(eres.login);

  }

}
