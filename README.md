# Health Portal System

Marshall Uni CS-310 project.

## Dev Notes

### Running

Once you're sure you've installed all of the packages, you can run the website.

Each time you modify the front-end, you need to build the application by running `npm run build`. 
This will create a `client/build` that the backend pulls from.
You will need to do this each time there are changes to `client/src`.

To run the application, you can run both ends simultaneously using `npm run dev`. This leaves port 8000 open for the back end and 3000 for the front end.

### .env

Look in pinned messages in our group chat on Discord for the most updated `.env` file. This goes in the root directory of the project and is necessary to run the project.
This file cannot be included in the GitHub as later, it will contain things such as database authentications and other senstive info.

