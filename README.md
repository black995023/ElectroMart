# ElectroMart
This is the MERN shopping project for a website carried out by Team G06 - Khải, Lâm, Hiền, Thanh.

# Server Link:
**`https://electro-mart.onrender.com/admin/`**
- Username: Admin
- Pass: 123
# Client Link:
**`https://electro-mart.onrender.com/home`**
- Username: nhockha016145
- Pass: khai01645
# The following steps to run the projects:
+ Download Mongo Compass, add and connect to the project's connection: mongodb+srv://MinhKhai:khai01645@clustertest.pim8ki9.mongodb.net/
+ Or create a new database on the official website and add the corresponding collections. Then, adjust the myConstant.js file located at "server > utils > MyConstants.js".
+ Next, from the address bar in the folder, type "cmd" and press Enter to open the command prompt directly pointing to the current directory (server). In the command prompt, enter the following command and press Enter to build the project: npm run build
+ Wait for a while for the setup and build process to complete. After the build is finished, enter the following command to connect to the port (the project is set to 3000) and the MongoDB connection: npm start
+ The command prompt will display a message indicating that the server is currently running on port 3000 and is connected to MongoDB.
+ Open a web browser (e.g., Chrome, Cốc Cốc...) and enter (or copy) the following URLs to access the website:
~ User URL: localhost:3000
~ Admin URL: localhost:3000/admin
+ (Note: The passwords for the user and admin can be found in the collection of MongoDB compass after being connected).
