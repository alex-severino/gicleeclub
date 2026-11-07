/**
 * UK terms and privacy policy, drafted from the meaningful content of the earlier
 * Dutch documents. Have a solicitor review them before relying on them.
 *
 * A string is a numbered clause. A string[] is a bullet list under the clause before
 * it. A quote is a boxed block. [Label](href) makes a link.
 */
export type LegalItem = string | string[] | { quote: string[] };
export type LegalSection = { heading: string; items: LegalItem[] };

export const lastUpdated = "7 November 2026";

export const termsIntro =
  "These terms apply to everything we print and supply. They explain who we are, how ordering works, what happens if something goes wrong, and your right to cancel. If you are a consumer, nothing in them takes away your legal rights.";

export const terms: LegalSection[] = [
  {
    heading: "About us",
    items: [
      "Giclée Club is a trading name of Art Britannia Ltd, a company registered in England and Wales with company number 16631916. Our registered office is 12 Mulberry Place, Pinnell Road, London SE9 6AR.",
      "You can contact us at [hello@gicleeclub.com](mailto:hello@gicleeclub.com) or by post at the address above.",
      "“We”, “us” and “our” mean Art Britannia Ltd trading as Giclée Club. “You” means the person or business ordering from us.",
      "You are a “consumer” if you are an individual buying wholly or mainly for purposes outside your trade, business, craft or profession. You are a “business customer” if you are not. An artist buying prints to sell is a business customer. Some of these terms apply only to one or the other, and they say so.",
    ],
  },
  {
    heading: "These terms",
    items: [
      "These terms apply to all our quotations, orders and agreements for products and services.",
      "We can only agree to change them in writing. Email counts as writing.",
      "If you are a business customer, your own terms do not apply, even if they appear on your documents.",
    ],
  },
  {
    heading: "How to order",
    items: [
      "We do not take orders or payments on our website. To order, [contact us](/contact-us).",
      "Every order that includes a file passes through our AI approval system, which checks the quality of your file, including its resolution. If your file needs work, we will tell you, so that you can correct it or choose a different size.",
      "The prices and calculator on our website, and any quotation we send, are not an offer we are bound to accept. Any price shown as indicative is a guide until we confirm it.",
      "A contract between us begins only when we confirm your order by email. Where your order includes a file, we will do this after it has passed approval.",
      "We may decline an order, for example if a file cannot be printed to our standards, if we cannot supply the product, or if the artwork appears to be unlawful. If you have paid anything for that order, we will refund it.",
    ],
  },
  {
    heading: "Your artwork",
    items: [
      "You keep all rights in your artwork. You give us permission to store, copy and print it only as far as we need to in order to fulfil your order.",
      "You confirm that you own your artwork or have permission to have it printed, and that printing it will not break the law or infringe anyone’s rights.",
      "Please prepare your files as set out in our [Preparing Your Files](/preparing-your-files) guide. We print the file you send us. AI approval checks technical quality. It does not check your spelling, cropping, composition or colour choices, and we are not responsible for a problem in a print that comes from the file you supplied.",
      "If you are a business customer, you will indemnify us against claims by third parties that arise from the artwork, files or instructions you give us.",
    ],
  },
  {
    heading: "Prices",
    items: [
      "Our prices are in pounds sterling. They include VAT where it applies. They do not include delivery or other charges unless we say so.",
      "Our website can show prices in other currencies. These are a guide only, based on recent exchange rates. We charge in pounds sterling.",
      "The price that applies to your order is the one in our order confirmation. We can change the prices on our website at any time, but this does not affect orders we have already confirmed.",
      "If our costs rise in a way we could not have foreseen and we need to change the price of a confirmed order before we start work on it, we will tell you first. You can then cancel the order and we will refund anything you have paid.",
      "If the rate of VAT changes between our order confirmation and delivery, we will adjust the VAT you pay, unless you have already paid in full.",
    ],
  },
  {
    heading: "Payment",
    items: [
      "We will send you an invoice by email. We may ask for a deposit of up to 50% of the price when we confirm your order.",
      "Unless your invoice says otherwise, you must pay the balance within 7 days after delivery.",
      "We may ask for payment in full, or other reasonable security, before we print or dispatch your order.",
      "If you pay late, we may charge interest on the overdue amount until it is paid. For consumers, the rate is 4% a year above the Bank of England base rate. For business customers, we may claim interest and compensation under the Late Payment of Commercial Debts (Interest) Act 1998, and no reminder is needed before interest starts to run.",
      "We may also recover our reasonable costs of collecting an overdue amount.",
      "While any invoice is overdue, including one from an earlier order, we may stop work and hold back delivery until you have paid it.",
      "Business customers must pay in full, without any set-off, deduction or withholding, unless the law requires otherwise. If a business customer becomes insolvent, everything it owes us becomes due immediately.",
    ],
  },
  {
    heading: "Ownership and risk",
    items: [
      "Products remain ours until we have been paid for them in full.",
      "Risk in the products passes to you when they are delivered to you or to someone you have nominated.",
      "If you are a business customer, you must not sell or charge products until you have paid for them. If you do not pay on time, we may ask you to return unpaid products at your cost, and you must do so promptly.",
    ],
  },
  {
    heading: "Delivery",
    items: [
      "We deliver to the address you give us. Sample packs and other stock items are supplied while stocks last.",
      "We will confirm any delivery charge before you commit to an order. Free delivery applies to the countries listed on our [Shipping](/shipping) page.",
      "Delivery dates are estimates. Unless we agree otherwise, we will deliver without undue delay and within 30 days after we confirm your order. If you are a consumer, the law gives you rights if we are late. If you are a business customer, a delay does not entitle you to compensation or to end the contract, unless we have agreed that in writing.",
      "Please make sure someone can receive your delivery. If a delivery fails, or you ask us to delay it, you must pay our reasonable extra costs of storage and redelivery.",
      "Orders delivered outside the United Kingdom may be subject to import duties, taxes and customs charges on arrival. You are responsible for paying these.",
      "If a package looks opened or damaged when it arrives, please tell the courier if you can, take photographs, and let us know straight away. If you are a business customer and you do not do this within 7 days of delivery, we are not liable for damage in transit.",
    ],
  },
  {
    heading: "Your right to cancel (consumers)",
    items: [
      "Most of what we supply is made to your specification. This includes art prints of your artwork, proof strips, Premium Portfolio Sets, branded stickers and certificates. Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, the 14-day right to cancel does not apply to these products. You keep your rights if a product is faulty.",
      "For sample packs and other products that are not made to your specification, you can cancel without giving a reason. You have 14 days from the day after you receive the product, or the last product if your order arrives in parts.",
      "To cancel, tell us clearly by email to [hello@gicleeclub.com](mailto:hello@gicleeclub.com) or by post. You can use this wording, but you do not have to:",
      {
        quote: [
          "To: Art Britannia Ltd trading as Giclée Club, 12 Mulberry Place, Pinnell Road, London SE9 6AR, hello@gicleeclub.com",
          "I hereby give notice that I cancel my contract of sale of the following goods: [goods]. Ordered on [date] and received on [date]. Name: [your name]. Address: [your address]. Signature (if sent on paper). Date: [date].",
        ],
      },
      "You must send the product back within 14 days after telling us you are cancelling. If you return your complete order, we will pay the cost of returning it. Otherwise, you must pay it.",
      "We will refund the price and the standard delivery charge within 14 days after we receive the product back, or after you give us proof that you have sent it, if that is sooner. We may reduce the refund if the product has lost value because you handled it more than you needed to in order to inspect it.",
    ],
  },
  {
    heading: "If something is wrong",
    items: [
      "Please check your products as soon as you receive them, and tell us about any problem as soon as you can. Send us your order details, a clear description and photographs if possible, so that we can help quickly.",
      "If you are a consumer, the products we supply must be of satisfactory quality, fit for purpose and as described. Within 30 days of delivery you can reject a faulty product for a full refund. After that you can ask for a repair or replacement, and if that does not put things right, a price reduction or refund. You can find out more from [Citizens Advice](https://www.citizensadvice.org.uk).",
      "If you are a business customer, we guarantee that our products will be free from defects in manufacture and materials on delivery. This does not cover normal wear and tear, accidents, changes you make, negligence or misuse. You must tell us within 1 month after you discover a defect.",
      "Sample packs and proof strips show how our papers and printing look in general. Images, colours and descriptions on our website are a guide. Screens and paper show colour differently, so small differences from what you see on your screen are normal and are not a fault.",
    ],
  },
  {
    heading: "Our liability",
    items: [
      "Nothing in these terms limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else the law does not allow us to limit.",
      "If you are a consumer, we are responsible for loss you suffer that is a foreseeable result of our breaking these terms or failing to use reasonable care. We are not responsible for loss that is not foreseeable, or for loss of business or profit.",
      "If you are a business customer, we are not liable for indirect or consequential loss, or for loss of profit, savings or business. Our total liability for an order is limited to the price paid for that order. Any claim must be brought within 12 months of the event that gave rise to it.",
    ],
  },
  {
    heading: "Events outside our control",
    items: [
      "We are not responsible for delay or failure caused by events outside our reasonable control. These include civil unrest, natural disasters, failures by suppliers or couriers, problems with power, internet, computers or telecoms, computer viruses, strikes, government action, transport problems and severe weather.",
      "We will tell you as soon as we can, and our obligations will be suspended while the event lasts.",
      "If it lasts more than 30 days, either of us can end the contract in writing. We will refund anything you have paid for products you have not received.",
    ],
  },
  {
    heading: "Changing or ending an order",
    items: [
      "If an order needs to change after we have confirmed it, we will agree the change with you in writing, including any effect on price or delivery.",
      "You can end the contract if we seriously fail to do what we agreed and, where it can be put right, we do not do so within a reasonable time.",
      "We can end the contract if you do not pay on time, if you do not give us what we reasonably need to complete your order, or if we have good reason to believe that you will not meet your obligations. You must then pay for work already done and materials already bought, and we will refund anything you have paid above that.",
    ],
  },
  {
    heading: "Using our website",
    items: [
      "Everything on our website, including our name, logo, text, images and software, is protected by intellectual property rights belonging to us or to the artists and others who own them. You must not copy, reuse or change any of it without our written permission.",
      "You may use our website for your own personal purposes. You must not use it or its information for commercial, political or advertising purposes, or to send unsolicited offers.",
      "We may change, suspend or restrict our website at any time, for example to carry out updates. We do not promise that it will always be available or free from interruption.",
      "You are responsible for your own connection, and for protecting your device and data against threats such as viruses.",
    ],
  },
  {
    heading: "General",
    items: [
      "We may update these terms from time to time. The version on our website when we confirm your order applies to that order.",
      "You may not transfer your rights under a contract with us without our written consent. We may transfer ours to another organisation, and we will make sure this does not reduce your rights.",
      "Notices must be in writing and can be sent by email. Please make sure that any notice to us reaches us at [hello@gicleeclub.com](mailto:hello@gicleeclub.com).",
      "If any part of these terms is found to be invalid, the rest stays in force, and the invalid part will be replaced with the valid wording closest to what was intended.",
      "If we do not enforce a right straight away, we can still enforce it later.",
      "Nobody other than you and us has any rights under a contract between us.",
    ],
  },
  {
    heading: "Governing law",
    items: [
      "These terms are governed by the laws of England and Wales.",
      "If you are a business customer, the courts of England and Wales have exclusive jurisdiction over any dispute.",
      "If you are a consumer, you can bring a claim in the courts of England and Wales. If you live in Scotland or Northern Ireland, you can also bring a claim in your local courts. If you live elsewhere, you keep any mandatory consumer rights of the country you live in.",
    ],
  },
];

export const privacyIntro =
  "Giclée Club respects your privacy. This policy explains, as openly as we can, what personal data we collect, why we use it, and the rights you have under the UK GDPR and the Data Protection Act 2018.";

export const privacy: LegalSection[] = [
  {
    heading: "Who we are",
    items: [
      "Art Britannia Ltd trading as Giclée Club is the controller of your personal data. We are registered in England and Wales with company number 16631916. Our registered office is 12 Mulberry Place, Pinnell Road, London SE9 6AR.",
      "For any question about this policy, contact Angelina de Almeida Severino at [hello@gicleeclub.com](mailto:hello@gicleeclub.com).",
    ],
  },
  {
    heading: "The data we collect",
    items: [
      "Depending on how you deal with us, we may hold:",
      [
        "Contact details: your name, email address, phone number and postal address.",
        "Order details: what you order, your delivery address, invoices and payment records.",
        "Your files: the artwork and documents you send us, your signature if you order a certificate, and anything they contain, including images of other people.",
        "Messages: what you write to us through our contact form or by email.",
        "Technical data: your IP address, browser and the pages you request, recorded in our host’s server logs.",
      ],
      "If you send us artwork showing other people, please make sure you are allowed to share it with us.",
    ],
  },
  {
    heading: "Why we use your data",
    items: [
      "We use your data for these purposes, on these legal bases:",
      [
        "To reply to your enquiries: our legitimate interest in running our business, or at your request before entering into a contract.",
        "To check, print and deliver your order: to perform our contract with you.",
        "To keep accounts and meet our tax and legal obligations: legal obligation.",
        "To send you offers and news: your consent, or for existing customers, our legitimate interest in telling you about similar products. You can opt out at any time.",
        "To keep our website secure and working: our legitimate interest.",
      ],
      "If you do not give us the details we need for an order, we may not be able to fulfil it. We will tell you which details are required.",
    ],
  },
  {
    heading: "AI file approval",
    items: [
      "We use an automated AI system to check the technical quality of the files you send us, for example their resolution.",
      "This check looks at your file, not at you, and does not make decisions with legal or similarly significant effects on you. If you disagree with a result, tell us and a member of our team will look at it.",
    ],
  },
  {
    heading: "Who we share it with",
    items: [
      "We do not sell your personal data, and our partners cannot use it for their own marketing.",
      "We share it only as far as needed with:",
      [
        "Vercel, which hosts our website.",
        "Brevo, which delivers messages sent through our website.",
        "Google, which provides our email.",
        "Couriers, to deliver your order.",
        "Our professional advisers, such as accountants.",
        "Police, regulators and other authorities, where the law requires it or they make a valid request.",
      ],
    ],
  },
  {
    heading: "International transfers",
    items: [
      "Some of these providers process data outside the United Kingdom. When data leaves the UK, we rely on UK adequacy regulations or on appropriate safeguards such as the ICO’s International Data Transfer Agreement. You can ask us for details.",
    ],
  },
  {
    heading: "How long we keep it",
    items: [
      "We keep personal data only as long as we need it:",
      [
        "Enquiries that do not lead to an order: up to 2 years after our last contact.",
        "Orders, invoices and accounting records: 6 years after the end of the financial year they relate to.",
        "Your artwork files: as long as we need them to complete your order and deal with any reprint or complaint, unless you ask us to keep them longer.",
        "Marketing: until you unsubscribe.",
      ],
    ],
  },
  {
    heading: "Your rights",
    items: [
      "You have the right to:",
      [
        "ask for a copy of your personal data",
        "have inaccurate data corrected",
        "have your data erased",
        "restrict how we use your data",
        "object to our using your data, including for marketing",
        "receive your data in a portable format",
        "withdraw your consent at any time, where we rely on it",
      ],
      "To use any of these rights, email [hello@gicleeclub.com](mailto:hello@gicleeclub.com). It is free. We may ask you to confirm your identity if we need to.",
      "We will reply within one month. If your request is complex, or you have made several, we may take up to two further months and will tell you if so.",
      "If you are unhappy with how we have handled your data, please tell us first so that we can try to put it right. You can also complain to the Information Commissioner’s Office (ICO), the UK’s data protection regulator, at [ico.org.uk](https://ico.org.uk).",
    ],
  },
  {
    heading: "Offers and news",
    items: [
      "You may receive offers from us if you have signed up or if you are an existing customer. Every marketing email tells you how to stop. You can also ask us to stop at any time by emailing [hello@gicleeclub.com](mailto:hello@gicleeclub.com).",
    ],
  },
  {
    heading: "Cookies",
    items: [
      "Our website does not use analytics, advertising or tracking cookies.",
      "If you choose a currency, your browser remembers that choice on your own device so that prices keep showing in it. This stays in your browser, and you can clear it at any time in your browser settings.",
      "If we ever add cookies that need your consent, we will ask you first and update this policy.",
      "Our website links to other sites, such as Instagram. Their own privacy policies apply once you leave our website.",
    ],
  },
  {
    heading: "Keeping your data safe",
    items: [
      "We use appropriate technical and organisational measures to protect your personal data against loss and unauthorised access.",
    ],
  },
  {
    heading: "Changes to this policy",
    items: [
      "We may update this policy from time to time. The version on this page is the one that applies, and the date at the top shows when it last changed.",
    ],
  },
];
