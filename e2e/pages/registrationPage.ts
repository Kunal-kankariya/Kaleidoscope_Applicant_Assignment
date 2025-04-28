import { Page, Locator, test, expect } from "@playwright/test";
import { assertelementPresent, enterText, shortDelay, uploadAFile } from "../utils/common_helper";
import logger from "../utils/logger";
import path from "path";
import { applicationFormData, filePaths } from "../fixture/test-data";

export class registrationPage {
  page: Page;
  url: string;
  loginToApply: Locator;
  emailInput: Locator;
  nextBtn: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  phoneInput: Locator;
  passwordInput: Locator;
  ageCheckbox: Locator;
  submitBtn: Locator;
  pageTitle: Locator;
  streetAddress: Locator;
  additionalStreetAddress: Locator
  state: Locator
  city: Locator
  zipCode: Locator
  country: Locator
  stateDropDownOption:Locator
  countryDropDownOption:Locator
  nextPageBtn: Locator
  addEntry: Locator
  extracurricularActivityName: Locator
  totalNumberOfYearsInvolved:Locator
  activityList:Locator
  descriptionOfInvolvement: Locator
  addBtn: Locator
  addedEntry: Locator
  closeModule:Locator
  highSchoolName: Locator 
  highSchoolStreetAddress: Locator
  highSchoolCity: Locator
  highSchoolState: Locator
  highSchoolStateDropDownOption: Locator
  highSchoolZipCode: Locator
  gpa: Locator 
  yearOfHighSchoolGraduation: Locator
  selectCalendarDate: Locator
  uploadFile: Locator
  uploadedFile: Locator
  carsEssay:Locator
  animalsEssay:Locator
  schoolEssay:Locator
  otherEssay:Locator
  essayAbout:Locator
  essayQuestion: Locator 
  applicationEssay: Locator
  applicationSubmitBtn: Locator
  editBtn: Locator
  essayTypes: Locator
  animalEssayTitle: Locator
  schoolEssayTitle: Locator
  applicationCard: Locator
  reviewApplication: Locator
  captureApplicationCardId: Locator


  constructor(page: Page) {
    this.page = page;
    this.url = "/program/sdet-test-scholarship";
    this.loginToApply = page.getByRole("button", { name: "Log In to Apply" });
    this.emailInput = page.getByPlaceholder("Email Address");
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.phoneInput = page.getByPlaceholder("1 (702) 123-4567");
    this.passwordInput = page.getByLabel("Create a Password");
    this.ageCheckbox = page.getByLabel(
      "I confirm that I am at least 13 years old"
    );
    this.submitBtn = page.getByLabel("Submit");
    this.pageTitle = page.getByTestId('page-title')
    this.streetAddress = page.getByPlaceholder("Enter your street address");
    this.additionalStreetAddress = page.getByPlaceholder("Enter additional street address (e.g. Apt Number)");
    this.state = page.getByPlaceholder('Enter your state')
    this.stateDropDownOption = page.getByText("Alaska");
    this.city = page.getByPlaceholder("Enter your city");
    this.zipCode = page.getByPlaceholder("Enter your zip code");
    this.country = page.getByPlaceholder("Enter your country");
    this.countryDropDownOption = page.getByText("Algeria");
    this.nextPageBtn = page.getByRole('button', { name: 'Next Page' });
    this.addEntry = page.getByRole('button', {name:'Add Entry'})
    this.extracurricularActivityName = page.getByPlaceholder('Short Input')
    this.totalNumberOfYearsInvolved = page.getByPlaceholder('123') 
    this.activityList = page.getByPlaceholder('Long Input')
    this.descriptionOfInvolvement = page.getByPlaceholder('Long Input')
    this.addBtn = page.getByRole('button', {name:'Add'})
    this.closeModule = page.getByLabel('Close Add Entry modal')
    this.highSchoolName = page.getByPlaceholder('Please enter the name of your current High School')
    this.highSchoolStreetAddress = page.getByPlaceholder('Enter high school street address')
    this.highSchoolCity = page.getByPlaceholder('Enter high school city')
    this.highSchoolState = page.getByPlaceholder('Enter high school state')
    this.highSchoolStateDropDownOption = page.getByText("Alaska");
    this.highSchoolZipCode = page.getByPlaceholder('e.g. 55413')
    this.gpa = page.getByPlaceholder('Enter your current GPA')
    this.yearOfHighSchoolGraduation = page.getByPlaceholder('Enter a date')
    this.selectCalendarDate = page.getByText('30')
    this.uploadFile = page.locator('input[type="file"]');
    this.uploadedFile = page.getByRole('button', {name: 'My School Transcript.pdf'})
    this.carsEssay = page.getByLabel('Cars')
    this.animalsEssay = page.getByLabel('Animals')
    this.schoolEssay = page.getByLabel('School')
    this.otherEssay = page.getByLabel('Other')
    this.essayAbout = page.locator('.mantine-Textarea-label')
    this.essayQuestion = page.getByPlaceholder('Long Input')
    this.applicationEssay = page.getByRole('button', {name:'Essay'})
    this.applicationSubmitBtn = page.getByRole('button', {name: 'Submit'})
    this.editBtn = page.locator('.mantine-Button-label').getByText('Edit')
    this.essayTypes = this.page.getByText('Animals, School')
    this.animalEssayTitle = this.page.getByText('Essay about Animals')
    this.schoolEssayTitle = this.page.getByText('Essay about School')
    this.applicationCard = this.page.locator('.application-card')
    this.reviewApplication = this.page.getByText('Review Your Application')
    this.captureApplicationCardId = this.page.locator('.application-card__daysremaining')
  }

  async navigateToBaseUrl() {
    await this.page.goto(this.url);
    await expect(this.page).toHaveURL(this.url);
    await expect(this.page).toHaveTitle(applicationFormData.appTitle);
    logger.info(`Navigate to Url ${this.url}`);
  }

  async clickLoginToApply() {
    await assertelementPresent(this.loginToApply)
    await this.loginToApply.click();
    await assertelementPresent(this.emailInput)
    logger.info(`Apply to Login`);
  }

  async enterEmail(email: string) {
    await enterText(this.emailInput, email);
    await expect(this.emailInput).toHaveValue(email);
    logger.info(`Entered Email ${email}`);
  }

  async clickNextBtn() {
    await assertelementPresent(this.nextBtn)
    await this.nextBtn.click();
    logger.info(`Go on Next Page`);
  }

  async enterFirstName(text: string) {
    await enterText(this.firstNameInput, text);
    await expect(this.firstNameInput).toHaveValue(text);
    logger.info(`Entered First Name ${text}`);
  }

  async enterlastName(text: string) {
    await enterText(this.lastNameInput, text);
    await expect(this.lastNameInput).toHaveValue(text);
    logger.info(`Entered Last Name ${text}`);
  }

  async enterPhoneNumber(text: string) {
    await enterText(this.phoneInput, text);
    logger.info(`Entered Phone Number ${text}`);
  }

  async enterPassword(text: string) {
    await enterText(this.passwordInput, text);
    await expect(this.passwordInput).toHaveValue(text);
    logger.info(`Entered Password ${text}`); 
  }

  async checkAgeBox() {
    await assertelementPresent(this.ageCheckbox)
    await this.ageCheckbox.click();
    await expect(this.ageCheckbox).toBeChecked();
    logger.info(`Click age check box`);
  }

  async clickSubmit() {
    await assertelementPresent(this.submitBtn)
    await this.submitBtn.click();
    logger.info(`Click submit button`);
  }

  async pageTitleValidation(text:string){
    await expect(this.pageTitle).toHaveText(text)
    logger.info(`Validate Page Title`);
  }

  async fillDetailInfoForm(text:string){
    await enterText(this.streetAddress, text)
    await enterText(this.additionalStreetAddress, text)
    await this.state.click()
    await this.stateDropDownOption.click()
    await enterText(this.city, text)
    await enterText(this.zipCode, text)
    await this.country.click()
    await this.countryDropDownOption.click()
    logger.info(`fill Detail Info Form`);
  }

  async clickNextPageBtnAndAssert(text:string){
    await assertelementPresent(this.nextPageBtn)
    await this.nextPageBtn.click()
    await expect(this.pageTitle).toHaveText(text)
    logger.info(`Click Detail Info Form Next Page`);
  }

  async clickAndUpdateAddEntity(text:string, value:string){
    await expect(this.closeModule).not.toBeVisible()
    await assertelementPresent(this.addEntry)
    await this.addEntry.click()
    await enterText(this.extracurricularActivityName, text)
    await enterText(this.totalNumberOfYearsInvolved, value)
    await enterText(this.activityList.first(), text)
    await enterText(this.descriptionOfInvolvement.last(), text)
    logger.info(`Add Entities`);
  }

  async clickAddBtnAndAssert(){
    await assertelementPresent(this.addBtn.last())
    await this.addBtn.last().click()
    logger.info(`Click Add Entities`);
  }

  async fillSchoolInfoForm(text:string, value:string){
    await enterText(this.highSchoolName, text)
    await enterText(this.highSchoolStreetAddress, text)
    await enterText(this.highSchoolCity, text)
    await this.highSchoolState.click()
    await this.highSchoolStateDropDownOption.click()
    await enterText(this.highSchoolZipCode, value)
    await enterText(this.gpa, value)
    await this.yearOfHighSchoolGraduation.click()
    await this.selectCalendarDate.click()
    logger.info(`fill School Info Form`);
  }

  async uploadDoc(){
    await uploadAFile(this.uploadFile, filePaths.transcriptFile)
    await assertelementPresent(this.uploadedFile)
    logger.info(`Uplaod File`);
  }

  async clickOnEssayCar(){
    await this.carsEssay.first().click()
    await expect(this.carsEssay.first()).toBeChecked()
    await shortDelay(this.page)
    await expect(this.essayAbout.first()).toHaveText(applicationFormData.carTypeTitle)
    await this.carsEssay.first().click()
    await shortDelay(this.page)
    await expect(this.carsEssay.first()).not.toBeChecked()
    logger.info(`Check Validate and uncheck Essay on car`);
  }

  async clickOnEssayOther(){
    await this.otherEssay.first().click()
    await expect(this.otherEssay.first()).toBeChecked()
    await expect(this.essayAbout.last()).toHaveText(applicationFormData.otherTypeTitle)
    await this.otherEssay.first().click()
    await shortDelay(this.page)
    await expect(this.otherEssay.first()).not.toBeChecked()
    logger.info(`Check validate and uncheck essay on other`);
  }
  
  async clickOnEssayAnimals(){
    await this.animalsEssay.first().click()
    await expect(this.animalsEssay.first()).toBeChecked()
    await expect(this.essayAbout.last()).toHaveText(applicationFormData.animalTypeTitle)
    logger.info(`Check Validate Essay on Animal`);
  }
  
  async addAnswerOnEssayQuestion(){
    await enterText(this.essayQuestion.last(), applicationFormData.answersForTypeQuestions)
    logger.info(`Add Essay`);
  }

  async clickOnEssaySchool(){
    await this.schoolEssay.first().click()
    await expect(this.schoolEssay.first()).toBeChecked()
    await expect(this.essayAbout.last()).toHaveText( applicationFormData.schoolTypeTitle)
    logger.info(`Check Validate Essay on School`);
  }
  
  async clickandAssertApplicationEssay(){
    await this.applicationEssay.click()
    await assertelementPresent(this.essayTypes)
    await assertelementPresent(this.animalEssayTitle)
    await assertelementPresent(this.schoolEssayTitle)
    logger.info(`Review Application`);
  }
  
  async assertreviewPageTitle(){
    await assertelementPresent(this.reviewApplication)
    logger.info(`Review Application Title`);
  }

  async clickApplicationSubmitBtn(){
    await this.applicationSubmitBtn.click()
    await expect(this.applicationCard).toHaveCount(1)
    await expect(this.applicationCard).toContainText(applicationFormData.applicationAcceptance)
    logger.info(`Click Submit to Application`);
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

 async assertEditOption(){
  await expect(this.editBtn).not.toBeVisible()
  logger.info(`Validate Review Page Edit Option`);
 }
}
