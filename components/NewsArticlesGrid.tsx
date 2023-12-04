import NewsArticleEntry from './NewsArticleEntry'
import { NewsArticles } from '@/models/NewsArticles'
import { Col, Row } from 'react-bootstrap'

interface NewsArticlesGridProps {
  articles: NewsArticles[]
}

const NewsArticlesGrid = ({ articles } : NewsArticlesGridProps) => {
  return(
    <Row xs={1} sm={2} xl={3} className="g-4">
      {articles.map((article) => (
        <Col key={article.url}>
            <NewsArticleEntry key={article.url} article={article} />
        </Col>
        ))}
    </Row>
  )
} 
export default NewsArticlesGrid
