The idea is to develop an API that allows to time tracking (similar to Toggl.com). Assuming you are building the backend for a time tracking application, Design and build an API that can serve all use-cases mentioned below. You don’t need to build the UI for this application, just build the backend APIs for all the functionality UI would need. If there is some functionality that would be better implemented on UI side, add a note in your response why it should be part of UI and not backend.


There would be multiple users using the application. Each user would have a way to see all their tasks sorted by most recent to the oldest. 

User must be able to start a task even if it has no name. Also user should be able to pause or restart it.

The user must also be able to enter a task manually by providing the name and duration of the task in hours, minutes and seconds.

The application should allow the user to create projects and associate time records with tasks, and should allow them to see their times per project. 

Finally, each task must have a way to "continue" to rehabilitate that task (start to record time of a task taking the name of the one to be continued).

There should be a way to see the list of all Projects for all users with the total time spent (per project as well as per user).


Tests:

The application must have unit tests using Mocha or Jasmine


Bonus points

Use a NoSQL database like MongoDB or DynamoDb

Deploy the application to a cloud service like AWS. To avoid any charges, you can just share the steps or screenshots you followed to deploy the App.


Evaluation criteria

API Design, structure and documentation

Unit test coverage


Presentation

Code of the application in Github or Bitbucket
