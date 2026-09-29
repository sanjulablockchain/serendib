import { site } from "@/content/site";
import type { LegalDocument } from "@/types";

const { contact } = site;
const address = `${contact.address.street}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}`;
const effectiveDate = "September 29, 2026";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate,
  intro: `At ${site.name}, your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you visit our website, www.serendibhealthways.com, or interact with our services.`,
  sections: [
    {
      heading: "1. Information We Collect",
      items: [
        {
          term: "Personal Information",
          text: "We may collect personal details such as your name, email address, phone number, and other information you provide when you contact us, register, or interact with our services.",
        },
        {
          term: "Health Information",
          text: "As a health plan and provider network, we may collect medical information about your child, including medical history, treatment details, and health related data necessary for care and coverage.",
        },
        {
          term: "Automatic Data Collection",
          text: "We may collect information automatically when you visit our website, such as your IP address, browser type, and pages visited. This helps us improve your experience on the site.",
        },
      ],
    },
    {
      heading: "2. How We Use Your Information",
      items: [
        {
          term: "Medical Care",
          text: "We use personal and health information to coordinate medical services, referrals, authorizations, and treatment for your child.",
        },
        {
          term: "Communication",
          text: "We may use your contact details to send appointment reminders, health related updates, or other important information. We may also communicate with you about your account or service related matters.",
        },
        {
          term: "Website Analytics",
          text: "We use collected data to analyze how visitors interact with our website and to improve its functionality and user experience.",
        },
      ],
    },
    {
      heading: "3. How We Protect Your Information",
      paragraphs: [
        "We take reasonable measures to safeguard your personal and health information from unauthorized access, use, or disclosure. This includes encryption and secure server technology for online transactions. However, please note that no method of electronic transmission is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "4. Disclosure of Your Information",
      items: [
        {
          term: "Third Party Service Providers",
          text: "We may share your information with trusted third party vendors who assist in providing services such as payment processing, appointment scheduling, or communication. These providers are bound by confidentiality agreements and can only use your information for the specified purpose.",
        },
        {
          term: "Legal Requirements",
          text: "We may disclose your information if required to do so by law or in response to a legal request, such as a subpoena or court order.",
        },
        {
          term: "No Sharing for Marketing Purposes",
          text: "We do not share your personal information with third parties for marketing purposes.",
        },
        {
          term: "Commitment to Data Protection",
          text: "We commit not to transfer your personal data to any external organizations except for trusted service providers who are bound by confidentiality agreements and only for the purpose of providing our services. We take all necessary measures to prevent unauthorized sharing of your data.",
        },
      ],
    },
    {
      heading: "5. SMS Text Policy",
      paragraphs: [
        `By providing your phone number, you consent to receive text messages regarding your child's care, including appointment reminders and health related communication. You may opt out of these messages at any time by replying with "STOP" or following the instructions provided in the message.`,
      ],
    },
    {
      heading: "6. Your Rights and Choices",
      items: [
        {
          term: "Access to Information",
          text: "You may request access to your personal and health information that we have on file. Please contact us at the details provided below to make such a request.",
        },
        {
          term: "Correction of Information",
          text: "If you believe any of the information we have about you is incorrect or incomplete, you may request corrections.",
        },
        {
          term: "Opting Out of Communications",
          text: "You can opt out of receiving marketing communications from us by following the unsubscribe instructions in emails or by contacting us directly.",
        },
      ],
    },
    {
      heading: "7. Contact Us for Privacy Related Inquiries",
      paragraphs: [
        "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:",
      ],
      items: [
        { term: "Phone", text: contact.phone },
        { term: "Text", text: `${contact.text} (${contact.textNote})` },
        { term: "Mailing Address", text: address },
        { term: "Online", text: "Use the form on our Contact Us page." },
      ],
    },
    {
      heading: "8. Changes to the Privacy Policy",
      paragraphs: [
        `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this policy periodically to stay informed about how we protect your information.`,
      ],
    },
    {
      heading: "9. Governing Law",
      paragraphs: ["This Privacy Policy is governed by the laws of the State of California."],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and Conditions",
  effectiveDate,
  intro: `Welcome to www.serendibhealthways.com, the official website of ${site.name}. By accessing or using this website, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy.`,
  sections: [
    {
      heading: "1. Use of the Website",
      paragraphs: [
        "serendibhealthways.com is intended to provide information about our pediatric HMO and IPA services, health resources, and general educational content related to children's healthcare. You agree to use this website solely for lawful purposes and in accordance with all applicable local, state, and national laws.",
      ],
    },
    {
      heading: "2. Medical Information Disclaimer",
      paragraphs: [
        "The content on this website is for informational purposes only and should not be considered medical advice. The information provided through this site is not intended to replace professional medical care, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding medical conditions. In case of emergency, call your doctor or 911 immediately.",
      ],
    },
    {
      heading: "3. User Accounts and Security",
      paragraphs: [
        "If any part of the site requires you to register or create an account, you agree to provide accurate, current, and complete information and to maintain the security of your account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
      ],
    },
    {
      heading: "4. Intellectual Property",
      paragraphs: [
        `All content, features, and functionality on this site, including but not limited to text, graphics, logos, images, and software, are the property of ${site.name} or its licensors and are protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or otherwise use any content from this site without our prior written consent.`,
      ],
    },
    {
      heading: "5. Third Party Links",
      paragraphs: [
        `Our website may contain links to third party websites or resources. We do not control and are not responsible for the content, privacy policies, or practices of these third party sites. By using this website, you acknowledge and agree that ${site.name} is not liable for any damage or losses caused by your use of any third party websites.`,
      ],
    },
    {
      heading: "6. Limitation of Liability",
      paragraphs: [
        `To the fullest extent permitted by law, ${site.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website or any services provided through this site. This includes, without limitation, damages for loss of data, loss of profits, or any other damage.`,
      ],
    },
    {
      heading: "7. Privacy Policy",
      paragraphs: [
        "By using our website, you consent to our collection and use of your data in accordance with our Privacy Policy. Please read our Privacy Policy carefully to understand how we collect, use, and protect your personal information.",
      ],
    },
    {
      heading: "8. SMS Text Policy",
      paragraphs: [
        `By providing your phone number to ${site.name}, you consent to receive text messages from us regarding appointment reminders, health related communications, and other important notifications related to your child's care. You understand that these messages may be sent via automated systems, and that message and data rates may apply.`,
      ],
      items: [
        {
          term: "Opt In",
          text: "By providing your phone number, you opt in to receive text messages from us.",
        },
        {
          term: "Opt Out",
          text: `If you no longer wish to receive SMS communications from us, you can reply to any text message with the word "STOPALL" or follow the instructions provided in the text message.`,
        },
        {
          term: "Message Frequency",
          text: "The frequency of messages may vary depending on your care and communication preferences.",
        },
        {
          term: "No Charge for Messages",
          text: "There is no charge from us to receive text messages; however, standard message and data rates from your mobile provider may apply.",
        },
        {
          term: "Help",
          text: `If you need assistance or have questions regarding the SMS communications, text "HELP" to ${contact.text}.`,
        },
      ],
      closing: [
        "By consenting to this SMS text policy, you acknowledge that you have read and understood the information above.",
      ],
    },
    {
      heading: "9. Customer Support",
      paragraphs: [
        "If you need help or have any questions regarding these Terms and Conditions or any other aspect of our services, please contact us at:",
      ],
      items: [
        { term: "Phone", text: contact.phone },
        { term: "Text", text: `${contact.text} (${contact.textNote})` },
      ],
      closing: ["We are happy to assist you!"],
    },
    {
      heading: "10. Changes to the Terms",
      paragraphs: [
        `We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated "Effective Date." It is your responsibility to review these Terms regularly to stay informed of any changes. Your continued use of the site after any changes constitutes your acceptance of the new terms.`,
      ],
    },
    {
      heading: "11. Governing Law",
      paragraphs: [
        "These Terms and Conditions are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.",
      ],
    },
  ],
};
