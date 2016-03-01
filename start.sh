#!/bin/bash
chromium --kiosk /home/linaro/WallPanel/index.html &
sudo python /home/linaro/WallPanel/python_opencv/face.py /home/linaro/WallPanel/python_opencv/haarcascade_frontalface_default.xml