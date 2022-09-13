import joi from "joi";

const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string()
    .pattern(new RegExp('^.+\.(([pP][dD][fF])|([jJ][pP][gG]))$'))
    .required().label(' pdf url pattern ')
    .messages({ 'string.pattern.base': '{#label} does not match' }),
    categoryId: joi.number().strict().min(1).required(),
    teacherDisciplineId: joi.number().strict().min(1).required()
});

export default testSchema;