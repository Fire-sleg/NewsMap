using NewsMapAPI.WebScrapper.Cities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    })
);
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<Dictionary<string, ICity>>(provider => InitDicCities());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();

Dictionary<string, ICity> InitDicCities()
{
    Dictionary<string, ICity> pairs = new Dictionary<string, ICity>();

    pairs.Add("UA-46", new Lviv());
    pairs.Add("UA-61", new Ternopil());

    return pairs;
}