import { expect, Locator, Page } from "@playwright/test";
import { applicationFormData } from "../fixture/test-data";
import logger from "../utils/logger";
import { assertelementPresent, enterText } from "../utils/common_helper";


export class loginPage {
    enterEmail(email: string) {
        throw new Error('Method not implemented.');
    }
      page: Page;
      url: string;
      logoutDropdown: Locator
      logout:Locator
      emailInput: Locator;
      nextBtn: Locator;
      passwordInput: Locator
      signInBtn: Locator
      applicationCard: Locator
      captureApplicationCardId: Locator

constructor(page:Page){
   this.page = page
   this.url = '/login'
   this.emailInput = page.getByPlaceholder("Email Address");
   this.nextBtn = page.getByRole("button", { name: "Next" });
   this.passwordInput = page.getByPlaceholder("Password");
   this.signInBtn = page.getByRole("button", { name: "Sign In" });
   this.applicationCard = this.page.locator('.application-card')
   this.captureApplicationCardId = this.page.locator('.application-card__daysremaining')
   this.logoutDropdown = this.page.locator('#account-menu__button')
   this.logout = this.page.getByText('Log Out')
}

async navigateToBaseUrl() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
    await expect(this.page).toHaveTitle(applicationFormData.loginPageTitle);
    logger.info(`Navigate to Url ${this.url}`);
  }

async enterSingupedEmail(email: string) {
    await enterText(this.emailInput, email);
    await expect(this.emailInput).toHaveValue(email);
    logger.info(`Entered Email ${email}`);
  }

  async clickNextBtn() {
    await assertelementPresent(this.nextBtn)
    await this.nextBtn.click();
    logger.info(`Go on Next Page`);
  }

  async enterPassword(password: string) {
    await enterText(this.passwordInput, password);
    await expect(this.passwordInput).toHaveValue(password);
    logger.info(`Entered Email ${password}`);
  }

  async clickSignInBtn() {
    await assertelementPresent(this.signInBtn)
    await this.signInBtn.click();
    logger.info(`Go on Home Page`);
  }

  async asserApplicationStatusOnHomePage(){
    await expect(this.applicationCard).toHaveCount(1)
    await expect(this.applicationCard).toContainText(applicationFormData.applicationAcceptance)
    logger.info(`Verify Application status`);
  }

  async getApplicationId(){
    const getId = await this.captureApplicationCardId.textContent()
    return getId
  }
  
  async userLogout(){
    await this.logoutDropdown.click()
    await this.logout.click()
  }
}
