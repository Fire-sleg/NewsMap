import { Component, OnInit } from '@angular/core';
import { NewsMap, News } from 'src/app/models/NewsMap';
import { ActivatedRoute } from '@angular/router';
import { NewsMapService } from 'src/app/services/news-map.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  regionName = '';
  response: News[] = [];
  dataLoaded: boolean = false;

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
      this.newsMapService.getNews().subscribe((response) => {
        this.response = response as News[];
        this.dataLoaded = true;
      });
    });
  }
}
