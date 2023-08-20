import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const body = request.body()
        const user = await User.create(body)
        response.status(201)
        return {
            message: 'User successfully created!',
            data: user
        }
    }

    public async index() {
        const users = await User.all()
        return {
            data: users
        }
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        return {
            data: user
        }
    }

    async findUserByEmail({ request, response }) {
        try {
            const { email } = request.get();

            const user = await User.findBy('email', email);

            if (!user) {
                return response.status(404).json({ mensagem: 'User not found' });
            }

            return response.status(200).json(user);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ mensagem: 'Error to find user by email' });
        }
    }

    async countUsers({ response }) {
        try {
            const totalUsers = await Database.from('users').count('* as total');
            return response.json({ totalUsers: totalUsers[0].total });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: 'Error to count users' });
        }
    }
}
