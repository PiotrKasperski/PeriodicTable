import {
    Component,
    HostBinding,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PeriodicTableComponent } from './periodic-table/periodic-table.component'
import { ElementsApiService } from './services/elements-api.service'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Subject, takeUntil } from 'rxjs'
import { ThemeService } from './services/theme.service'

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

    fb = inject(FormBuilder)
    themeService = inject(ThemeService)
    periodicElements$ = inject(ElementsApiService).getAllElements()

    theme = this.fb.group({ isDark: this.themeService.isDarkTheme() })

    ngOnInit(): void {
        this.theme
            .get('isDark')
            ?.valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(isDark =>
                this.themeService.setDarkTheme(isDark ?? false)
            )
    }
    ngOnDestroy(): void {
        this.destroy$.next()
    }
}
