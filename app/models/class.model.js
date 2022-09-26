module.exports = mongoose => {
    const Class = mongoose.model(
        "class",
        mongoose.Schema(
            {
                standard: String,
                division: String
            },
            { timestamps: true }
        )
    );
    return Class;
};  