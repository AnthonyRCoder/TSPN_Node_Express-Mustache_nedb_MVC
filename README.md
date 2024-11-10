The Scottish Pantry Network
https://tspn-rv42.onrender.com

The application should allow the users to do the following:
•	People should be able to view an About Us page with information about the initiative and access a Contact Us page with a contact form
•	Individuals with food to donate should be able to register for the application
•	Registered users should be able to login and add items
•	Pantries should be able to browse to the site and view currently available items
•	Pantries should be able to select items  
•	Items should only be displayed while they are within date and usable
•	Items should not be displayed once they have been selected
•	There should be an administrator role provided. Administrators should be able to add and delete users and items.


Wireframe 
 












 
Data Structure 

For The Scottish Pantry Network's food-sharing web, the data structure used to store information in the database can be defined as follows:
Users Collection
Fields:
username: String - The username of the user.
password: String - The password of the user.
role: String - The role of the user ('normaluser', 'admin').

Food Collection
Fields:
name: String - The name or description of the food item.
type: String - The category or type of the food item (e.g., fruits, vegetables, grains, proteins).
expiryDate: Date - The expiry date or use-by date of the food item.
location: String - The location where the food item is available (e.g., drop-off point, pantry).
selected: Boolean - Indicates whether the food item is currently available.
Author: String -  user who donated the food item.
imageUrl: String - URL to an image of the food item (optional).

Test Report 
In the context of this coursework the main testing expected will be at systems level.
Systems tests check the integrated system to evaluate its compliance with the specified requirements.
Fictional Sample Test Section for System Tests (based on a login example):
Test Scope
Functional Testing was carried out for the following modules:
Test Cases
Action	Expected outcome	Status	Evidence
localhost:3000	Landing page loads	OK	 
localhost:3000
localhost:3000/loggedIn	Items should only be displayed while they are within date and usable	OK	 
localhost:9000/about	Landing page loads 	OK	 
localhost:9000/contact	Landing page loads 	OK	 
localhost:9000/login	Landing page loads 	OK	 
Wrong input 	Landing page loads 	OK	 
Back button	About page loads 	OK	 
localhost:9000/register	Landing page loads 	OK	 
Back button 	About page loads 	OK	 
localhost:9000/admin	Landing page loads 	OK	 
localhost:9000/adminPostNewUser	Landing page loads 	OK	 
Success added user	UserAdded page
loads	OK	 
localhost:9000/new	Landing page loads 	OK	 
Skip button	Product page loads 	OK	 
localhost:9000/loggedIn	Landing page loads 	OK	 
Add Item button	Add Item page loads 	OK	 
Select button	  Items should not be displayed once they have been selected	OK	 
Not input for register
	Show fill out massage 	OK	 
Delete user test 2	Not show test2 user	OK	 
 
Delete item 
ID: 1fYT7GkB51QC3W28
	Not show item ID: 1fYT7GkB51QC3W28
	OK	 
 
			
			
After login success with role normal user	Add Item page loads	OK	 
After login success with role normal admin	Admin page loads	OK but user and item not display 	 
Admin link with normal user	Denied Access 	OK	 
			

Summary test results
The functionality of the landing page works as expected. All test results are as expected. 
Most of the functionality of the login page (11 out of 12 tests) works as expected. The remaining issue is that when a non-registered user uses the login button (instead of the register button) the user is directed back to the login page but no error message is shown. …
