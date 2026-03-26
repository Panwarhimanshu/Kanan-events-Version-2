import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-page">
            <Navbar onOpenBooking={() => window.location.href = '/#expert-services'} />
            
            <header className="policy-header" style={{ background: '#003399', color: '#fff', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px' }}>Privacy Policy</h1>
                    <p style={{ opacity: '0.8', fontSize: '18px' }}>Standard Data Protection & User Privacy</p>
                </div>
            </header>

            <section className="policy-content" style={{ padding: '60px 0', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', color: '#334155', lineHeight: '1.8' }}>
                    <div className="policy-section">
                        <h2>Who Are We</h2>
                        <p>Kanan International Private Limited, a Company registered under the Companies Act, 2013 and having its registered office at D-wing, 2nd Floor, Trident Complex, Ellora Park Vadiwadi Road, Vadodara, Gujarat 390007, understands and respects the need and requirement to protect the privacy rights of its Users (“You”, “Your”). Kanan shall be the controller of the personal data/information which may be collected from You or which may be processed, in relation to the Services/Platform.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>What Is This Privacy Policy For</h2>
                        <p>This Privacy Policy provides You with an idea as to how the information that is collected on our platform is processed, protected and disseminated. This Privacy Policy shall be applicable to all Users using the Company’s website or Platform and applies to the data/information that is provided to the Company in the provision of the EdTech Platform/Service.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>PERSONAL DATA WHICH IS COLLECTED</h2>
                        <p>We collect and process the following data from You/Users including but not limited to:</p>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Name, email, address, mobile number, gender, etc. at the time of registering with Our Website and/or while creating a User account or while filling questionnaires or forms or when You subscribe to Company’s updates by email and/or upload or submit any material or content while using the Services/platform and/or the Kanan website.</li>
                            <li>Log-in/User details and password details during the User account sign-in/registration/change password etc. processes.</li>
                            <li>Financial details in respect of the subscriptions availed on the platform/website</li>
                            <li>Your data on social media (say Facebook profile data) if You choose to log in through Facebook or other social media</li>
                            <li>All communications and emails and other correspondence between You and Us</li>
                            <li>The entire range of material or the content which You post on the Platform/Website.</li>
                            <li>Your IP address(es), browser and Operating System specifications including mobile browser and mobile operating systems.</li>
                        </ul>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>HOW YOUR PERSONAL DATA MAY BE USED</h2>
                        <p>We collect the data only for legitimate and lawful purposes for providing You access to the Website and for the usage of the Services through the Platform.</p>
                        <p style={{ marginTop: '10px' }}>Your information shall be used to:</p>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Verification of identity at the time of signing into Your User account</li>
                            <li>Analyze, provide You with any statistical data on User account activity</li>
                            <li>Analyze the total number of users and visitors and domain names of internet service providers, in which event there would be no use of any personal information.</li>
                            <li>Contact You for queries posted on the Platform or contact You in any regard</li>
                            <li>Use for other purposes that We may disclose to You when We request your information.</li>
                        </ul>
                        <p style={{ marginTop: '15px' }}>We do not use any personally identifiable information for any other purpose other than for granting You access to Your User account or the Services and/or the Website. All Your payment (s) made through the partner payment gateway is/are safe and secure. If You choose to log in or sign up with Our Services through any social media like Facebook, etc. We request permission to access Your profile and seek appropriate permissions from You wherever required. If You click on links on third party websites, You shall be governed by their terms of use and privacy policies and We, do not control the manner as to how and in what manner such third parties collect Your personal data and information and how they use it. We, do not endorse neither We, shall be responsible for any data breach or infringement of Your privacy rights or for loss or damage whatsoever if You visit, use or access such third party websites. We may use Your contact information for marketing and promotional purposes about any prospective Service(s) of Kanan, however, if You decide and write to Us that We should refrain from using Your data/information in respect of any marketing or promotional purposes, We will honour Your decision. If You do not write to Us to let Us know of any objections to the use of the data/information, it shall signify that You have accorded us permission for such use of the data/information under law. Whichever way We use and process, please note that Your personal information shared by You is safe and secure and We use and process any information under the applicable laws and on Your consent for such processing for lawful purposes and for providing You the Service(s) and access to the Platform/Kanan Website. Your creation of the User account and log in every time You use Our Services and/or the Platform amounts to such valid consent.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>DISCLOSURE OF YOUR INFORMATION</h2>
                        <p>We may share information with a parent company, any subsidiaries, joint ventures, or other companies under a common control (collectively, “Affiliates”), provided that We require our Affiliates to honor this Privacy Policy. In the event of a corporate sale, merger, reorganization, dissolution of Kanan or similar event, Your personal data may be part of the transferred assets. We may also share Your personal data with our Related Companies for purposes consistent with this Privacy Policy. We may share Your information with third parties to whom You ask Us to send Your information. Kanan may hire agents, consultants, and related third parties to perform certain business-related functions, say, mailing information, maintaining databases and processing payments and We may share information with them. Please note that when We employ another entity to perform such functions, We only provide them with the information that they need to perform their specific function. In Our commitment to the applicable laws, We may disclose personal information if required to do so by law or to respond to government authorities/agencies for verification of identity or investigation and in the event of a legal proceeding, court process or other legal process/process of the court of law where We would be bound to do so by/under the applicable laws in force; or where We are mandated to establish or protect Our legal rights, intellectual property; and if it is necessary to verify the identity, prevent, detect or take action against any illegal activity/’ies, whatsoever including but not limited to cyber accidents, suspected or apprehended fraud, or where there is a reasonable apprehension of any situation(s) involving potential/material threats to the physical safety of any person, property etc. Kanan may disclose Your personal data if required to do so by law or in the good faith belief that such action is necessary in urgent circumstances to protect the personal safety of users of the Website or the public or to protect against legal liability including to resolve disputes, investigate problems, or enforce Our policies/agreements. We may share information, including personal information, with Our third-party service providers (such as credit card processors, managed cloud hosting providers like Amazon Web Services) for the purpose of providing the requisite hardware, software, networking, storage, and other services which We use, to keep Our Website/Service functional to maintain a high quality user experience. Each third-party service provider’s use of Your personal information is dictated by their respective privacy policy.</p>
                        
                        <p style={{ marginTop: '15px' }}>We do not and shall not permit:</p>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Any such third party service providers to use the data/information shared with them for the purpose of marketing their services; or</li>
                            <li>The use of the data/information for any other purpose other than in connection with the services they provide to Us.</li>
                        </ul>

                        <p style={{ marginTop: '15px' }}>We may use various marketing tools to create a better user experience for users visiting Our Website/Platform. These marketing tools permit Us to look at aggregated data such as scrolling patterns, clicks, and allow Us to run tests to determine which pages result in the best actions. However, Your personally identifiable information is not used by any of these tools. We may use the third-party service providers for tracking the user activity. We may use remarketing tracking cookies and conversion pixels from vendors such as Google and Facebook to present special offers to You for Our products or services over the Google Content Network and via social networks. Therefore, You, may see an advertisement for one of Our products or services as a result of visiting our Website. In addition, We, may use custom audiences based on e-mails and phone numbers of users. This allows Us to present special offers for our products and services to you via Facebook and Google. However, Your personally identifiable information is not used by any remarketing service other than to present You special offers from Us.</p>
                        
                        <p style={{ marginTop: '10px' }}>We may use the third-party service providers for remarketing:</p>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Facebook Ads</li>
                            <li>Google Adwords</li>
                            <li>Newsletters: We use MailChimp as Our e-mail service provider... (and other mentions)</li>
                        </ul>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>PAYMENT INFORMATION</h2>
                        <p>We use 256 BIT bit level of SSL standard data protection practices and technologies, and Your data is therefore protected in the course of transmission. Your data security is important to Us, however as no method of transmission over the internet or any method of electronic storage is completely secure, We, cannot guarantee You absolute security of Your data. However, We, shall strive to use reasonable and commercial acceptable means and industry standards to protect Your data/information.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>PERSONAL DATA TRANSFERS</h2>
                        <p>Your data/information is processed on cloud Servers in India However, Your data/Information may be even stored, transferred or transmitted over, and used, in such locations outside of Your state, region, county, province, country or other governmental/state jurisdiction where the privacy laws may not be as stringent or protective as the privacy laws in Your jurisdiction. Your data/Information may be subject to the local laws of the jurisdictions within which it is being collected, stored, used and/or disclosed and may be accessed by courts, law enforcement agencies, regulatory agencies and/or statutory authorities in such jurisdictions. In all such cases in the foregoing, by using or accessing The Service/Website/Platform You hereby unconditionally give Your consent to the access, storage, transfer, transmission of Your data/ Information and the usage and disclosure of Your data/information in all respects whatsoever.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>PERSONAL DATA RETENTION</h2>
                        <p>We adhere to the applicable laws with respect to retention of your data/information and We retain Your data/information only till the User account is subsisting with Us and in the event the User account is terminated/disabled due to any reason whatsoever, We shall not be responsible or liable either to maintain and/or hold any personal data/information whatsoever provided by You To know more about the grounds of such termination of User account.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>RIGHTS RELATED TO YOUR PERSONAL DATA</h2>
                        <p>Under laws in certain countries in which We operate, users and other visitors to Our Website from those countries have a right to access personal data about themselves, and to amend, correct or delete personal data that is inaccurate, incomplete or outdated. We will, upon request, provide You with confirmation regarding whether We are processing personal data about You, consistent with applicable laws. In addition, upon Your request, We will take reasonable steps to correct, amend, or delete Your personal data that is found to be inaccurate, incomplete or processed in a manner non-compliant with this Privacy Policy or applicable law, except where the burden or expense of providing access would be disproportionate to the risks to Your privacy, where the rights of persons other than You would be violated or where doing so is otherwise consistent with applicable laws. Please contact us at support@kanan.co to submit a request or obtain information regarding any of the above.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>COOKIES</h2>
                        <p>Kanan Website may use cookies to store visitors’ preferences; record user-specific information on what pages users access or visit; ensure that visitors are not repeatedly sent the same banner ads; or to customize Website/Platform content based on visitors’ browser type or other information that the visitor may send to Us. Kanan may also share information about Your use of Our Website with Our social media, advertising and analytics partners.</p>
                        <p style={{ marginTop: '10px' }}>Further Information and Contact Details: If You have any questions about the cookie section or if You would like more information on the cookies that We use and their purposes, please contact us at support@kanan.co .</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>Changes To The Privacy Policy</h2>
                        <p>We reserve the right to update and modify this Privacy Policy any time and from time to time without prior notice. We will update the effective date in the Privacy Policy. Please read and visit Our Privacy Policy every time for any changes, alterations, modifications etc. Changes to this Privacy Policy are effective when they are posted on this page of the Privacy Policy or made effective as per the changes. We request you to please review this Privacy Policy periodically, and especially before You provide any personal data.</p>
                    </div>

                    <div className="policy-section" style={{ marginTop: '40px' }}>
                        <h2>How Do I Contact Kanan Support?</h2>
                        <p>If You have any genuine questions or concerns in matters regarding this Privacy Policy, You may reach out to support@kanan.co for assistance.</p>
                    </div>
                </div>
            </section>

            <Footer hideCTA={true} />
            
            <style dangerouslySetInnerHTML={{ __html: `
                .policy-section h2 {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 12px;
                    font-family: 'Sora', sans-serif;
                }
                .policy-content p {
                    margin-bottom: 8px;
                }
                .policy-content ul li {
                    margin-bottom: 10px;
                }
            ` }} />
        </div>
    );
}

export default PrivacyPolicy;
