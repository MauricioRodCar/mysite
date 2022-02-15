import {useState} from 'react';
import {Link} from 'react-router-dom';
import Container from '../../components/Container';
import PortfolioContainer from '../../components/PortfolioContainer';
import './portfoliopage.css'

const PortfolioPage = () => {

  const [portfolioItems, setPortfolioItems] = useState([
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
    {
      title: "Coming soon",
      endpoint: "/testa",
      description: "testdesc",
      tags: ["taga", "tagb", "tagc"]
    },
  ])

  return (
    <Container title="Portfolio">
      <div id="portfolio-wrapper">
        {portfolioItems.map((item, index) =>
          <PortfolioContainer key={index} index={index} title={item.title} endpoint={item.endpoint} description={item.description} tags={item.tags}/>
        )}
      </div>
    </Container>
  )
}

export default PortfolioPage;
