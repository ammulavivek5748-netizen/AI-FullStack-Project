import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "Accounts",
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    college: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        trim: true
    },

    yearOfStudy: {
        type: Number,
        required: true
    },

    technicalSkills: {
        type: [String],
        required: true
    },

    preferredRoles: {
        type: [String],
        required: true,
        enum: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "AI/ML Engineer",
            "UI/UX Designer",
            "Data Scientist",
            "Cybersecurity Engineer",
            "Researcher"
        ]
    },

    preferredTechnologies: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
})


export const Student = model("Student", studentSchema);