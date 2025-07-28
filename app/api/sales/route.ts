// app/api/sales/route.ts
import { db } from '@/lib/db';
import { verifyToken } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Token tidak ditemukan' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: 'Token tidak valid' }, { status: 401 });
    }

    const submittedBy = user.id;

    const {
      customerName,
      contactPerson,
      projectTitle,
      projectDescription,
      startDate,
      endDate,
      budget,
      priority,
    } = await req.json();

    if (
      !customerName ||
      !contactPerson ||
      !projectTitle ||
      !projectDescription ||
      !startDate ||
      !endDate ||
      !budget ||
      !priority ||
      !submittedBy
    ) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 });
    }

    const [result] = await db.query(
      `INSERT INTO dummy_projects 
        (customer_name, contact_person, project_title, project_description, project_start_date, project_end_date, budget, priority, submitted_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customerName,
        contactPerson,
        projectTitle,
        projectDescription,
        startDate,
        endDate,
        budget,
        priority,
        submittedBy
      ]
    );

    return NextResponse.json({ message: 'Data berhasil disimpan', id: (result as any).insertId }, { status: 201 });
  } catch (error: any) {
    console.error('Gagal menyimpan data:', error);
    return NextResponse.json({ message: 'Gagal menyimpan data' }, { status: 500 });
  }
}
