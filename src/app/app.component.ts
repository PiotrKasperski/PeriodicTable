import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PeriodicTableComponent } from './periodic-table/periodic-table.component'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { map, tap } from 'rxjs'
import { ThemeService } from './services/theme.service'
import { APP_RX_STATE } from './states/app.state'
import { AppStateActionsService } from './services/app-state-actions.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        PeriodicTableComponent,
        CommonModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    private appStateActions = inject(AppStateActionsService)
    private state = inject(APP_RX_STATE)
    private fb = inject(FormBuilder)
    private themeService = inject(ThemeService)
    periodicElements$ = this.state.select('elements')
    isLoading$ = this.state.select('isLoading')

    theme = this.fb.group({ isDark: this.themeService.isDarkTheme() })

    ngOnInit(): void {
        this.appStateActions.load()
        this.state.connect(
            'isDarkTheme',
            this.theme.valueChanges.pipe(
                map(value => value.isDark ?? false),
                tap(isDark => this.themeService.setDarkTheme(isDark))
            )
        )
    }
}
