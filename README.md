## Link to access hosted website
    https://medbookingpro.netlify.app/
    
## To run this project with your own resources ->
    1. Open the project in VS code
    2. Open mysql in cmd or workbench -> copy paste the sql script from db.sql file and run the script
    3. Go to backend > env.js -> change the values of variables in 'constants', 'mail' and 'dbconstants'
    (Refer this video to get gmail passkey - https://www.youtube.com/watch?v=6ANKk9NQ3GI&t=287s)
    4. Open terminal of VS code
    5. cd backend -> npm install -> node index.js
        If you see 'server started at 9999...' message in terminal, then backend is up

    6. Go to frontend > src > env.js -> change the values of variables in 'constants'
    7. Add new Terminal in VS code
    8. cd frontend -> npm install (wait till all dependencies are downloaded) -> npm start

## Technologies used
    1. MySQL for database
    2. Node Js for backend
    3. React Js for frontend
    4. HTML
    5. CSS

## Interactive features
    1. Receipt download - After booking an appointment, you can download your receipt in pdf format.
    2. If you forgot to download the receipt, anytime you can click on 'Download my today's receipt' link, and get your receipt.
    3. Confirmation mail - After booking an appointment, you will get confirmation mail to your provided email id.

## Refereces
    1. Stickers
        https://www.flaticon.com/stickers
    2. Convert images from different extensions to jpg or png or ico
        https://convertio.co/
    3. Chatgpt - for content
        https://chat.openai.com/
    4. Check responsiveness of website (how website looks in mobile, tabs)
        http://www.responsinator.com/
        copy website url and paste in responsinator
    5. Free sql database - to host mysql database
        https://www.clever-cloud.com/
        Refer this video - https://www.youtube.com/watch?v=cjkksEmH9Ig&t=391s
    6. Cyclic -  To host node js backend
        https://www.cyclic.sh/
        Connect using github and link your own github repository
        https://www.youtube.com/watch?v=H4S0dDeV6Ew
    7. Netlify - To host react app
        https://www.netlify.com/
        create and account -> login -> sites -> drag and drop project folder or browse ->
        the link will be provided by netlify