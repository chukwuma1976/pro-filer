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
import { OverlayContainer } from '@angular/cdk/overlay';

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
    ReactiveFormsModule
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

  constructor(private overlay: OverlayContainer) { }

  ngOnInit() {
    this.switchTheme.valueChanges.subscribe((isDarkMode) => {
      this.className = isDarkMode ? this.darkClass : this.lightClass;

      const bodyClass = document.body.classList;
      if (isDarkMode) {
        bodyClass.add(this.darkClass);
      } else {
        bodyClass.remove(this.darkClass);
      }
    });
  }
}
