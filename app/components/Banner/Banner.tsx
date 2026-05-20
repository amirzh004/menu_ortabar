import { banners } from '@/data/menu';
import styles from './Banner.module.css';

export default function Banner() {
    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <div className={styles.bannerSection}>
            <div className={styles.container}>
                <div className={styles.scroll}>
                    {banners.map((banner, index) => (
                        <div key={index} className={styles.bannerItem}>
                            <img src={banner} alt={`Баннер ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}