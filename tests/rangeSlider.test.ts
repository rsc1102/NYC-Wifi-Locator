import {  expect, test} from '@playwright/test';

test("Change Slider Value",async ({page}) =>{
    await page.goto("/");
    await dragSlider(150);
    await dragSlider(50);
    await dragSlider(200);
    await dragSlider(13);
    await dragSlider(188);

    async function dragSlider(finalValue:number){
        const slider = await page.locator("#searchRange");
        const currentSliderValue = await slider.inputValue();
        const sliderBound = await slider.boundingBox();
        let currX = (sliderBound!.width * parseFloat(currentSliderValue) / 200);
        const currY = sliderBound!.y + sliderBound!.height / 2;
        const targetX = sliderBound!.x + (sliderBound!.width * finalValue / 200);
        await slider.hover({position:{x:currX,y:0}});
        await page.mouse.down();
        await page.mouse.move(targetX, currY);
        await page.mouse.up();
        const newSliderValue = parseFloat(await slider.inputValue());

        // There will be some offset due to range slider's different knob sizes in different browsers.
        // That is why checking with some error expected.
        expect(Math.abs(finalValue - newSliderValue) < 20);
    }
    
});