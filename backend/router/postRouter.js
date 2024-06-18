import express from 'express';
import { getPostById, getCommentsByPostId } from '../controller/postController';

const postRouter = express.Router();

postRouter.get('/:id', getPostById);
postRouter.get('/:id/comment', getCommentsByPostId);

export default postRouter;
