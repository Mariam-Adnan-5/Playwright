import{test }from '@playwright/test';
import { Login } from '../test-data/enums';
import LoginPage from '../pages/loginPage';
import BillPayments from '../pages/BillPayments';
import Profile from '../pages/Profile';


let email= Login.VALID_EMAIL
let password=Login.VALID_PASSWORD


test('login_with_valid_credentials',async({page})=>{
let login = new LoginPage(page);
await login.gotourl()
await login.enterEmail(email)
await login.enterPassword(password)
await login.clickonloginbtn()
//let title = login.getTitle()
//console.log(` the page title is :${title}`)
await page.waitForTimeout(4000)

})


test('login_with_invalid_credentials',async({page})=>{
let login = new LoginPage(page);
email=Login.INVALID_EMAIL
await login.enterEmail(email)
await login.enterPassword(password)
await login.clickonloginbtn()
await page.waitForTimeout(4000)

})

test('valid_WaterBillPayments',async({page})=>{
let login = new LoginPage(page);
let payment=new BillPayments(page)
await payment.gotourl()
await login.enterEmail(email)
await login.enterPassword(password)
await login.clickonloginbtn()
await payment.billPaymentUrl()
await payment.WaterBillPayments()
await payment.GasBillPayments()
await page.waitForTimeout(4000)
})

test('edit_profile',async({page})=>{
let login = new LoginPage(page);
let edit = new Profile(page)
await login.gotourl()
await login.enterEmail(email)
await login.enterPassword(password)
await login.clickonloginbtn()
await edit.profileurl()
await edit.clickedit()
await edit.editFullname("Mariam")
await edit.editEmail("ma@gmail.com")
await edit.savebtn()
await page.waitForTimeout(4000)
})

test('verify_profile_changes_persist_after_navigation',async({page})=>{
let login = new LoginPage(page);
let edit = new Profile(page)
await login.gotourl()
await login.enterEmail(email)
await login.enterPassword(password)
await login.clickonloginbtn()
await edit.profileurl()
await edit.clickedit()
await edit.editFullname("Mariam")
await edit.editEmail("ma@gmail.com")
await edit.savebtn()
await page.getByRole("link", { name: "Dashboard" }).click()
await edit.profileurl()
try {
    await edit.verifyProfileChanges("Mariam", "ma@gmail.com")
    console.log("Profile changes were saved successfully")
} catch (error) {
    console.log("Profile changes were not saved after navigation")
    throw error
}
await page.waitForTimeout(4000)
})