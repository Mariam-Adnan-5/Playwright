import { Locator , Page ,expect} from "@playwright/test"
import BasePage from "./BasePage";


export default class LoginPage extends BasePage{

// 1-Locator 

private readonly LoginBageUrl : string = 'https://www.testerrank.com/banking/login';
private readonly EmailInputFiled : Locator =this.page.getByRole('textbox', { name: 'User ID / Email' })
private readonly passwordInputfiled : Locator  = this.page.getByRole('textbox', { name: 'Password' })
private readonly signinbutton : Locator =this.page.locator('[id="loginBtn"]')
private readonly nav_Dashboard:Locator = this.page.locator('[data-testid="nav-dashboard"]')
private readonly InvalidcredentialsMessage: Locator = this.page.locator('[data-testid="errorMsg"]')



// actions
async enterEmail(username:string){
 await this.actions.enterTexttoElement(this.EmailInputFiled, username)
}

async enterPassword(username:string){
 await this.actions.enterTexttoElement(this.passwordInputfiled, username)
}

async signinloginbtn(){
await this.actions.clickonElement(this.signinbutton)
await this.assert.assertEkementIsVisible(this.nav_Dashboard)
}

async clickonloginbtn(){
await this.actions.clickonElement(this.signinbutton)
  try{ 
    await expect( this.InvalidcredentialsMessage).toHaveCount(1)
    console.log( await this.InvalidcredentialsMessage.innerText())  }

  catch{ 
     await this.assert.assertEkementIsVisible(this.nav_Dashboard)
}

}} 
