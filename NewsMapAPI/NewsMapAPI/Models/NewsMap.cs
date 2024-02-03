using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NewsMapAPI.Models
{
   
    public class NewsMap
    {
        public string? News {  get; set; }
        public string? Region { get; set; }
    }
}
