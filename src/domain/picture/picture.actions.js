import { getPictures, getPictureById, likePicture, RemovelikePicture, commentPicture } from './picture.service';

export const types = {
    PICTURE_STARTED: 'PICTURE_STARTED',
    PICTURE_DONE: 'PICTURE_DONE',
    PICTURE_LIKED: 'PICTURE_LIKED',
    PICTURE_FAILED: 'PICTURE_FAILED',
    PICTURE_REMOVELIKED: 'PICTURE_REMOVELIKED',
    PICTURE_COMMENTED: 'PICTURE_COMMENTED',
}

export function fetchPictures(dispatch) {
    dispatch(_started());
    getPictures()
        .then(pictures => dispatch(_onSuccess(pictures)))
        .catch(error => dispatch(_onError(error)));
}

export function fetchPictureById(dispatch, pictureId) {
    dispatch(_started());
    getPictureById(pictureId)
        .then(picture => dispatch(_onSuccess([picture])))
        .catch(error => dispatch(_onError(error)));
}

export function LikePictureById(dispatch, pictureId) {
    dispatch(_started());
    likePicture(pictureId)
        .then(picture => dispatch(_onLiked(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function RemovelikePictureById(dispatch, pictureId) {
    dispatch(_started());
    RemovelikePicture(pictureId)
        .then(picture => dispatch(_onRemoveliked(picture)))
        .catch(error => dispatch(_onError(error)));
}

export function CommentPictureById(dispatch, pictureId, comment) {
    console.log(comment);
    dispatch(_started());
    commentPicture(pictureId, comment)
        .then(picture => dispatch(_onComment(picture)))
        .catch(error => dispatch(_onError(error)));
}

function _started() {
    return {
        type: types.PICTURE_STARTED
    }
}

function _onSuccess(pictures) {
    return {
        type: types.PICTURE_DONE,
        payload: pictures
    }
}

function _onLiked(picture) {
    return {
        type: types.PICTURE_LIKED,
        payload: picture
    }
}

function _onRemoveliked(picture) {
    return {
        type: types.PICTURE_REMOVELIKED,
        payload: picture
    }
}

function _onComment(picture) {
    return {
        type: types.PICTURE_COMMENTED,
        payload: picture
    }
}

function _onError(error) {
    return {
        type: types.PICTURE_FAILED,
        payload: error
    }
}