import { companyInfo } from '@/data/menu';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {companyInfo.logo && (
                    <div className={styles.logoWrapper}>
                        <img
                            src={companyInfo.logo}
                            alt={`Логотип ${companyInfo.name}`}
                            className={styles.logo}
                        />
                    </div>
                )}
                {/*<p className={styles.name}>{companyInfo.name}</p>*/}
            </div>
        </header>
    );
}