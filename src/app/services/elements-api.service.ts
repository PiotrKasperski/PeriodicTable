import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PeriodicElement } from '../interfaces/periodic-element'

@Injectable({
    providedIn: 'root',
})
export class ElementsApiService {
    http = inject(HttpClient)

    getAllElements(): Observable<PeriodicElement[]> {
        return this.http.get<PeriodicElement[]>('/elements')
    }
    updateElement(updateDto: {
        new: PeriodicElement
        old: PeriodicElement
    }): any {
        throw new Error('Method not implemented.')
    }
}
