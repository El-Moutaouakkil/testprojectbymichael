import jsonfile from "jsonfile";
// import { addUser } from "./../usersManager";
import express from "express";
import User, { addUser, deleteUser,updateUser, getAllUsers } from "../usersManager";

const router = express.Router();

// Get All the users
router.get("/", async (req, res) => {
    const users: User[] | undefined = await getAllUsers(
        "server/usersData.json"
    );
    if (users) {
        res.json(users);
    } else {
        res.send("error from inside /users route : could not fetch users");
    }
});

// Add a user
router.post("/", async (req, res) => {
    const newUser: User = { ...req.body };
    const users: User[] | undefined = await addUser(
        "server/usersData.json",
        newUser
    );
    if (users) {
        res.json(users);
    } else {
        res.send("error from inside /users route : could not add user");
    }
});

// Delete a user

router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    const users = await deleteUser("server/usersData.json", userId as any);
    if (users) {
        res.json(users);
    } else {
        res.send("error from inside /users route : could not delete user");
    }
});

// Update a user

router.put("/", async (req, res) => {
    const userWithUpdatedInfo: User = { ...req.body };
    
    const users = await updateUser(
        "server/usersData.json",
        userWithUpdatedInfo
    );
     if (users) {
         console.log(userWithUpdatedInfo);
         res.json(userWithUpdatedInfo);
     } else {
         res.json("error from inside /users route : could not update user");
     }
});

export default router;
