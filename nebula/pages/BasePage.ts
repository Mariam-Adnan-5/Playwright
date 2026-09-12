import{Page} from"@playwright/test"
import Actions from "../../utilities/actions"
import Assertions from "../../utilities/Assertions"
export default class BasePage {
    
    protected readonly page:Page 
    protected readonly actions:Actions = new Actions()
    protected readonly assert:Assertions = new Assertions()
    
    constructor(page:Page){
       this.page=page
    }
}