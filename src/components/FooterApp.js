import styles from './FooterApp.module.css';
import {Image, Row} from "react-bootstrap";
import faceLogo from '../assets/faceBlue.png';
import faceGrey from '../assets/faceGrey.png';
import insta from '../assets/insta.png';
import instaGrey from '../assets/instaGrey.png';
import linked from '../assets/linked.png';
import linkedGrey from '../assets/linkedGrey.png';
import visa from '../assets/visa.png';
import master from '../assets/mastercard.png';

export default function FooterApp() {
    return (
        <div className={styles.wrapFooter}>
            <section className={styles.footerInfoCards} style={{paddingLeft: "4.7vw",marginBottom: 20}}>
                Payment accepted by:
                <img src={master} width={100} height={60} style={{marginLeft:30}}/>
                <img src={visa} width={170} height={100}/>
            </section>
            <section className={styles.footerInfo}>
                <section className={styles.footerInfoLeft}>
                    <section className={styles.footerInfoReturns}>
                        Software Engineer By Alex Iadvigun
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Returns Policy
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Customers
                    </section>
                    <section className={styles.footerInfoReturns}>
                        News
                    </section>
                    <section className={styles.footerInfoReturns}>
                        Events
                    </section>
                </section>
                <section className={styles.footerInfoCenter}>
                    <section className={styles.footerInfoEmail}>
                        <div className={styles.footerStartContainer}>
                            <div className={styles.elementCenter}> FAQ</div>
                            <div className={styles.elementCenter}> Live connect</div>
                            <div className={styles.elementCenter}> Support</div>
                            <div className={styles.elementCenter}> Stream</div>
                            <div className={styles.elementCenter}> Web Assurance</div>
                            <div className={styles.elementCenter}> All rights reserved</div>
                        </div>
                    </section>
                </section>
                <section className={styles.footerInfoRight}>
                    <section className={styles.footerEndContainer}>
                        <section className={styles.footerStartContainer}>
                            <section className={styles.footerInfoContact}>
                                Contact Us
                            </section>
                            <section className={styles.elementCenter}>
                                +380986371056
                            </section>
                            <section className={styles.elementCenter}>
                                iadvigun@gmail.com
                            </section>
                            <section className={styles.elementCenter}>
                                <div>
                                    <a href="https://www.facebook.com/alexander.iadvigun/" target="_blank" rel="linked"
                                       className={styles.linked}>
                                        <Image height={30} width={30} src={faceLogo} style={{marginRight: 3}}
                                               onMouseOver={e => e.currentTarget.src = `${faceGrey}`}
                                               onMouseOut={e => e.currentTarget.src = `${faceLogo}`}
                                        />
                                    </a>
                                    <a href="https://www.instagram.com/iad_alex/" target="_blank" rel="linked"
                                       className={styles.linked}>
                                        <Image height={30} width={30} src={insta} style={{margin: 3}}
                                               onMouseOver={e => e.currentTarget.src = `${instaGrey}`}
                                               onMouseOut={e => e.currentTarget.src = `${insta}`}
                                        />
                                    </a>
                                    <a href="https://www.linkedin.com/in/oleksandriadvigun/" target="_blank"
                                       rel="linked" className={styles.linked}>
                                        <Image height={30} width={30} src={linked} style={{margin: 3}}
                                               onMouseOver={e => e.currentTarget.src = `${linkedGrey}`}
                                               onMouseOut={e => e.currentTarget.src = `${linked}`}
                                        />
                                    </a>
                                </div>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    );
}
