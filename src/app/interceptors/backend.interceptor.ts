import { HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { PeriodicElement } from '../interfaces/periodic-element'
import { delay, of } from 'rxjs'

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
]
export const backendInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(req)
    if (req.url === '/elements' && req.method === 'GET')
        return of(
            new HttpResponse({
                status: 200,
                body: ELEMENT_DATA,
            })
        ).pipe(delay(Math.floor(Math.random() * 1000)))
    return next(req)
}
