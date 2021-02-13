# Chat

![Snapshot from the app](frontend/public/app_recording.gif "Snapshot from the app")

Inspiration for the project comes from [Dribbble](https://dribbble.com/shots/2177157-Desktop-Chat-App/ "Dribbble")

## Usage

If you want to use the application on the server, see the [documentation](https://beyondco.de/docs/laravel-websockets/faq/deploying "documentation")

#### Backend

Create an .env file from the example file and do a basic Laravel configuration. Then assign **pusher** to **BROADCAST_DRIVER**

```bash
composer install
php artisan key:generate
php artisan jwt:secret
php artisan websockets:credentials
php artisan migrate
php artisan serve
php artisan websockets:serve
```

#### Frontend

In the helpers/webSockets.js file, set the previously generated **PUSHER_APP_KEY** from the .env file

```bash
npm install
npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)  
