import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentEditForm from "./CommentEditForm";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setPost,
        setComments,
      } = props;
    
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`)
            setPost(prevPost => ({
                results: [{
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count - 1,
                }]
            }))

            setComments(prevComments => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id)
            }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <hr />
            <div className="media">
                <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} />
                </Link>
                <div className="media-body align-self-center ml-1">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    { showEditForm ? (
                        <CommentEditForm
                        id={id}
                        profile_id={profile_id}
                        content={content}
                        profileImage={profile_image}
                        setComments={setComments}
                        setShowEditForm={setShowEditForm}
                      />
                    ) : (
                        <p className="">{content}</p>
                    ) }                
                </div>
                <span className="right" >
                    {is_owner && !showEditForm && (
                      <MoreDropdown 
                        handleEdit={() => setShowEditForm(true)} 
                        handleDelete={handleDelete} />
                    )}</span>               
            </div>           
        </div>
    )
}

export default Comment
