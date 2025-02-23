# HackCanada

In order to install the dependencies, first go into the roomies folder and run "npm install"
Then, go into the backend folder and continuously use "python user.py" to figure out which libraries to install

Unfortunately, we did not get a chance to finalize the questionnaire so we set up some dummy answers.
In order to input these answers, go into questionnaire.py and the result() function and
change every instance of "request.user_id" into 1.

Then, go into the terminal and into the backend folder and run "python test.py"
Then you may revert the changes you made to questionnaire.py

Now you may boot up the backend using "python user.py"
At the same time, you can also start the frontend by navigating to the roomies folder and using "npm start"

Now you can test all the features (many bugs)
