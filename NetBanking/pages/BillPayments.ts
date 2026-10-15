import { Locator , Page ,expect} from "@playwright/test"
import BasePage from "./BasePage";

export default class BillPayments extends BasePage{
 //Locator
 private readonly ConsumerLocator:Locator= this.page.locator('[id="consumerNumber"]')
 private readonly AmountLocator:Locator= this.page.locator('[id="billAmount"]')
 private readonly PayNowbtn:Locator= this.page.getByRole("button",{name:'Pay Now'})
 private readonly Water:Locator=this.page.locator('[data-testid="category-Water"]')
 private readonly Gas:Locator = this.page.locator('[data-testid="category-Gas"]')
 private readonly provider=this.page.locator('[id="billerProvider"]')

 // actions

   async billPaymentUrl(){
       await this.page.getByRole("link",{name:"Bill Payments"}).click()
     }
 async WaterBillPayments(){
    await this.Water.click()
    await this.provider.selectOption("SEWA Water - Sharjah")
    await this.actions.BillpaymentStep(this.ConsumerLocator,this.AmountLocator,this.PayNowbtn,"500","500","Water")

 }

  async GasBillPayments(){
    await this.Gas.click()
    await this.provider.selectOption("Emirates Gas")
    await this.actions.BillpaymentStep(this.ConsumerLocator,this.AmountLocator,this.PayNowbtn,"500","500","Gas")

 }




}