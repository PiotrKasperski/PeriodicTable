import {
    Component,
    computed,
    inject,
    input,
    OnDestroy,
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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import {
    combineLatest,
    debounceTime,
    map,
    Observable,
    startWith,
    Subject,
    takeUntil,
} from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { HighlightPipe } from '../pipes/highlight.pipe'
import { CommonModule } from '@angular/common'
import { toObservable } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-periodic-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCardModule,
        HighlightPipe,
    ],
    templateUrl: './periodic-table.component.html',
    styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
    dialog = inject(MatDialog)
    fb = inject(FormBuilder)

    data = input.required<PeriodicElement[]>()

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    filter = this.fb.group({ value: '' })

    periodicElements: WritableSignal<MatTableDataSource<PeriodicElement>> =
        signal(new MatTableDataSource())
    activeFilter$: Observable<string> = this.filter.valueChanges.pipe(
        debounceTime(2000),
        map(filter => filter.value ?? '')
    )
    displayedElements$ = combineLatest([
        toObservable(this.periodicElements),
        this.activeFilter$.pipe(startWith('')),
    ]).pipe(
        map(([dataSource, filter]) => {
            dataSource.filter = filter
            return dataSource
        })
    )
    ngOnInit(): void {
        this.periodicElements.update(elements => {
            elements.data = this.data()
            return elements
        })
    }
    onRowClicked(element: PeriodicElement): void {
        const dialogRef = this.dialog.open(PeriodicTableEditDialogComponent, {
            data: element,
        })
        dialogRef.afterClosed().subscribe(result => {
            if (result) this.updateElements(result)
        })
    }
    private updateElements(update: {
        old: PeriodicElement
        new: PeriodicElement
    }) {
        this.periodicElements.update(elements => {
            elements.data = elements.data.map(element =>
                element === update.old ? update.new : element
            )
            return elements
        })
    }
}
