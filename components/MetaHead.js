import Head from "next/head";

export default function MetaHead({ title, description }){
    return (
        <Head>
            <title>{title}</title>
            <meta name="author" content="Oliver Gao" />
            <meta
                name="description"
                content={description}
            />
			<link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

MetaHead.defaultProps = {
    title: "Oliver Gao",
    description:
        "I'm a student at the University of Michigan studying Computer Science. I'm interested in programming, working with data, and seeing how modern technology can make a positive impact on some of our world's biggest challenges",
};