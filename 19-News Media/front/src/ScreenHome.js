import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import './App.css';
import {Input,Button} from 'antd';
import { connect } from 'react-redux';

function ScreenHome(props) {

        const [singUpUsername, setSingUpUsername] = useState('');
        const [singUpEmail, setSingUpEmail] = useState('');
        const [singUpPassword, setSingUpPassword] = useState('');
        const [listErrorSignup, setErrorSignup] = useState([]);

        const [singInEmail, setSingInEmail] = useState('');
        const [singInPassword, setSingInPassword] = useState('');
        const [listErrorSignin, setErrorSignin] = useState([]);

        const [userExist, setUserExist] = useState(false);

        

        let handleSubmitSignUp = async () => {
                let data = await fetch('/sign-up', {
                        method: 'POST',
                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                        body: `username=${singUpUsername}&email=${singUpEmail}&password=${singUpPassword}`
                });
                let response = await data.json();
                

                if (response.result){
                        setUserExist(true);
                        props.addToken(response.user.token);  
                        props.loadLangue(response.user.langue);
                        console.log(response.user.langue);
 
                }
                        
                else 
                        setErrorSignup(response.error);
                

                        
                
                
        }

        let handleSubmitSingIn = async () => {
                let data = await fetch('/sign-in', {
                        method: 'POST',
                        headers: {'Content-Type':'application/x-www-form-urlencoded'},
                        body: `email=${singInEmail}&password=${singInPassword}`
                });
                let response = await data.json();
                

                if(response.result){
                        setUserExist(true);
                        props.addToken(response.user.token);
                        props.loadLangue(response.user.langue);
                }
                        
                else 
                        setErrorSignin(response.error);
                

        }

        let tabErrorSignup = listErrorSignup.map((error, i)=>{
                return(<p key={i}>{error}</p>)
        });

        let tabErrorSignin = listErrorSignin.map((error, i)=>{
                return(<p key={i}>{error}</p>)
        });

        if(userExist)
                return <Redirect to='/screensource' />

        
        
  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  
                  {tabErrorSignin}
                  <Input className="Login-input" placeholder="arthur@lacapsule.com" onChange={e => setSingInEmail(e.target.value)} value={singInEmail} />

                  <Input.Password className="Login-input" placeholder="password" onChange={e => setSingInPassword(e.target.value)} value={singInPassword} />
            

                  <Button onClick={()=> handleSubmitSingIn()} style={{width:'80px'}} type="primary">Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
                  {tabErrorSignup}
                  <Input className="Login-input" placeholder="Arthur G" onChange={e => setSingUpUsername(e.target.value)} value={singUpUsername} />

                  <Input className="Login-input" placeholder="arthur@lacapsule.com" onChange={e => setSingUpEmail(e.target.value)} value={singUpEmail} />

                  <Input.Password className="Login-input" placeholder="password" onChange={e => setSingUpPassword(e.target.value)} value={singUpPassword} />
            

                  <Button onClick={()=> handleSubmitSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>

          </div>

      </div>
  );
}

function mapStateToProps(state){
        return { langue: state.langueCode};
}

function mapDispatchToProps(dispatch){
        return {
          addToken: function(token){
                  console.log(token);
            dispatch( {type: 'addToken', token: token } )
          },
          loadLangue: function(langue){
                  dispatch({type: 'changeLanguage', langue: langue})
          }
        }
      }

export default connect(
        mapStateToProps,
        mapDispatchToProps
 )(ScreenHome); 
