import { Router } from "express";

var router=Router();

let nextId = 4; // movies 변수에 id를 설정합니다

let movies = [ // movies 배열
  { // movies[0]
    id: 1,
    title: 'Avengers',
  },
  { // movies [1]
    id: 2,
    title: 'Spider-man',
  },
  { // movies [2]
    id: 3,
    title: 'Harry Potter',
  },
];

router.get("/posts", (req, res) => {
  res.json(movies);
});


// /movie 주소로 get요청을 보낼시(body에 id를 포함하였을때) 해당 id인 영화를 보여줍니다.
router.get('/post', (req, res) => {  
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없다면 error: "That movie does not exist"
    return res.json({
      error: "That movie does not exist",
    });
  }
  res.json(movies.filter(movie => movie.id === req.body.id)[0]);
});


// /movies주소로 post요청을 보낼시 배열에 새로운 영화를 추가하여줍니다.
router.post('/posts', (req, res) => { 
  movies.push({
    id: nextId++, // 처음 nextId 4가 들어간후 nextId가 5가 됩니다
    title: req.body.title, // req.body.title이 있어야합니다.
  });
  res.json(movies);
});


// /movies주소로 put요청을 보낼시 id에 해당하는 영화를 바꿔줍니다.
router.put('/posts', (req, res) => {
  const index = movies.findIndex(movie => movie.id === req.body.id);
  if (index === -1) { // 해당 영화가 없을시
    return res.json({
      error: "That movie does not exist",
    });
  }

  movies[index] = {
    id: req.body.id,
    title: req.body.title,
  };
  res.json(movies);
});


// /movies delete요청을 보낼시 해당 id에 해당하는 영화를 삭제합니다.
router.delete('/posts', (req, res) => {
  movies = movies.filter(movie => movie.id !== req.body.id);
  res.json(movies);
});

export default router;