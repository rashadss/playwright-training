import { test } from "@playwright/test";

// test.describe('test suite 1' , ()=>{

// })

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layout").click();
});

test("Locator syntax rules", async ({ page }) => {
  //tag-name
  await page.locator("input").first().click();
  //id
  page.locator("#inputEmail1");
  //class
  page.locator(".shape-rectangle");
  //attr
  page.locator('[placeholder="Email"]');
  //class full
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );
  //combine
  page.locator('input[placeholder="Email"][nbinput]');
  //xpath ( NOT RECOMMENDED)
  page.locator('//*[@="inputEmail"]');
  //partial text
  page.locator(':text("Using")');
  //exact text
  page.locator(':text-is("Using the Grid")');
});

test("Using facing locators", async ({ page }) => {
  page.getByRole("textbox", { name: "Email" }).first().click();
  page.getByRole("button", { name: "Sign in" }).first().click();
  page.getByLabel("Email").first().click();
  page.getByPlaceholder("Jane Doe").click();
  page.getByTestId("sign-button");
});

test("locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(' :text-is("Option 1")')
    .click();
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  // TRY TO AVOID THE INDEX
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent elements", async ({ page }) => {
  page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("reusing the locators", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Basic Form" })
    .getByRole("textbox", { name: "Email" })
    .fill("test@test.com");
});
