import { Schema, model } from "mongoose";

const problemStatementSchema = new Schema({

}
,
{
    timestamps: true
});

export const ProblemStatementModel = model("PStatement",problemStatementSchema); 