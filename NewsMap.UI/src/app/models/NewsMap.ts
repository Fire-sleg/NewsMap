export class NewsMap {
  news?: string;
  region?: string;
}

export class News {
  title?: string;
  date?: string;
  url?: string;
  content?: string;

  constructor(title?: string, date?: string, url?: string, content?: string) {
    this.title = title;
    this.date = date;
    this.url = url;
    this.content = content;
  }
}
