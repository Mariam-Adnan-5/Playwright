import{expect, firefox, test}from '@playwright/test';

// npx playwright test -g "login - textbox|click" in terminal

 /* test(x , y) =>  fun from playwright test to declaration a test case
    x =>  parameter 1 , name of the test case
    y =>  parameter 2 , fun containing the test steps
    Async =>  keyword to make the fun async so that we can use await keyword inside the fun
  */
test('login - textbox|click',async({page})=>{

   const url = 'https://nebula-test-lab-lv1.vercel.app/';
   const username='trainer'
   const password='selenium123'
   const usernameInputFiled=page.locator('//input[@id="username-input"]')
   const passwordInputfiled = page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
   const loginbutton =page.getByRole('button',{name:'Login'})

   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto(url);
   //enter username :" trainer"
   await usernameInputFiled.fill(username);
   //nter password :"selenium123"
   await passwordInputfiled.fill(password);
   //click login btn
   await loginbutton .click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 
   await page.waitForTimeout(5000)


});

test('login - invalid',async({page})=>{
   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto('https://nebula-test-lab-lv1.vercel.app/');
   //enter username :" trainer"
   await page.locator('//input[@id="username-input"]').fill('trainee');
   //nter password :"selenium123"
   await page.locator('(//label[@class="flex flex-col gap-1"])[2]//input').fill('selenium123');
   //click login btn
   await page.getByRole('button',{name:'Login'}).click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 
   await page.waitForTimeout(5000)


});

test('Checkboxes & Radio',async({page})=>{
   const url = 'https://nebula-test-lab-lv1.vercel.app/';
   const username='trainer'
   const password='selenium123'
   const usernameInputFiled=page.locator('//input[@id="username-input"]')
   const passwordInputfiled = page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
   const loginbutton =page.getByRole('button',{name:'Login'})
   //checkbox
   const javacheckbox = page.locator('//*[@id="chk-java" and @type="checkbox"]')
   const apicheckbox = page.locator('//*[@id="chk-api" and @type="checkbox"]')
   //radio btn
   const seniorRadiobtn=page.getByRole('radio',{name:"Senior"})
  
   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto(url);
   //enter username :" trainer"
   await usernameInputFiled.fill(username);
   //nter password :"selenium123"
   await passwordInputfiled.fill(password);
   //click login btn
   await loginbutton .click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 

   // click on Checkboxes & Radio
   await page.getByRole('link', {name: /03 checkboxes/i}).click()// /03 checbokes/  are regular expression , i => type of reqular expression make statments not sensitive(just apper and lower case)
     // check gava & api
   await javacheckbox.uncheck()
   await apicheckbox.check()

   // validate that the 2 checkbox are checked
   await expect(javacheckbox).not.toBeChecked()
   await expect(apicheckbox).toBeChecked()

    //select senior radio btn
    await expect(seniorRadiobtn).not.toBeChecked()
    await seniorRadiobtn.check()

    // validate that the radio btn is selected
    await expect(seniorRadiobtn).toBeChecked()
    await page.waitForTimeout(5000)



});

test('Drag & Drop',async({page})=>{
   const url = 'https://nebula-test-lab-lv1.vercel.app/';
   const username='trainer'
   const password='selenium123'
   const usernameInputFiled=page.locator('//input[@id="username-input"]')
   const passwordInputfiled = page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
   const loginbutton =page.getByRole('button',{name:'Login'})
   //drag and drop
   const rightbox = page.locator('[id="drop-right"]')
   const itemA = page.locator('[id="draggable-Item-A"]')
   const itemB = page.locator('[id="draggable-Item-B"]')
   const itemC = page.locator('[id="draggable-Item-C"]')


   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto(url);
   //enter username :" trainer"
   await usernameInputFiled.fill(username);
   //nter password :"selenium123"
   await passwordInputfiled.fill(password);
   //click login btn
   await loginbutton .click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 

   // click on drag and drop link
    await page.getByRole('link', {name: /05 Drag & Drop/i}).click()// /03 checbokes/  are regular expression , i => type of reqular expression make statments not sensitive(just apper and lower case)
   // drag item A from left box to right box
    await itemA.hover()
    await page.mouse.down()
    await rightbox.hover()
    await page.mouse.up()
    // another way
    await itemB.dragTo(rightbox)
    await itemC.dragTo(rightbox)
    await page.waitForTimeout(5000)



});

test('Drop Down',async({page})=>{
   const url = 'https://nebula-test-lab-lv1.vercel.app/';
   const username='trainer'
   const password='selenium123'
   const usernameInputFiled=page.locator('//input[@id="username-input"]')
   const passwordInputfiled = page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
   const loginbutton =page.getByRole('button',{name:'Login'})
   // dropdown
   const singleselectdropdown = page.locator('[id="single-select"]')

   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto(url);
   //enter username :" trainer"
   await usernameInputFiled.fill(username);
   //nter password :"selenium123"
   await passwordInputfiled.fill(password);
   //click login btn
   await loginbutton .click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 

   // click on Drop Down link
    await page.getByRole('link', {name: /09 Drop Down/i}).click()// /03 checbokes/  are regular expression , i => type of reqular expression make statments not sensitive(just apper and lower case)
   // select firefox from single select
   // first way
    await page.selectOption('[id="single-select"]',
        {
            value :'firefox' // by value
            // or by lable => lable : 'firefox'
            // or by index => index : 0 ( 0 is the first item in array)
        })
    // second way
   // await singleselectdropdown.click()
   // await page.getByRole('option').filter({hasText:/Edge/i}).click()

   // select API and UI from multiselect
    await page.selectOption('[id="multi-select"]',[
        {index:1} ,
        {value:'api'}
    
    ])
    await page.waitForTimeout(5000)



});

test('Alerts',async({page})=>{
   const url = 'https://nebula-test-lab-lv1.vercel.app/';
   const username='trainer'
   const password='selenium123'
   const usernameInputFiled=page.locator('//input[@id="username-input"]')
   const passwordInputfiled = page.locator('(//label[@class="flex flex-col gap-1"])[2]//input')
   const loginbutton =page.getByRole('button',{name:'Login'})

   //Alert 
   const simpleAlert =page.getByRole('button', {name :/Alert/i})
   const confirmAlert = page.getByRole('button',{name:/Confirm/i})
   const confirmMessage=page.locator('[id="confirm-out"]')
   
   await page.waitForTimeout(2000)
   //npx playwright test -g "login - textbox|click" in terminal
   await page.goto(url);
   //enter username :" trainer"
   await usernameInputFiled.fill(username);
   //nter password :"selenium123"
   await passwordInputfiled.fill(password);
   //click login btn
   await loginbutton .click()
   // assersion
   await expect(page.locator('[id="btn-logout"]')).toBeVisible() 
   // click on alerts link
    await page.getByRole('link', {name: /12 Alerts/i}).click()// /03 checbokes/  are regular expression , i => type of reqular expression make statments not sensitive(just apper and lower case)
   // click the alert btn
   page.on('dialog',async(alert)=>{
    const alertmesssage = alert.message
    console.log(alertmesssage)
    expect(alertmesssage).toEqual('Simple alert')
    await alert.accept()
   })
    await simpleAlert.click()
   // accept the alert

   // click on confirm alert with cancel
      await confirmAlert.click()
      page.on('dialog',async(alert)=>{
    const alertmesssage = alert.message
    console.log(alertmesssage)
    expect(alertmesssage).toEqual('Are you sure?')
    await alert.dismiss()
   })
   expect(confirmMessage).toHaveText('Cancel')

  //click on ok
    await confirmAlert.click()
      page.on('dialog',async(alert)=>{
    const alertmesssage = alert.message
    console.log(alertmesssage)
    expect(alertmesssage).toEqual('Are you sure?')
    await alert.accept()
   })
   expect(confirmMessage).toHaveText('OK')
  // assert that confirm is printed
  // click on prompt alert
  // enter mariam in the prompt
  // accept the alert
  // assert that mariam is printed

    
    await page.waitForTimeout(5000)



});

//


