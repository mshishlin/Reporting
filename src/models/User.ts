export default interface User {
    login: string | number | readonly string[] | undefined;
    password: string | number | readonly string[] | undefined;
}
