using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsMapAPI.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace NewsMapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsMapController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<NewsMap>> GetNewsMap()
        {
            return Ok(new NewsMap() { News = "news", Region = "the best region" });
        }
        [HttpPost]
        public async Task<ActionResult<NewsMap>> PostRegion([FromBody] NewsMap newsMap)
        {
            // Логіка обробки даних тут
            return Ok(newsMap);
        }

    }
}
