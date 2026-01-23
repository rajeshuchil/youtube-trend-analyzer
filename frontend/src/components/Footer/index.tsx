import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles['footer-content']}>
                    <div className={styles['footer-brand']}>
                        <div className={styles['footer-logo']}>YouTube Trend Analyzer</div>
                        <p className={styles['footer-tagline']}>
                            Empowering creators with data-driven insights to grow their YouTube channels faster.
                        </p>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#how-it-works">How It Works</a></li>
                        </ul>
                    </div>

                    <div className={styles['footer-column']}>
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#careers">Careers</a></li>
                        </ul>
                    </div>

                    <div className={styles['footer-social']}>
                        <h4>Follow Us</h4>
                        <div className={styles['social-links']}>
                            <a href="#" aria-label="Twitter">𝕏</a>
                            <a href="#" aria-label="LinkedIn">in</a>
                            <a href="#" aria-label="YouTube">▶</a>
                        </div>
                    </div>
                </div>

                <div className={styles['footer-bottom']}>
                    <p>&copy; 2024 YouTube Trend Analyzer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
