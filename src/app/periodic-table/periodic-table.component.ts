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
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { PeriodicTableEditDialogComponent } from '../periodic-table-edit-dialog/periodic-table-edit-dialog.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, filter } from 'rxjs'

@Component({
    selector: 'app-periodic-table',
    standalone: true,
    imports: [
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './periodic-table.component.html',
    styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
    dialog = inject(MatDialog)
    fb = inject(FormBuilder)
    data = input.required<PeriodicElement[]>()
    periodicElements: WritableSignal<PeriodicElement[]> = signal([])
    displayedElements = computed(
        () => new MatTableDataSource(this.periodicElements())
    )
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    filter = this.fb.group({ value: '' })
    ngOnInit(): void {
        this.periodicElements.set(this.data())
        this.filter.valueChanges
            .pipe(debounceTime(2000))
            .subscribe(
                filter => (this.displayedElements().filter = filter.value ?? '')
            )
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
