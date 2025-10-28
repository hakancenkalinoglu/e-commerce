import { Request, Response } from 'express';
import { RegisterRequest, LoginRequest } from '../types/user';
import { createUser, findUserByEmail, users } from '../data/users';
import bcrypt from 'bcryptjs';
import { Jwt } from '../utils/jwt';

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, password, role }: RegisterRequest = req.body;

            if(!firstName || firstName.trim() === '' || !lastName || lastName.trim() === ''){
                res.status(400).json({
                    success: false,
                    message: 'Name is required'
                  });
                  return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({
                  success: false,
                  message: 'Invalid email format'
                });
                return;
              }

            if(password.length < 8){
                res.status(400).json({
                    success: false,
                    message: 'Password must be at least 8 characters'
                });
                return;
            }  
            if (role !== 'seller' && role !== 'customer') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid role'
                });
                return;
            }
            const existingUser = findUserByEmail(email);
            if(existingUser){
                res.status(400).json({
                    success: false,
                    message: 'Email already exist'
                });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = createUser({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            });

            res.status(201).json({
                success: true,
                messge: 'User registered successfully',
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role
                }
            })


        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    // POST /api/auth/login
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: LoginRequest = req.body;
            const existingUser = findUserByEmail(email);

            if(!existingUser){
                res.status(400).json({
                    success: false,
                    message: 'User not found',
                });
                return;
            }

            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

            if(!isPasswordMatch){
                res.status(400).json({
                    success: false,
                    message: 'Invalid password',
                });
                return;
            }

            const token = Jwt.createJwt({
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role
            });

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: existingUser.id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    role: existingUser.role
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getCurrentUser(req: any, res: Response): Promise<void>{
        try {
            // req.user authMiddleware'den geliyor (token'dan decode edilmiş)
            const tokenUser = req.user;
            
            if(!tokenUser){
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }

            // Token'dan gelen ID ile veritabanından tam kullanıcı bilgilerini al
            const user = users.find(u => u.id === tokenUser.id);
            
            if(!user){
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                user:{
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}