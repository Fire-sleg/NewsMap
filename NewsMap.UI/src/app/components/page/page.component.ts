import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsMapService } from 'src/app/services/news-map.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  regionName = '';

  constructor(
    private newsMapService: NewsMapService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //debugger;
    this.route.params.subscribe((params) => {
      console.log(params);
      this.regionName = params['id'];
    });

    this.newsMapService.postRegion(this.regionName).subscribe((response) => {
      // Обробка відповіді від сервера, якщо потрібно
    });
  }
}
