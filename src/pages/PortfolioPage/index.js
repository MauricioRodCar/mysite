import {useState, useEffect} from 'react';
import Container from '../../components/Container';
import PortfolioContainer from '../../components/PortfolioContainer';
import './portfoliopage.css'

const PortfolioPage = () => {

  const [page,setPage] = useState(1);
  const [pageTotal,setPageTotal] = useState(1);
  const [showingElements, setShowingElements] = useState([]);
  const [filters, setFilters] = useState([true,true,true]);


  useEffect(() => {
      let elements = [];
      let filteredItems = [];
      let activeFilters = [];
      for (let i = 0; i < filters.length; i++) {
        if (filters[i]) {
          activeFilters.push(i+1)
        }
      }
      for (let i = 0; i < portfolioItems.length; i++) {
        if (portfolioItems[i].tags.some(item => activeFilters.includes(item))) {
          filteredItems.push(portfolioItems[i])
        }
      }

      for (let i = (page-1)*6; i < page*6 && i < filteredItems.length; i++) {
        elements.push(filteredItems[i]);
      }
      setPageTotal(Math.ceil(filteredItems.length/6))
      setShowingElements(elements)
    }, [filters, page])

  const [tags] = useState([
    {
      name:"taga",
      color:"#008E89"
    },
    {
      name:"tagb",
      color:"#FFD32D"
    },
    {
      name:"tagc",
      color:"#084594"
    }
  ])

  const [portfolioItems] = useState([
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [1, 2]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [2, 3]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [2]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [1, 3]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [2, 3]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [1]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [1, 2, 3]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: [1, 2]
    },
  ])


  function handlefilters(index){
    let newFilters = [...filters];
    newFilters[index] = !newFilters[index];
    setPage(1)
    setFilters(newFilters);
  }


  return (
    <Container title="Portfolio">
    <div className="portfolio-filter-tag-container">
    <label id="filters-label">Filters:</label>
      {
        tags.map((tag, index) =>

        <div className="portfolio-tag" style={filters[index]?{backgroundColor:tag.color}:{backgroundColor:"gray"}} onClick={()=>{handlefilters(index)}}>
          <p className="portfolio-tag-name">{tag.name}</p>
        </div>
      )
      }
    </div>
      <div id="portfolio-wrapper">
        {showingElements.map((item, index) =>
          <PortfolioContainer key={index} index={index} title={item.title} endpoint={item.endpoint} description={item.description} tags={item.tags} listOfTags={tags}/>
        )}
      </div>
      <div className="arrows-container">
      {
        page!==1
        ?
        <div id="prev-button-portfolio" onClick={()=>setPage(page-1)}/>
        :
        null
      }

      {
        page!==pageTotal && showingElements.length >0
        ?
        <div id="next-button-portfolio" onClick={()=>setPage(page+1)}/>
        :
        null
      }

      </div>
    </Container>
  )
}

export default PortfolioPage;
