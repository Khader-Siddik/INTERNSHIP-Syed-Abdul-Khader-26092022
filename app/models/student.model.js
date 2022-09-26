module.exports = mongoose => {
    const Student = mongoose.model(
        "student",
        mongoose.Schema(
            {
                _name: String,
                rollNo: String,
                mobileNo: Number,
                classId: String
            },
            { timestamps: true }
        )
    );
    return Student;
};