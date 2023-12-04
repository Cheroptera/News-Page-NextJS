import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticles } from '@/models/NewsArticles';
import React, { useState, FormEvent } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import Head from 'next/head';

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState<NewsArticles[] | null >(null);
    //This means that searchResults is either null or an array of NewsArticles
    const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const searchQuery = formData.get('searchQuery')?.toString().trim();

        if (searchQuery) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                const response = await fetch('/api/search-news?q=' + searchQuery);
                const articles : NewsArticles[] = await response.json();
                setSearchResults(articles);
            } catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            } finally {
                setSearchResultsLoading(false);
            }   
        }
    } 

  return (
    <>
    <Head>
        <title key="title">Search News - NextJS News App</title>
    </Head>
      <div>
        <h1>Search News</h1>
        </div>
              <Alert>
                    This page uses <strong>client-side data fetching</strong> to show fresh data on every search. Request are handled by our backend via API routes.
                </Alert>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="search-input">
                      <Form.Label>Search query</Form.Label>
                      <Form.Control type="text" name="searchQuery" placeholder="Enter search query" />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={searchResultsLoading}>
                      Search
                  </Button>
              </Form>
              <div className="d-flex flex-column align-items-center">
                  {searchResultsLoading && <Spinner animation="border" />}
                  {searchResultsLoadingIsError && <p>There was an error loading the search results.</p>}
                  {searchResults?.length === 0 && <p>No results found.</p>}
                  {searchResults && <NewsArticlesGrid articles={searchResults} />}
              </div>
        </>
    )
  
}

export default SearchBar