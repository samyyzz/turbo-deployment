import { prismaClient } from "@card/db/prisma";

export default async function Home() {
    const users = await prismaClient.user.findMany()
  return (
    <div>
      <h1>Sameer Ranja Singh</h1>
      <p>https://sameeru.xyz</p>
      {JSON.stringify(users)}
    </div>
  );
}

// export const dynamic = "force-dynamic" //when you dont want it to be generated during the build time, force to dynamic (else it will be static file after the build)