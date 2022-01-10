import jsonfile from "jsonfile";

export default interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar?: string; //avatar image url is optional
}

// fetch users data fromt a json file

export const getAllUsers = async (
    file: string
): Promise<User[] | undefined> => {
    let users: User[];
    try {
        users = await jsonfile.readFile(file);
        return users;
    } catch (error) {
        console.log(
            `an error occurred while reading users from the file : ${file}`
        );
        console.log(error);
    }
};

// Add a user to the json file

export const addUser = async (
    file: string,
    newUser: User
): Promise<User[] | undefined> => {
    let users: User[];
    try {
        users = await jsonfile.readFile(file);
        users.push(newUser);
        await jsonfile.writeFile(file, users, (err) => {
            if (err) console.error(err);
        });
        return users;
    } catch (error) {
        console.log(
            `an error occurred while add the new user to the file ${file}`
        );
        console.log(error);
    }
};

// Delete a user from the json file

export const deleteUser = async (
    file: string,
    userToDeleteId: number
): Promise<User[] | undefined> => {
    let users: User[];
    try {
        users = await jsonfile.readFile(file);
        const filtredUsers = users.filter((user) => user.id != userToDeleteId);
        await jsonfile.writeFile(file, filtredUsers, (err) => {
            if (err) console.error(err);
        });
        return filtredUsers;
    } catch (error) {
        console.log(
            `an error occurred while trying to remove user from the file ${file}`
        );
        console.log(error);
    }
};

// update an existed user
export const updateUser = async (
    file: string,
    userToUpdate: User
): Promise<User[] | undefined> => {
    let users: User[];
    try {
        users = await jsonfile.readFile(file);
        const userToUpdateIndex = users.findIndex(
            (user) => user.id == userToUpdate.id
        );
        users[userToUpdateIndex] = userToUpdate;
        await jsonfile.writeFile(file, users, (err) => {
            if (err) console.error(err);
        });
        return users;
    } catch (error) {
        console.log(
            `an error occurred while trying to remove user from the file ${file}`
        );
        console.log(error);
    }
};
