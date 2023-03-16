import Todo from "../models/Todo.js"
import { deleteTodoImage } from "../helpers/deleteTodoImage.js"

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (todo?.userId === req.user.userId) {
            await deleteTodoImage(todo.todoImage);
            await Todo.findByIdAndDelete(id);
            return res.status(200).send({
                message: "TODO IS DELETED",
            });
        } else {
            return res.status(400).send({
                message: "USER VALIDATION FAILED",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: {
                message: "SOMETHING WENT WRONG",
            },
        });
    }
};

export { deleteTodo };
