import { Component, input } from '@angular/core'
import { PeriodicElement } from '../interfaces/periodic-element'
import { MatTableModule } from '@angular/material/table'

@Component({
    selector: 'app-periodic-table',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './periodic-table.component.html',
    styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    periodicElements = input.required<PeriodicElement[]>()
}
