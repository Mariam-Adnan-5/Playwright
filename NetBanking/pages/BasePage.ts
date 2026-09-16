import{Page} from"@playwright/test"
import Actions from "../../utilities/actions"
import Assertions from "../../utilities/Assertions"
export default class BasePage {
    
    protected readonly page:Page 
    protected readonly actions:Actions = new Actions()
    protected readonly assert:Assertions = new Assertions()
    protected readonly LoginBageUrl : string = 'https://www.testerrank.com/banking/login';

    
    constructor(page:Page){
       this.page=page
    }
    async gotourl(){
       await this.actions.gotoLoginBage(this.page,this.LoginBageUrl)
}

   async getTitle() {
    return await this.page.title();
}
}