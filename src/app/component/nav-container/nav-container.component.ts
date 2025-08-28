import { Component, HostBinding, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})

export class NavContainerComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  darkClass = 'dark-mode';
  lightClass = 'light-mode';
  themeState = 'Light Mode';

  username: string = '';

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.username = UserService.userName;
    this.switchTheme.valueChanges.subscribe((isDarkMode) => {
      this.className = isDarkMode ? this.darkClass : this.lightClass;

      const bodyClass = document.body.classList;
      if (isDarkMode) {
        bodyClass.add(this.darkClass);
        this.themeState = 'Dark Mode';
      } else {
        bodyClass.remove(this.darkClass);
        this.themeState = 'Light Mode';
      }
    });

    this.authService.checkIsInSession().subscribe((value: string) => {
      if (value !== 'Not logged in') this.authService.setIsLoggedIn();
      console.log(value);
    })
  }

  openLogOutDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        message: 'Are you sure you want to logout.',
        header: 'Logout Confirmation',
        action: 'logout'
      }
    });
  }
}
