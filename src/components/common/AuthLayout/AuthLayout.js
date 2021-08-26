import styles from './AuthLayout.module.scss';

function AuthLayout({ children }) {
  return (
    <div className={styles.Auth}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          <div className={styles.intro_wrapper}>
            <img src={process.env.PUBLIC_URL + '/images/auth/illustrated-mobile.png'} alt="illustrated mobile social" />
            <p>
              FNT is the social platform revolutionizing creator and fan connections. The site is inclusive of the
              artists and content creators from all genres and allows them to monetize their content while developing
              authentic relationship with their fanbase.
            </p>
            <div className={styles.circle_bg}></div>
          </div>
        </div>
        <div className={styles.form_section}>
          <div className={styles.form_wrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
