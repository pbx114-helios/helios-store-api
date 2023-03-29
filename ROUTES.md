## Routes

### `/products`

All products related routes

-   `GET /products/` : Gets all the products currently available in the database.
-   `GET /products/:id` : Gets a specific product based on its prod_id
-   `POST /products/` : Creates a new entry for a product

    Sample request body

    ```json
    {
        "productInfo": {
            "name": "...",
            "description": "...",
            "price": 150
        }
    }
    ```

-   `DELETE /product/:id` : Deletes a product entry based on the product_id
-   `PUT /product/:id` : Updates a product entry based on the product id

    **Sample request body**

    ```json
    {
        "updatedInfo": { "price": 152 }
    }
    ```

-   `POST /products/var/:id` : Attach a variant to a product based on the product id

    **Sample request body**

    ```json
    {
        "vars": [
            {
                "name": "42",
                "price": 150
            }
        ]
    }
    ```

-   `DELETE /products/var/:id` : Deletes a specific variant from a product based on the product id and name in the request body

    **Sample request body**

    ```json
    {
        "name": "<variant_name>"
    }
    ```

### `/orders`

All order related routes

-   `GET /orders/` : Gets all the orders
-   `GET /orders/:id` : Gets an order based on the given ref_id
-   `DELETE /orders/:id` : Deletes an order based on the given ref_id
-   `POST /orders/:id` : Creates a new order from a given product_id

    **Sample request body**

    ```json
    {
        "name": "John Doe",
        "email": "john@gmail.com",
        "address": "328, Albuqurque, US",
        "variant": "size 42",
        "description": "Colourful jacket"
    }
    ```
