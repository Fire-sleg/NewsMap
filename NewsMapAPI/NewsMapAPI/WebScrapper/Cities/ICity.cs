using NewsMapAPI.Models;

namespace NewsMapAPI.WebScrapper.Cities
{
    public interface ICity
    {
        News[] GetNews();
    }
}
