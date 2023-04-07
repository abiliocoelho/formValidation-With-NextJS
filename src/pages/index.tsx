import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const userSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório").transform(name => {
    return name.trim().split(" ").map(word => {
    return word[0].toUpperCase().concat(word.substring(1))
  }).join(" ")}),
  email: z.string().nonempty("O e-mail é obrigatório").email("Formato de e-mail inválido").toLowerCase()
    .refine(email => {
    return email.endsWith("@gmail.com")
  }, "O e-mail precisa ser do Google"),
  password: z.string().min(6, "A senha de no mínimo 6 caracteres")
  })

  type UserData = z.infer<typeof userSchema>

export default function Home() {
  const [data, setData] = useState<UserData>()
  const { register, handleSubmit, formState: {errors} } = useForm<UserData>({
    resolver: zodResolver(userSchema)
  })

  function createUser(data:UserData) {
    setData(data)
  }

  return (
    <main className="flex justify-center items-center flex-col gap-4 min-h-screen bg-zinc-950">
      <form onSubmit={handleSubmit(createUser)} className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <label className="text-zinc-300 text-xl" htmlFor="name">Nome</label>
          <input
            type="text"
            title="name"
            placeholder="Nome"
            id="name"
            className="h-10 px-2 rounded bg-zinc-800 text-zinc-200"
            {...register("name")}
          />
          {errors.name && <span className='text-sm text-red-400'>{errors.name.message}</span>}
        </div>
        <div  className="flex flex-col gap-1">
          <label
            className="text-zinc-300 text-xl" htmlFor="email">E-mail</label>
          <input
            type="email"
            title="Email"
            placeholder="E-mail"
            id="email"
            className="h-10 px-2 rounded bg-zinc-800 text-zinc-200"
            {...register("email")}

          />
          {errors.email && <span className='text-sm text-red-400'>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-zinc-300 text-xl" htmlFor="password">Senha</label>
          <input
            type="password"
            title="Email"
            placeholder="Senha"
            id="password"
            className="h-10 px-2 rounded bg-zinc-800 text-zinc-200"
            {...register("password")}

          />
          {errors.password && <span className='text-sm text-red-400'>{errors.password.message}</span>}
        </div>
        <button className="h-10 bg-emerald-500 rounded hover:bg-emerald-700 text-zinc-200 font-semibold" type="submit">Salvar</button>
      </form>

      <pre className='text-zinc-300'>
        {
          JSON.stringify(data, null, 2)
        }
      </pre>
    </main>
  )
}
