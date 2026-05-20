import {companyInfo} from '@/data/menu';
import styles from './Footer.module.css';

export default function Footer() {
    const {instagram, twogis} = companyInfo.socials;
    const hasSocials = instagram || twogis;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {companyInfo.logo && (
                    <img
                        src={companyInfo.logo}
                        alt={companyInfo.name}
                        className={styles.logo}
                    />
                )}
                {/*<h3 className={styles.name}>{companyInfo.name}</h3>*/}

                <div className={styles.info}>
                    {companyInfo.address && (
                        <p className={styles.line}>{companyInfo.address}</p>
                    )}
                    {companyInfo.phone && (
                        <p className={styles.line}>{companyInfo.phone}</p>
                    )}
                    {companyInfo.workingHours && (
                        <p className={styles.line}>{companyInfo.workingHours}</p>
                    )}
                </div>
                {companyInfo.serviceCharge && (
                    <p className={styles.line} style={{ marginTop: '8px', color: 'var(--text-muted)' }}>
                        {companyInfo.serviceCharge}
                    </p>
                )}
                {hasSocials && (
                    <div className={styles.socials}>
                        {instagram && (
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                        )}

                        {twogis && (
                            <a
                                href={twogis}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label="2GIS"
                            >
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                            </a>
                        )}
                    </div>
                )}

                {/*<p className={styles.copyright}>*/}
                {/*    © {new Date().getFullYear()} {companyInfo.name}. Все права защищены.*/}
                {/*</p>*/}
            </div>
        </footer>
    );
}