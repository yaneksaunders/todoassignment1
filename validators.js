import schema from './schema';

const newTaskValidator = (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
    } catch (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next();
};

export default newTaskValidator;