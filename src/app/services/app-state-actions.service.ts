import { inject, Injectable } from '@angular/core'
import { APP_RX_STATE } from '../states/app.state'
import { rxActions } from '@rx-angular/state/actions'
import { PeriodicElement } from '../interfaces/periodic-element'
import { elementAt, exhaustMap, map, Subject, switchMap, tap } from 'rxjs'
import { ElementsApiService } from './elements-api.service'
import { state } from '@angular/animations'

@Injectable({
    providedIn: 'root',
})
export class AppStateActionsService {
    private state = inject(APP_RX_STATE)
    private elementsApi = inject(ElementsApiService)
    private actions = rxActions<{
        load: void
        update: { old: PeriodicElement; new: PeriodicElement }
    }>()

    private loadEffect = this.actions.onLoad(
        load$ =>
            load$.pipe(
                tap(() =>
                    this.state.set(
                        'isLoading',
                        state => (state.isLoading = true)
                    )
                ),
                exhaustMap(() => this.elementsApi.getAllElements())
            ),
        elements => {
            this.state.set('elements', state => (state.elements = elements))
            this.state.set('isLoading', state => (state.isLoading = false))
        }
    )
    private updateEffect = this.actions.onUpdate(update$ =>
        update$.pipe(
            tap(updateDto =>
                this.state.set(
                    'elements',
                    state =>
                        (state.elements = state.elements.map(element =>
                            element === updateDto.old ? updateDto.new : element
                        ))
                )
            )
        )
    )

    constructor() {}
    load() {
        this.actions.load()
    }
    update(updateDto: { old: PeriodicElement; new: PeriodicElement }) {
        this.actions.update(updateDto)
    }
}
