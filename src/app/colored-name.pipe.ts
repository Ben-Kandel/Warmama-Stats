import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coloredName'
})
export class ColoredNamePipe implements PipeTransform {


  private colors = {
    '^0' : 'black',
    '^1' : 'red',
    '^2' : 'green',
    '^3' : 'yellow',
    '^4' : 'blue',
    '^5' : 'cyan',
    '^6' : 'pink',
    '^7' : 'white',
    '^8' : 'orange',
    '^9' : 'gray'
  };

  transform(text: string){

    let answer = "";

    let colorText = (colorCode, text) => {
      answer += `<span class="${this.colors[colorCode]} coloredname">${text}</span>`;
    };

    let pattern = /\^[0-9]/g;
    let match;
    let matches = [];
    while((match = pattern.exec(text)) != null) {
      matches.push(match.index);
    }

    let prevColor = '^7';
    let prevIndex = 0;
    let result: string;

    matches.forEach(element => {
      let color = text.charAt(element) + text.charAt(element + 1);

      result = text.slice(prevIndex, element);
      colorText(prevColor, result);
      
      prevIndex = element+2;
      prevColor = color;
    });

    result = text.slice(prevIndex);
    colorText(prevColor, result);
    return answer;

  }

}
