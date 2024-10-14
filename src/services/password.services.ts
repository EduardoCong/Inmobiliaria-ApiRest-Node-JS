import bcrypt from 'bcrypt';

const Salt_Rounds: number = 10

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, Salt_Rounds);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password,hash)
}