// app/api/sales/route.ts
import { db } from "@/lib/db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// show function
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

    // Ambil data dari database
    const [rows] = await db.query(`
      SELECT 
        id,
        customer_name AS client,
        contact_person,
        project_title AS title,
        project_description AS description,
        status,
        project_start_date AS startDate,
        project_end_date AS endDate,
        budget AS estimatedValue,
        priority,
        created_at AS createdAt
      FROM dummy_projects
      ORDER BY created_at DESC
    `);

    // Format data agar sesuai dengan frontend
    const projects = (rows as any[]).map((row) => ({
      idData: row.id,
      id: `PRJ-${row.id.toString().padStart(3, "0")}`, // PRJ-001, PRJ-002, dll
      client: row.client,
      title: row.title,
      contact_person: row.contact_person,
      description: row.description,
      startDate: row.startDate ? row.startDate.toISOString().split("T")[0] : "", // Format: YYYY-MM-DD
      endDate: row.endDate ? row.endDate.toISOString().split("T")[0] : "", // Format: YYYY-MM-DD
      budget: row.estimatedValue ? parseFloat(row.estimatedValue).toLocaleString() : "0",
      priority: row.priority,
      status: row.status || "Draft",
      estimatedValue: `$${parseFloat(row.estimatedValue).toLocaleString()}`,
      createdAt: row.createdAt.toISOString().split("T")[0], // Format: YYYY-MM-DD
    }));

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil data project:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// new project from sales function
export async function POST(req: NextRequest) {
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

    const submittedBy = user.id;

    const {
      customer_name,
      contact_person,
      project_title,
      project_description,
      project_start_date,
      project_end_date,
      budget,
      priority,
    } = await req.json();

    if (
      !customer_name ||
      !contact_person ||
      !project_title ||
      !project_description ||
      !project_start_date ||
      !project_end_date ||
      !budget ||
      !priority ||
      !submittedBy
    ) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `INSERT INTO dummy_projects 
        (customer_name, contact_person, project_title, project_description, project_start_date, project_end_date, budget, priority, submitted_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        contact_person,
        project_title,
        project_description,
        project_start_date,
        project_end_date,
        budget,
        priority,
        submittedBy,
      ]
    );

    return NextResponse.json(
      { message: "Project lead berhasil disimpan dan dikirim ke admin." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Gagal menyimpan data:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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

    const submittedBy = user.id;

    const {
      id, // <--- Wajib untuk tahu project mana yang akan diupdate
      customer_name,
      contact_person,
      project_title,
      project_description,
      project_start_date,
      project_end_date,
      budget,
      priority,
    } = await req.json();

    if (
      !id ||
      !customer_name ||
      !contact_person ||
      !project_title ||
      !project_description ||
      !project_start_date ||
      !project_end_date ||
      !budget ||
      !priority
    ) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    await db.query(
      `UPDATE dummy_projects 
       SET customer_name = ?, contact_person = ?, project_title = ?, project_description = ?, 
           project_start_date = ?, project_end_date = ?, budget = ?, priority = ?, submitted_by = ?
       WHERE id = ?`,
      [
        customer_name,
        contact_person,
        project_title,
        project_description,
        project_start_date,
        project_end_date,
        budget,
        priority,
        submittedBy,
        id,
      ]
    );

    return NextResponse.json(
      { message: "Data berhasil diperbarui" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Gagal memperbarui data:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui data" },
      { status: 500 }
    );
  }
}

