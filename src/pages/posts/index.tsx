import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/primisc";
import styles from './styles.module.scss';


export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>15 de Outubro 2022</time>
                        <strong>Android Audio and Homepage Topics</strong>
                        <p>Your time matters. That’s why our team is committed to helping you get the most out of the time you spend reading on Medium.
                            This  means helping you find stories that are relevant to your interests and  goals; knowledge that goes beyond entertainment to positively impact  your life.
                            It also means helping you access that knowledge in ways that  are convenient and enjoyable for you.</p>
                    </a>
                    <a href="#">
                        <time>15 de Outubro 2022</time>
                        <strong>Android Audio and Homepage Topics</strong>
                        <p>Your time matters. That’s why our team is committed to helping you get the most out of the time you spend reading on Medium.
                            This  means helping you find stories that are relevant to your interests and  goals; knowledge that goes beyond entertainment to positively impact  your life.
                            It also means helping you access that knowledge in ways that  are convenient and enjoyable for you.</p>
                    </a>
                    <a href="#">
                        <time>15 de Outubro 2022</time>
                        <strong>Android Audio and Homepage Topics</strong>
                        <p>Your time matters. That’s why our team is committed to helping you get the most out of the time you spend reading on Medium.
                            This  means helping you find stories that are relevant to your interests and  goals; knowledge that goes beyond entertainment to positively impact  your life.
                            It also means helping you access that knowledge in ways that  are convenient and enjoyable for you.</p>
                    </a>
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps =  async ()=>{
    const prismic = getPrismicClient()

    const response =  await prismic.queryContentFromRef(
        
    )

    return {
        props:{}
    }
}


