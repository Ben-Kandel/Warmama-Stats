import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePlayed'
})
export class TimePlayedPipe implements PipeTransform {

  private zeroPad(num: number, places: number): string {
    return String(num).padStart(places, '0');
  }

  transform(text: number): string {
    let minutes:number = text / 60;
    let seconds = text % 60;
    return `${Math.floor(minutes)}:${this.zeroPad(Math.floor(seconds), 2)}`;
  }

}
