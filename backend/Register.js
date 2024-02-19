

const register = async() => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkQuery = 'SELECT * FROM users WHERE email = ?';
        conn.execute(checkQuery, [email], (checkErr, checkResult) => {
            if (checkErr) {
                res.send("Error: " + checkErr.message);
            } else {
                if (checkResult.length > 0) {
                    res.status(400).send("User already exists!");
                } else {
                    const insertQuery = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?, ?, ?)";
                    conn.execute(insertQuery, [name, email, hashedPassword], (err, result) => {
                        if (err) {
                            res.send("Error: " + err.message);
                        } else {
                            res.send(result);
                        }
                    });
                }
            } 
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { register }