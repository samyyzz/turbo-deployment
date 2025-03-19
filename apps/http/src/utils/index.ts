import  bcrypt from "bcrypt"

export const hashByPassword = (password:string) => {
    const hashedPass = bcrypt.hash(password,10)
    return hashedPass
}