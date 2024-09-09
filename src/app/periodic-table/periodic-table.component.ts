import {
    Component,
    computed,
    inject,
    input,
    OnInit,
    signal,
    WritableSignal,
} from '@angular/core'
import { PeriodicElement } from '../interfaces/periodic-element'
import { MatTableModule } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { PeriodicTableEditDialogComponent } from '../periodic-table-edit-dialog/periodic-table-edit-dialog.component'

@Component({
    selector: 'app-periodic-table',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './periodic-table.component.html',
    styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
    data = input.required<PeriodicElement[]>()
    periodicElements: WritableSignal<PeriodicElement[]> = signal([])
    displayedElements = computed(() =>
        this.periodicElements().filter(element => true)
    )
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    dialog = inject(MatDialog)
    ngOnInit(): void {
        this.periodicElements.set(this.data())
    }
    onRowClicked(element: PeriodicElement): void {
        const dialogRef = this.dialog.open(PeriodicTableEditDialogComponent, {
            data: element,
        })
        dialogRef.afterClosed().subscribe(result => {
            this.periodicElements.update(elements =>
                elements.map(element =>
                    element === result.old ? result.new : element
                )
            )
        })
    }
}
