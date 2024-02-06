using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using NewsMapAPI.Models;
using NewsMapAPI.WebScrapper.Cities;

namespace NewsMapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsMapController : ControllerBase
    {
        private readonly IMemoryCache _cache;
        private readonly Dictionary<string, ICity> _cityDictionary;
        private readonly string regionMC = "Region";

        public NewsMapController(IMemoryCache cache, Dictionary<string, ICity> cityDictionary)
        {
            _cache = cache;
            _cityDictionary = cityDictionary;
        }

        [HttpGet]
        public async Task<ActionResult<News>> GetNewsMap()
        {
            string region = _cache.Get(regionMC) as string; // always null
            _cache.Remove(regionMC);
            if (region != null && _cityDictionary.ContainsKey(region))
            {
                ICity city = _cityDictionary[region];
                return Ok(city.GetNews());
            }
            else
            {
                return BadRequest("Region not found or no news available.");
            }
        }
        [HttpPost]
        public async Task<ActionResult<NewsMap>> PostRegion([FromBody] NewsMap newsMap)
        {
            _cache.Set(regionMC, newsMap.Region);
            return Ok(newsMap);
        }

    }
}
