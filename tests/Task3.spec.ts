import{expect, firefox, Page, test}from '@playwright/test';
 
test('Input-Filed',async({page})=>{

   const url = 'https://qaplayground.com/practice'
   const input = page.getByRole('textbox',{name:/Movie name/i})
   const movieNmae = 'BlackList'
   const submitbtn = page.getByRole('button',{name:/Submit/i})
   await page.goto(url)
   // click on input fileds link
   await page.getByRole('link',{name: /Input Fields/i}).click()
   //assersion
   await expect(submitbtn).toHaveId('submitMovieBtn')
   // s01 => 1. fill moviename on filed
   await input.fill(movieNmae)
   // 2. click on submit btn
   await submitbtn.click()
   // 3. assersion
   await expect (page.locator('[id="result-s01"]')).toHaveText(`You entered: ${movieNmae}`)
   
   await page.waitForTimeout(4000)

})
test('Dropdowns',async({page})=>{

   const url = 'https://qaplayground.com/practice'
   const selectedfruit = 'apple'
   const selectedcountry='India'
   await page.goto(url)
   // click on Dropdowns link
   await page.getByRole('link',{name: /Dropdowns Beginner/i}).click()
   // assersion
   await expect(page.getByRole('combobox',{name:/select Fruit/i})).toBeVisible()
   // single select by value
    await page.selectOption('[id="fruitSelect"]',{value :selectedfruit})
   //Asaersion
   //await expect(page.locator('[id="result-s01"]')).toContainText(/selectedfruit/i)
    // single select by Label 
   await page.selectOption('[id="countrySelect"]',{ label:selectedcountry})
   //Asaersion
   await expect(page.locator('[id="result-s02"]')).toContainText(selectedcountry)
   // Multi-Select Dropdown
   await page.selectOption('[id="heroSelect"]',['ant-man','aquaman'])
   await page.waitForTimeout(4000)

})
test('radio button and checkbox',async({page})=>{

   const url = 'https://qaplayground.com/practice'
   const starterRadiobtn=page.locator('[id="radio-plan-starter"]')
   const marketEmailcheckbox=page.locator('[id="notif_email_marketing"]')
   const smscheckbox=page.locator('[id="notif_sms_alerts"]')

   await page.goto(url)
   // click on radio & checkbox link
   await page.getByRole('link',{name: /Radio & Checkbox/i}).click()
   // assersion
   await expect(page.getByRole('checkbox',{name:/I accept the terms/i})).toBeVisible()
   // select starter radio btn
   await starterRadiobtn.click()
   // Assersion
    await expect(starterRadiobtn).toBeChecked()
   //check Marketing email & sms alerts
   await marketEmailcheckbox.check()
   await expect(marketEmailcheckbox).toBeChecked()
   await expect(smscheckbox).not.toBeChecked()

   await page.waitForTimeout(4000)

})
test('drag-and-drop automation',async({page})=>{

   const url = 'https://qaplayground.com/practice'
   const itemlocator=page.locator('[data-testid="dd-item"][ draggable="true"]')
   const DrophereLocator=page.locator('[data-testid="dd-drop-zone"][aria-label="Drop zone"]')
   const alpha = page.locator('[data-testid="dd-card"][data-card-id="card-1"]')
   const beta = page.locator('[data-testid="dd-card"][data-card-id="card-2"]')
   const zoneA = page.locator('[data-testid="dd-zone"][data-zone-id="zone-a"]')
   const zoneC = page.locator('[data-testid="dd-zone"][data-zone-id="zone-c"]')
   const result = page.locator('[id="result-s02"]')
   await page.goto(url)
   // click on Drag & Drop link
   await page.getByRole('link',{name:/Drag & Drop/i}).click()
   // assersion
   await expect(itemlocator).toHaveRole("img")
   //S01
   await itemlocator.dragTo(DrophereLocator)
   // S02 
   await alpha.dragTo(zoneA)
   await expect(zoneA).toContainClass('drag-drop-module__m7ivAa__labelledZone  drag-drop-module__m7ivAa__labelledZoneFilled')
   await beta.dragTo(zoneC)
   await expect (result).toContainText('1/3 matched')   
   await page.waitForTimeout(4000)

   
})
test('Alerts & Dialogs',async({page})=>{
 /* 3 type of dialog (
  1- Alert Dialog : only have ok btn
  2- Confirm Dialog : have ok and cancel btn
  3- Prompt Dialog : have ok and cancel btn and input filed
 )
 */
   const url = 'https://qaplayground.com/practice'
   const openInfo = page .getByRole('button',{name:/Open Info /i})
   const confirm = page.locator('[data-testid="open-confirm-dialog"]')
   await page.goto(url)
   // click on lerts & Dialogs link
   await page.getByRole('link',{name:/Alerts & Dialogs intermediate/i}).click()
   // 1- close info alert Dialog
   await openInfo.click()
   const dialog = page.getByRole('dialog')
   await dialog.getByRole('button', {name: /Close info dialog/i}).click()
   await page.waitForTimeout(2000)

   // 2- confirm dialog
   await confirm.click()
   await dialog.locator('[data-testid="confirm-ok-btn"]').click()
   await page.waitForTimeout(2000)

   
   await page.waitForTimeout(4000)

   
})