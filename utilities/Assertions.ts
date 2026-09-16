import { Locator,expect } from "@playwright/test"
export default class Assertions{
async assertEkementIsVisible(elementLocator:Locator){
await expect(elementLocator).toBeVisible()
}

async assertcheckingElement(elementLocator:Locator){
 await expect(elementLocator).toBeChecked()
 console.log(`asserting that element is checked`)
}

async assertuncheckingElement(elementLocator:Locator){
 await expect(elementLocator).not.toBeChecked()
 console.log(`asserting that element is not uchecked`)
}
async assertitemchanges(elementLocator:Locator,newitem:string){
  await expect(elementLocator).toHaveValue(newitem)  
}}