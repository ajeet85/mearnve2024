# Local Development


# Production

Change url and env type from frontend/.env file 
Create build using npm run build
Upload build in backend folder and provide path in server.js file
Change database details in config/db.js file
In backend folder run npm install

pm2 start 'npm start' --name Backend

pm2 start app.js
pm2 save
pm2 startup
pm2 unstartup systemd

