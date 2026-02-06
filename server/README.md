# ChamaConnect Server

Backend API for managing chama groups - user auth, contributions, meetings, and member management.

## Stack

- Node.js, Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for passwords

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` file:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/chamaconnect
   JWT_SECRET=your_secret_key
   CLIENT_ORIGIN=http://localhost:5173
   ```

3. Run the server:
   ```bash
   npm run dev    # with nodemon
   npm start      # production
   ```

## API Endpoints

### Health Check

- `GET /api/health` - Check API status

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)
- `GET /api/auth/me` - Get current authenticated user (requires token)

### Chamas (Groups)

- `GET /api/chamas` - List all chamas for authenticated user
- `POST /api/chamas` - Create a new chama
- `GET /api/chamas/:chamaId` - Get chama details (must be member)
- `POST /api/chamas/join` - Join a chama using invite code
- `POST /api/chamas/:chamaId/invite` - Create invite code (admin only)

### Members

- `GET /api/chamas/:chamaId/members` - List chama members
- `POST /api/chamas/:chamaId/members` - Add member (admin/treasurer)
- `DELETE /api/chamas/:chamaId/members/:memberId` - Remove member (admin)
- `PATCH /api/chamas/:chamaId/members/:memberId` - Update member role (admin)

### Contributions

- `GET /api/chamas/:chamaId/contributions` - List contributions
- `POST /api/chamas/:chamaId/contributions` - Record new contribution
- `PATCH /api/chamas/:chamaId/contributions/:contributionId` - Update contribution status

### Meetings

- `GET /api/chamas/:chamaId/meetings` - List meetings
- `POST /api/chamas/:chamaId/meetings` - Schedule new meeting
- `GET /api/chamas/:chamaId/meetings/:meetingId` - Get meeting details
- `DELETE /api/chamas/:chamaId/meetings/:meetingId` - Cancel meeting (creator only)

### Notifications

- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:notificationId` - Mark as read
- `DELETE /api/notifications/:notificationId` - Delete notification

### Dashboard

- `GET /api/dashboard/overview` - Get dashboard analytics and statistics

## Auth

JWT-based. Include token in Authorization header:

```
Authorization: Bearer <token>
```

Protected routes use `protect`, `requireMember`, and `requireRole` middleware.

## Scripts

```bash
npm run dev    # nodemon watch
npm start      # production
npm run seed   # seed database
```

## Models

- **User**: name, email, passwordHash
- **Chama**: name, description, contributionAmount, cycle (weekly/monthly)
- **Membership**: userId, chamaId, role (admin/treasurer/member)
- **Contribution**: chamaId, userId, amount, status (paid/pending/late), dueDate
- **Meeting**: chamaId, title, agenda, dateTime, location, createdBy
- **Notification**: userId, chamaId, type, message

## License

Copyright <2026> <ABEL NYARUNDA>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
