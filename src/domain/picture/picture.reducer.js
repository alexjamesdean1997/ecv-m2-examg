import { types } from './picture.actions';

export default function reducer(state, action) {
    const { pictures, user } = state;

    switch (action.type) {

        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }

        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }

        case types.PICTURE_LIKED:

            console.log({pictures});

            const likedIndex = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id)
            pictures[likedIndex].likedBy = [...pictures[likedIndex].likedBy, { _id: user._id }]

            console.log({likedIndex})
            console.log({state});

            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }

        case types.PICTURE_REMOVELIKED:

            const removedLikeIndex = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id)
            const userIndex = pictures[removedLikeIndex].likedBy.findIndex(like => like._id === user._id)

            if (userIndex > -1) {
                pictures[removedLikeIndex].likedBy.splice(userIndex, 1);
            }

            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }

        case types.PICTURE_COMMENTED:

            const commentedIndex = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id)
            pictures[commentedIndex].comments = action.payload.comments

            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }

        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }

        default:
            return state;
    }
}
