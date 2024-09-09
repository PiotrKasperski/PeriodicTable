import {
    ApplicationConfig,
    provideExperimentalZonelessChangeDetection,
} from '@angular/core'

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { backendInterceptor } from './interceptors/backend.interceptor'

export const appConfig: ApplicationConfig = {
    providers: [
        provideExperimentalZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([backendInterceptor])),
    ],
}
