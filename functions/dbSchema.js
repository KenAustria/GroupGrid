// Reference Point to minimize reads, as Firebase charges on the amount of reads.
// To minimize reads that execute each time every user sends a request, store in this file.
let db = {
  users: [
		{
			userId: 'as98d2jx8xon309unvoiw3',
			email: 'user@gmail.com',
			handle: 'throwawayUser',
			profileImage: 'image/asdf/ghjkl',
			bio: 'testing',
			website: 'http://throwawayUser.com',
			location: 'San Francisco, USA',
			createdAt: '2019-03-15T10:59:52.798Z',
		}
	],
	posts: [
    {
      userHandle: 'user',
      body: 'this is a body',
      createdAt: '2019-03-15T10:59:52.798Z',
      likeCount: 5,
      commentCount: 3
    }
	]
};

const userDetails = {
	credentials: {
    userId: 'ZFSeLYwMVCOOcW0pdhmWTz9K1jh1',
    email: 'user@yahoo.com',
    handle: 'iamuser',
    createdAt: '2020-02-19T03:05:45.200Z',
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/groupgrid-1d191.appspot.com/o/17131003133.jpg?alt=media',
    bio: 'this is a bio',
		website: 'https://website.com',
		location: 'San Francisco'
	},
	likes: [
		{
			userHandle: 'iamuser',
			postId: 'V9arJWWj53fkgK7flqeD'
		},
		{
			userHandle: 'alsouser',
			postId: 'V9arJWWj53fkgK7flqeD'
		}
	]
};