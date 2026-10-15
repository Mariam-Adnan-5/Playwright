import{test as baseTest}from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"

type pages ={
    loginPage : LoginPage ,
    homepage : HomePage
}

const testPages = baseTest.extend<pages>({
   loginPage : async({page}, use)=>{
    await use(new LoginPage(page))
   } ,
   homepage : async({page}, use)=>{
    await use(new HomePage(page))
   }
})
   export const test =testPages
