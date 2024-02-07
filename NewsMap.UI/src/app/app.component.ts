import { Component } from '@angular/core';
import { NewsMapService } from './services/news-map.service';
import { NewsMap } from './models/NewsMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NewsMap.UI';

  constructor(private newsMapService: NewsMapService) {}

  ngOnInit(): void {
    /* this.newsMapService.getNewsMap().subscribe((result: NewsMap) => {
      this.title = result.news as string;
    }); */
  }
}
