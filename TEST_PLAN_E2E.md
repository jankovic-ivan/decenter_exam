# TEST PLAN — e2e-AutomationExercise

## Overview
Goal: End-to-end UI verification for product search, cart/checkout, category review, and Contact Us form.  
Scope: Test Cases TC01, TC02, TC03 in `e2e-AutomationExercise`.  
Note: Login/Auth steps are intentionally excluded.

---

## TC01
- **ID:** TC01  
- **Name:** Verify Search / Selection / Checkout of product  
- **Pre-conditions:**  
  - Application reachable at configured test base URL.   
  - Authentication/Login is required.  
- **Steps:**  
  1. Open the application's home page.  
  2. Open the Products section by clicking the "Products" button in the navigation.  
  3. In the product search area type the search term "Polo".  
  4. Click the Search button.  
  5. From the search results click "View Product" for the matching item.  
  6. Verify the product details page is shown (product title visible).  
  7. Record the product price displayed on the product details page.  
  8. Click the "Add to cart" button on the product page.  
  9. Wait for the "Added!" confirmation popup to appear, then click "View Cart".  
  10. On the Cart page verify the cart title is visible and the total price element is visible.  
  11. Compare the recorded product price to the cart total and assert they match.  
  12. Click "Proceed To Checkout".  
  13. On the Checkout page, verify the Checkout title is visible, enter a comment, and click "Place Order".  
  14. On the Payment page fill in name, card number, CVC, expiry month and year and click "Pay and Confirm Order".  
  15. Verify the order confirmation message appears.  
  16. Click "Continue" and assert the app returns to the home page. 
- **Expected Result:**  
  - Search shows product details.  
  - Cart total equals captured product price.  
  - Checkout succeeds and payment confirmation is shown.  
  - User returns to home page.

---

## TC02
- **ID:** TC02  
- **Name:** Verify Category navigation and add review  
- **Pre-conditions:**  
  - Application reachable.   
  - No authentication required.  
- **Steps:**  
  1. From the home page click the "Products" button.  
  2. In the Products page click the "Women" category tab, then choose the "Dress" subcategory.  
  3. Confirm the category title (e.g., "Women - Dress Products") is visible.  
  4. Choose a product from the category results and click "View Product".  
  5. On the product page fill the review form: enter your name, email, and review text.  
  6. Click the "Submit" button to post the review.  
  7. Verify the review success message is displayed.  
  8. Return to the home page. 
- **Expected Result:**  
  - Category page appears for selected category.  
  - Review submission success is shown.  
  - Returning to home succeeds.

---

## TC03
- **ID:** TC03  
- **Name:** Contact Us form submission from Home Page  
- **Pre-conditions:**  
  - Application reachable.  
  - No authentication required.  
- **Steps:**  
  1. From the home page click the "Contact Us" link in the navigation.  
  2. Scroll to the Contact form's submit button (to avoid overlays/ads).  
  3. Fill the contact form with name, email, subject and message.  
  4. Click the Submit button. Accept browser confirmation dialog. 
  5. Verify the on-page success message (e.g., "Success! Your details have...") is visible.  
  6. Click the Home link/button to return to the home page and confirm the home heading is visible.  
- **Expected Result:**  
  - Contact form accepted and confirmation message visible.  
  - Confirmation dialog is accepted.  
  - Return to home is successful.

---

## How To Run
- Run all UI tests in the file:
  - `npx playwright test -g "@UI"` 
  - `npx playwright test -g "@UI" --headed`

- Run all Api tests in the project:
  - `npx playwright test -g "@Api"`

- Show test report:
  - `npx playwright show-report`

---
