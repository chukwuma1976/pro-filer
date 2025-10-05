import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // check session immediately on app load
    this.authService.checkIsInSession().subscribe(res => {
      console.log('Session check on reload:', res);
    });
  }
}
