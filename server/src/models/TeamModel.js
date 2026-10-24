// team formed atleast two members -- requirement (managed at the route level)

import { Schema, model } from "mongoose";

const teamSchema = new Schema({

}
,
{
    timestamps: true
});

export const Team = model("Team",teamSchema);