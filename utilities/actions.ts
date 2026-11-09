import { expect, Locator,Page } from "@playwright/test";
export default class  Actions{

async enterTexttoElement(elementLocator:Locator , text:string){
  await elementLocator.clear()   
  await elementLocator.fill(text);
  console.log(`Entering the  : ${text}`)    
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

async BillpaymentStep(ConsumerLocator:Locator,AmountLocator:Locator,PayNowbtn:Locator,consumer:string,Amount:string,name:string){
 await ConsumerLocator.fill(consumer)
 console.log(`the consumer ${name} number is ${consumer}`)
 await AmountLocator.fill(Amount) 
 console.log(`the ${name}amount number is ${Amount}`)
 await PayNowbtn.click()
 console.log('Pay now button is clicked')
}    

async edititem(itemLocator:Locator,newitem:string, name:string){
    await itemLocator.clear()
    itemLocator.fill(newitem)
    console.log(`${name} has been updated successfully`)

}
}