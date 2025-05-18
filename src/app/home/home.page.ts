import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  news: any[] = [];

  constructor(
    private newsService: NewsService, 
    private iab: InAppBrowser,
    private platform: Platform
  ) {}

  loading = true;
  loading_busca = true;
  selectedUrl: string | null = null;
  selectedCategory = 'all';
  searchTerm = '';

  ngOnInit() {
    this.fetchNews();
  }


  openArticle(url: string) {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      this.iab.create(url, '_blank', {
        location: 'yes',
        toolbar: 'yes',
        toolbarposition: 'top',
        closebuttoncaption: 'Fechar',
        hideurlbar: 'yes',
        zoom: 'no',
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'yes',
        clearsessioncache: 'yes',
        shouldPauseOnSuspend: 'yes',
        disallowoverscroll: 'yes'
      });
    } else {
      window.open(url, '_blank');
    }
  }

  fetchNews() {
    if (this.searchTerm) {
      this.newsService.searchNews(this.searchTerm).subscribe((data) => {
        this.news = data.articles;
        this.loading_busca = false;
      });
    } else {
      this.newsService.getTopHeadlines(this.selectedCategory).subscribe((data) => {
        this.news = data.articles;
        this.loading = false;
        this.loading_busca = false;
      });
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.searchTerm = ''; 
    this.fetchNews();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    if (this.searchTerm.length > 2) {
      this.fetchNews();
    }
  }
}

