import { expect, test} from '@playwright/test';

test.use({
    geolocation: { longitude: -74.0139151, latitude: 40.6457261 },
    permissions: ['geolocation'],
  });

test("Activate Map window",async ({page}) =>{
    await page.goto("/");
    await page.hover("#SearchButton");
    await page.click("#SearchButton");
    await page.locator("#google-map");
});