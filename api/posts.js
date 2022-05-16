import { Router } from "express";

const router=Router();

let members= [];
let datas = [];

let nextUser=members.length + 1
let nextPost=datas.length + 1

router.get("/posts", (req, res) => {
  res.json({data:datas});
});

router.get('/post/:id', (req, res) => {
  let {id}=req.params;
  if (!datas[id-1]) {
    return res.json({
      error: "Post not exist",
    });
  }
  res.json({data:datas[id-1]});
  
});

router.post('/posts', (req, res) => {
  datas.push({
    id: nextPost++,
    content:req.body.content,
    writer: req.header("id")
  });
  res.json({data:{post:{id:(nextPost-1)}}});
});

router.put('/posts', (req, res) => {
  let postId = Number(req.header("postId"));
  let userId = req.header("userId");
  if (userId !== datas[postId-1].writer) { 
    return res.json({
      error: "Cannot modify post"
    });
  }

  datas[postId-1] = {
    id: postId,
    content:req.body.content,
    writer: userId
  };
  res.json({data:{id:postId}});
});

router.delete('/posts', (req, res) => {
  let postId = Number(req.header("postId"));
  let userId = req.header("userId");
  if (userId !== datas[postId-1].writer) { 
    return res.json({
      error: "Cannot delete post"
    });
  }
  datas = datas.filter(data => data.id !== postId);
  res.json({
    "data": "Successfully deleted"
  });
});

router.get('/auth', (req, res) => {
  res.json(members);
});

// 회원가입
router.post('/auth/register', (req, res) => {
  let email = req.header("email");
  let password = req.header("password");
  const index = members.findIndex(member => member.email === email);

  if (index !== -1) {
    return res.json({
      error: "User already exist",
    });
  }
  members.push({
    id: nextUser++,
    email: email,
    password: password
  });
  res.json({data:{user:{id:nextUser-1}}});
});

// 로그인
router.post('/auth/login', (req, res) => {
  let email = req.header("email");
  let password = req.header("password");
  const index = members.findIndex(member => member.email === email);
  
  if (index === -1) {
    return res.json({
      error: "User not exist",
    });
  }
  res.json({data:{user:{id:members[index].id}}});
});

export default router;