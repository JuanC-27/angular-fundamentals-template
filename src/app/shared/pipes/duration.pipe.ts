import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || value < 0) {
      return '00:00 hours';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    const hourText = hours === 1 ? 'hour' : 'hours';

    return `${hoursStr}:${minutesStr} ${hourText}`;
  }
}
