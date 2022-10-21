import Head from "next/head";

const MetaTags = ({title, description, image, }) => {
    return (
        <Head>
            <title>My Page</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@Ahmed_Mannai_10" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />

            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>
            
            
        </Head>
    );
};

export default MetaTags;
