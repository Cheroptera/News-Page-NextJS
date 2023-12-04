// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles'
import type { NextApiRequest,NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString()

  if (!searchQuery) {
    return res.status(400).json({ message: 'Missing search query' })
    console.log(searchQuery)
  }

  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponse = await response.json()
  res.status(200).json(newsResponse.articles)
}

//This is the API route that will be used to fetch the data from the database.
//The API route is a special type of Next.js route that does not render a page, but can be called from the client-side.
//The API route is used to fetch the data from the database and return it to the client-side.