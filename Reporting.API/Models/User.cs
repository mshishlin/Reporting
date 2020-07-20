using System;

namespace Reporting.API.Models
{
    /// <summary>
    /// Пользователь.
    /// </summary>
    [Serializable]
    public sealed class User
    {
        #region Fields

        /// <summary>
        /// Логин.
        /// </summary>
        public readonly string login;

        /// <summary>
        /// Пароль.
        /// </summary>
        public readonly string password;

        #endregion

        #region Constructor

        /// <summary>
        /// Конструктор.
        /// </summary>
        /// <param name="login">Логин.</param>
        /// <param name="password">Пароль.</param>
        public User(string login, string password)
        {
            this.login = login;
            this.password = password;
        }

        #endregion

        #region Properties

        /// <summary>
        /// Логин.
        /// </summary>
        public string Login
        {
            get { return this.login; }
        }

        /// <summary>
        /// Пароль.
        /// </summary>
        public string Password
        {
            get { return this.password; }
        }

        #endregion
    }
}
