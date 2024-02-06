using NewsMapAPI.Models;

namespace NewsMapAPI.WebScrapper.Cities
{
    public class Lviv : ICity
    {
        public News[] GetNews()
        {
            return NewsZahid.GetNewsCity("https://zaxid.net/novini_lvova_tag50956/");
        }
    }
}
