import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsMap, News } from 'src/app/models/NewsMap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsMapService {
  constructor(private http: HttpClient) {}

  private url = 'NewsMap';
  private apiUrl = 'https://localhost:7208/api/NewsMap';

  /* public getItemShop(): FortniteApiResponse[] {
    let itemShop = new FortniteApiResponse();
    return [itemShop];
  } */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getNewsMap(): Observable<NewsMap> {
    return this.http.get<NewsMap>(
      /* this.apiUrl */ `${environment.apiUrl}/${this.url}`
    );
  }
  public getNews(): Observable<News> {
    return this.http.get<News>(
      /* this.apiUrl */ `${environment.apiUrl}/${this.url}`
    );
  }
  public postRegion(regionName: string) {
    const newsMap: NewsMap = { region: regionName };
    return this.http.post<NewsMap>(
      `${environment.apiUrl}/${this.url}`,
      newsMap,
      this.httpOptions
    );
  }
}
