const initState = {
  curUserPost: [
    {
      user: "62dd610e3281a0af9054ed8a",
      title: "LOT",
      description: "LOT Post",
      _id: "630248f41ade0d58580c4874",
      likes: [],
      comments: [],
      postDate: "2022-08-21T15:02:12.956",
      __v: 0,
    },{
      user: "62dd610e3281a0af9054ed8a",
      title: "LOT 11",
      description: "LOT Post 1",
      _id: "630248f41ade0d58580c4874s",
      likes: [],
      comments: [],
      postDate: "2022-08-21T15:02:12.956Z",
      __v: 0,
    },
  ],
  otherPosts: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return Object.assign({}, state, {
        curUserPost: state.curUserPost.concat(action.payload),
      });
      case "ADD_COMMENT":
        const oldPost = state.otherPosts;
        for(let i=0;i<oldPost.length;i++){
            if(oldPost[i]._id === action.payload.postId){
                oldPost[i].comments.push(action.payload);
                break;
            }
        }
        state.otherPosts = oldPost;
        return{
            ...state,
          otherPosts: oldPost,
        };
     //    Object.assign({}, state, {
     // otherPosts: oldPost,
     //    })
    case "REMOVE_POST":
        return Object.assign({}, state, {
            curUserPost: state.curUserPost.filter((post) => post._id !== action.payload),
        });
    //[
    //     ...state,
    //   action.payload
    // curUserPost: curUserPost.push(action.payload),
    // ];
    case "LOAD_OTHER_POSTS":
      return {
        ...state,
        otherPosts: action.payload,
      };
      // case "UPDATE_LIKE_COUNT":
      // return{
      //   ...state,
      // }
    case "LOAD_CUR_USER_POSTS":
      console.log("LOAD_CUR_USER_POSTS rEDUCER....");
      return {
        ...state,
        curUserPost: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
