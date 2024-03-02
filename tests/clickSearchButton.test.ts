import { test} from '@playwright/test';

test("Should ask the user to enable geolocation", async ({page}) =>{
    await page.goto("/");
    await page.hover("#SearchButton");
    await page.click("#SearchButton");
    await page.getByRole('button',{name:"Searching..."});
    await page.getByText("(Turn on Location Permission if not enabled)");
});