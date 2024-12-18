# Brand Module for E-Commerce

This repository provides a **Brand Module** for an e-commerce application, enabling efficient management of brand-related data. The project is built using **TypeScript**, **Node.js**, and **Express**, and it follows a clean project structure for scalability and maintainability.

---

## Features

1. **CRUD Operations**
   - Create, Read, Update, and Delete brands.

2. **Request Validation**
   - Ensures incoming API requests meet predefined rules (e.g., required fields, types).

3. **Sorting**
   - Sort brands alphabetically by their names.

4. **Filtering**
   - Filter brands based on their ratings.

5. **Pagination**
   - Paginate brand data to handle large lists efficiently.

6. **Error Handling**
   - Centralized error handling for cleaner and more manageable error responses.

7. **Environment Configuration**
   - Supports environment variables using `.env` files.

8. **Database Integration**
   - MongoDB is used as the database for managing brand data.

---

## Project Structure

```plaintext
BRAND MODULE FOR E-COMMERCE
├── config
│   └── db.ts                    # Database configuration
├── controllers
│   └── brandController.ts       # Handles brand-related business logic
├── error-handler
│   └── applicationError.ts      # Centralized error handling
├── middleware
│   └── validateRequest.ts       # Middleware for request validation
├── models
│   └── brandModel.ts            # Brand schema and model definition
├── routes
│   └── brandRoutes.ts           # API routes for brands
├── utils                        # Utility functions (if any)
├── validators
│   └── brandValidator.ts        # Validation rules for brand requests
├── .env                         # Environment variables
├── .gitignore                   # Ignore node_modules, .env, etc.
├── index.ts                     # Main server entry point
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nikhilBornare/Brand-Module-for-E-Commerce.git
   cd Brand-Module-for-E-Commerce
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and define:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. **Run the Application**
   Use **nodemon** for development:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

5. **Build for Production**
   ```bash
   npm run build
   ```

---

## API Endpoints

### 1. **Create a Brand**
   - **Endpoint:** `POST /api/brands`
   - **Request Body:**
     ```json
     {
       "name": "Brand Name",
       "description": "Description of the brand",
       "status": "active",
       "rating": 4.5
     }
     ```

### 2. **Get All Brands with Sorting, Filtering, and Pagination**
   - **Endpoint:** `GET /api/brands`
   - **Query Parameters:**
     - `sort`: Sort by name (e.g., `sort=name`)
     - `filter`: Filter by rating (e.g., `filter=rating:4.5`)
     - `page`: Page number (e.g., `page=1`)
     - `limit`: Number of results per page (e.g., `limit=10`)

   - **Example Request:**
     ```
     GET /api/brands?sort=name&filter=rating:4.5&page=1&limit=10
     ```

### 3. **Get a Single Brand**
   - **Endpoint:** `GET /api/brands/:id`

### 4. **Update a Brand**
   - **Endpoint:** `PUT /api/brands/:id`
   - **Request Body:** (fields to update)
     ```json
     {
       "name": "Updated Brand Name",
       "status": "inactive"
     }
     ```

### 5. **Delete a Brand**
   - **Endpoint:** `DELETE /api/brands/:id`

---

## Request Validation

Validation rules are defined in `validators/brandValidator.ts`. The middleware `validateRequest.ts` ensures requests are validated before they reach the controller.

**Example Validation Rules:**
- `name`: Required, must be a string.
- `rating`: Required, must be a number between 1 and 5.
- `status`: Required, must be either "active" or "inactive".

---

## Error Handling

All errors are handled centrally using the `applicationError.ts` file. This ensures consistent and clean error responses.

**Example Error Response:**
```json
{
  "message": "Validation failed",
  "errors": [
    { "param": "name", "msg": "Brand name is required" }
  ]
}
```

---

## Technologies Used

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Express Validator**
- **Nodemon** (development)
- **dotenv** (environment variables)

---

## Future Improvements

- Add authentication.
---

## Author

**Nikhil Bornare**  
Email: [nikhilbornare01@gmail.com](mailto:nikhilbornare01@gmail.com)  
GitHub: [nikhilBornare](https://github.com/nikhilBornare)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

