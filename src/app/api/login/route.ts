import dbConnect from "@/lib/db/connect";
export async function POST(request: Request) {
    await dbConnect();

}
