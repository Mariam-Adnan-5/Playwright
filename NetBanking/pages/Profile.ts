import { Locator ,expect } from "@playwright/test"
import BasePage from "./BasePage";

export default class Profile extends BasePage{
//Locator
private readonly editbtn:Locator=this.page.locator('[id="editPersonalInfoBtn"]')
private readonly fullnameLocator=this.page.locator('[id="fullName"]')
private readonly emailLocator=this.page.locator('[id="email"]')
private readonly savechange:Locator=this.page.locator('[id="saveChangesBtn"]')


//actions
 async profileurl(){
       await this.page.getByRole("link",{name:"Profile & Settings"}).click()
     }
     
 async clickedit(){
    await this.editbtn.click()
    await console.log('edit btn is clicked')
 }
 async editFullname(newitem:string){
  await this.actions.edititem(this.fullnameLocator,newitem,"fullname")
  await this.assert.assertitemchanges(this.fullnameLocator,newitem)

 }

 async editEmail(newitem:string){
  await this.actions.edititem(this.emailLocator,newitem,"Email")
  await this.assert.assertitemchanges(this.emailLocator,newitem)
 }

 async savebtn(){
    await this.savechange.click()
   await console.log('save change btn is clicked')

 }
async verifyProfileChanges(fullname: string, email: string) {
    await expect(this.fullnameLocator).toHaveValue(fullname)
    await expect(this.emailLocator).toHaveValue(email)
}
}