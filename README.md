# Wall Panel

Wall panel is a webpage written in javascript that displays relevant information such as temperature, news, calendar, driving time to work, and live Twitch streams. Information sources can be configured in 'index.html'. Optional webcam use with the provided python script uses opencv to detect faces looking at the panel and shows a random greeting. Data is shared between the script and the webpage through firebase. This page is meant to be deployed on a low-powered device such as a Raspberry Pi or Dragonboard. 

To run on Linux:
`/usr/bin/chromium --kiosk "index.html" &`

To run optional python script:
`python face.py haarcascade_frontalface_default.xml &`

![Screen](https://raw.githubusercontent.com/scdickson/WallPanel/master/images/screen.png)
![Deployment](https://raw.githubusercontent.com/scdickson/WallPanel/master/images/deployment.jpg)