import { response } from "express";
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("email sent successfully", response);
  } catch (error) {
    console.log("error in email:", error);
    throw new error(`error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email,name) =>{

    const recipient = [{email}]

    try {
        await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "58354f66-cbcf-42bb-8313-5c422163b7a8",
            template_variables: {
                "company_info_name": "Authentication",
                "name": name
              }
        })
        console.log("email send successfully",response);
        
    } catch (error) {
        console.log("error in email:", error);
        throw new error(`error sending verification email: ${error}`);
    }
}
export const sendPasswordResetEmail = async(email,resetURL) =>{
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject:"Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
      category: "Password Reset",
    })
  } catch (error) {
    console.log("error sending password reset email",error.message);
    throw new Error("error sending password reset email",error.message);
  }
}

export const sendResetSuccessEmail = async (email) =>{
  const recipient = [{email}]
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject:"Password Reset Success",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset"
    })
    console.log("email sended successfully");
    
  } catch (error) {
    console.log("error sending success reset email",error.message);
    throw new Error("error sending success reset email",error.message);
  }
}