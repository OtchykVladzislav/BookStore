import React, { useMemo } from 'react';

export const useSorted = (posts, sort) =>{
    const sortedPosts = useMemo(() => {
      switch(sort){
        case 'titleIncrease': return [...posts].sort((a,b) => a["title"].localeCompare(b["title"]))
        case 'titleDecrease': return [...posts].sort((a,b) => b["title"].localeCompare(a["title"]))
        case 'priceIncrease': return [...posts].sort((a,b) => a["price"] - b["price"])
        case 'priceDecrease': return [...posts].sort((a,b) => b["price"] - a["price"])
        default : return posts
      }
    }, [sort, posts]);
  return sortedPosts;
}

export const useQuery = (posts, sort, query) =>{
    const sorted = useSorted(posts, sort)
    const sortedAnDquery = useMemo(() => {
        return sorted.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sorted])
    return sortedAnDquery;
}

export const useSortGenre = (posts, genre) => {
  const sortedArray = useMemo(() => {
    if(genre == '') return posts
    return [...posts].filter(e => e['genre'] == genre)
  }, [genre, posts]);
  return sortedArray;
}