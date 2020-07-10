import React, { useState, useEffect, useRef } from 'react';
import getTrendingTerms from '../../services/getTrendingTermsService';
import Category from '../Category';

function TrendingSearches() {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    getTrendingTerms().then(setTrends)
  }, []);
  return <Category name='Tendencias' options={trends} />
}

export default function LazyTrending() {
  const [show, setShow] = useState(false);
  const refLazyLoad = useRef();

  useEffect(function () {
    const onChange = (entries, observer) => {
      const el = entries[0];
      console.log(el.isIntersecting)
      if (el.isIntersecting) {
        setShow(true);
        // esto es en caso de que solo quiera escuchar solo un intersect y nada mas, lo que hacemos es desconectar el intersect
        // con la funcion disconnect()
        observer.disconnect();
      }
    }
    console.log(refLazyLoad.current)
    const observer = new IntersectionObserver(onChange, {
      rootMargin: '100px'
    })
    observer.observe(refLazyLoad.current)

    return () => observer.disconnect()
  })
  return <div ref={refLazyLoad}>
    {show ? <TrendingSearches /> : null}
  </div>
}