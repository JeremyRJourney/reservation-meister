
# Reservation Meister

## Overview
Take, update and manage reservations from anywhere. With the addition of user management let each of your users do what they are supposed without giving them the permission to something they do not need access to.

Easily distinguish what stage a reservation is at during the evening with color coding of tables and hover tooltips to remind you who they are and when they were seated.

![Reservation Meister Image](https://aimeos.org/fileadmin/user_upload/typo3-demo.jpg)

## Table of content

- [Installation](#installation)
- [Setup](#typo3-setup)
- [Database](#database)


## Installation

- Navigate to Frontend folder
  - ```npm install``` OR ```npm install```
- Navigate to Backend folder
  - ```npm install``` OR ```npm install```


## Setup

### Frontend
Navigate to ```/src/utils/api``` and setup the flag if connecting to local server and set the proper base URLs for them.

### Backend
Navigate to ```/server.js```` and comment in/out the APIs if using local endpoints or production endpoints.

## Database setup
There is no migration and test data setup, however all that is needed is 4 tables and one default user.

### Create tables
- ```reservations```
  - Fields that will be created
    - _id default Mongo ObjectId
    - First Name
    - Last Name
    - Guests
    - Time
    - Status
    - Notes
- ```tables```
  - Fields that will be created
    - _id default Mongo ObjectId
    - Table Name
    - Table Type
    - Section
    - Table Location X
    - Table Location Y
- ```pendingUsers```
  - Fields that will be created
    - _id default Mongo ObjectId
    - First Name
    - Last Name
    - Username
    - Is Active
    - UID this field is used for activation
- ```users```
  - Fields that will be created
    - _id default Mongo ObjectId
    - First Name
    - Last Name
    - Is Active
    - User Type
    - Username

### Create Default User
  - Default Admin user required to access the platform
    - Set all values and ensure ```userType``` is set to "admin"

