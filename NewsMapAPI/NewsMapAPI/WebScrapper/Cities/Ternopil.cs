using NewsMapAPI.Models;

namespace NewsMapAPI.WebScrapper.Cities
{
    public class Ternopil : ICity
    {
        public News[] GetNews()
        {
            return NewsZahid.GetNewsCity("https://zaxid.net/novini_ternopolya_ternopil_tag51474/");
        }
    }
}
