import styles from "./Home1.module.css";

function Home1() {
  return (
    <header
      className={styles.header}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('/background.jpg')`,
      }}
    >
      <div className="mt-20">
        <div className={styles.logo}>
          <div className={styles.logo1}>
            <img src="logoWhite-removebg-preview.png" alt="logo" />
          </div>
          <div className={styles.caption}>
            <h1>NIRVA FASHION</h1>
            <p>Nirva - Wear Your Confidence</p>
          </div>
          <div className={styles.logo2}>
            <img src="logoWhite-removebg-preview.png" alt="logo" />
          </div>
        </div>
        <div className={styles.register}>
          <p>REGISTER ON OUR WEBSITE</p>
        </div>
        <div className={styles.web}>
          <p>www.nirvafashion.com</p>
        </div>
      </div>
    </header>
  );
}

export default Home1;
