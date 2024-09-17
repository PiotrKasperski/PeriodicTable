import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PeriodicTableComponent } from './periodic-table/periodic-table.component'
import { ElementsApiService } from './services/elements-api.service'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { connect, Subject, takeUntil } from 'rxjs'
import { ThemeService } from './services/theme.service'
import { rxState } from '@rx-angular/state'
import { PeriodicElement } from './interfaces/periodic-element'
import { state } from '@angular/animations'
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
export class AppComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>()

    elementsApi = inject(ElementsApiService)
    appStateActions = inject(AppStateActionsService)
    private state = inject(APP_RX_STATE)

    fb = inject(FormBuilder)
    themeService = inject(ThemeService)
    periodicElements$ = this.state.select('elements')
    isLoading$ = this.state.select('isLoading')

    theme = this.fb.group({ isDark: this.themeService.isDarkTheme() })

    ngOnInit(): void {
        this.appStateActions.load()
        //this.state.connect('elements', this.elementsApi.getAllElements())
        this.theme
            .get('isDark')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(isDark =>
                this.themeService.setDarkTheme(isDark ?? false)
            )
        this.periodicElements$.subscribe(e => console.log(e))
        this.isLoading$.subscribe(e => console.log(e))
    }
    ngOnDestroy(): void {
        this.destroy$.next()
    }
}
