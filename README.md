# Websites online helper based on redux-toolkit, rtk-query, react-hook-form, with automatic renewal jwt, Service Worker with WebSocket supply on client side.

## To run

- before starting the program, make sure that you have installed lerna
```sh
npm i -g lerna
```
- в каталоге программы выполните команды
```sh
npm run install
```
- создайте файл `.env` в корне проекта
```
ACCESS_JWT_SECRET='jwtAccessSecretKey'
ACCESS_JWT_LIFETIME='5m'
REFRESH_JWT_SECRET='jwtRefreshSecretKey'
REFRESH_JWT_LIFETIME='10d'
MDB_SERVER='localhost'
MDB_DATABASE='database'
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="YourMail@gmail.com"
SMTP_PASS="YourPassKey"
REACT_APP_SERVER_ADDR='localhost'
REACT_APP_SERVER_PORT='5000'
REACT_APP_SERVER_PROTO='http'
```
> где:  `MDB_SERVER` - адрес сервера MongoDB, `MDB_DATABASE` - имя базы данных на этом сервере

- запустите все в режиме разработки
```sh
npm run dev
```
- подключитесь к [приложению](http://localhost:3000)
