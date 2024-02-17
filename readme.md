<--Directions for Cloning and running locally-->

- Clone the app to your local

- Add .env file at the root

- Run these commands to run the app directly
  `npm run build`
  `npm start`
  \*open this url (http://localhost:3001/)

- Run these commands to run the app on docker(open terminal at root directory)
  `docker build . -t image-compressor:v1`
  `docker run -d -p 8001:3001 image-compressor:v1`
  \*open this url (http://localhost:8001/)

<--Directions for access hoster app-->

- Open this url (https://image-compression-gnd1.onrender.com/)

<--Features-->

- Let's you upload any image file with image mime type
- Filter's out the unsupported types of image for compression
- Shows the respective messages on screen

<--Technicals-->

- Pushing code to main branch triggers the auto-deployment to Render
- Unit tests will execute prior to deployement
- Docker is also enabled for this app

<--Used-->

- Express for the app
- EJS for ui
- Multer for image uploading
- Sharp for image compression
- AWS S3 bucket for compressed image storage
- Jest for unit tests
- Docker for Dockerization
- Github workflow for actions
