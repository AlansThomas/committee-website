import React from "react";

import Postss from "../Home/post/Post";
import myPostStyles from "./CommitteePost.module.css";


export default function CommitteePost({ props, reoad, status }) {
    let output = []

    if (!status) {
        output = props.map(item => {
            const post = item?.Postlist[0]; // get the first post from the postlist array
            const user = item?.userlist[0]; // get the first user from the userlist array

            return {
                _id: post?._id,
                UserId: user?._id,
                PostImage: post?.PostImage,
                Tags: post?.Tags,
                PostDescription: post?.PostDescription,
                LikeCount: post?.LikeCount,
                PostedUser: post?.PostedUser,
                CommentCount: post?.CommentCount,
                Like: post?.Like,
                PersonalTags: [],
                GroupTags: [],
                HashTags: post?.HashTags,
                Dislike: post?.Dislike,
                Delete: 0,
                LikeStatus: post?.LikeStatus,
                Comments: post?.Comments,
                createdAt: post?.createdAt,
                updatedAt: post?.updatedAt,
                __v: post?.__v,
                userlist: [{
                    _id: user?._id,
                    UserName: user?.UserName,
                    Email: user?.Email,
                    UserNameSearch: user?.UserNameSearch,
                    DOB: user?.DOB,
                    Type: user?.Type,
                    UserImage:user?.UserImage,
                    __v: user?.__v
                }]
            };
        });
    }
    const postList = status ? props : output;

    return (
        <div className={myPostStyles.MyPosts}>
            {postList.length > 0 ? (
                postList.map((p, i) => (
                    <Postss key={p._id} post={p} reload={reoad} />
                ))
            ) : (
                <p>No Posts Yet..</p>
            )}
        </div>

    );
}
