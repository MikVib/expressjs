import Todo from "../models/Todo.js";

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { userId } = req.user;
        const todo = {
            title,
            description,
            userId,
        };
        req.file?.filename ? (todo.todoImage = req.file.filename) : null;

        console.log(req.user.email);

        const todoForMongoose = new Todo(todo);
        await todoForMongoose.save();
        return res.status(200).json({
            success: {
                message: "TODO HAS BEEN ADDED",
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: {
                message: "SOMETHING WENT WRONG",
            },
        });
    }
};

export { createTodo };
