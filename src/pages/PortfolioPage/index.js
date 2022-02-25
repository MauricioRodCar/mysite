import {useState, useEffect, useLayoutEffect} from 'react';
import Container from '../../components/Container';
import PortfolioContainer from '../../components/PortfolioContainer';
import './portfoliopage.css'

const PortfolioPage = () => {

  const [page,setPage] = useState(1);
  const [pageTotal,setPageTotal] = useState(1);
  const [showingElements, setShowingElements] = useState([]);
  const [customClass, setCustomClass] = useState("");
  const [filters, setFilters] = useState([true,true,true,true,true,true,true]);
  const [isIpad, setIsIpad] = useState(window.matchMedia("(max-width: 1280px)").matches)
  const [isPhone, setIsPhone] = useState(window.matchMedia("(max-width: 875px)").matches)
  const [isIphone, setIsIphone] = useState(window.matchMedia("(max-width: 415px)").matches)


  useLayoutEffect(() => {
    function updateSize() {
      setIsIpad(window.innerWidth <= 1290);
      setIsPhone(window.innerWidth <= 875);
      setIsIphone(window.innerWidth <= 415);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
      let elements = [];
      let filteredItems = [];
      let activeFilters = [];
      setCustomClass("shrink");
      let pageSize = 6;

      switch (true) {
        case isPhone:
          pageSize = 2;
          break;
        case isIpad:
          pageSize = 4;
          break;
        default:

      }

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

      for (let i = (page-1)*pageSize; i < page*pageSize && i < filteredItems.length; i++) {
        elements.push(filteredItems[i]);
      }
      setTimeout(()=>{
        setCustomClass("");
        setPageTotal(Math.ceil(filteredItems.length/pageSize))
        setShowingElements(elements)
      }, 125
      )
      setTimeout(()=>{

        setCustomClass("fullsize")
      }, 250);

    }, [filters, page, isIpad, isPhone, isIphone])

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
    },
    {
      name:"AWS",
      color:"#e65f06"
    },
    {
      name:"Graphs",
      color:"#663399"
    },
    {
      name:"Api",
      color:"red"
    },
    {
      name:"Canvas",
      color:"lightblue"
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
      title: "AWS Amplify deploy",
      endpoint: "ex**https://master.d2jhd3ckhgxyad.amplifyapp.com/",
      description: "Clicking this item will redirect you to the aws amplify deployment of this application",
      tags: [4]
    },
    {
      title: "Click counter",
      endpoint: "/clicks",
      description: "This small project records the amount of clicks done and presents the information in graphs",
      tags: [2, 3, 5]
    },
    {
      title: "My Shop",
      endpoint: "/shop",
      description: "This small project fetches information from the free to use api 'FakeStoreAPI' and displays it as an e-shop",
      tags: [6]
    },
    {
      title: "Canvas sketchpad",
      endpoint: "/sketchpad",
      description: "This small project contains a canvas where is possible to draw using the cursor like in a sketchpad",
      tags: [7]
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
  return (
    <Container title="Portfolio">
    <div className="portfolio-filter-tag-container">
    {
      isIphone?null:<label id="filters-label">Filters:</label>
    }
      {
        tags.map((tag, index) =>

        <div className="portfolio-filter-tag" style={filters[index]?{backgroundColor:tag.color}:{backgroundColor:"gray"}} onClick={()=>{handlefilters(index)}} key={index}>
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
