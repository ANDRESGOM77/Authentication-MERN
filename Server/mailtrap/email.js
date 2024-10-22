import { response } from "express";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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