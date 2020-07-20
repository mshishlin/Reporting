using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Reporting.API
{
    /// <summary>
    /// Параметры аутентификации пользователя.
    /// </summary>
    internal static class AuthenticationOptions
    {
        /// <summary>
        /// Издатель Bearer-токена.
        /// </summary>
        internal const string Issuer = "ReportingRESTApi";

        /// <summary>
        /// Потребитель Bearer-токена.
        /// </summary>
        internal const string Audience = "AuthenticatedClient";

        /// <summary>
        /// Время жизни Bearer-токена в минутах.
        /// </summary>
        internal const int Lifetime = 60 * 24;

        /// <summary>
        /// Секретный ключ для шифрации Bearer-токена.
        /// </summary>
        private const string Key = "6414b5c7-05ed-498c-91af-fd4b042d43a4";

        /// <summary>
        /// Получить симметричный ключ безопасности.
        /// </summary>
        /// <returns></returns>
        internal static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
        }
    }
}
