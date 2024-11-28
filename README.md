# RebelThreads

RebelThreads is a cross-platform mobile application designed for University of Mississippi students to exchange clothing within the campus. The app provides a sustainable and convenient platform for students to buy, sell, and request clothing, featuring a tagging system for tailored searches, a reporting mechanism for content moderation, and bookmarking for future reference.

---

## Features

- **Clothing Listings**: Users can post items for sale, including photos, descriptions, and pricing.
- **Clothing Requests**: Users can request specific items they are looking for.
- **Search and Filters**: Users can filter and search for items using tags like "Game Day," "Formal," or attributes such as size and condition.
- **Bookmark Listings**: Users can save items for future reference.
- **Direct Communication**: Contact sellers directly via text or email.
- **Reporting System**: Users can flag inappropriate or suspicious content for admin review.
- **Admin Portal**: Admins can review reports, manage users, and moderate listings.

---

## Tech Stack

### **Frontend**
- **React Native**: Cross-platform app development.
- **Expo**: Simplifies development and enables live testing.
- **Redux**: Manages application state efficiently.
- **React Navigation**: Provides smooth screen transitions and routing.

### **Backend**
- **Node.js with Express**: Framework for API development and middleware.
- **MongoDB (NoSQL)**: Dynamic database for user, listing, and request management.
- **AWS S3**: Secure, scalable storage for user-uploaded images.
---

## Installation and Setup

### **Prerequisites**
- Install **Node.js** (v16 or higher) and npm.
- Install **Expo CLI** globally:
  ```bash
  npm install -g expo-cli
  ```
  After running the above command, type `exit` to close the bash session if needed, and restart a new terminal before proceeding to the next steps.
- Ensure access to:
  - **MongoDB Atlas** or a local MongoDB instance.
  - **AWS S3 Bucket** for image storage.
- Install Expo Go in your phone for live testing
- Install Xcode to run the app in a simulator
---

## Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/anuzza/RebelThreads.git
   cd rebelthreads
   ```

2. **Install Dependencies**
   - Navigate to the `frontend` and `backend` folders to install their respective dependencies:
     - **Frontend**:
       ```bash
       cd frontend
       npm install
       ```
     - **Backend**:
       ```bash
       cd ../backend
       npm install
       ```

3. **Configure Environment Variables**
   - In the `backend` folder, create a `.env` file and add the following variables:
     ```
     PORT=<PORTNUMBER>
     MONGODB_URL=<your-mongodb-uri>
     JWT_SECRET=<your-secret-key>
     AWS_ID=<your-aws-access-key>
     AWS_SECRET=<your-aws-secret-key>
     AWS_BUCKET_NAME=<your-s3-bucket-name>
     ```

   - In the `frontend` update the url to add your port number or your current Ip address in `src/utils/axios`
   - eg:
     ```bash
     const url = "http://localhost:<portnumber>";
     # OR
     const url = "http:<IpAddress>:<portnumber>";

4. **Start the Backend Server**
   - From the `backend` folder, run:
     ```bash
     npm run dev
     ```

5. **Start the Frontend App**
   - Navigate to the `frontend` folder and run:
     ```bash
     npx expo start -c 
     ```

6. **Test the App**
   - Open the **Expo Go app** on your mobile device.
   - Scan the QR code displayed in the terminal to view the app on your device.



### **Live Testing**
- The app can run in **Expo Go** during development for real-time testing.


## Project Structure

```
rebelthreads/
│
├── frontend/
│   ├── src/  # React Native components and screens
│   ├── assets/  # Static assets like images
│   ├── App.js  # Main app entry point
│   └── package.json  # Frontend dependencies
│
├── backend/
│   ├── models/  # Mongoose schemas
│   ├── routes/  # API routes
│   ├── controllers/  # API logic
│   ├── index.js  # Server entry point
│   └── package.json  # Backend dependencies
│
└── README.md  # Project documentation
```

---

## Contact

For questions or support, contact [Anuja Sharma](mailto:asharm12@go.olemiss.edu).
