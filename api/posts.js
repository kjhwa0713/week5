import { Router } from "express";

var router=Router();

let datas = [
		{
			"id": 1,
			"content": "대충 글 내용",
			"writer": 1,
		},
    {
			"id": 2,
			"content": "대충 글 내용",
			"writer": 1,
		}
	]
let nextId=datas[datas.length-1].id + 1
router.get("/posts", (req, res) => {
  res.json({data:datas});
});

router.get('/post', (req, res) => {  
  const index = datas.findIndex(data => data.id === req.body.id);
  if (index === -1) {
    return res.json({
      error: "Post not exist",
    });
  }
  res.json({data:datas.filter(data => data.id === req.body.id)[0]});
  
});


router.post('/posts', (req, res) => { 
  datas.push({
    id: nextId++,
    content: req.body.content,
    writer: req.body.id
  });
  res.json({data:{post:{id:(nextId-1)}}});
});


router.put('/posts', (req, res) => {
  const index = datas.findIndex(data => data.id === req.body.postId);
  if (req.body.userId !== datas[index].writer) { 
    return res.json({
      error: "Cannot modify post"
    });
  }

  datas[index] = {
    id: req.body.postId,
    content: req.body.content,
    writer: req.body.userId
  };
  res.json({data:{id:req.body.postId}});
});

router.delete('/posts', (req, res) => {
  const index = datas.findIndex(data => data.id === req.body.postId);
  if (req.body.userId !== datas[index].writer) { 
    return res.json({
      error: "Cannot delete post"
    });
  }
  datas = datas.filter(data => data.id !== req.body.postId);
  res.json({
    "data": "Successfully deleted"
  });
});

export default router;