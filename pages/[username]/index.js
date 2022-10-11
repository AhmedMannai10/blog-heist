import React from 'react'
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { getUserWithUsername } from '../../lib/firebase';

export async function getServerSideProps({query}){

  const {username } = query;

  const userDoc = await getUserWithUsername(username);


  let user = null;
  let posts = null;

  if(userDoc ){
    // working here
  }

  return {
    props: {user, posts}
  }
}

export default function UserProfilePage({user, posts}) {
  return (
    <div >
      <UserProfile user={user}/>
      <PostFeed posts={posts}  />
    </div>
    

  )
}
