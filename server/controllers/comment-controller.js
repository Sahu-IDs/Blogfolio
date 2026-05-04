import Comment from '../models/comment.js';


export const newComment = async (request, response) => {
    try {
        const { name, postId, comments, date } = request.body;

        // Validate required fields
        if (!name || !postId || !comments) {
            return response.status(400).json({ msg: 'Name, postId, and comment text are required.' });
        }

        const newCommentDoc = new Comment({
            name,
            postId,
            comments,
            date: date || new Date()
        });

        await newCommentDoc.save();
        response.status(200).json('Comment saved successfully');
    } catch (error) {
        console.error('Error saving comment:', error);
        response.status(500).json({ msg: 'Failed to save comment. Please try again.' });
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id }).sort({ date: -1 });
        response.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        response.status(500).json({ msg: 'Failed to fetch comments.' });
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: 'Comment not found.' });
        }
        await comment.deleteOne();
        response.status(200).json('Comment deleted successfully');
    } catch (error) {
        console.error('Error deleting comment:', error);
        response.status(500).json({ msg: 'Failed to delete comment.' });
    }
}
