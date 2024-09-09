import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PeriodicTableComponent } from './periodic-table/periodic-table.component'
import { ElementsApiService } from './services/elements-api.service'
import { CommonModule } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        PeriodicTableComponent,
        CommonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    elementsApi = inject(ElementsApiService)
    periodicElements$ = this.elementsApi.getAllElements()
}
