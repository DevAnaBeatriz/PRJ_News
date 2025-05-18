import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { TruncatePipe } from '../pipes/truncate.pipe';

import { HomePageRoutingModule } from './home-routing.module';
import { NewsCardComponent } from '../components/news-card/news-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TruncatePipe,
    NewsCardComponent,
  ],
  declarations: [
    HomePage, 
    ]
})
export class HomePageModule {}
