const config = {
    port : process.env.PORT || 3000,
    // mongoURI : process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test-embauche-001",
    mongoURI : process.env.MONGO_URI || "mongodb+srv://mahady:mahady1906@cluster0.tasds.mongodb.net/mahady?retryWrites=true&w=majority",
    jwtSecret : process.env.JWT_SECRET || "jwt152secrethmac256",
}
export default config;