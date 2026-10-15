import{Locator, Page} from"@playwright/test"
import Actions from "../../utilities/actions"
import Assertions from "../../utilities/Assertions"
import BasePage from "./BasePage"
export default class HomePage extends BasePage{
 // locators
   private readonly javacheckbox =  this.page.locator('//*[@id="chk-java" and @type="checkbox"]')
   private readonly apicheckbox = this.page.locator('//*[@id="chk-api" and @type="checkbox"]')
   private readonly seniorRadiobtn= this.page.getByRole('radio',{name:"Senior"})

 // actions

  async checkedjava(){
    this.actions.checkelement(this.javacheckbox , 'java checkbox')
    this.assert.assertcheckingElement(this.javacheckbox)
  }

  async checkedapi(){
    this.actions.checkelement(this.apicheckbox , "api checkbox")
    this.assert.assertcheckingElement(this.apicheckbox)
  }
 
  async uncheckedjava(){
    this.actions.uncheckelement(this.javacheckbox ,' java checkbox')
    this.assert.assertuncheckingElement(this.javacheckbox)
  }
  

  async checkedseniorradiobtn(){
    this.actions.checkelement(this.seniorRadiobtn , "senior radio btn")
    this.assert.assertcheckingElement(this.seniorRadiobtn)
  }
   

}