import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <div className={`container ${styles.homePage}`}>

      <section
        className={styles.banner}
        aria-label="Специальное предложение"
      >
        <img
          src="/images/banners/super-sale-banner.png"
          alt="Super Sale — умный робот-друг Red solution Reddy Air.
          Скидка 10%, цена 27 990 рублей вместо 31 100 рублей."
          className={styles.bannerImage}
          width={1240}
          height={560}
        />
      </section>

    </div>
  );
}