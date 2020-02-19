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
      body: 'This is a sample post',
      createdAt: '2019-03-15T10:59:52.798Z',
      likeCount: 5,
      commentCount: 3
    }
	]
};

const userDetails = {
  credentials: {
    userId: '9D834959PI349V74NID',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2020-02-08T04:43:52.798Z',
    profileImage: 'image/asdfg/hjkl',
    bio: 'this is my bio',
    website: 'https://mywebsite.com',
    location: 'San Francisco, USA'
	},
	likes: [
    {
      userHandle: 'user',
      screamId: 'aadfu9384t3nukyfy9q8wr'
    },
    {
      userHandle: 'user',
      screamId: 'sudh9834tkjsc753a8u2mu'
    }
  ]
};