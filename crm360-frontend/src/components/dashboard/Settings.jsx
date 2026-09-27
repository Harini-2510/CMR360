import "./Settings.css";
function Settings({
  language,
  theme,
  setTheme,
  setLanguage,
}) {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>
            {language === "Tamil" ? "அமைப்புகள்" : "Settings"}
          </h1>

          <p>
            {language === "Tamil"
              ? "உங்கள் CRM360 கணக்கு மற்றும் விருப்பங்களை நிர்வகிக்கவும்"
              : "Manage your CRM360 account and preferences"}
          </p>
        </div>
      </div>

      <div className="settings-container">

        {/* PROFILE SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-header">
            <h2>
              👤{" "}
              {language === "Tamil"
                ? "சுயவிவர அமைப்புகள்"
                : "Profile Settings"}
            </h2>

            <p>
              {language === "Tamil"
                ? "உங்கள் தனிப்பட்ட தகவல்களை நிர்வகிக்கவும்"
                : "Manage your personal information"}
            </p>
          </div>

          <div className="settings-form">

            <div className="settings-field">
              <label>
                {language === "Tamil" ? "முழு பெயர்" : "Full Name"}
              </label>

              <input
                type="text"
                defaultValue="CRM360 User"
                placeholder="Enter your full name"
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil" ? "மின்னஞ்சல்" : "Email"}
              </label>

              <input
                type="email"
                defaultValue="user@crm360.com"
                placeholder="Enter your email"
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil"
                  ? "தொலைபேசி எண்"
                  : "Phone Number"}
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={() =>
                alert("Profile settings saved successfully!")
              }
            >
              Save Profile
            </button>

          </div>
        </div>


        {/* PASSWORD SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-header">
            <h2>
              🔐{" "}
              {language === "Tamil"
                ? "கடவுச்சொல்"
                : "Password"}
            </h2>

            <p>
              {language === "Tamil"
                ? "உங்கள் கணக்கு கடவுச்சொல்லைப் புதுப்பிக்கவும்"
                : "Update your account password"}
            </p>
          </div>

          <div className="settings-form">

            <div className="settings-field">
              <label>
                {language === "Tamil"
                  ? "தற்போதைய கடவுச்சொல்"
                  : "Current Password"}
              </label>

              <input
                type="password"
                placeholder={
                  language === "Tamil"
                    ? "தற்போதைய கடவுச்சொல்லை உள்ளிடவும்"
                    : "Enter current password"
                }
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil"
                  ? "புதிய கடவுச்சொல்"
                  : "New Password"}
              </label>

              <input
                type="password"
                placeholder={
                  language === "Tamil"
                    ? "புதிய கடவுச்சொல்லை உள்ளிடவும்"
                    : "Enter new password"
                }
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil"
                  ? "புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்"
                  : "Confirm New Password"}
              </label>

              <input
                type="password"
                placeholder={
                  language === "Tamil"
                    ? "புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்"
                    : "Confirm new password"
                }
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={() =>
                alert("Password updated successfully!")
              }
            >
              Update Password
            </button>

          </div>
        </div>


        {/* NOTIFICATION SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-header">
            <h2>
              🔔{" "}
              {language === "Tamil"
                ? "அறிவிப்புகள்"
                : "Notifications"}
            </h2>

            <p>
              {language === "Tamil"
                ? "உங்கள் அறிவிப்பு விருப்பங்களைத் தேர்வு செய்யவும்"
                : "Choose your notification preferences"}
            </p>
          </div>

          <div className="settings-options">

            <div className="settings-option">

              <div>
                <h3>
                  {language === "Tamil"
                    ? "பணி அறிவிப்புகள்"
                    : "Task Notifications"}
                </h3>

                <p>
                  {language === "Tamil"
                    ? "ஒதுக்கப்பட்ட பணிகள் குறித்து அறிவிப்பைப் பெறவும்"
                    : "Get notified about assigned tasks"}
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>

            </div>


            <div className="settings-option">

              <div>
                <h3>
                  {language === "Tamil"
                    ? "லீட் புதுப்பிப்புகள்"
                    : "Lead Updates"}
                </h3>

                <p>
                  {language === "Tamil"
                    ? "லீட் நிலை மாறும்போது புதுப்பிப்புகளைப் பெறவும்"
                    : "Receive updates when lead status changes"}
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>

            </div>


            <div className="settings-option">

              <div>
                <h3>
                  {language === "Tamil"
                    ? "காலக்கெடு நினைவூட்டல்கள்"
                    : "Deadline Reminders"}
                </h3>

                <p>
                  {language === "Tamil"
                    ? "வரவிருக்கும் காலக்கெடுகளுக்கான நினைவூட்டல்களைப் பெறவும்"
                    : "Get reminders for upcoming deadlines"}
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>

            </div>

          </div>
        </div>


        {/* APPEARANCE SETTINGS */}
        <div className="settings-card">

          <div className="settings-card-header">

            <h2>
              🎨{" "}
              {language === "Tamil"
                ? "தோற்றம்"
                : "Appearance"}
            </h2>

            <p>
              {language === "Tamil"
                ? "உங்கள் CRM360 இடைமுகத்தைத் தனிப்பயனாக்கவும்"
                : "Customize your CRM360 interface"}
            </p>

          </div>

          <div className="settings-form">

            <div className="settings-field">

              <label>
                {language === "Tamil"
                  ? "தீம்"
                  : "Theme"}
              </label>

              <select
                value={theme}
                onChange={(e) =>
                  setTheme(e.target.value)
                }
              >
                <option value="light">
                  {language === "Tamil"
                    ? "வெளிச்சம்"
                    : "Light"}
                </option>

                <option value="dark">
                  {language === "Tamil"
                    ? "இருள்"
                    : "Dark"}
                </option>

                <option value="system">
                  {language === "Tamil"
                    ? "கணினி இயல்புநிலை"
                    : "System Default"}
                </option>
              </select>

            </div>


            <div className="settings-field">

              <label>
                {language === "Tamil"
                  ? "மொழி"
                  : "Language"}
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >
                <option value="English">
                  English
                </option>

                <option value="Tamil">
                  Tamil
                </option>
              </select>

            </div>


            <button
              className="settings-save-btn"
              onClick={() =>
                alert(
                  language === "Tamil"
                    ? "தோற்ற அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!"
                    : "Appearance settings saved successfully!"
                )
              }
            >
              {language === "Tamil"
                ? "விருப்பங்களைச் சேமிக்கவும்"
                : "Save Preferences"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;