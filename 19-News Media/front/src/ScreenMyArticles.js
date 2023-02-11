import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [wishList, setWishList] = useState([]);


  const [visible, setVisible] = useState(false); // Visibilité de la modal
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [langue, setLangue] = useState(props.language[0]);
  


  useEffect(() => {
  
    async function loadWishlist() {
      // On interroge l'api pour récup la wishlist
      const data = await fetch(`/get-wishlist/${props.token}`);
      const response = await data.json();
      console.log(response.user);
      console.log(langue);
      if(langue === 'fr')
        setWishList(response.user.wishlistFR);

      else if(langue === 'en')
        setWishList(response.user.wishlistEN);

    }
    loadWishlist();


    // eslint-disable-next-line
  }, [langue]);


  if(!props.token){
      return <Redirect to='/' />
    }

    function clickFR(){
      props.setLanguage("fr", "fr");
      setLangue('fr');
    }

    function clickEN(){
      props.setLanguage("en", "us");
      setLangue('en');
    }

async function deleteToWishList(article, pos, langue) {
  const data = await fetch(`/delete-article/${props.token}/${pos}/${langue}`, {
    method: 'DELETE'
  });
  const response = await data.json();
  if(langue === 'fr')
    setWishList(response.user.wishlistFR);

  else if(langue === 'en')
    setWishList(response.user.wishlistEN);
}


  let showModal = (title, content) => {
    setVisible(!visible);
    setTitle(title);
    setContent(content)
  }

  let closeModal = () => {
    setVisible(!visible);
  }


  let listArticles = wishList.map((article, i) => {
      return (
        <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
      <Card 
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
          <Icon onClick={()=>deleteToWishList(article, i, langue)} type="delete" key="ellipsis" />
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
    )
    
    
  });

  let selectFR;
  let selectUK;

  if(langue === 'fr'){
    selectFR = {border: "5px solid #FFEFBF"}
    selectUK = null
  } else if (langue === 'en'){
    selectUK = {border: "5px solid #FFEFBF"}
    selectFR = null
  }
  

  return (
    <div>

      <Nav />

      
      <div className="Banner">
        <img style={selectFR} className="Flag" src="images/flagFrance.png" alt="france" onClick={clickFR} />
        <img style={selectUK} className="Flag" src="images/flagUK.png" alt="u-k" onClick={clickEN} />
      </div>
      

      <div className="Card">


        

          {wishList.length >0 ?listArticles:<div style={{marginTop: "30px"}}>Aucun article</div>}
          

        







      </div>



    </div>
  );
}

function mapStateToProps(state) {
  return { 
    token: state.userToken,
    language : state.langueCode
  }
}

function mapDispatchToProps(dispatch){
  return {
    setLanguage: function(langue, country){
      dispatch({type: 'changeLanguage', langue: [langue, country]})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
