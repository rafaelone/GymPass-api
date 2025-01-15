import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository)

    await authenticateUseCase.execute({ email, password })

    reply.status(200).send()
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }
}
