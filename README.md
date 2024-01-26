# Websites online helper based on redux-toolkit, rtk-query, react-hook-form, with automatic renewal jwt, Service Worker with WebSocket supply on client side.

## To run dev

- before starting the program, make sure that you have installed lerna
```sh
npm i -g lerna@6.5.1
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
REACT_APP_SERVER_ADDR='localhost'   // потом надо заменить на YouServerName.com
REACT_APP_SERVER_PORT='5002'
REACT_APP_SERVER_PROTO='http'       // потом надо заменить на 'https'
REACT_APP_NGINX_REVERSE_PROXY='no'  // после запуска NGINX меняем на 'yes'
```
> где:  `MDB_SERVER` - адрес сервера MongoDB, `MDB_DATABASE` - имя базы данных на этом сервере

- запустите все в режиме разработки
```sh
npm run dev
```
- подключитесь к [панели управления](http://localhost:3000)

## To run prod

- populate `.env` with Your values

- в каталоге программы выполните команды
```sh
npm run build-webadmin
npm run build-webpanel
npm run build-tebutton
```

- install `pm2`
```sh
npm install pm2@latest -g
```

- launch server
```sh
pm2 --name tebox --log tebox.log start npm -- start

pm2 startup
pm2 save
```

- подключитесь к `http://YourServerName.com:5002` (или к `https://YourServerName.com`, если настроен reverse-proxy)

- Sign Up

- add `YourControlledWebsiteName.com` into Your profile

- copy `KEY` of `YourControlledWebsiteName.com`

- add `tebutton` web-component to Your controlled website
```html
<!DOCTYPE html>
<html>
    <head>
        ...
        <script type="module" src="http://YourServerName.com:5002/dist/tebutton.esm.js"></script>
    </head>
    <body>
        ...
        <te-button
            url="http://YourServerName.com:5002/client"
            host_key="KEY of YourControlledWebsiteName">
        </te-button>
    </body>
</html>
```
- если добавили NGINX как reverse-proxy, то добавляем кнопку на сайт так:
```html
<!DOCTYPE html>
<html>
    <head>
        ...
        <script type="module" src="http://YourServerName.com/dist/tebutton.esm.js"></script>
    </head>
    <body>
        ...
        <te-button
            url="http://YourServerName.com/client"
            host_key="KEY of YourControlledWebsiteName">
        </te-button>
    </body>
</html>
```

## NGINX reverse-proxy config
```sh
server {
    server_name YouServerName.com;
    root /var/www/YouServerName.com;
    index  index.php index.html index.htm;

    error_log /var/log/nginx/YouServerName.com_error.log;
    access_log /var/log/nginx/YouServerName.com_access.log;

    client_max_body_size 100M;

    # add reverse proxy definition
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YouServerName.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YouServerName.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YouServerName.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    listen [::]:80;

    server_name YouServerName.com;
    return 404; # managed by Certbot

    location / {
        try_files $uri $uri/ /index.php?$args;
    }
}
```
- после запуска NGINX к серверу можно подключаться как https://YouServerName.com


### Tebox administration screen

<img src="./packages/assets/images/webadmin1.jpg" alt="webadmin1" />

<img src="./packages/assets/images/webadmin2.gif" alt="webadmin2" />
