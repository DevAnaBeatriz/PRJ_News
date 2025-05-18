import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { SafeImagePipe } from 'src/app/pipes/safe-image.pipe';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  imports: [
    TruncatePipe,
    SafeImagePipe
   ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Output() onClick = new EventEmitter<void>();

  defaultImage = 'assets/default-news.png';
  isDesktop = false;

  handleImgError(event: any) {
    event.target.src = this.defaultImage;
  }


}
