import { useProfileData } from '../../contexts/ProfileDataContext';
// import Profile from "./Profile";
import React from 'react';
import { Container } from 'react-bootstrap';
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";


const PopularProfiles = () => {
    const { popularProfiles } = useProfileData()

    return (
        <Container className={appStyles.Content}>
            
            {popularProfiles.results.length ? (
                <>
                <p>Most followed profiles</p>
                {popularProfiles.results.map(profile => (
                <p key={profile.id}>{profile.owner} </p>
            ))} 
            </>
            ) : (
                <Asset spinner />
            )}

        </Container>
    )
}

export default PopularProfiles
