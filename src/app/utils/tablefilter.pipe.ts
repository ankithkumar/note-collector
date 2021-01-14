import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../interface/note.interface';
import constantValues from './const';
/*
 * Orders the list of object by Name, asc or desc based on input
*/

@Pipe({
  name: 'orderStringByName'
})

export class OrderStringByNamePipe implements PipeTransform {
  transform(list: INote[], orderType: string = constantValues.ASC): INote[] {
    return list.sort((note1: INote, note2: INote) => {
      const name1 = note1.Name.toLowerCase();
      const name2 = note2.Name.toLowerCase();
      if (name1 < name2) {
        return orderType === constantValues.ASC ? 1 : -1;
      }
      if (name1 > name2) {
        return orderType === constantValues.ASC ? -1 : 1;
      }
      return 0;
    });
  }
}
