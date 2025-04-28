import { expect, Locator, Page } from "@playwright/test";
import path from "path";


export const randomString = ()=>{
 const string =  Math.random().toString(36).substring(2,12).replace(/[0-9]/g,'');
 return string + `@testmail.com`
}

export const enterText = async(locator:Locator, text:string)=>{
   await locator.fill(text)
}

export const assertelementPresent = async(locator:Locator)=>{
   await expect(locator).toBeVisible()
}

export const uploadAFile = async(uploadFile:Locator, fileName:string)=>{
    const filePath = path.resolve(__dirname, fileName)
    await uploadFile.setInputFiles(filePath); 
}

export const captureCurrentUrl = async(page:Page)=>{
  const applicationURL = page.url()
  return applicationURL
}

export const validatePageTitle = async(page:Page, text:string)=>{
   await expect(page).toHaveTitle(text);
}

export const shortDelay = async(page:Page)=>{
   await page.waitForTimeout(5000)
}