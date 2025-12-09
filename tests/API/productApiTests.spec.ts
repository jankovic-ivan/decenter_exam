import { ProductsListResponseSchema } from '../../fixtures/api/schemas';
import { test, expect } from '../../fixtures/pom/test-options';
import productData from '../../test-data/productData.json';


test.describe('API Tests', () => {
    test(
        'TC01 - Get list of products',
        { tag: '@Api' },
        async ({ apiRequest }) => {
            await test.step('Verify GET productsList returns valid data', async () => {
                const { status, body } = await apiRequest<any>({
                    method: 'GET',
                    url: 'api/productsList',
                    baseUrl: process.env.API_URL,
                });

                expect(status).toBe(200);
                                
                // Parse the body if it's a JSON string
                const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
                
                // Parse and validate schema / covering TC05 - Response Schema Validation
                const validatedBody = ProductsListResponseSchema.parse(parsedBody);
                expect(validatedBody).toBeTruthy();
                
                // Assert products key exists and array is not empty
                expect(parsedBody).toHaveProperty('products');
                expect(Array.isArray(parsedBody.products)).toBe(true);
                expect(parsedBody.products.length).toBeGreaterThan(0);

                // Verify specific product from productData.json is present
                const expectedProduct = productData.products[0];
                const foundProduct = parsedBody.products.find((p: any) => 
                    p.id === expectedProduct.id && 
                    p.name === expectedProduct.name
                );

                expect(foundProduct).toBeDefined();
                expect(foundProduct.price).toBe(expectedProduct.price);
                expect(foundProduct.brand).toBe(expectedProduct.brand);
                expect(foundProduct.category.usertype.usertype).toBe(expectedProduct.category.usertype.usertype);
                expect(foundProduct.category.category).toBe(expectedProduct.category.category);
            });
        }
    );
    test(
    'TC02 - Verify search returns valid results',
    { tag: '@Api' },
    async ({ apiRequest }) => {
        await test.step('Verify POST searchProduct with "shirts" term', async () => {
            const searchTerm = 'shirt';
            
            // Create form data
            const formData = new URLSearchParams();
            formData.append('search_product', searchTerm);
            
            const { status, body } = await apiRequest<any>({
                method: 'POST',
                url: 'api/searchProduct',
                baseUrl: process.env.API_URL,
                body: formData.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            expect(status).toBe(200);
            
            // Parse the body if it's a JSON string
            const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
            
            // Validate schema
            const validatedBody = ProductsListResponseSchema.parse(parsedBody);
            expect(validatedBody).toBeTruthy();
            
            expect(parsedBody).toHaveProperty('products');
            expect(Array.isArray(parsedBody.products)).toBe(true);

            expect(parsedBody.products.length).toBeGreaterThan(0);
            
            // Verify all returned products have "shirt" in the category (case-insensitive)
            const allContainShirtInCategory = parsedBody.products.every((product: any) => 
                product.category?.category?.toLowerCase().includes('shirt'));
            expect(allContainShirtInCategory).toBe(true);
            
            // Verify expected categories are present in the response
            const expectedCategories = productData.shirtSearchResults;
            const actualCategories = parsedBody.products.map((p: any) => p.category?.category);
            
            for (const expectedCategory of expectedCategories) {
                expect(actualCategories).toContain(expectedCategory);
            }
        });
    }
);
    test(
    'TC04 - Product price range validation',
    { tag: '@Api' },
    async ({ apiRequest }) => {
        await test.step('Verify POST searchProduct with "shirts" term', async () => {
            const searchTerm = 'shirt';
            
            // Create form data
            const formData = new URLSearchParams();
            formData.append('search_product', searchTerm);
            
            const { status, body } = await apiRequest<any>({
                method: 'POST',
                url: 'api/searchProduct',
                baseUrl: process.env.API_URL,
                body: formData.toString(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            expect(status).toBe(200);
            
            // Parse the body if it's a JSON string
            const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
            
            // Validate schema
            const validatedBody = ProductsListResponseSchema.parse(parsedBody);
            expect(validatedBody).toBeTruthy();

            expect(parsedBody).toHaveProperty('products');
            expect(Array.isArray(parsedBody.products)).toBe(true);
            expect(parsedBody.products.length).toBeGreaterThan(0);
            
            // Verify all returned products have "shirt" in the category (case-insensitive)
            const allContainShirtInCategory = parsedBody.products.every((product: any) => 
                product.category?.category?.toLowerCase().includes('shirt'));
            expect(allContainShirtInCategory).toBe(true);
            
            // Verify all product prices are within the expected range Rs. 100 to Rs. 2000
                        // Verify all product prices are within the expected range Rs. 100 to Rs. 2000
            const minPrice = 100;
            const maxPrice = 2000;
            
            const allPricesInRange = parsedBody.products.every((product: any) => {
                // Extract numeric value from price string (e.g., "Rs. 1500" -> 1500)
                const priceMatch = product.price.match(/Rs\.\s*(\d+)/);
                if (!priceMatch) return false;
                
                const priceValue = parseInt(priceMatch[1], 10);
                return priceValue >= minPrice && priceValue <= maxPrice;
            });
            
            expect(allPricesInRange).toBe(true);
        });
    }
);
});
