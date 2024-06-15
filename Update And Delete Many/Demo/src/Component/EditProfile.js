import React, { useEffect, useRef, useState } from 'react'
import TopNavigation from "./TopNavigation";
import { useSelector } from 'react-redux';

function EditProfile() {
    let firstInputRef = useRef();
    let lastInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileInputRef = useRef();
    let profilePicInputRef = useRef();

    let storeObj = useSelector((store) => {
        return store;
    });
    useEffect(() => {
        firstInputRef.current.value = storeObj.userDetails.firstName;
        lastInputRef.current.value = storeObj.userDetails.lastName;
        ageInputRef.current.value = storeObj.userDetails.age;
        emailInputRef.current.value = storeObj.userDetails.email;
        mobileInputRef.current.value = storeObj.userDetails.mobile;
        setProfilePic(`http://localhost:4567/${storeObj.userDetails.profilePic}`)
    }, [storeObj.userDetails.firstName]);
    let [profilePic, setProfilePic] = useState([]);


    let updateProfile = async () => {
        alert("Sending Form data");
        let dataToSend = new FormData();
        dataToSend.append("firstName", firstInputRef.current.value);
        dataToSend.append("lastName", lastInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobile", mobileInputRef.current.value);
        for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
            dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
        }

        let reqOption = {
            method: "PUT",
            body: dataToSend,
        }
        let JSONData = await fetch("http://localhost:4567/updateUserdetails", reqOption);
        let JSOData = await JSONData.json();
        console.log(JSOData);
    }

    return (
        <div className='App'>
            <TopNavigation />
            <h2> Edit Profile</h2>
            <form>

                <div>
                    <label>First Name</label>
                    <input ref={firstInputRef}></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input ref={lastInputRef}></input>
                </div>
                <div>
                    <label>Age</label>
                    <input ref={ageInputRef}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input ref={emailInputRef}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input ref={passwordInputRef}></input>
                </div>
                <div>
                    <label>Mobile</label>
                    <input ref={mobileInputRef}></input>
                </div>
                <div>
                    <label>Profile Pic</label>
                    <input ref={profilePicInputRef} type='file' accept='image/*' onChange={(eo) => {
                        let selectedPicPath = URL.createObjectURL(eo.target.files[0])
                        setProfilePic(selectedPicPath);
                    }}></input>
                    <br></br>
                    <img alt='' src={profilePic} className='profilePicPreview'></img>
                </div>
                <div>

                    <button type='button' onClick={() => updateProfile()}>Update Profile</button>
                </div>

            </form>

        </div>
    )
}

export default EditProfile