import React, {useState, useEffect} from "react";
import { Button } from "semantic-ui-react";
import {Link, navigate} from "@reach/router"
import {Card} from "react-bootstrap"
import './Profile.scss';
import './Card.css';
import ModalViewer from "../modules/ModalViewer"
import { useModal } from "react-hooks-use-modal";
import MuseumInterface from "../../api/museum";
import { useParams } from "react-router-dom";
import { MuseumCard } from "./Card";

const UserProfile = ({user, isCurrentUser, museumCount, editUserFunction}) => {
  const [Modal, open, close, isOpen] = useModal("root", {
      preventScroll: true,
      closeOnOverlayClick: false,
    });
  
  return(
  <div className="d-flex ">
    {isCurrentUser && <ModalViewer Modal={Modal} open={open} close={close} isOpen={isOpen} modalType="user" user={user} editUserFunction={editUserFunction}/>}
    <div className="Profile-userCard">
        <div className="d-flex align-items-center">
            <div className="Profile-image Profile-shadow"> <img src={user.imageUrl} className="rounded" width="155"/> </div>
            <div className="ml-3 w-100 Profile-content">
                <h4 className="mb-0 mt-0">
                  {user.firstname} {user.lastname} 
                 {isCurrentUser && <label className="u-link" onClick={open} >
                   <tab className="Profile-tab"> Edit </tab>        
                  </label>}
                </h4> <span>{user.description}</span>
                <div className="here d-flex justify-content-center rounded text-white stats">
                    <div className="d-flex flex-column"> <span className="articles">Museums</span> <span className="number1">{museumCount}</span> </div>

                </div>
                {/* <div className="button mt-2 d-flex flex-row align-items-center"> <button className="btn btn-sm btn-outline-primary w-100">Chat</button> <button className="btn btn-sm btn-primary w-100 ml-2">Follow</button> </div> */}
            </div>
        </div>
    </div>
</div>)
}

<<<<<<< HEAD
  return (
    <>
      <div className="card Profile-shadow" to={`/museum/`+ _id }>
      <Link id="card__button_cta" to={`/museum/edit/`+_id}>Edit </Link>
      <Link id="card__button" to={`/museum/view/`+_id} >Visit</Link>
        <img src={imageUrl} className="card__image"/>
          <div className="card__overlay">
            <div className="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              <img className="card__thumb" src={userImageUrl} alt="" />
              <div className="card__header-text">
                <h3 className="card__title">{name}</h3>            
              <span className="card__status">1 hour ago</span><br/>
              <span className="card__status">{(isPrivate) ? "Private" : "Public"}</span>
            </div>
          </div>
      </div>
      
      </div>
      
    </>
    
=======
>>>>>>> origin/jpearl-ui-25


const Profile = ({ museums, otherUserProfileId, currentUserProfile, editUserFunction}) => {

  const [userMuseums, setUserMuseums] = useState([]);
  const [userProfile, setUserProfile] = useState(undefined);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const retrieveUserPublicMuseums = async () => {
      let m = await MuseumInterface.getUserProfileAndPublicMuseums(otherUserProfileId)
      setUserMuseums(m.museums)
      setUserProfile(m.profile)
    }

  useEffect(()=>{
    if (currentUserProfile) {
      setIsCurrentUser(true)
      setUserMuseums(museums)
      setUserProfile(currentUserProfile)
    } else {
      retrieveUserPublicMuseums()
    }
  }, []);

  return (
    <div className="Profile">
      <div className="Profile-user">
      {userProfile && <UserProfile user={userProfile} isCurrentUser={isCurrentUser} museumCount={userMuseums.length} editUserFunction={editUserFunction} />}
      </div>
      {userProfile && <div className="Profile-museums cards">
        {(userMuseums.length) > 0 ? (userMuseums.map(
          (props,index) => <MuseumCard key={props._id} {...props} userImageUrl = {userProfile.imageUrl} userObject={userProfile} navigate={navigate} isCurrentUser={isCurrentUser}/> /* prettier-ignore */
        )) : (<h4 className="mb-0 mt-0 Profile-tab"> No {isCurrentUser && "public"} museums to show. </h4> )}
      </div>}
    </div>
  );
};

export { Profile} ;
