import { NewsArticles } from "@/models/NewsArticles";
import { Card } from "react-bootstrap";
import Image from "next/image";
import placeholderImage from "@/assets/images/newsarticle_placeholder.jpg"
import styles from '@/styles/NewsArticleEntry.module.css'

interface NewsArticleEntryProps {
  article: NewsArticles,
}

const NewsArticleEntry = ({article : {title, description, url, urlToImage }} : NewsArticleEntryProps) => {
  
  const validImageUrl = (urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://') ? urlToImage : undefined)
  
  return (  
    <a href={url}>
      <Card className="h-100">
          {/* We want to use Nextjs Image component instead of the Card.Img component. */}
          <Image
            src={validImageUrl || placeholderImage}
            alt="News Article Image"
            width={500}
            height={200}
            className={`card-img-top ${styles.image}`}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
 
export default NewsArticleEntry;