import { test} from '@playwright/test';

test.use({
    geolocation: { longitude: 40.6457261, latitude: -74.0139151 },
    permissions: ['geolocation'],
  });

test("Should not activate Map window", async ({page}) =>{
    await page.goto("/");
    await page.hover("#SearchButton");
    await page.click("#SearchButton");
    await page.getByRole('button',{name:"Search Failed"});
    await page.getByText("(User location not in NYC)");
});