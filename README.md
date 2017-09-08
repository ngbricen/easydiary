# easydiary Application

## Overview

We created an application to make it easy for user to enter diary entries.  The twist we have added here
is the ability to make diary notes of your choice public that will be available to all users.  As such,
users can log in (create a username/password), create diary entries, make them public/private, edit, 
delete them, or finally see other users

## Authors

- Mr. Nguoghia
- Mr. Mir
- Mr. Bashirian
- Mr. Ekwevugbe

## Key Functionality of the application

The following test user could be used: username: bricen@gmail.com, Password: test
- This shows the entry application showing the login up top and public diaries available ![easyDiary Home Page](../../public/images/homepage.png)
  - Users can search for public diaries from the home screen as shown here ![easyDairy Search](../../public/images/search.png)
  - Users can create new diary entries
  - Users can login from the home page
      - Users can create a new account if they already have a username/password
- When clicking on New Diary, users no logged out should be directed to the log in screen  ![easyDiary Login](../../public/images/login.png)
  - A bad login will just prompt the user to reenter the username/password  ![easyDiary Wrong Login](../../public/images/wronglogin.png) 
  - A good Login will direct to the add diary page for the user with access granted  ![easyDiary Add Diary](../../public/images/adddiary.png) 
- Clicking on "Submit" on the Add Diary page for a user will direct to all the diaries entries for the the specific user  ![easyDiary View Diary](../../public/images/viewdiary.png) 
  - Users will have the ability on this page to edit, make public/private, or delete a diary page
  - Users will have the ability to also view all public diaries, and log out at the same time
  - Users will finally have the ability to logout on the top right, and be redirected to the view diary page.
