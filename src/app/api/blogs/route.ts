import { NextResponse } from "next/server";
import { PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient()


export async function main() {
    try {
      await prisma.$connect();
      //console.log("Database Connected Successfully.")
    } catch (err) {
      return Error("Database Connection Unsuccessull");
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
      await main();
      const posts = await prisma.post.findMany();
      return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
};

export const POST=async(req: Request,res:Response)=>{
    try {
        const { name, description,price,imageUrl,category } = await req.json();
        if(name && price && imageUrl && category){
            await main();
            const post = await prisma.post.create({ data: { name, description,price,imageUrl,category } });
            return NextResponse.json({ message: "Success", post }, { status: 201 });
        }else{
            return NextResponse.json({ message: "Error" }, { status: 500 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}