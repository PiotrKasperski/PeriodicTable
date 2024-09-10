import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private currentTheme: 'dark-theme' | 'light-theme'

    constructor() {
        this.currentTheme =
            (localStorage.getItem('app-theme') as
                | 'dark-theme'
                | 'light-theme') ??
            (this.isBrowserDarkTheme() ? 'dark-theme' : 'light-theme')
        this.setBodyClass(this.isDarkTheme())
    }

    private isBrowserDarkTheme() {
        return (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    }
    private setBodyClass(isDark: boolean) {
        document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme')
        document.body.classList.add(this.currentTheme)
    }
    isDarkTheme() {
        return this.currentTheme === 'dark-theme'
    }
    setDarkTheme(isDark: boolean) {
        this.currentTheme = isDark ? 'dark-theme' : 'light-theme'
        localStorage.setItem('app-theme', this.currentTheme)
        this.setBodyClass(isDark)
    }
}
