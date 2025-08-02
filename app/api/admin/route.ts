import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/utils/auth";
import { Contact } from "lucide-react";

export async function GET(req: NextRequest) {
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

    // Ambil hanya project dengan status 'Draft' sebagai pending
    const [rows] = await db.query(`
      SELECT 
        p.id,
        p.project_title AS title,
        p.customer_name AS client,
        p.contact_person AS contactPerson,
        u.name AS salesPerson,
        p.budget AS estimatedValue,
        p.project_description AS description,
        p.project_start_date AS startDate,
        p.project_end_date AS endDate,
        p.priority,
        p.created_at AS submittedAt
      FROM dummy_projects p
      JOIN users u ON p.submitted_by = u.id
      WHERE p.status = 'draft'
      ORDER BY p.created_at DESC
    `);

    const projects = (rows as any[]).map((row) => ({
      id: `PRJ-${row.id.toString().padStart(3, "0")}`,
      title: row.title,
      client: row.client,
      contact: row.contactPerson,
      description: row.description,
      startDate: row.startDate ? row.startDate.toISOString().split("T")[0] : "", // Format: YYYY-MM-DD
      endDate: row.endDate ? row.endDate.toISOString().split("T")[0] : "", // Format: YYYY-MM-DD
      salesPerson: row.salesPerson,
      estimatedValue: `$${parseFloat(row.estimatedValue).toLocaleString()}`,
      priority: row.priority,
      submittedAt: row.submittedAt.toISOString().split("T")[0],
    }));

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil pending projects:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
