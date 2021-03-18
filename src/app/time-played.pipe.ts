import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePlayed'
})
export class TimePlayedPipe implements PipeTransform {

  private zeroPad(num: number, places: number): string {
    return String(num).padStart(places, '0');
  }

  transform(text: string): string {
    let [hours, minutes, seconds] = text.split(':');
    // most games are below the hour mark, and the time strings come in 'HH:MM:SS' format
    // so to make it more readable I'll take away the hours (unless of course the game did last for at least an hour)
    if(hours == '00') {
      return `${minutes}:${seconds}`;
    }else {
      return text;
    }
  }

}
