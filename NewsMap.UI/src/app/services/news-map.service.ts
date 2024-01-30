import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsMap } from 'src/app/models/NewsMap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  public getNewsMap(): Observable<NewsMap> {
    return this.http.get<NewsMap>(
      /* this.apiUrl */ `${environment.apiUrl}/${this.url}`
    );
  }
}
