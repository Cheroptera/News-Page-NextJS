import NewsArticlesGrid from "@/components/NewsArticlesGrid"
import { NewsArticles, NewsResponse } from "@/models/NewsArticles"
import { GetStaticProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Alert } from "react-bootstrap"

// adding square brackets to the file name makes it a dynamic route.
interface CategoryNewsPageProps {
  newsArticles: NewsArticles[],
}

//getStaticPaths is a function that tells Next.js how many pages there are.
//This is a static function that runs at build time.
//This function is required for dynamic routes.
//This function returns an object with two properties: paths and fallback.
export const getStaticPaths = async () => {
  const categorySlugs = [
    'business',
    'entertainment',
    'general',
    'health', 
    'science', 
    'sports', 
    'technology']
  const paths = categorySlugs.map(slug => ({ params: { category: slug }}))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
  const category = params?.category?.toString()
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponse = await response.json()
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60 // 5 minutes
    }
  }

// Let error pages be handled by the default Next.js 500 error page.

const CategoryNewsPage = ({newsArticles}: CategoryNewsPageProps) => {
  const router = useRouter()
  const categoryName = router.query.category?.toString()

  const title = "Category: " + categoryName

  return (
<>
    <Head>
      <title key="title">{`${title} - NextJS News App`}</title>
    </Head>
  <main>
    <h1>{title}</h1>
    <Alert>
      This page uses <strong>getStaticProps</strong> for very high page loading speed and <strong>incremental static regeneration</strong> to show data not older than 5 minutes. 
    </Alert>
    <NewsArticlesGrid articles={newsArticles}/>
  </main>
</>  
)
}


export default CategoryNewsPage