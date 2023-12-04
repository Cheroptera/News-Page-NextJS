import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'
import { NewsArticles, NewsResponse } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { Alert } from 'react-bootstrap'

interface BreakingNewsPageProps {
newsArticles: NewsArticles[]
}

//How to make a fetch request in Next.js. This is a server side fetch request.
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponse = await response.json()
  return {
    props: {
      newsArticles: newsResponse.articles
    }
  }
  //let error pages be handled by the default Next.js 500 error page.
}

// This is the home page. You can rename the name of the component, but the file name must be index.tsx
// inter is a Google font class 

// What's in the head tag is Next.js's way of adding head metadata to the page.

//Adding the head here overrides the head in _app.tsx
// To make sure they override each other, you can add a key to the head tag.
const BreakingNewsPage = ({newsArticles} : BreakingNewsPageProps) =>  {
  return (
    <>
    <Head>
      <title key="title">Breaking News - NextJS News App</title>
    </Head>
        <div>
        <h1> Breaking News</h1>  
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data server-side on every request. This allows search engines to crawl the page for SEO purposes. 
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />      
        </div>   
        </> 
  )
}

export default BreakingNewsPage
