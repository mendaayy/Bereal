# Camera

## Introduction
This is my first ever Progressive Web App. I took inspiration from the app Bereal for my PWA; it takes a picture from the front camera after a countdown of 3 seconds and then takes a picture from the back camera after another countdown. It also allows you to save the complete image in the end by using the HTML2Canvas Library. 

## Tools & Technology
- PWA (manifest and service working + offline caching)
- JS ES6
- HTML & CSS
- HTML2Canvas

## Progress 
After following some workshops, I learned how to set up a PWA. So I got started with that first, generating a manifest file and service worker. I also did some offline caching so th eapp can be used offline. Then, i got started with coding the app. This project wasn't the hardest, but the main problem I experienced was that Safari keeps showing me the older version of my app even when I updated the newest one to FileZilla. At first, I did not know that Safari was showing me the older version, I thought that my code was just not working/doing anything. So, I kept modifying the code and updating, which cost me a lot of time when the code was not the problem. It was due to the fact that Safari stores the PWA cache so I had to clear the History & Website Data each time through Apple's Settings. 
I also struggled with the horizontal flip of the screens. After a while, I found out that only the front-camera mirrors the screen and the back camera doesn't, so I had to find a way to apply the horizontal flip to only the front camera, which was easy to do.

## UI

<img width="436" alt="Screenshot 2023-05-19 at 01 50 49" src="https://github.com/mendaayy/Bereal/assets/122844229/423f7bf2-9774-4737-8e88-bb438501659f">
<img width="436" alt="Screenshot 2023-05-19 at 01 51 01" src="https://github.com/mendaayy/Bereal/assets/122844229/183cfaf6-f8af-496c-a70b-a3c767a888c4">
<img width="436" alt="Screenshot 2023-05-19 at 01 52 51" src="https://github.com/mendaayy/Bereal/assets/122844229/7828969c-ccaf-45ad-8cb1-f4f46d0c5a09">
<img width="436" alt="Screenshot 2023-05-19 at 01 51 17" src="https://github.com/mendaayy/Bereal/assets/122844229/276feebb-fdc3-40cb-b161-d7b5496f76b9">
