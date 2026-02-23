from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            print("Navigating to Home...")
            page.goto("http://localhost:3000/")
            # Wait a bit for React to hydrate and fetch data
            time.sleep(5)

            # Check Trending Services (was Destinations)
            print("Checking Trending Services...")
            try:
                # Wait for section title
                page.wait_for_selector("text=Trending Services", timeout=5000)

                # Check for seeded service names (sorted by rating DESC)
                # "Hot Stone Therapy" is 5.0
                if page.get_by_text("Hot Stone Therapy").is_visible():
                    print("SUCCESS: Found 'Hot Stone Therapy' in Trending Services.")
                else:
                    print("WARNING: 'Hot Stone Therapy' not found.")

                # Check if we have cards
                # They have class "min-w-[300px]"
                count = page.locator(".min-w-\\[300px\\]").count()
                print(f"Found {count} trending service cards.")
                if count >= 1:
                    print("SUCCESS: Trending services loaded.")
                else:
                     print("ERROR: No trending services found.")

            except Exception as e:
                print(f"Trending Services check failed: {e}")

            # Check Staff Picks
            print("Checking Staff Picks...")
            try:
                page.wait_for_selector("text=The Edit: Staff Picks", timeout=5000)

                # Check for seeded product names
                # "Midnight Radiance Oil"
                if page.get_by_text("Midnight Radiance Oil").is_visible():
                    print("SUCCESS: Found 'Midnight Radiance Oil' in Staff Picks.")
                else:
                    print("WARNING: 'Midnight Radiance Oil' not found.")

                # Check price display (₹) inside Staff Picks section
                # We can't easily scope get_by_text to a section without locator chaining
                section = page.locator("section#products")
                if section.is_visible():
                    oil = section.get_by_text("Midnight Radiance Oil")
                    if oil.is_visible():
                        print("SUCCESS: Product visible in Staff Picks section.")

            except Exception as e:
                 print(f"Staff Picks check failed: {e}")

            page.screenshot(path="verification/homepage_verified.png")
            print("Homepage verification finished.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/home_fatal_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run()
