import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'highlight',
    standalone: true,
    pure: false,
})
export class HighlightPipe implements PipeTransform {
    transform(value: string, filter: string | undefined | null): string {
        return !filter
            ? value
            : value.replace(new RegExp(`(${filter})`, 'gi'), '<mark>$1</mark>')
    }
}
