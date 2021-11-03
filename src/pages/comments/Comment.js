import React from "react";
// import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const { profile_id, profile_image, owner, updated_at, content } = props;
    return (
        <div>
            <hr />
            <div>
                <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} />
                </Link>
                <span className="align-self-center ml-1">
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                <p className="ml-5 pl-3">{content}</p>
                </span>
            </div>           
        </div>
    )
}

export default Comment
