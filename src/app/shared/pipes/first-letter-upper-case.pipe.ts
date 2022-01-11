import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: `firstLetterUpperCase`
})
export class FirstLetterUpperCasePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 0) {
      return null;
    }

    return value[0].toUpperCase() + value.substring(1);
  }

}
