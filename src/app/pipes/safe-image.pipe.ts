import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeImage',
})
export class SafeImagePipe implements PipeTransform {
  transform(value: string): string {
    const defaultImage = 'assets/default-news.png';
    if (!value || value.trim() === '' || value.includes('null')) {
      return defaultImage;
    }
    return value;
  }
}
