using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Reporting.API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace Reporting.API.Controllers
{
    /// <summary>
    /// Контроллер, отвечающий за аутентификацию пользователя.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public sealed class AuthenticationController : ControllerBase
    {
        /// <summary>
        /// Фейковые пользователи.
        /// </summary>
        private readonly User[] fakeUsers = new[]
        {
            new User("test1", "123"),
            new User("test2", "345"),
        };

        [HttpPost]
        public IActionResult Authenticate([FromBody] Account account)
        {
            var user = this.fakeUsers.SingleOrDefault(u => u.login == account.Login && u.password == account.Password);
            if (user == null)
            {
                return BadRequest("Invalid username or password");
            }

            var userClaimsIdentity = this.GetClaimsIdentity(user);
            var encodedJwtSecurityToken = this.CreateEncodedJwtSecurityToken(userClaimsIdentity);

            var response = new
            {
                access_token = encodedJwtSecurityToken,
                username = userClaimsIdentity.Name
            };

            return Ok(response);
        }

        
        [HttpGet]
        [Authorize]
        public IActionResult IsUserLoggedIn()
        {
            return Ok();
        }

        /// <summary>
        /// Получить объект, представляющий данные о пользователе.
        /// </summary>
        /// <param name="user">Пользователь.</param>
        /// <returns></returns>
        private ClaimsIdentity GetClaimsIdentity(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
            };

            return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
        } 

        /// <summary>
        /// Получить токен, зашифрованный в виде строки.
        /// </summary>
        /// <param name="claimsIdentity">Данные о пользователе.</param>
        /// <returns></returns>
        private string CreateEncodedJwtSecurityToken(ClaimsIdentity claimsIdentity)
        {
            var notBeforeDate = DateTime.UtcNow;
            var expiresDate = notBeforeDate.Add(TimeSpan.FromMinutes(AuthenticationOptions.Lifetime));

            var jwt = new JwtSecurityToken(
                issuer: AuthenticationOptions.Issuer,
                audience: AuthenticationOptions.Audience,
                notBefore: notBeforeDate,
                claims: claimsIdentity.Claims,
                expires: expiresDate,
                signingCredentials: new SigningCredentials(AuthenticationOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
