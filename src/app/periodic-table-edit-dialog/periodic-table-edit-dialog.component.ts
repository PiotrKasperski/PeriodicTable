import { Component, inject } from '@angular/core'
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog'
import { PeriodicElement } from '../interfaces/periodic-element'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'

@Component({
    selector: 'app-periodic-table-edit-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
    templateUrl: './periodic-table-edit-dialog.component.html',
    styleUrl: './periodic-table-edit-dialog.component.scss',
})
export class PeriodicTableEditDialogComponent {
    readonly dialogRef = inject(MatDialogRef<PeriodicTableEditDialogComponent>)
    readonly data = inject<PeriodicElement>(MAT_DIALOG_DATA)
    readonly fb = inject(FormBuilder)
    element = this.fb.group({
        name: this.data.name,
        position: this.data.position,
        symbol: this.data.symbol,
        weight: this.data.weight,
    })
    submitDialog(): void {
        this.dialogRef.close({ old: this.data, new: this.element.value })
    }
}
