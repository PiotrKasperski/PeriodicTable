import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private currentTheme: 'dark-theme' | 'light-theme'
    currentTheme$ = new Subject<'dark-theme' | 'light-theme'>()

    constructor() {
        this.currentTheme =
            (localStorage.getItem('app-theme') as
                | 'dark-theme'
                | 'light-theme') ??
            (this.isBrowserDarkTheme() ? 'dark-theme' : 'light-theme')
        this.currentTheme$.next(this.currentTheme)
    }

    private isBrowserDarkTheme() {
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    }
    isDarkTheme() {
        return this.currentTheme === 'dark-theme'
    }
    setTheme(isDark: boolean) {
        this.currentTheme = isDark ? 'dark-theme' : 'light-theme'
        localStorage.setItem('app-theme', this.currentTheme)
        this.currentTheme$.next(this.currentTheme)
    }
}
