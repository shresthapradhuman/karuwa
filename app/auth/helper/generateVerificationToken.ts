import prisma from "@/prisma/client";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
  if (exisitingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }
  const twoFactorToken = await prisma.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return twoFactorToken;
};
