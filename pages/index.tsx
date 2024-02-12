import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { CMS_NAME } from "../lib/constants";
import MenuHeader from "../components/menuHeader";
import { getAllPostsForHome, getMenuItemsByMenuName } from "../lib/api";

export default function Index({ allPosts: { edges }, menuItems }) {
  const heroPost = edges[0]?.node;
  const morePosts = edges.slice(1);

  return (
    <div>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <MenuHeader menuItems={menuItems} />
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const allMenuItems = await getMenuItemsByMenuName();

  return {
    props: { allPosts, preview, menuItems: allMenuItems },
    revalidate: 10,
  };
};
