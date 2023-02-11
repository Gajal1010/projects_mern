import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

function ScreenSource(props) {



  const [sourceList, setSourceList] = useState([]);
  const [langue, setLangue] = useState(props.language[0]);

  useEffect(() => {
    async function loadSource() {
      // On interroge l'api pour récup la liste des sources
      const rawResponse = await fetch(`https://newsapi.org/v2/sources?language=${props.language[0]}&country=${props.language[1]}&apiKey=ab9c4b0f827c443dbc683714a21e9e38`);
      const response = await rawResponse.json();
      setSourceList(response.sources);

    }
    loadSource();
    setLangue(props.language[0]);
  }, [props.language]);

let selectFR;
let selectUK;

if(langue === 'fr'){
  selectFR = {border: "5px solid #FFEFBF"}
  selectUK = null
} else if (langue === 'en'){
  selectUK = {border: "5px solid #FFEFBF"}
  selectFR = null
}

console.log(props.language);

  return (
    <div>
      <Nav />

      <div className="Banner">
        <img style={selectFR} className="Flag" src="images/flagFrance.png" alt="france" onClick={()=> props.setLanguage("fr", "fr")} />
        <img style={selectUK} className="Flag" src="images/flagUK.png" alt="u-k" onClick={()=> props.setLanguage("en", "us")} />
      </div>

      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item, i) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${item.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${item.id}`} key={i}><h3>{item.name}</h3></Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
        />


      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return { language: state.langueCode }
}

function mapDispatchToProps(dispatch){
  return {
    setLanguage: function(langue, country){
      dispatch({type: 'changeLanguage', langue: [langue, country]})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource);
