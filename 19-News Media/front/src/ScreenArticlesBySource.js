import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenArticlesBySource(props) {

  const idSource = props.match.params.id

  const [articleList, setArticleList] = useState([]);

  const [visible, setVisible] = useState(false); // Visibilité de la modal
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    async function loadArticles() {
      // On interroge l'api pour récup la liste des sources
      const rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${idSource}&apiKey=ab9c4b0f827c443dbc683714a21e9e38`);
      const response = await rawResponse.json();
      setArticleList(response.articles);

    }
    loadArticles();
    // eslint-disable-next-line
  }, []);

  if(!props.token){
    return <Redirect to='/' />
  }

  async function addToWishList(article){
    console.log(props.token);

    console.log(JSON.stringify(article))
     var articleData = JSON.stringify(article)


    await fetch('/add-article/' + props.token + '/' + props.langue[0], {
      method: 'POST',
      headers: {'Content-Type':'application/Json'},
      body: articleData
    })
    
    //props.addToWishList(article)
  }

  let showModal = (title, content) => {
    setVisible(!visible);
    setTitle(title);
    setContent(content)
  }

  let closeModal = () => {
    setVisible(!visible);
  }

  let listArticles = articleList.map((article, i) => {
    return (
      <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
        <Card key={i}
          style={{
            width: 300,
            margin: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          cover={
            <img
              alt={article.title}
              src={article.urlToImage}
            />
          }
          actions={[
            <Icon onClick={()=>showModal(article.title, article.content)} type="read" key="ellipsis2" />,

            <Icon onClick={()=>addToWishList(article)} type="like" key="ellipsis" />
          ]}
        >
          <Meta
            title={article.title}
            description={article.description}
          />

        </Card>
        <Modal
          title={title}
          visible={visible}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <p>{content}</p>
        </Modal>
      </div>
    );
  });


  return (
    <div>

      <Nav />

      <div className="Banner" />

      <div className="Card">

        {listArticles}

      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.userToken,
            langue: state.langueCode }
}



export default connect(
  mapStateToProps,
  null
 )(ScreenArticlesBySource);
