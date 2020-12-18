import { useContext, useState } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';
import { LikePictureById, RemovelikePictureById, CommentPictureById } from '../../domain/picture/picture.actions';

export function Card({ picture }) {

    const { state, dispatch } = useContext(ApplicationContext);
    const [Comment, setComment] = useState("");

    const onLike = (pictureId) => {
        (picture.likedBy && picture.likedBy.find(like => like._id === state.user._id))
            ? RemovelikePictureById(dispatch, pictureId)
            : LikePictureById(dispatch, pictureId)
    }

    const onComment = (pictureId) => {
        if (Comment) {
            CommentPictureById(dispatch, pictureId, Comment)
        }
    }

    if (!state.user) return null

    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton
                    onClick={() => { onLike(picture.id) }}
                    isLiked={picture.likedBy && picture.likedBy.find(like => like._id === state.user._id)}
                />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments
                    {(picture.comments && picture.comments.length) ? (<ul>{picture.comments.map((comment, index) => (<li key={index}>{comment.comment}</li>))}</ul>)
                    : (
                        <ul>
                        <li>
                            Sample comment
                        </li>
                      </ul>
                    )}
                </div>
                <div className="card-comment">
                    {(picture.comments && picture.comments.length && picture.comments.find(comment => comment.by._id === state.user._id)) ? (<div>Comment sent</div>)
                    : (
                        <div>
                            <input placeholder="comment here" onChange={e => {setComment(e.target.value)}}></input>
                            <button onClick={() => { onComment(picture.id)}}>Send</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}