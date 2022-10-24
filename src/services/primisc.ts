import Primisc from '@prismicio/client'

export function getPrismicClient() {
     
    const prismic = Primisc.client(
        process.env.PRISMIC_ENDPOINT,
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )
    return prismic;  
    
}