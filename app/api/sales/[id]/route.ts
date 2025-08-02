import { db } from "@/lib/db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { message: "Token tidak valid" },
        { status: 401 }
      );
    }

    const projectId = params.id;

    if (!projectId) {
      return NextResponse.json(
        { message: "ID project tidak ditemukan" },
        { status: 400 }
      );
    }

    await db.query(`DELETE FROM dummy_projects WHERE id = ?`, [
      projectId,
    ]);

    return NextResponse.json(
      { message: "Project berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gagal menghapus data:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
