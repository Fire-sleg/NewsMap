using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsMapAPI.Models;

namespace NewsMapAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsMapController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<NewsMap>> GetNewsMap()
        {
            return new NewsMap() { News = "news" };
        }

    }
}
