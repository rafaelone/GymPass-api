import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register.use-cases'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    await registerUseCase.execute({ name, email, password })

    reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }
}
