import React from "react";
import styles from "./design/About.module.css";

export const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* TOP HERO / TITLE */}
      <section className={styles.aboutHero}>
        <h1>
          About <span className={styles.M}>Malkheda</span>{" "}
          <span className={styles.P}>Premier</span>{" "}
          <span className={styles.L}>League</span>
        </h1>
        <p>
          A local cricket festival that brings the people of Malkheda and nearby
          villages together with the true spirit of sportsmanship.
        </p>
      </section>

      {/* MAIN INTRO SECTION */}
      <section className={styles.mainSection}>
        <div className={styles.textBlock}>
          <h2>Introduction</h2>
          <p>
            बंजारा समाजाची एक अत्यंत सुंदर क्रिकेट स्पर्धा यंदा मालखेडा गावात
            आयोजित करण्यात येत आहे. मालखेडा प्रीमियर लीग (MPL) ही केवळ क्रिकेट
            स्पर्धा नसून, गावातील लोकांना एकत्र आणण्याचा आणि एकजूट वाढवण्याचा
            उपक्रम आहे.
          </p>
          <p>
            गावातील प्रत्येक स्तरातील युवा खेळाडू, प्रेक्षक, उत्साही नागरिक आणि
            बंजारा बांधव एकत्र येऊन हा क्रिकेट महोत्सव साजरा करतात. मैदानावरचा
            उत्साह आणि गॅलरीतील जयघोष MPL ला अगदी खास बनवतो.
          </p>
        </div>

        {/* VIDEO BLOCK */}
        <div className={styles.videoBlock}>
          <video
            className={styles.aboutVideo}
            src="./images/video2.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="./images/g6.jpeg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* HISTORY / TIMELINE SECTION */}
      <section className={styles.historySection}>
        <h2>MPL History</h2>
        <p className={styles.sectionSubtext}>
          प्रत्येक सिझनमध्ये वेगळी रोमांचक कथा, नवे हिरो आणि अविस्मरणीय क्षण.
        </p>
        <div className={styles.timeline}>
          {/* Season 1 */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineTopRow}>
              <span className={styles.year}>Season 1</span>
              <span className={styles.championTag}>Champions</span>
            </div>

            <div className={styles.winnerRow}>
              <img
                src="./images/logo9.jpeg"
                alt="Black Panther Team Logo"
                className={styles.winnerLogo}
              />
              <div>
                <h3 className={styles.winnerName}>Black Panther</h3>
                <span className={styles.winnerCaption}>vs Dipak Warriors</span>
              </div>
            </div>

            <p>
              पहिल्या सिझनमध्ये अंतिम सामना <strong>Black Panther</strong>{" "}
              विरुद्ध <strong>Dipak Warriors</strong> असा रंगला. रोमांचक लढत देत{" "}
              <strong>Black Panther</strong> संघाने पहिल्या MPL चे विजेतेपद
              पटकावले.
            </p>
          </div>

          {/* Season 2 */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineTopRow}>
              <span className={styles.year}>Season 2</span>
              <span className={styles.championTag}>Champions</span>
            </div>

            <div className={styles.winnerRow}>
              <img
                src="./images/logo3.jpg"
                alt="Dipak Warriors Team Logo"
                className={styles.winnerLogo}
              />
              <div>
                <h3 className={styles.winnerName}>Dipak Warriors</h3>
                <span className={styles.winnerCaption}>
                  vs Vishwanath Warriors
                </span>
              </div>
            </div>

            <p>
              दुसऱ्या सिझनमध्ये अंतिम सामना <strong>Dipak Warriors</strong>{" "}
              विरुद्ध <strong>Vishwanath Warriors</strong> असा झाला. दमदार खेळ
              करीत <strong>Dipak Warriors</strong> यांनी या सिझनचे विजेतेपद
              आपल्या नावे केले.
            </p>
          </div>

          {/* Season 3 (Current) */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineTopRow}>
              <span className={styles.year}>Season 3 (Current)</span>
              <span className={styles.championTagCurrent}>Live Season</span>
            </div>

            <p>
              हा MPL चा तिसरा सिझन आहे. अधिक संघ, उत्तम आयोजन, लाईव्ह ऑक्शन आणि
              रोमांचक सामने – यंदा कोणता संघ विजेता ठरणार, हे पाहणे सगळ्यांसाठीच
              उत्सुकतेचे ठरणार आहे.
            </p>
            <p className={styles.highlightNote}>
              👀 लाईव्ह स्कोअर्स, अपडेट्स आणि ऑक्शन हायलाइट्ससाठी MPL च्या
              अधिकृत पेजवर नजर ठेवा.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: ALL TEAMS SECTION */}
      <section className={styles.teamsSection}>
        <h2>All MPL Teams</h2>
        <p className={styles.sectionSubtext}>
          सहा दमदार संघ, वेगवेगळ्या खेळशैली आणि एकच स्वप्न – MPL ट्रॉफी 🏆
        </p>

        <div className={styles.teamsGrid}>
          {/* Team 1 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logo2.jpeg"
              alt="Vishwanath Warriors Logo"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Vishwanath Warriors</h3>
            <p className={styles.teamOwner}>Owner: Ganesh Chavan</p>
          </div>

          {/* Team 2 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logo3.jpg"
              alt="Dipak Warriors"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Dipak Warriors</h3>
            <p className={styles.teamOwner}>Owner: Dipak Ashok Naik</p>
          </div>

          {/* Team 3 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logoJijau.jpeg"
              alt="Jijau Fighter Logo"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Jijau Fighter</h3>
            <p className={styles.teamOwner}>Owner: Samadhan Naik</p>
          </div>

          {/* Team 4 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logo8.jpeg"
              alt="Mato Shree Group"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Mato Shree Group</h3>
            <p className={styles.teamOwner}>Owner: Manish Pawar</p>
          </div>

          {/* Team 5 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logo6.jpeg"
              alt="Vishnu Blaster Logo"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Vishnu Blaster</h3>
            <p className={styles.teamOwner}>Owner: Vishnu Kailash Rathod</p>
          </div>

          {/* Team 6 */}
          <div className={styles.teamCard}>
            <img
              src="./images/logo4.jpeg"
              alt="Ram Rajya Pratishthan Logo"
              className={styles.teamLogo}
            />
            <h3 className={styles.teamName}>Ram Rajya Pratishthan</h3>
            <p className={styles.teamOwner}>Owner: Umesh Rathod</p>
          </div>
        </div>
      </section>
      
      {/* TOURNAMENT STRUCTURE */}
      <section className={styles.structureSection}>
        <h2>Tournament Structure</h2>
        <p className={styles.sectionSubtext}>
          प्रत्येक सिझनमध्ये स्पष्ट आणि रोमांचक टुर्नामेंट फॉरमॅट ठेवण्यात आले
          आहे.
        </p>
        <div className={styles.structureGrid}>
          <div className={styles.structureCard}>
            <h3>League Stage</h3>
            <p>
              सर्व संघ एकमेकांविरुद्ध लीग पद्धतीने सामने खेळतात. गुणतालिकेवर
              आधारित अव्वल संघ पुढे जातात.
            </p>
          </div>
          <div className={styles.structureCard}>
            <h3>Knockout Stage</h3>
            <p>
              Eliminator आणि Qualifier सामने – एका पराभवाने बाहेर आणि एका
              विजयाने थेट मोठ्या अंतिम फेरीकडे वाटचाल.
            </p>
          </div>
          <div className={styles.structureCard}>
            <h3>Grand Final</h3>
            <p>
              दिवसभराचा तुफान माहोल, लाईव्ह कॉमेंट्री आणि विजेत्या संघाचा भव्य
              सत्कार – हा MPL चा सर्वात खास क्षण असतो.
            </p>
          </div>
        </div>
      </section>

      {/* LOCAL CRICKET & COMMUNITY SECTION */}
      <section className={styles.communitySection}>
        <h2>Local Cricket & Community</h2>
        <div className={styles.communityGrid}>
          <div className={styles.communityCard}>
            <h3>Youth & Talent</h3>
            <p>
              MPL मुळे गावातील आणि आसपासच्या भागातील तरुणांना आपली क्रिकेट
              कौशल्ये दाखवण्याची संधी मिळते. अनेक खेळाडूंनी या स्पर्धेमुळे
              व्यावसायिक स्पर्धांमध्येही प्रवेश केला आहे.
            </p>
          </div>
          <div className={styles.communityCard}>
            <h3>Unity & Culture</h3>
            <p>
              बंजारा समाजातील संस्कृती, परंपरा आणि बंधुत्व या स्पर्धेद्वारे अधिक
              दृढ होते. कुटुंबांसह संपूर्ण गाव मैदानावर हजेरी लावते.
            </p>
          </div>
          <div className={styles.communityCard}>
            <h3>Support & Organisers</h3>
            <p>
              स्थानिक मंडळे, प्रायोजक आणि स्वयंसेवक यांच्या सहकार्यामुळे MPL
              यशस्वीपणे पार पडते. त्यांचा हा उत्साहच स्पर्धेची खरी ताकद आहे.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE STATS / HIGHLIGHTS */}
      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>6+</span>
          <span className={styles.statLabel}>Participating Teams</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>19+</span>
          <span className={styles.statLabel}>Matches Played</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>1000+</span>
          <span className={styles.statLabel}>Spectators & Supporters</span>
        </div>
      </section>

      {/* FOOTER INFO / CONTACT HINT */}
      <section className={styles.footerInfo}>
        <h2>Join the Cricket Festival</h2>
        <p>
          आपण खेळाडू असाल, स्वयंसेवक असाल किंवा फक्त क्रिकेटप्रेमी – MPL मध्ये
          तुमचे मनापासून स्वागत आहे. पुढील सिझन, रजिस्ट्रेशन आणि टाइमटेबलसंबंधी
          माहिती लवकरच जाहीर करण्यात येईल.
        </p>
      </section>
    </div>
  );
};
