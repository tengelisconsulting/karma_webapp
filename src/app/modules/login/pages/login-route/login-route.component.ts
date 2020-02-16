import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css']
})
export class LoginRouteComponent implements OnInit {

  public usernameFC: FormControl = new FormControl("");
  public passwordFC: FormControl = new FormControl("");

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  public login(): void {
    this.authService.authenticate(
      this.usernameFC.value,
      this.passwordFC.value
    );
  }

}
