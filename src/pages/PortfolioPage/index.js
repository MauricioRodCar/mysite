import {useState, useEffect} from 'react';
import Container from '../../components/Container';
import PortfolioContainer from '../../components/PortfolioContainer';
import './portfoliopage.css'

const PortfolioPage = () => {

  const [page,setPage] = useState(1);
  const [pageTotal,setPageTotal] = useState(1);
  const [showingElements, setShowingElements] = useState([]);
  const [customClass, setCustomClass] = useState("");
  const [filters, setFilters] = useState([true,true,true]);


  useEffect(() => {
      let elements = [];
      let filteredItems = [];
      let activeFilters = [];
      setCustomClass("shrink");

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
      setTimeout(()=>{
        setCustomClass("");
        setPageTotal(Math.ceil(filteredItems.length/6))
        setShowingElements(elements)
      }, 125
      )
      setTimeout(()=>{

        setCustomClass("fullsize")
      }, 250);

    }, [filters, page])

  const [tags] = useState([
    {
      name:"Forms",
      color:"#008E89"
    },
    {
      name:"Interactive",
      color:"#FFD32D"
    },
    {
      name:"Download",
      color:"#084594"
    }
  ])

  const [portfolioItems] = useState([
    {
      title: "Recipe builder",
      endpoint: "/recipe",
      description: "This small project allows you to create a recipe, add an image and download the result",
      tags: [1, 2, 3]
    },
    {
      title: "Php/Java template",
      endpoint: "",
      description: "This might eventually become a php/java project for my portfolio please wait for it",
      tags: [2, 3]
    },
    {
      title: "Php template",
      endpoint: "",
      description: "This might eventually become a php project for my portfolio please wait for it",
      tags: [2]
    },
    {
      title: "React/Java template",
      endpoint: "",
      description: "This might eventually become a react/java project for my portfolio please wait for it",
      tags: [1, 3]
    },
    {
      title: "Php/Java template",
      endpoint: "",
      description: "This might eventually become a php/java project for my portfolio please wait for it",
      tags: [2, 3]
    },
    {
      title: "React template",
      endpoint: "",
      description: "This might eventually become a react project for my portfolio please wait for it",
      tags: [1]
    },
    {
      title: "React/Php/Java template",
      endpoint: "",
      description: "This might eventually become a react/php/java project for my portfolio please wait for it",
      tags: [1, 2, 3]
    },
    {
      title: "React/Php template",
      endpoint: "",
      description: "This might eventually become a react/php project for my portfolio please wait for it",
      tags: [1, 2]
    },
  ])


  function handlefilters(index){
    let newFilters = [...filters];
    newFilters[index] = !newFilters[index];
    setPage(1)
    setFilters(newFilters);
  }
  console.log(customClass);

  return (
    <Container title="Portfolio">
    <div className="portfolio-filter-tag-container">
    <label id="filters-label">Filters:</label>
      {
        tags.map((tag, index) =>

        <div className="portfolio-tag" style={filters[index]?{backgroundColor:tag.color}:{backgroundColor:"gray"}} onClick={()=>{handlefilters(index)}} key={index}>
          <p className="portfolio-tag-name">{tag.name}</p>
        </div>
      )
      }
    </div>
      <div id="portfolio-wrapper">
        {showingElements.map((item, index) =>
          <PortfolioContainer key={index} index={index} title={item.title} endpoint={item.endpoint} description={item.description} tags={item.tags} listOfTags={tags} customClass={customClass}/>
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
