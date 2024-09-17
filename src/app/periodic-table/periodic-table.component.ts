import { Component, inject } from '@angular/core'
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
    merge,
    startWith,
    Subject,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { HighlightPipe } from '../pipes/highlight.pipe'
import { CommonModule } from '@angular/common'
import { APP_RX_STATE } from '../states/app.state'
import { AppStateActionsService } from '../services/app-state-actions.service'

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
export class PeriodicTableComponent {
    private state = inject(APP_RX_STATE)
    private dialog = inject(MatDialog)
    private fb = inject(FormBuilder)
    private appStateActions = inject(AppStateActionsService)

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']
    filterForm = this.fb.group({ value: '' })

    private dialogClick$ = new Subject<PeriodicElement>()
    private dialogClose$ = this.dialogClick$.pipe(
        switchMap(element =>
            this.dialog
                .open(PeriodicTableEditDialogComponent, { data: element })
                .afterClosed()
        )
    )
    private elements$ = this.state
        .select('elements')
        .pipe(map(elements => new MatTableDataSource(elements)))

    private updatedElements$ = merge(
        this.elements$,
        this.dialogClose$.pipe(
            tap(update => {
                if (update) this.appStateActions.update(update)
            }),
            withLatestFrom(this.elements$),
            map(([_, dataSource]) => dataSource)
        )
    )

    private activeFilter$ = this.filterForm.valueChanges.pipe(
        debounceTime(2000),
        map(filter => filter.value ?? '')
    )

    displayedElements$ = combineLatest([
        this.updatedElements$,
        this.activeFilter$.pipe(startWith('')),
    ]).pipe(
        map(([dataSource, filter]) => {
            dataSource.filter = filter
            return dataSource
        })
    )

    onRowClicked(element: PeriodicElement): void {
        this.dialogClick$.next(element)
    }
}
