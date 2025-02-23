import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';


const Create = () => {

  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const history = useHistory();

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const date = new Date();

  const handleSubmit = (e) => { 
    e.preventDefault()
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => { //then block is used here for that when the img uploaded then we need to use that that why 
      //ref is an object
      //PUT method used here is to upload that image
      ref.getDownloadURL().then((url) => {
        //this one is for to get the URL of that above given ref.
        firebase.firestore().collection('products').add({
          //here we pushing that image into the firebase databse named products so we can see that image in the page.
          //if object name and key is same then we dont need to give like this name:name
          name,
          category,
          price,
          url,
          userId: user.uid,//user unique identifier associated with each user account
          createdAt: date.toDateString()
        })
        history.push('/');
      })
    })
  }

  return (
    <Fragment>
      <Header />

      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="Name"
          defaultValue="John"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="category"
          defaultValue="John"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input className="input"
          type="number"
          id="fname"
          name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <br />
        <br />
        {image &&
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
        }

        <br />
        <input type="file" multiple onChange={(e) => {
          setImage(e.target.files[0])
        }} />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
      </div>

    </Fragment>
  );
};

export default Create;
