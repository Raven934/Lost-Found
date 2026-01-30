# Lost & Found Web Application
A web application that allows users to declare and search for lost or found items.
The platform includes authentication and role-based access (user/admin).
## Features
- User authentication (register/login)
- Declare lost or found items
- Browse and filter items (type, location)
- Manage own items
- Admin dashboard to manage all items
## Technologies
- Laravel 10
- React
- MySQL
- Laravel Sanctum
- PHPUnit
## User Roles
User:
- Manage own items

Admin:
- Manage all items
users (id, name, email, role)
items (title, type, location, status, user_id)
## API / Routes principales
GET /api/items
POST /api/items
##Tests
php artisan test

**Important Links:**
-Figma: https://www.figma.com/design/wYLuY87pF8uyXTgVVPRPkk/Untitled?node-id=17-2&t=nlwSXKRvukgJZDgR-1
-UML:https://lucid.app/lucidchart/28ef6c1f-e1a9-49e5-93fe-f6d31bfeb314/edit?view_items=OsTaMPV9N~x-&page=0_0&invitationId=inv_f04c9578-1e74-4c3b-b019-4a40110b2a5d
https://lucid.app/lucidchart/5a456daa-fa18-457a-8d10-c69dd05c1ae7/edit?view_items=K2bbM.NGNnrd&page=0_0&invitationId=inv_679f8f66-f825-499f-9315-fae6da3d15b9
-Github:https://github.com/Raven934/Lost-Found.git
