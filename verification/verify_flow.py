from playwright.sync_api import sync_playwright
import time
import os
import random

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        try:
            # 1. Register (use random email to avoid conflict)
            email = f"test_{random.randint(1000, 9999)}@example.com"
            print(f"Navigating to Register with email {email}...")
            page.goto("http://localhost:8080/register")

            # Fill form
            print("Filling registration form...")
            try:
                page.wait_for_selector("input[placeholder='Jane Doe']", timeout=5000)
            except:
                print("Registration form not found (already logged in?)")
                page.screenshot(path="verification/register_fail.png")
                # Try to logout if needed, but let's assume fresh context
                return

            page.get_by_placeholder("Jane Doe").fill("Test User")
            page.get_by_placeholder("name@example.com").fill(email)

            pw_inputs = page.get_by_placeholder("••••••••")
            pw_inputs.nth(0).fill("password123")
            pw_inputs.nth(1).fill("password123")

            page.get_by_role("button", name="Create Account").click()

            # Wait for navigation to home
            try:
                page.wait_for_url("**/", timeout=10000)
                print("Registration successful, redirected to home.")
            except:
                print(f"Registration might have failed. URL: {page.url}")

            # 2. Browse Services
            print("Navigating to Services...")
            page.goto("http://localhost:8080/all")

            # Wait for services
            try:
                page.wait_for_selector("text=Book Now", timeout=10000)
            except:
                print("Services failed to load")
                page.screenshot(path="verification/services_fail.png")

            page.screenshot(path="verification/services.png")
            print("Services screenshot taken")

            # 3. Add to Cart
            book_btns = page.get_by_text("Book Now")
            if book_btns.count() > 0:
                book_btns.first.click()
                print("Clicked Book Now")
                time.sleep(2)
            else:
                print("Book Now button not found")

            # 4. View Cart
            print("Navigating to Cart...")
            page.goto("http://localhost:8080/cart")
            page.wait_for_url("**/cart", timeout=5000)
            time.sleep(2)
            page.screenshot(path="verification/cart.png")
            print(f"Cart page loaded. URL: {page.url}")

            # 5. Checkout
            checkout_btn = page.get_by_text("Secure Checkout")
            if checkout_btn.is_visible():
                checkout_btn.click()
                print("Clicked Secure Checkout")

                page.wait_for_url("**/checkout", timeout=5000)
                print("Navigated to Checkout page")

                # 6. Fill Payment Form
                print("Filling Payment Form...")
                page.get_by_placeholder("JANE DOE").fill("Test User")
                page.get_by_placeholder("0000 0000 0000 0000").fill("4242424242424242")
                page.get_by_placeholder("MM/YY").fill("12/25")
                page.get_by_placeholder("123").fill("123")

                # 7. Pay
                pay_btn = page.get_by_text("Pay ₹") # Matches partial text
                if pay_btn.is_visible():
                    pay_btn.click()
                    print("Clicked Pay button")

                    # Wait for processing and redirect to bookings
                    try:
                        page.wait_for_url("**/my-bookings", timeout=10000)
                        print("Order confirmed! Redirected to My Bookings.")
                        page.screenshot(path="verification/bookings.png")
                    except:
                        print(f"Order confirmation failed or timed out. URL: {page.url}")
                        page.screenshot(path="verification/checkout_fail.png")
                else:
                    print("Pay button not found")
            else:
                 print("Secure Checkout button not found (Cart might be empty)")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run()
