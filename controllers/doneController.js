import Todo from "../models/Todo.js"

const doneTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (todo.userId === req.user.userId) {
            await Todo.findByIdAndUpdate(id, { status: !todo.status });
            res.status(200).send({
                message: "TODO IS Done",
            });
        } else {
            res.status(400).send({
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

export { doneTodo };
