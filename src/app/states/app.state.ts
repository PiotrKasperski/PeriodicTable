import { InjectionToken } from '@angular/core'
import { PeriodicElement } from '../interfaces/periodic-element'
import { RxState } from '@rx-angular/state'

export interface AppState {
    elements: PeriodicElement[]
    isLoading: Boolean
    isDarkTheme: Boolean
}
export const APP_RX_STATE = new InjectionToken<RxState<AppState>>(
    'APP_RX_STATE'
)
