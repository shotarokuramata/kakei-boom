import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        let result;
        if (formData.id) {
            // id が提供されている場合は update 操作を行う
            result = await prisma.expense.update({
                where: { id: formData.id },
                data: {
                    name: formData.name,
                    type: formData.type,
                    createdAt: new Date(), // createdAt を現在の日付に更新
                },
            });
        } else {
            // id が提供されていない場合は create 操作を行う
            result = await prisma.expense.create({
                data: {
                    name: formData.name,
                    type: formData.type,
                    createdAt: new Date(), // createdAt を現在の日付に設定
                },
            });
        }

        return NextResponse.json({ message: 'フォームデータが正常に処理されました。', data: result });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'エラーが発生しました。', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: '不明なエラーが発生しました。' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        const data = await prisma.expense.findMany();
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'エラーが発生しました。', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: '不明なエラーが発生しました。' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        // データ削除の処理ロジックをここに追加
        // 例: データベースからの削除

        return NextResponse.json({ message: `ID ${id} のデータが削除されました。` });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'エラーが発生しました。', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: '不明なエラーが発生しました。' }, { status: 500 });
    }
}

