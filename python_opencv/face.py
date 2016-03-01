import cv2
import sys
import socket
import time
from subprocess import call

cascPath = sys.argv[1]
faceCascade = cv2.CascadeClassifier(cascPath)
video_capture = cv2.VideoCapture(0)

didDetect = False
data = ''
header = ''
while True:

	ret, frame = video_capture.read()
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	
	faces = faceCascade.detectMultiScale(
		gray,
		scaleFactor=1.1,
		minNeighbors=5,
		minSize=(100,100),
		flags=cv2.CASCADE_SCALE_IMAGE
	)
	
	if len(faces) >= 1:
		if didDetect == False:
			didDetect = True
			call(["curl", "-X", "PATCH", "-d", "{\"num\": " + str(len(faces)) + "}", "https://glowing-heat-3874.firebaseio.com/People.json"]);
			print ""
	else:
		if didDetect == True:
			didDetect = False
			call(["curl", "-X", "PATCH", "-d", "{\"num\": " + str(len(faces)) + "}", "https://glowing-heat-3874.firebaseio.com/People.json"]);
			print ""
	
	time.sleep(2)
	
	#for(x,y,w,h) in faces:
		#cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 2)

	#cv2.imshow('cam', frame)
	#if cv2.waitKey(1) & 0xFF == ord('q'):
		#break

video_capture.release()
cv2.destroyAllWindows()
