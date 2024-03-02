import { expect, test} from '@playwright/test';

test("Change dropdown value",async ({page})=>{
    await page.goto("/");
    await selectWifiType("Free");
    await selectWifiType("Limited Free");
    await selectWifiType("Any");

    async function selectWifiType(wifiType:string){
        await page.selectOption("#wifiTypeDropdown",[
            {
                label:wifiType
            }
        ]);
        expect(page.locator("#wifiTypeDropdown")).toHaveValue(wifiType);
    }

});
