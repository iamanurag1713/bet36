import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCompetitionsByTime',
  standalone: true
})
export class SortCompetitionsByTimePipe implements PipeTransform {
  transform(groupedGames: { [key: string]: any[] }): { key: string, value: any[] }[] {
    return Object.entries(groupedGames)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => {
        const timeA = new Date(a.value[0].opendate).getTime();
        const timeB = new Date(b.value[0].opendate).getTime();
        return timeA - timeB;
      });
  }
}
