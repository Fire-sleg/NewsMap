using HtmlAgilityPack;
using NewsMapAPI.Models;

namespace NewsMapAPI.WebScrapper
{
    public class NewsZahid
    {
        public static News[] GetNewsCity(string url)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            var httpClient = new HttpClient();
            var html = httpClient.GetStringAsync(url).Result;
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            var newsDivs = new List<HtmlNode>();

            var bestNewsDiv = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='best_news section_best_news small_padding']");
            if (bestNewsDiv != null)
            {
                newsDivs.Add(bestNewsDiv);
            }

            var archiveNewsDiv = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='news-list archive-list  ']");
            if (archiveNewsDiv != null)
            {
                newsDivs.Add(archiveNewsDiv);
            }

            var newsHref = new List<HtmlNode>();
            var uniqueUrls = new HashSet<string>(); // HashSet to store unique URLs

            foreach (var div in newsDivs)
            {
                var links = div.SelectNodes(".//a[@href]"); // Select all anchor tags with href attribute under the current div
                if (links != null)
                {
                    foreach (var link in links)
                    {
                        var href = link.GetAttributeValue("href", "");
                        if (!uniqueUrls.Contains(href))
                        {
                            uniqueUrls.Add(href); // Add the URL to the HashSet if it's not already present
                            newsHref.Add(link);
                        }
                    }
                }
            }

            var news = new List<News>();
            foreach (var link in newsHref)
            {
                news.Add(DisplayNewsFromUrl(link.GetAttributeValue("href", "")));
            }

            return news.ToArray();
        }

        static News DisplayNewsFromUrl(string url)
        {
            News news = new News();

            var httpClient = new HttpClient();
            var html = httpClient.GetStringAsync(url).Result;
            var htmlDocument = new HtmlDocument();
            htmlDocument.LoadHtml(html);

            var titleElement = htmlDocument.DocumentNode.SelectSingleNode("//h1[@class='title']");
            var timeElement = htmlDocument.DocumentNode.SelectSingleNode("//time[@class='date']");
            var newsSummaryElement = htmlDocument.DocumentNode.SelectSingleNode("//div[@id='newsSummary']");
            var pNewsElements = newsSummaryElement.SelectNodes(".//p");

            news.Url = url;
            news.Title = titleElement.InnerText;
            news.Date = timeElement.GetAttributeValue("datetime", "");
            news.Content = "";
            Console.WriteLine("Content:");
            foreach (var p in pNewsElements)
            {
                news.Content += p.InnerText + "\n";
            }

            return news;
        }
    }
}
