import { expect, Locator,Page } from "@playwright/test";
export default class  Actions{

async enterTexttoElement(elementLocator:Locator , text:string){
  await elementLocator.clear()   
  await elementLocator.fill(text);
  console.log(`Entering the password : ${text}`)    
}

async clickonElement(elementLocator:Locator){
    await elementLocator.click()
    console.log(`clicking on login btn`)

}
async gotoLoginBage(page:Page , url:string){
    await page.goto(url);
    console.log(`Visiting this url ${url}`)
}
 async checkelement(elementLocator:Locator , elementname?:string | null | undefined){
   if(elementname){console.log(`checking element : ${elementname}`)}

    else{console.log(`checking element : ...`)}
    await elementLocator.check()

}

async uncheckelement(elementLocator:Locator , elementname?:string | null | undefined){
   if(elementname){
    console.log(`unchecking element :${elementname}`)
    }
    else{
        console.log(`unchecking element : ...`)
    }
  
    await elementLocator.uncheck()}

}