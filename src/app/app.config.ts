import {
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core'

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { backendInterceptor } from './interceptors/backend.interceptor'
import { APP_RX_STATE, AppState } from './states/app.state'
import { RxState } from '@rx-angular/state'

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([backendInterceptor])),
        { provide: APP_RX_STATE, useFactory: () => new RxState<AppState>() },
    ],
}
