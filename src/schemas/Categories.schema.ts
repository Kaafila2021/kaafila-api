import { model, Schema } from "mongoose";

const categoriesSchema = new Schema({
    name: String,
    category_id: String,
    img: String,
    hidden: Boolean
}, { timestamps: true })

const Categories = model('Categories', categoriesSchema)

export default Categories;