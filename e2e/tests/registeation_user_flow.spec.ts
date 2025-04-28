import { expect, test } from '@playwright/test';
import { registrationPage } from '../pages/registrationPage';
import { captureCurrentUrl, randomString, shortDelay, validatePageTitle } from '../utils/common_helper';
import { applicationFormData, pageTitles } from '../fixture/test-data';
import { loginPage } from '../pages/loginPage';

const email = randomString();
let applicationCardId: string | null = null;

test.describe('User registration and login flow',()=>{
    test('User Registration', async ({ page }) => {
        const rp = new registrationPage(page)
        await rp.navigateToBaseUrl()
        await rp.clickLoginToApply()
        await rp.enterEmail(email)
        await rp.clickNextBtn()
        await validatePageTitle(page, pageTitles.singupPageTitle)
        await rp.enterFirstName(applicationFormData.firstName)
        await rp.enterlastName(applicationFormData.lastName)
        await rp.enterPhoneNumber(applicationFormData.phoneNumber)
        await rp.enterPassword(applicationFormData.password)
        await rp.checkAgeBox()
        await rp.clickSubmit()
        await rp.pageTitleValidation(pageTitles.personalIfoFormTitle)
        await rp.fillDetailInfoForm(applicationFormData.detailInfoFormName);
        await rp.clickNextPageBtnAndAssert(pageTitles.extracurricularActivities);
        await rp.clickAndUpdateAddEntity(applicationFormData.entityOneName, applicationFormData.entityOneValue);
        await rp.clickAddBtnAndAssert();
        await rp.clickAndUpdateAddEntity(applicationFormData.entityTwoName, applicationFormData.entityTwoValue);
        await rp.clickAddBtnAndAssert();
        await shortDelay(page)
        await rp.clickNextBtn()
        await rp.pageTitleValidation(pageTitles.highSchoolInformation)
        await rp.fillSchoolInfoForm(applicationFormData.schoolName, applicationFormData.schoolCode)
        await rp.uploadDoc()
        await shortDelay(page)
        await rp.clickNextPageBtnAndAssert(pageTitles.essayPage)
        await rp.clickOnEssayAnimals()
        await rp.addAnswerOnEssayQuestion()
        await rp.clickOnEssaySchool()
        await rp.addAnswerOnEssayQuestion()
        await rp.clickOnEssayCar()
        await rp.clickOnEssayOther()
        await rp.clickNextBtn()
        await rp.assertreviewPageTitle()
        const applicationURL = await captureCurrentUrl(page)
        await rp.clickandAssertApplicationEssay()
        await rp.clickApplicationSubmitBtn()
        await rp.asserApplicationStatusOnHomePage()
        const id = await rp.getApplicationId();
        applicationCardId = id ? id : '';   
        await page.goto(applicationURL)
        await rp.assertreviewPageTitle()
        await rp.assertEditOption()
       });

    test('User Login',async({page})=>{
        const lp = new loginPage(page)
        await lp.navigateToBaseUrl()
        await lp.enterSingupedEmail(email)
        await lp.clickNextBtn()
        await lp.enterPassword(applicationFormData.password)
        await lp.clickSignInBtn()
        await lp.asserApplicationStatusOnHomePage()
        const id = await lp.getApplicationId();
        expect(id).toEqual(applicationCardId)
     })


})

