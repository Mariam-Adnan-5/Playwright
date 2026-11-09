import { Locator , Page ,expect} from "@playwright/test"
import Actions from "../../utilities/actions"
import Assertions from "../../utilities/Assertions"
import BasePage from "./BasePage";

 export default class LoginPage extends BasePage{
// create page object that let us to use page fun
// Page is the Playwright type that represents a browser page.
// It tells TypeScript that "page" is a Playwright Page,
// so we can use Playwright functions like locator(), click(), goto(), and fill().   
// in class do not use (const) we use acesss modefier

// 1-Locator 
private readonly LoginBageUrl : string = 'https://nebula-test-lab-lv1.vercel.app/';
private readonly usernameInputFiled : Locator =this.page.locator('//input[@id="username-input"]')
private readonly passwordInputfiled : Locator  = this.page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
private readonly loginbutton : Locator =this.page.getByRole('button',{name:'Login'})
private readonly logoutbtn:Locator = this.page.locator('[id="btn-logout"]')
private readonly InvalidcredentialsMessage: Locator = this.page.getByText('Invalid credentials')

// 2- actions + business loguc
async enterusername(username:string ){
 await this.actions.enterTexttoElement(this.usernameInputFiled , username)
}

 async enterpassword(password:string ){

  await this.actions.enterTexttoElement(this.passwordInputfiled,password)
}

async clickonloginbtn(){
  await this.actions.clickonElement(this.loginbutton)
  try{ 
    await expect( this.InvalidcredentialsMessage).toHaveCount(1)}
  catch{ 
     console.log( await this.InvalidcredentialsMessage.innerText())  
     await this.assert.assertEkementIsVisible(this.logoutbtn)
}
 
  
  
}

async gotoLoginBage(){
    await this.actions.gotoLoginBage(this.page,this.LoginBageUrl)
    await this.assert.assertEkementIsVisible(this.passwordInputfiled)
}

}

